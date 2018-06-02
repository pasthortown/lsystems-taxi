import { Unidad } from './../../app/entidades/CRUD/Unidad';
import { Persona } from './../../app/entidades/CRUD/Persona';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-ratings',
  templateUrl: 'ratings.html',
})
export class RatingsPage implements OnInit{
  calificacion: string;
  usuario: Persona;
  unidad: Unidad;

  webServiceURL = environment.apiUrl;
  rate:number = 2.5;
  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController, public http: Http) {
  this.rate=2.5
  }

  openModal(modalName){
    const myModal = this.modal.create(modalName);
    myModal.present();
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.refresh();
  }

  ngOnInit() {
    this.usuario = JSON.parse(sessionStorage.getItem('logedResult')) as Persona;
    this.unidad = JSON.parse(sessionStorage.getItem('unidad')) as Unidad;
    this.refresh();
  }

  refresh() {
    this.getRating();
  }

  getRating() {
    this.http.get(this.webServiceURL + 'expresion/leer_estrellas_conductor?id='+this.usuario.id)
    .subscribe(r => {
      if(JSON.stringify(r.json())=='[0]'){
        this.calificacion = '5';
        return;
      }
      let cuenta = 0;
      let suma = 0;
      r.json().forEach(element => {
        suma += element.Cuenta;
        cuenta++;
      });
      this.calificacion = (suma/cuenta).toFixed(1);
    }, error => {

    });
  }
}
