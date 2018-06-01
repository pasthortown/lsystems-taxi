import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ProAdvicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pro-advices',
  templateUrl: 'pro-advices.html',
})
export class ProAdvicesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
  }

  closeModal(){
    this.view.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProAdvicesPage');
  }

}
