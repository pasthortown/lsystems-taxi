import { environment } from './../../../environments/environment';
import { Cuenta } from './../../app/entidades/CRUD/Cuenta';
import { FotografiaPersona } from './../../app/entidades/CRUD/FotografiaPersona';
import { Persona } from './../../app/entidades/CRUD/Persona';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage implements OnInit {
  @ViewChild('fileInput') fileInput;
  usuario: Persona;
  fotografia = null;
  fotoPersona: FotografiaPersona;
  cuenta: Cuenta;
  cambiandoClave: Boolean;
  validarClave: Boolean;
  confirmarNuevaClave: string;
  claveNueva: string;
  webServiceURL = environment.apiUrl;
  verificando: boolean;

  constructor( public toastCtrl: ToastController, public navCtrl: NavController, public camera: Camera, public navParams: NavParams, public http: Http) {
  }

  ngOnInit() {
    this.verificando = false;
    this.refresh();
  }

  refresh() {
    this.usuario = JSON.parse(sessionStorage.getItem('logedResult')) as Persona;
    this.fotoPersona = new FotografiaPersona();
    this.fotoPersona.id = 0;
    this.getFotografia();
    this.cambiandoClave = false;
  }

  ionViewDidLoad() {

  }

  subirPicture(){
    this.fileInput.nativeElement.click();
  }

  getPicture():void {
    if (Camera['installed']()) {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        allowEdit: true
      }
      this.camera.getPicture(options).then((imageData) => {
        this.fotoPersona.nombreArchivo = 'foto_desde_camara.jpg';
        this.fotoPersona.tipoArchivo = 'image/jpeg';
        this.fotoPersona.adjunto = imageData;
        this.fotografia = 'data:' + this.fotoPersona.tipoArchivo + ';base64,' + this.fotoPersona.adjunto;
       }, (err) => {
         this.fotografia = null;
      });
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  subirImagen(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fotoPersona.nombreArchivo = file.name;
        this.fotoPersona.tipoArchivo = file.type;
        this.fotoPersona.adjunto = reader.result.split(',')[1];
        this.fotografia = 'data:' + this.fotoPersona.tipoArchivo + ';base64,' + this.fotoPersona.adjunto;
      };
    }
  }

  getFotografia() {
    this.http.get(this.webServiceURL + '/fotografiapersona/leer_filtrado?columna=idPersona&tipo_filtro=coincide&filtro='+this.usuario.id.toString())
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

  actualizar() {
    this.verificando = true;
    this.http.post(this.webServiceURL + '/persona/actualizar',JSON.stringify(this.usuario))
    .subscribe(respuesta => {
      if(this.fotoPersona.id == 0){
        this.fotoPersona.idPersona = this.usuario.id;
        this.http.post(this.webServiceURL + '/fotografiapersona/crear',JSON.stringify(this.fotoPersona))
        .subscribe(respuesta => {
          this.verificando = false;
          this.showToast('Cambios Guardados', 3000);
        }, error => {

        });
      }else {
        this.http.post(this.webServiceURL + '/fotografiapersona/actualizar',JSON.stringify(this.fotoPersona))
        .subscribe(respuesta => {
          this.verificando = false;
          this.showToast('Cambios Guardados', 3000);
        }, error => {

        });
      }
    }, error => {
      this.verificando = false;
      this.showToast('Ocurrió un error', 3000);
    });
  }

  actualizarCuenta() {
    this.verificando = true;
    this.http.get(this.webServiceURL + '/cuenta/leer_filtrado?columna=idPersona&tipo_filtro=coincide&filtro='+this.usuario.id.toString())
    .subscribe(respuesta => {
      this.cuenta = respuesta.json()[0] as Cuenta;
      this.cuenta.clave = this.claveNueva;
      this.http.post(this.webServiceURL + '/cuenta/actualizar',JSON.stringify(this.cuenta))
      .subscribe(respuesta => {
        if(respuesta.json()){
          this.showToast('Contraseña Actualizada', 3000);
          this.verificando = false;
        }else{
          this.verificando = false;
          this.showToast('Ocurrió un error', 3000);
        }
      }, error => {
        this.verificando = false;
        this.showToast('Ocurrió un error', 3000);
      });
    }, error => {
      this.verificando = false;
      this.showToast('Ocurrió un error', 3000);
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

  validarClaveEvent():void {
    if(this.claveNueva == null || this.claveNueva == ''){
        this.cambiandoClave = false;
    }else {
        this.cambiandoClave = true;
        if(this.claveNueva == null || this.claveNueva == '' || this.confirmarNuevaClave == null || this.confirmarNuevaClave == '' || this.confirmarNuevaClave != this.claveNueva){
            this.validarClave = false;
        }else {
            this.validarClave = true;
        }
    }
  }
}
