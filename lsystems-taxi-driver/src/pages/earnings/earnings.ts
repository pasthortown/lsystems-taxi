import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EarningsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-earnings',
  templateUrl: 'earnings.html',
})
export class EarningsPage {
pasajerosHoy:any[];
pasajeros:any[];
semana=20;
total=123;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pasajerosHoy=[];
    for(let i=1; i<6;i++){
      this.pasajerosHoy.push({
        id: i,
        nombre: 'Nombre '+i,
        horaInicio: i,
        horaFin:i,
      });
    }

    this.pasajeros=[];
    for(let i=6; i<17;i++){
      this.pasajeros.push({
        id: i,
        nombre: "Nombre "+i,
        horaInicio: i,
        horaFin:i,
      });
    }
  }
  itemSelected(Item){}
  ionViewDidLoad() {
    console.log('ionViewDidLoad EarningsPage');
  }


}
