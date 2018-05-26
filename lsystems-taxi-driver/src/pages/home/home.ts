import { Persona } from './../../../../lsystems-taxi-admin/src/app/entidades/CRUD/Persona';
import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { } from '@types/googlemaps';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  poly: google.maps.Polyline;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    let personaLogeada = JSON.parse(sessionStorage.getItem('logedResult')) as Persona;
    this.startGoogleMap();
    this.showToast('Saludos, Mortal', 3000);
    //this.showToast('Saludos, ' + personaLogeada.nombres + ' ' + personaLogeada.apellidos,3000)
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

}
