import { Expresion } from './../../app/entidades/CRUD/Expresion';
import { Viaje } from './../../app/entidades/CRUD/Viaje';
import { Component,  } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the EvaluatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-evaluate',
  templateUrl: 'evaluate.html',
})
export class EvaluatePage {
  viaje: Viaje;
  expresion: Expresion;

  constructor(public navCtrl: NavController, private params: NavParams, public view: ViewController, public navParams: NavParams) {
    this.getInfo();
  }

  getInfo(){
    this.viaje = this.params.get('viaje') as Viaje;
    this.expresion = new Expresion();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EvaluatePage');
  }

  closeModal(){
    this.view.dismiss();
  }
}
