import { Unidad } from './../../app/entidades/CRUD/Unidad';
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
  unidad: Unidad;
  hoyFecha: string;
  totalHoy: number;
  webServiceURL = environment.apiUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

  }

  itemSelected(Item){}

  ionViewDidLoad() {

  }

  ngOnInit() {
    this.usuario = JSON.parse(sessionStorage.getItem('logedResult')) as Persona;
    this.unidad = JSON.parse(sessionStorage.getItem('unidad')) as Unidad;
    this.refresh();
  }

  refresh() {
    this.getTotal();
    this.getSemana();
    this.getHoy();
    this.hoyFecha = new Date().toDateString();
  }

  getTotal() {
    this.http.get(this.webServiceURL + 'viaje/leer_total_viajes_conductor?id='+this.usuario.id)
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
    this.http.get(this.webServiceURL + 'viaje/leer_viajes_ultimos_siete_dias_conductor?id='+this.usuario.id)
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
    this.http.get(this.webServiceURL + 'viaje/leer_viajes_hoy_conductor?id='+this.usuario.id)
    .subscribe(r => {
      if(JSON.stringify(r.json())=='[0]'){
        this.viajesHoy = [];
        return;
      }
      this.viajesHoy = r.json() as Viaje[];
      this.totalHoy = this.viajesHoy.length;
    }, error => {

    });
  }
}
