import { UnidadPage } from './../unidad/unidad';
import { environment } from './../../../environments/environment';
import { RegisterPage } from './../register/register';
import { LoginRequest } from './../../app/entidades/especifico/Login-Request';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit{
  webServiceURL = environment.apiUrl + 'login';
  loginRequest: LoginRequest;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, public http: Http) {
  }

  ngOnInit() {
    this.loginRequest = new LoginRequest();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ingresar() {
    this.showToast('Verificando, por favor espere...', 3000);
    this.http.post(this.webServiceURL + '/cuenta',JSON.stringify(this.loginRequest))
    .subscribe(respuesta => {
      if (respuesta.json().idRol == 0) {
        this.showToast('Credenciales Incorrectos', 3000);
        sessionStorage.removeItem('isLoggedin');
        sessionStorage.removeItem('logedResult');
        return;
      }
      sessionStorage.setItem('logedResult', JSON.stringify(respuesta.json().Persona));
      sessionStorage.setItem('isLoggedin', 'true');
      this.navCtrl.push(UnidadPage);
    }, error => {
      sessionStorage.removeItem('isLoggedin');
      sessionStorage.removeItem('logedResult');
      this.showToast('Ocurrió un error al autenticar', 3000);
    });
  }

  passwordRecovery() {
    if(this.loginRequest.email == null || this.loginRequest.email == ''){
      this.showToast('Ingrese su correo electrónico', 3000);
      return;
    }
    this.showToast('Por favor espere...', 3000);
    let data = {email: this.loginRequest.email, accion: 'Recuperar Clave'};
    this.http.post(this.webServiceURL + '/passwordChange', JSON.stringify(data))
    .subscribe(respuesta => {
      this.showToast('La contraseña ha cambiado, revise su correo electrónico', 3000);
    }, error => {
      this.showToast('Ocurrió un error al recuperar la contraseña', 3000);
    });
  }

  showToast(mensaje: string, time: number):void {
    let toast = this.toastCtrl.create({
      message: mensaje,
      position: 'middle',
      duration: time
    });
    toast.present();
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }
}
