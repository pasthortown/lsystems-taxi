import { PopoverComponent } from './../../components/popover/popover';
import { Posicion } from './../../app/entidades/CRUD/Posicion';
import { environment } from './../../../environments/environment';
import { Unidad } from './../../app/entidades/CRUD/Unidad';
import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, ToastController, PopoverController} from 'ionic-angular';
import { } from '@types/googlemaps';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';

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

  constructor(
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public http: Http,
    private geolocation: Geolocation,
    public popoverCtrl:PopoverController) {

    }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    });
  }

  ngOnInit() {
    this.seleccionadaUnidad = false;
    this.taxi = 'assets/imgs/Taxi_No_Disponible.png';
    this.posicion = new Posicion();
    this.refresh();
  }

  refresh() {
    this.unidad = JSON.parse(sessionStorage.getItem('unidad')) as Unidad;
    this.posicion.idUnidad = this.unidad.id;
    this.startGoogleMap();
    this.getPosicionId();
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
      }, error => {

      });
    }, error => {

    });
  }

  updateMiEstado(){
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
    // aca validar si hay nuevas solicitudes de servicio
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
}
