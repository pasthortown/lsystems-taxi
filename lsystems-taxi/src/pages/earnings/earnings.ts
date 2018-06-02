import { Persona } from './../../app/entidades/CRUD/Persona';
import { environment } from './../../../environments/environment';
import { Viaje } from './../../app/entidades/CRUD/Viaje';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-earnings',
  templateUrl: 'earnings.html',
})
export class EarningsPage implements OnInit{
  viajesHoy: Viaje[];
  semana: number;
  total: number;
  usuario: Persona;
  hoyFecha: string;
  totalHoy: number;
  webServiceURL = environment.apiUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

  }

  ionViewWillEnter() {
    this.refresh();
  }

  itemSelected(Item){}

  ionViewDidLoad() {

  }

  ngOnInit() {
    this.usuario = JSON.parse(sessionStorage.getItem('logedResult')) as Persona;
    this.refresh();
  }

  refresh() {
    this.getTotal();
    this.getSemana();
    this.getHoy();
    this.hoyFecha = new Date().toDateString();
  }

  getTotal() {
    this.http.get(this.webServiceURL + 'viaje/leer_total_viajes_cliente?id='+this.usuario.id)
    .subscribe(r => {
      if(JSON.stringify(r.json())=='[0]'){
        this.total = 0;
        return;
      }
      this.total = r.json()[0].cuenta;
    }, error => {

    });
  }

  getSemana() {
    this.http.get(this.webServiceURL + 'viaje/leer_viajes_ultimos_siete_dias_cliente?id='+this.usuario.id)
    .subscribe(r => {
      if(JSON.stringify(r.json())=='[0]'){
        this.semana = 0;
        return;
      }
      this.semana = r.json()[0].cuenta;
    }, error => {

    });
  }

  getHoy() {
    const hoy = new Date();
    let ahoraFecha = hoy.getFullYear() + '-' + (hoy.getMonth()+1).toString() + '-' + hoy.getDate().toString();
    this.http.get(this.webServiceURL + 'viaje/leer_viajes_hoy_cliente?id='+this.usuario.id+'&hoy='+ahoraFecha)
    .subscribe(r => {
      if(JSON.stringify(r.json())=='[0]'){
        this.viajesHoy = [];
        this.totalHoy = 0;
        return;
      }
      this.viajesHoy = r.json() as Viaje[];
      this.totalHoy = this.viajesHoy.length;
    }, error => {

    });
  }
}
