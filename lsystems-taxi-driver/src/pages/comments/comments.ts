import { environment } from './../../../environments/environment';
import { Persona } from './../../app/entidades/CRUD/Persona';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Expresion } from '../../app/entidades/CRUD/Expresion';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage implements OnInit {
  comments: Expresion[];
  usuario: Persona;
  total: number;
  webServiceURL = environment.apiUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController, public http: Http) {
  }

  ngOnInit() {
    this.usuario = JSON.parse(sessionStorage.getItem('logedResult')) as Persona;
    this.total = 0;
    this.refresh();
  }

  refresh() {
    this.getComentarios();
  }

  getComentarios() {
    this.comments = [];
    this.http.get(this.webServiceURL + 'expresion/getComentariosSieteDias?id='+this.usuario.id)
    .subscribe(respuesta => {
      if(JSON.stringify(respuesta.json())=='[0]'){
        return;
      }
      this.comments = respuesta.json();
      this.total = this.comments.length;
    }, error => {

    });
  }

  closeModal(){
    this.view.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
  }

}
