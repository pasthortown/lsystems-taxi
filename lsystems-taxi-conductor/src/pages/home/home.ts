import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') element;
  map: GoogleMap;

  constructor(public googleMaps: GoogleMaps, public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    let options: {
      backgroundColor: 'white',
      controls: {
        compass: true,
        myLocationButton: true,
        indoorPicker: true,
        zoom: true
      },
      gestures: {
        scroll: true,
        tilt: true,
        rotate: true,
        zoom: true
      }
    };

    let map: GoogleMap = this.googleMaps.create(this.element.nativeElement, options);

    map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {

      let coordinates: LatLng = new LatLng(33.6396965, -84.4304574);

      let position = {
        target: coordinates,
        zoom: 17
      };

      map.animateCamera(position);

      let markerOptions: MarkerOptions = {
        position: coordinates,
        icon: "assets/images/icons8-Marker-64.png",
        title: 'Our first POI'
      };

      const marker = map.addMarker(markerOptions)
        .then((marker: Marker) => {
          marker.showInfoWindow();
      });
    })
  }

}