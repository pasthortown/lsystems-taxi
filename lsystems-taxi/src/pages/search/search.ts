import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import { } from '@types/googlemaps';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  autocompleteItems = [];
  busqueda;
  latitude: number = 0;
  longitude: number = 0;
  service = new google.maps.places.AutocompleteService();

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public view: ViewController, private zone: NgZone) {
  }

  useItem(item) {
    this.geoCode(item.description);
  }

  getItems(ev) {
    if (this.busqueda == '' || this.busqueda.lenght<3) {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({
      input: this.busqueda,
      componentRestrictions: {
        country: 'ec',
      }
    }, (predictions, status) => {
      me.autocompleteItems = [];
      me.zone.run(() => {
        if (predictions != null) {
          me.autocompleteItems = predictions;
        }
      });
    });
  }

  ionViewDidLoad() {
  }

  closeModal(){
    this.view.dismiss();
  }

  geoCode(address:any) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results, status) => {
      this.latitude = results[0].geometry.location.lat();
      this.longitude = results[0].geometry.location.lng();
      this.view.dismiss({latitude:this.latitude,longitude:this.longitude});
    });
  }
}
