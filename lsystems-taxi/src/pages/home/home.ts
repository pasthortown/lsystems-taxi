import { Viaje } from './../../app/entidades/CRUD/Viaje';
import { MotivoEstado } from './../../app/entidades/CRUD/MotivoEstado';
import { Persona } from './../../app/entidades/CRUD/Persona';
import { Posicion } from './../../app/entidades/CRUD/Posicion';
import { environment } from './../../../environments/environment';
import { Unidad } from './../../app/entidades/CRUD/Unidad';
import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, ToastController, ModalController} from 'ionic-angular';
import { } from '@types/googlemaps';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

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

  constructor(
    private callNumber: CallNumber,
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
    this.seleccionadaUnidad = false;
    this.mostrarMotivo = false;
    this.taxi = 'assets/imgs/Taxi_No_Disponible.png';
    this.posicion = new Posicion();
    this.refresh();
  }

  ionViewWillEnter() {
    this.refresh();
  }

  refresh() {
    this.usuario = JSON.parse(sessionStorage.getItem('logedResult')) as Persona;
    this.unidad = new Unidad();
    this.startGoogleMap();
    this.getMiPosicion();
  }

  getMiPosicion() {
    let usuarioIcono = {
      url: 'assets/imgs/userpin.png',
      size: new google.maps.Size(30, 30),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(30, 30),
      scaledSize: new google.maps.Size(30, 30)
    }
    this.geolocation.getCurrentPosition().then((resp) => {
      let PosicionActual = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      this.map.setCenter(PosicionActual);
      let marcadorUsuario = new google.maps.Marker({
        position: PosicionActual,
        map: this.map,
        draggable: false,
        icon: usuarioIcono,
        title: this.usuario.nombres + ' ' + this.usuario.apellidos
      });
      this.marcadoresVisibles.push(marcadorUsuario);
    }).catch((error) => {

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
      this.viajeEnCurso = r.json().viaje;
      this.pasajero = r.json().pasajero;
      this.getRoute();
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
    this.getPosicionTaxi();
  }

  getPosicionTaxi(){
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
    this.marcadoresViaje.push(marcadorFin);
    this.map.addListener('click', function(event) {
      let location = event.latLng;
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
    this.showToast('Por favor espere, estamos ubicando una unidad para servirle.', 3000);
  }
}
