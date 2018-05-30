import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { environment } from './../../../environments/environment';
import { Http } from '@angular/http';
import { Persona } from '../../app/entidades/CRUD/Persona';

@IonicPage()
@Component({
  selector: 'page-reject-rate',
  templateUrl: 'reject-rate.html',
})
export class RejectRatePage implements OnInit{
  reject: string;
  usuario: Persona;

  webServiceURL = environment.apiUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController, public http: Http) {

  }

  ngOnInit() {
    this.usuario = JSON.parse(sessionStorage.getItem('logedResult')) as Persona;
    this.refresh();
  }

  refresh() {
    this.getRejectRate();
  }

  getRejectRate() {
    this.http.get(this.webServiceURL + 'viaje/leer_estadisticas_tasa_aceptacion_conductor?id='+this.usuario.id)
    .subscribe(r => {
      let finalizados = r.json()[0].Finalizados;
      let asignados = r.json()[0].Asignados;
      if(asignados == 0 || finalizados == 0){
        this.reject = '0%';
        return;
      }
      let tasa = 100*(asignados - finalizados)/asignados;
      if(tasa == 100){
        this.reject = '100%';
        return;
      }
      if(tasa == 0){
        this.reject = '0%';
        return;
      }
      this.reject = (tasa).toFixed(2) + '%';
    }, error => {

    });
  }

  closeModal(){
    this.view.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RejectRatePage');
  }

}
