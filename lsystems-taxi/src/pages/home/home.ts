import { Viaje } from './../../app/entidades/CRUD/Viaje';
import { Persona } from './../../app/entidades/CRUD/Persona';
import { environment } from './../../../environments/environment';
import { Unidad } from './../../app/entidades/CRUD/Unidad';
import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, ToastController, ModalController} from 'ionic-angular';
import { } from '@types/googlemaps';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  unidad: Unidad;
  activado: Boolean;
  webServiceURL = environment.apiUrl;
  subscription = null;
  usuario: Persona;
  marcadoresViaje = [];
  viajeEnCurso: Viaje;
  viajeIniciado: boolean;
  marcadorUsuario: google.maps.Marker;
  marcadorTaxi: google.maps.Marker;
  conductor: Persona;

  constructor(
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public http: Http,
    private geolocation: Geolocation,
    public alertCtrl: AlertController,
    public modal: ModalController) {

  }

  openModal(modalName){
    const myModal = this.modal.create(modalName);
    myModal.onDidDismiss(modalData => {
      console.log(modalData);
    });
    myModal.present();
  }

  ngOnInit() {
    this.viajeIniciado = false;
    this.refresh();
  }

  ionViewWillEnter() {
    this.getMiPosicion();
  }

  refresh() {
    this.usuario = JSON.parse(sessionStorage.getItem('logedResult')) as Persona;
    this.unidad = new Unidad();
    this.unidad.id = 1;
    this.startGoogleMap();
  }

  getMiPosicion() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let PosicionActual = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      this.map.setCenter(PosicionActual);
      this.marcadorUsuario.setPosition(PosicionActual);
      this.actualizarMiPosicion();
    }).catch((error) => {

    });
  }

  actualizarMiPosicion() {
    let options = {
      enableHighAccuracy: true,
      timeout: 15000
    };
    this.subscription = this.geolocation.watchPosition(options)
    .subscribe(position => {
      let posicion = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.marcadorUsuario.setPosition(posicion);
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  verificarSiEnUso() {
    this.http.get(this.webServiceURL + 'viaje/verificarSiEnUsoUsuario?idUsuario='+this.usuario.id)
    .subscribe(r => {
      if(JSON.stringify(r.json())=='[0]'){
        return;
      }

    }, error => {

    });
  }

  escucharRespuestas(){
    this.escuchando();
    if ( this.activado) {
        setTimeout(() => {
        this.escucharRespuestas();
        }, 30000);
    }
  }

  escuchando() {
    if(this.viajeIniciado){
      this.getPosicionTaxi();
    }else{
      this.comprobarSolicitudViaje();
    }
  }

  comprobarSolicitudViaje() {
    if(this.viajeIniciado){
      return;
    }
    this.http.get(this.webServiceURL + 'viaje/comprobarSolicitudViaje?id='+this.usuario.id.toString())
    .subscribe(r1 => {
      if(JSON.stringify(r1.json())=='[0]'){
        return;
      }
      this.viajeEnCurso.idConductor=r1.json()[0].idConductor;
      this.viajeEnCurso.latDesde=r1.json()[0].latDesde;
      this.viajeEnCurso.lngDesde=r1.json()[0].lngDesde;
      this.viajeEnCurso.latHasta=r1.json()[0].latHasta;
      this.viajeEnCurso.lngHasta=r1.json()[0].lngHasta;
      this.conductor = new Persona();
      this.conductor.nombres = r1.json()[0].nombres;
      this.conductor.apellidos = r1.json()[0].apellidos;
      this.conductor.telefono1 = r1.json()[0].telefono1;
      this.conductor.telefono2 = r1.json()[0].telefono2;
      this.unidad = new Unidad();
      this.unidad.id = r1.json()[0].idUnidad;
      this.unidad.placa = r1.json()[0].placa;
      this.unidad.numero = r1.json()[0].numero;
      this.unidad.registroMunicipal = r1.json()[0].registroMunicipal;
      this.viajeIniciado = true;
      this.getRoute();
    }, error => {

    });
  }

  getPosicionTaxi(){
    if(this.unidad.id==0){
      return;
    }
    this.http.get(this.webServiceURL + 'posicion/leer_filtrado?columna=idUnidad&tipo_filtro=coincide&filtro='+this.unidad.id.toString())
    .subscribe(r1 => {
      const posicion = new google.maps.LatLng(r1.json()[0].latitud as number, r1.json()[0].longitud as number);
      this.marcadorTaxi.setPosition(posicion);
    }, error => {

    });
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

  startGoogleMap() {
    const mapProp = {
        center: new google.maps.LatLng(-0.224710, -78.516763),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    let mapa = this.map;
    let marcadorFin = new google.maps.Marker({
      position: new google.maps.LatLng(0,0),
      map: mapa,
      draggable: true,
      title: 'Destino'
    });
    let taxiIcono = {
      url: 'assets/imgs/taxipin.png',
      size: new google.maps.Size(30, 30),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(30, 30),
      scaledSize: new google.maps.Size(30, 30)
    }
    let usuarioIcono = {
      url: 'assets/imgs/userpin.png',
      size: new google.maps.Size(30, 30),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(30, 30),
      scaledSize: new google.maps.Size(30, 30)
    }
    this.marcadorTaxi = new google.maps.Marker({
      position: new google.maps.LatLng(0,0),
      map: mapa,
      icon: taxiIcono,
      draggable: false,
      title: 'Unidad'
    });
    this.marcadorUsuario = new google.maps.Marker({
      position: new google.maps.LatLng(0,0),
      map: mapa,
      icon: usuarioIcono,
      draggable: false,
      title: 'Usuario'
    });
    this.marcadoresViaje.push(marcadorFin);
    this.map.addListener('click', function(event) {
      marcadorFin.setPosition(event.latLng);
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

  pedirUnidad() {
    let destino = this.marcadoresViaje[0] as google.maps.Marker;
    if(destino.getPosition().toJSON().lat == 0 && destino.getPosition().toJSON().lng == 0){
      this.showToast('Seleccione un destino', 3000);
      return;
    }
    const data = {latDesde: this.marcadorUsuario.getPosition().toJSON().lat,
                  lngDesde: this.marcadorUsuario.getPosition().toJSON().lng,
                  latHasta: destino.getPosition().toJSON().lat,
                  lngHasta: destino.getPosition().toJSON().lng,
                  idUsuario: this.usuario.id
                }
    this.http.post(this.webServiceURL + 'viaje/nuevaSolicitudViaje',JSON.stringify(data))
    .subscribe(r1 => {
      this.showToast('Por favor espere, estamos ubicando una unidad para atender su solicitud.', 3000);
      this.escucharRespuestas();
    }, error => {

    });
  }
}
