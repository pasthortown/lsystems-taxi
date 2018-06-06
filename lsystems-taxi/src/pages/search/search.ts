import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  items;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
    this.initializeItems();

  }

  initializeItems() {

  }

  useItem(item) {
    this.view.dismiss(item);
  }

  getItems(ev) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  closeModal(){
    this.view.dismiss();
  }
}
