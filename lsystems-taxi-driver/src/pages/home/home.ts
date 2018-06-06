import { Viaje } from './../../app/entidades/CRUD/Viaje';
import { MotivoEstado } from './../../app/entidades/CRUD/MotivoEstado';
import { Persona } from './../../app/entidades/CRUD/Persona';
import { Posicion } from './../../app/entidades/CRUD/Posicion';
import { environment } from './../../../environments/environment';
import { Unidad } from './../../app/entidades/CRUD/Unidad';
import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, ToastController} from 'ionic-angular';
import { } from '@types/googlemaps';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { WebIntent } from '@ionic-native/web-intent';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  poly: google.maps.Polyline;
  taxi: string;
  seleccionadaUnidad: boolean;
  unidad: Unidad;
  activado: boolean;
  posicion: Posicion;
  webServiceURL = environment.apiUrl;
  subscription = null;
  marcadoresVisibles = [];
  usuario: Persona;
  solicitudEnPantalla: Boolean;
  solicitudViaje;
  marcadoresViaje = [];
  mostrarMotivo: boolean;
  motivos: MotivoEstado[]
  idMotivoEstado: number;
  viajeEnCurso: Viaje;
  pasajero: Persona;
  viajeIniciado: boolean;
  pasajeroRecogido: boolean;

  constructor(
    private callNumber: CallNumber,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public http: Http,
    private geolocation: Geolocation,
    private webIntent: WebIntent,
    public alertCtrl: AlertController) {

    }

  ngOnInit() {
    this.seleccionadaUnidad = false;
    this.pasajeroRecogido = false;
    this.mostrarMotivo = false;
    this.taxi = 'assets/imgs/Taxi_No_Disponible.png';
    this.posicion = new Posicion();
    this.refresh();
  }

  refresh() {
    this.solicitudEnPantalla = false;
    this.viajeIniciado = false;
    this.unidad = JSON.parse(sessionStorage.getItem('unidad')) as Unidad;
    this.usuario = JSON.parse(sessionStorage.getItem('logedResult')) as Persona;
    this.posicion.idUnidad = this.unidad.id;
    this.startGoogleMap();
    this.getPosicionId();
    this.getMotivos();
    this.verificarSiEnUso();
  }

  getMotivos() {
    this.http.get(this.webServiceURL + 'motivoestado/leer')
    .subscribe(r2 => {
      this.motivos = r2.json() as MotivoEstado[];
    }, error => {

    });
  }

  verificarSiEnUso() {
    this.http.get(this.webServiceURL + 'viaje/verificarSiEnUso?idUnidad='+this.unidad.id+'&idConductor='+this.usuario.id)
    .subscribe(r => {
      if(JSON.stringify(r.json())=='[0]'){
        return;
      }
      this.activado = true;
      this.viajeIniciado = true;
      this.iniciarGPS();
      this.escucharSolicitudes();
      this.viajeEnCurso = r.json().viaje;
      this.pasajero = r.json().pasajero;
      this.getRoute();
      if(new Date(this.viajeEnCurso.fechaInicio).getFullYear() == new Date().getFullYear() && new Date(this.viajeEnCurso.fechaInicio).getMonth() == new Date().getMonth() && new Date(this.viajeEnCurso.fechaInicio).getDate() == new Date().getDate()) {
        this.pasajeroRecogido = true;
      }
    }, error => {

    });
  }

  activar() {
    if(!this.activado){
      this.taxi = 'assets/imgs/Taxi_No_Disponible.png';
      this.unidad.idEstadoUnidad = 3;
    }else {
      this.taxi = 'assets/imgs/Taxi_Libre.png';
      this.unidad.idEstadoUnidad = 1;
    }
    this.http.post(this.webServiceURL + 'unidad/actualizar',JSON.stringify(this.unidad))
    .subscribe(respuesta => {
      if(this.unidad.idEstadoUnidad == 1){
        this.showToast('Modo Disponible Activado. Esperando solicitudes...', 3000);
        this.iniciarGPS();
        this.escucharSolicitudes();
      }
      if(this.unidad.idEstadoUnidad == 3){
        this.showToast('Modo No Disponible Activado', 3000);
        this.detener();
      }
    }, error => {
      this.taxi = 'assets/imgs/Taxi_No_Disponible.png';
      this.unidad.idEstadoUnidad = 3;
      this.showToast('Ocurrió un error', 3000);
    });
  }

  escucharSolicitudes(){
    this.escuchando();
    if ( this.activado) {
        setTimeout(() => {
        this.escucharSolicitudes();
        }, 30000);
    }
  }

  getPosicionId() {
    this.http.get(this.webServiceURL + 'posicion/leer_posicions_actuales?idUnidad='+this.unidad.id)
    .subscribe(r1 => {
      if(JSON.stringify(r1.json())=='[0]'){
        this.http.post(this.webServiceURL + 'posicion/crear',JSON.stringify(this.posicion))
        .subscribe(r2 => {
          this.http.get(this.webServiceURL + 'posicion/leer_posicions_actuales?idUnidad='+this.unidad.id)
          .subscribe(r3 => {
            this.posicion.id = r3.json()[0].id;
            return;
          }, error => {

          });
        }, error => {

        });
      }
      this.posicion.id = r1.json()[0].id;
    }, error => {

    });
  }

  setUltimaPosicion(){
    this.http.post(this.webServiceURL + 'posicion/actualizar',JSON.stringify(this.posicion))
    .subscribe(r1 => {
      this.http.get(this.webServiceURL + 'unidad/leer?id='+this.unidad.id.toString())
      .subscribe(r2 => {
        this.unidad = r2.json()[0] as Unidad;
        this.updateMiEstado();
      }, error => {

      });
    }, error => {

    });
  }

  updateMiEstado(){
    if(this.solicitudEnPantalla){
      return;
    }
    let iconBase = 'assets/imgs/';
    let icons = {
        1: {
            image : {
                url: iconBase + 'Taxi_Libre.png',
                size: new google.maps.Size(30, 30),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(30, 30),
                scaledSize: new google.maps.Size(30, 30)
            }
        },
        2: {
            image : {
                url: iconBase + 'Taxi_Ocupado.png',
                size: new google.maps.Size(30, 30),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(30, 30),
                scaledSize: new google.maps.Size(30, 30)
            }
        },
        3: {
            image : {
                url: iconBase + 'Taxi_No_Disponible.png',
                size: new google.maps.Size(30, 30),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(30, 30),
                scaledSize: new google.maps.Size(30, 30)
            }
        },
        4: {
            image : {
                url: iconBase + 'Taxi_Solicitado.png',
                size: new google.maps.Size(30, 30),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(30, 30),
                scaledSize: new google.maps.Size(30, 30)
            }
        }
    };
    let icono = icons[this.unidad.idEstadoUnidad<=4 ? this.unidad.idEstadoUnidad : 1].image;
    this.taxi = icono.url;
    let location = new google.maps.LatLng(JSON.parse(this.posicion.latitud) as number,JSON.parse(this.posicion.longitud) as number);
    let noEncontrado = true;
    this.marcadoresVisibles.forEach(marcador => {
      if (marcador.getTitle() === 'No. ' + this.unidad.numero + ' - ' + this.unidad.placa) {
        noEncontrado = false;
        marcador.setIcon(icono);
        marcador.setPosition(location);
      }
    });
    if (noEncontrado){
      let marcadorNuevo = new google.maps.Marker({
        position: location,
        map: this.map,
        draggable: false,
        icon: icono,
        title: 'No. ' + this.unidad.numero + ' - ' + this.unidad.placa
      });
      this.marcadoresVisibles.push(marcadorNuevo);
    }
    this.map.setCenter(location);
  }

  escuchando() {
    this.setUltimaPosicion();
    this.buscandoSolicitudes();
  }

  buscandoSolicitudes() {
    if(this.solicitudEnPantalla){
      return;
    }
    if(this.viajeIniciado){
      return;
    }
    this.http.get(this.webServiceURL + 'viaje/leer_viaje_solicitud_asignado_unidad?id='+this.unidad.id)
    .subscribe(r1 => {
      if(JSON.stringify(r1.json())=='[0]'){
        return;
      }
      this.solicitudViaje = r1.json()[0];
      this.solicitudEnPantalla = true;
      this.dibujarRutaSolicitud();
    }, error => {

    });
  }

  dibujarRutaSolicitud() {
    let location = new google.maps.LatLng(JSON.parse(this.solicitudViaje.latDesde) as number,JSON.parse(this.solicitudViaje.lngDesde) as number);
    let marcadorInicio = new google.maps.Marker({
      position: location,
      map: this.map,
      draggable: false,
      label: 'A',
      title: 'Inicio'
    });
    let location2 = new google.maps.LatLng(JSON.parse(this.solicitudViaje.latHasta) as number,JSON.parse(this.solicitudViaje.lngHasta) as number);
    let marcadorFin = new google.maps.Marker({
      position: location2,
      map: this.map,
      draggable: false,
      label: 'B',
      title: 'Fin'
    });
    this.map.setCenter(location);
    this.map.setZoom(14);
    this.marcadoresViaje.push(marcadorInicio);
    this.marcadoresViaje.push(marcadorFin);
  }

  aceptar(){
    this.viajeEnCurso = new Viaje();
    this.viajeEnCurso.idUnidad = this.unidad.id;
    this.viajeEnCurso.idConductor = this.usuario.id;
    this.viajeEnCurso.idUsuario = this.solicitudViaje.idUsuario;
    this.viajeEnCurso.latDesde = this.solicitudViaje.latDesde;
    this.viajeEnCurso.lngDesde = this.solicitudViaje.lngDesde;
    this.viajeEnCurso.latHasta = this.solicitudViaje.latHasta;
    this.viajeEnCurso.lngHasta = this.solicitudViaje.lngHasta;
    this.viajeEnCurso.id = this.solicitudViaje.id;
    this.viajeEnCurso.idEstadoViaje = 2;
    this.pasajero = new Persona();
    this.pasajero.nombres = this.solicitudViaje.nombres;
    this.pasajero.apellidos = this.solicitudViaje.apellidos;
    this.pasajero.telefono1 = this.solicitudViaje.telefono1;
    this.pasajero.telefono2 = this.solicitudViaje.telefono2;
    this.unidad.idEstadoUnidad = 4;
    this.viajeIniciado = true;
    this.http.post(this.webServiceURL + 'unidad/actualizar',JSON.stringify(this.unidad))
    .subscribe(r1 => {

    }, error => {

    });
    this.http.post(this.webServiceURL + 'viaje/actualizar',JSON.stringify(this.viajeEnCurso))
    .subscribe(r1 => {
      this.showToast('Adelante, dirígete al punto de encuentro con el cliente',3000);
      this.solicitudEnPantalla = false;
      this.updateMiEstado();
    }, error => {

    });
    this.getRoute();
  }

  getRoute() {
    this.marcadoresViaje.forEach(element => {
      element.setMap(null);
    });
    this.marcadoresViaje = [];
    let DestinoUsuario = new google.maps.LatLng(JSON.parse(this.viajeEnCurso.latHasta) as number,JSON.parse(this.viajeEnCurso.lngHasta) as number);
    let InicioUsuario = new google.maps.LatLng(JSON.parse(this.viajeEnCurso.latDesde) as number,JSON.parse(this.viajeEnCurso.lngDesde) as number);
    this.geolocation.getCurrentPosition().then((resp) => {
      let PosicionActual = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let directionsDisplay = new google.maps.DirectionsRenderer();
      directionsDisplay.setMap(this.map);
      let directionsService = new google.maps.DirectionsService();
      let request: google.maps.DirectionsRequest = {
        origin: PosicionActual,
        destination: DestinoUsuario,
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: [
          {
            location: InicioUsuario,
            stopover: true
        }],
        provideRouteAlternatives: true,
        drivingOptions: {
          departureTime: new Date(),
          trafficModel: google.maps.TrafficModel.PESSIMISTIC
        },
      };
      directionsService.route(request, function(result, status) {
        directionsDisplay.setDirections(result);
      })
    }).catch((error) => {

    });
  }

  negarse(){
    this.mostrarMotivo = true;
    this.activado = false;
    this.activar();
  }

  confirmarRechazo(id: number) {
    this.http.get(this.webServiceURL + 'viaje/rechazarViaje?idConductor='+this.usuario.id+'&idViaje='+ this.solicitudViaje.id +'&idUnidad='+this.unidad.id+'&idMotivoEstado='+id.toString())
    .subscribe(r1 => {
      this.solicitudEnPantalla = false;
      this.marcadoresViaje.forEach(element => {
        element.setMap(null);
        this.viajeIniciado = false;
      });
      this.marcadoresVisibles = [];
    }, error => {

    });
  }

  startGoogleMap() {
    const mapProp = {
        center: new google.maps.LatLng(-0.224710, -78.516763),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.poly = new google.maps.Polyline({
        strokeColor: '#ed8917',
        strokeOpacity: 1,
        strokeWeight: 3,
        geodesic: true,
        map: this.map
    });
  }

  showToast(mensaje: string, time: number):void {
    let toast = this.toastCtrl.create({
      message: mensaje,
      position: 'middle',
      duration: time
    });
    toast.present();
  }

  iniciarGPS():void {
    let options = {
      enableHighAccuracy: true,
      timeout: 15000
    };
    this.subscription = this.geolocation.watchPosition(options)
    .subscribe(position => {
      this.posicion.latitud = position.coords.latitude.toString();
      this.posicion.longitud = position.coords.longitude.toString();
      this.posicion.velocidad = Math.floor(position.coords.speed * 3.6).toFixed(2).toString();
      this.updateMiEstado();
      this.posicion.tiempo = new Date();
    });
  }

  detener():void {
    this.updateMiEstado();
    this.subscription.unsubscribe();
  }

  UbicarPasajero() {
    this.pasajeroRecogido = true;
    let prompt = this.alertCtrl.create({
      title: 'Pasajero Ubicado',
      message: "Confirmar que el pasajero se encuentra a bordo.",
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {

          }
        },
        {
          text: 'Confirmar',
          handler: data => {
            this.pasajeroABordo(data);
          }
        }
      ]
    });
    prompt.present();
  }

  Cobrar() {
    let prompt = this.alertCtrl.create({
      title: 'Finalizar Viaje',
      message: "Ingrese el valor cobrado.",
      inputs: [
        {
          type: 'number',
          name: 'Costo',
          placeholder: 'Ej: 3.45 USD'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {

          }
        },
        {
          text: 'Guardar',
          handler: data => {
            this.finalizarViaje(data);
          }
        }
      ]
    });
    prompt.present();
  }

  DatosPasajero() {
    if(this.pasajero == null){
      return;
    }
    let prompt = this.alertCtrl.create({
      title: 'Usuario',
      message: '<b>' + this.pasajero.apellidos + ' ' + this.pasajero.nombres + '</b><br/><b>Tlf. 1: </b>' + this.pasajero.telefono1 + '<br/><b>Tlf. 2: </b>' + this.pasajero.telefono2,
      buttons: [
        {
          text: 'Cerrar',
          handler: data => {

          }
        },
        {
          text: 'Llamar Telf. 1',
          handler: data => {
            this.callNumber.callNumber(this.pasajero.telefono1, true)
          }
        },
        {
          text: 'Llamar Telf. 2',
          handler: data => {
            this.callNumber.callNumber(this.pasajero.telefono2, true)
          }
        }
      ]
    });
    prompt.present();
  }

  finalizarViaje(data) {
    this.viajeEnCurso.fechaFin = new Date();
    this.unidad.idEstadoUnidad = 1;
    this.viajeEnCurso.costoReal = data.Costo;
    this.viajeEnCurso.idEstadoViaje = 4;
    this.http.post(this.webServiceURL + 'unidad/actualizar',JSON.stringify(this.unidad))
    .subscribe(r1 => {
      this.updateMiEstado();
    }, error => {

    });
    this.http.post(this.webServiceURL + 'viaje/actualizar',JSON.stringify(this.viajeEnCurso))
    .subscribe(r1 => {
      this.viajeEnCurso = null;
      this.showToast('Excelente trabajo',3000);
    }, error => {

    });
    this.viajeIniciado = false;
  }

  pasajeroABordo(data) {
    this.viajeEnCurso.fechaInicio = new Date();
    this.unidad.idEstadoUnidad = 2;
    this.viajeEnCurso.idEstadoViaje = 3;
    this.http.post(this.webServiceURL + 'unidad/actualizar',JSON.stringify(this.unidad))
    .subscribe(r1 => {
      this.updateMiEstado();
    }, error => {

    });
    this.http.post(this.webServiceURL + 'viaje/actualizar',JSON.stringify(this.viajeEnCurso))
    .subscribe(r1 => {
      this.showToast('Excelente, dirígete al destino solicitado por el cliente',3000);
    }, error => {

    });
  }

  iniciarNavegacion() {
    let destino = this.viajeEnCurso.latDesde + ',' + this.viajeEnCurso.lngDesde;
    if (this.pasajeroRecogido) {
      destino = this.viajeEnCurso.latHasta + ',' + this.viajeEnCurso.lngHasta;
    }
    const options = {
      action: this.webIntent.ACTION_VIEW,
      url: 'geo:' + destino
    };
    this.webIntent.startActivity(options)
    .then(r1 => {
    }, error => {
      alert(JSON.stringify(error));
    });
  }
}
