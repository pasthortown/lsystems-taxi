import { Persona } from './../../app/entidades/CRUD/Persona';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-detail-ratings',
  templateUrl: 'detail-ratings.html',
})
export class DetailRatingsPage implements OnInit {
  webServiceURL = environment.apiUrl;
  usuario: Persona;
  estrellas1: number;
  estrellas2: number;
  estrellas3: number;
  estrellas4: number;
  estrellas5: number;
  estrellas1p: number;
  estrellas2p: number;
  estrellas3p: number;
  estrellas4p: number;
  estrellas5p: number;
  total: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController, public http: Http) {

  }

  ngOnInit() {
    this.usuario = JSON.parse(sessionStorage.getItem('logedResult')) as Persona;
    this.refresh();
  }

  getEstrellasCuenta() {
    this.http.get(this.webServiceURL + 'expresion/leer_estrellas_conductor?id='+this.usuario.id)
    .subscribe(respuesta => {
      respuesta.json().forEach(element => {
        if(element.idCalificacionConductor == 1){
          this.estrellas1 = element.Cuenta;
        }
        if(element.idCalificacionConductor == 2){
          this.estrellas2 = element.Cuenta;
        }
        if(element.idCalificacionConductor == 3){
          this.estrellas3 = element.Cuenta;
        }
        if(element.idCalificacionConductor == 4){
          this.estrellas4 = element.Cuenta;
        }
        if(element.idCalificacionConductor == 5){
          this.estrellas5 = element.Cuenta;
        }
      });
      this.total = this.estrellas1*1 + this.estrellas2*1 + this.estrellas3*1 + this.estrellas4*1 + this.estrellas5*1;
      this.estrellas1p = (this.estrellas1/this.total)*100;
      this.estrellas2p = (this.estrellas2/this.total)*100;
      this.estrellas3p = (this.estrellas3/this.total)*100;
      this.estrellas4p = (this.estrellas4/this.total)*100;
      this.estrellas5p = (this.estrellas5/this.total)*100;
    }, error => {

    });
  }

  refresh() {
    this.estrellas1 = 0;
    this.estrellas2 = 0;
    this.estrellas3 = 0;
    this.estrellas4 = 0;
    this.estrellas5 = 0;
    this.total = 0;
    this.getEstrellasCuenta();
  }

  closeModal(){
    this.view.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailRatingsPage');
  }

}
