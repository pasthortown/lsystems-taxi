import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the DetailRatingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-ratings',
  templateUrl: 'detail-ratings.html',
})
export class DetailRatingsPage {
  rate:number

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
  this.rate=2.5
  }

  closeModal(){
    this.view.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailRatingsPage');
  }

}