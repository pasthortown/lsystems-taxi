import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { } from '@types/googlemaps';

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

  constructor(public navCtrl: NavController) {
  }

  ngOnInit() {
    this.seleccionadaUnidad = false;
    this.taxi = 'assets/imgs/Taxi_No_Disponible.png';
    this.refresh();
  }

  refresh() {
    this.startGoogleMap();
    this.getUnidad();
  }

  getUnidad() {

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
}
