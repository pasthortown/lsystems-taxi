import { LoginPage } from './../login/login';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Persona } from './../../app/entidades/CRUD/Persona';
import { Cuenta } from './../../app/entidades/CRUD/Cuenta';
import { ToastController } from 'ionic-angular';
import { environment } from './../../../environments/environment';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit{
  webServiceURL = environment.apiUrl;
  persona: Persona;
  cuenta: Cuenta;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, public http: Http) {
  }

  ngOnInit() {
    this.persona = new Persona();
    this.cuenta = new Cuenta();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registrar(){
    if(this.persona.identificacion == '' || this.persona.identificacion == null ||
       this.persona.nombres == '' || this.persona.nombres == null ||
       this.persona.apellidos == '' || this.persona.apellidos == null ||
       this.persona.correoElectronico == '' || this.persona.correoElectronico == null ||
       this.cuenta.clave == '' || this.cuenta.clave == null){
        this.showToast('Todos los campos son obligatorios.');
        return;
    }
    this.http.post(this.webServiceURL + '/persona/crear',JSON.stringify(this.persona))
    .subscribe(r1 => {
      if(r1.json()){
        this.http.get(this.webServiceURL + '/persona/leer_filtrado?columna=identificacion&tipo_filtro=coincide&filtro='+this.persona.identificacion)
        .subscribe(r2 => {
          this.cuenta.idEstadoCuenta=1;
          this.cuenta.idRol=3;
          this.cuenta.idPersona = r2.json()[0].id;
          this.http.post(this.webServiceURL + '/cuenta/crear',JSON.stringify(this.cuenta))
          .subscribe(r3 => {
            if(r3.json()){
              this.showToast('Registro Completo, en breve la activaremos y podrás comenzar');
              this.navCtrl.push(LoginPage);
            }else {
              this.showToast('Ocurrió un error al registrar');
            }
          }, error => {
            this.showToast('Ocurrió un error al registrar');
          });
        }, error => {
          this.showToast('Ocurrió un error al registrar');
        });
      }else{
        this.showToast('Ocurrió un error al registrar');
      }
    }, error => {
      this.showToast('Ocurrió un error al registrar');
    });
  }

  showToast(mensaje: string):void {
    let toast = this.toastCtrl.create({
      message: mensaje,
      position: 'middle',
      duration: 3000
    });
    toast.present();
  }
}
