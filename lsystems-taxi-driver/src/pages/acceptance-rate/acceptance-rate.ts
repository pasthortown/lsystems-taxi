import { Persona } from './../../app/entidades/CRUD/Persona';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { environment } from './../../../environments/environment';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-acceptance-rate',
  templateUrl: 'acceptance-rate.html',
})
export class AcceptanceRatePage implements OnInit{
  acceptance: string;
  usuario: Persona;

  webServiceURL = environment.apiUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController, public http: Http) {
  }

  ionViewWillEnter() {
    this.refresh();
  }

  ngOnInit() {
    this.usuario = JSON.parse(sessionStorage.getItem('logedResult')) as Persona;
    this.refresh();
  }

  refresh() {
    this.getAcceptanceRate();
  }

  getAcceptanceRate() {
    this.http.get(this.webServiceURL + 'viaje/leer_estadisticas_tasa_aceptacion_conductor?id='+this.usuario.id)
    .subscribe(r => {
      let finalizados = r.json()[0].Finalizados;
      let asignados = r.json()[0].Asignados;
      if(asignados == 0 || finalizados == 0){
        this.acceptance = '100%';
        return;
      }
      let tasa = 100*finalizados/asignados;
      if(tasa == 100){
        this.acceptance = '100%';
        return;
      }
      if(tasa == 0){
        this.acceptance = '0%';
        return;
      }
      this.acceptance = (tasa).toFixed(2) + '%';
    }, error => {

    });
  }

  closeModal(){
    this.view.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcceptanceRatePage');
  }
}
