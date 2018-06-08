import { FotografiaPersona } from './../../app/entidades/CRUD/FotografiaPersona';
import { Unidad } from './../../app/entidades/CRUD/Unidad';
import { Persona } from './../../app/entidades/CRUD/Persona';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import { CallNumber } from '@ionic-native/call-number';

@IonicPage()
@Component({
  selector: 'page-ratings',
  templateUrl: 'ratings.html',
})
export class RatingsPage implements OnInit{
  calificacion: string;
  usuario: Persona;
  unidad: Unidad;
  conductor: Persona;
  fotografia = null;
  fotoPersona: FotografiaPersona;

  webServiceURL = environment.apiUrl;

  constructor(private callNumber: CallNumber, private params: NavParams, public navCtrl: NavController, public view: ViewController, public navParams: NavParams, private modal: ModalController, public http: Http) {
    this.getInfo();
  }

  getInfo(){
    this.unidad = this.params.get('unidad') as Unidad;
    this.conductor = this.params.get('conductor') as Persona;
    console.log(this.unidad);
    console.log(this.conductor);
    if(this.conductor==null || this.unidad==null){
      this.closeModal();
      return;
    }
    this.getConductorInfo();
    this.getUnidadInfo();
  }
  openModal(modalName){
    const myModal = this.modal.create(modalName);
    myModal.present();
  }

  ionViewWillEnter() {
    this.refresh();
  }

  ngOnInit() {
    this.usuario = JSON.parse(sessionStorage.getItem('logedResult')) as Persona;
    this.conductor = new Persona();
    this.unidad = new Unidad();
    this.refresh();
  }

  refresh() {

  }

  closeModal(){
    this.view.dismiss();
  }

  getConductorInfo() {
    this.http.get(this.webServiceURL + 'persona/leer?id='+this.conductor.id)
    .subscribe(r => {
      if(JSON.stringify(r.json())=='[0]'){
        return;
      }
      this.conductor = r.json()[0] as Persona;
      this.getRating();
      this.getFotografia();
    }, error => {

    });
  }

  getFotografia() {
    this.http.get(this.webServiceURL + '/fotografiapersona/leer_filtrado?columna=idPersona&tipo_filtro=coincide&filtro='+this.conductor.id.toString())
    .subscribe(respuesta => {
      if(JSON.stringify(respuesta.json())=='[0]'){
        this.fotografia = 'assets/imgs/user.png';
        return;
      }
      this.fotoPersona = respuesta.json()[0] as FotografiaPersona;
      this.fotografia = 'data:' + this.fotoPersona.tipoArchivo + ';base64,' + this.fotoPersona.adjunto;
    }, error => {

    });
  }

  getUnidadInfo() {
    this.http.get(this.webServiceURL + 'unidad/leer?id='+this.unidad.id)
    .subscribe(r => {
      if(JSON.stringify(r.json())=='[0]'){
        return;
      }
      this.unidad = r.json()[0] as Unidad;
    }, error => {

    });
  }

  getRating() {
    this.http.get(this.webServiceURL + 'expresion/leer_estrellas_conductor?id='+this.conductor.id)
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

  llamar(telefono: string){
    this.callNumber.callNumber(telefono, true)
  }
}
