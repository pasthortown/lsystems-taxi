import { Persona } from './../../app/entidades/CRUD/Persona';
import { environment } from './../../../environments/environment';
import { MotivoCalificacionEstiloConduccion } from './../../app/entidades/CRUD/MotivoCalificacionEstiloConduccion';
import { MotivoCalificacionConductor } from './../../app/entidades/CRUD/MotivoCalificacionConductor';
import { MotivoCalificacionUnidad } from './../../app/entidades/CRUD/MotivoCalificacionUnidad';
import { Expresion } from './../../app/entidades/CRUD/Expresion';
import { Viaje } from './../../app/entidades/CRUD/Viaje';
import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { Adjunto } from '../../app/entidades/CRUD/Adjunto';

@IonicPage()
@Component({
  selector: 'page-evaluate',
  templateUrl: 'evaluate.html',
})
export class EvaluatePage implements OnInit {
  @ViewChild('fileInput') fileInput;
  viaje: Viaje;
  expresion: Expresion;
  motivosCalificacionUnidad: MotivoCalificacionUnidad[];
  motivosCalificacionConductor: MotivoCalificacionConductor[];
  motivosCalificacionEstiloConduccion: MotivoCalificacionEstiloConduccion[];
  adjunto: Adjunto;
  webServiceURL = environment.apiUrl;
  usuario: Persona;

  constructor(public toastCtrl: ToastController, public camera: Camera, public http: Http, public navCtrl: NavController, private params: NavParams, public view: ViewController, public navParams: NavParams) {
  }

  ngOnInit(){
    this.refresh();
  }

  refresh(){
    this.viaje = this.params.get('viaje') as Viaje;
    this.usuario = this.params.get('usuario') as Persona;
    this.expresion = new Expresion();
    this.expresion.idMotivoCalificacionConductor=0;
    this.expresion.idMotivoCalificacionUnidad=0;
    this.expresion.idMotivoCalificacionEstiloConduccion=0;
    this.expresion.idUsuario = this.usuario.id;
    this.adjunto = new Adjunto();
    this.expresion.idViaje = this.viaje.id;
  }

  getMotivos() {
    this.getMotivosCalificacionUnidad();
    this.getMotivosCalificacionConductor();
    this.getMotivosCalificacionEstiloConduccion();
  }

  getMotivosCalificacionUnidad() {
    this.http.get(this.webServiceURL + 'motivocalificacionunidad/leer')
    .subscribe(r => {
      if(JSON.stringify(r.json())=='[0]'){
        return;
      }
      this.motivosCalificacionUnidad = r.json() as MotivoCalificacionUnidad[];
    }, error => {

    });
  }


  getMotivosCalificacionConductor() {
    this.http.get(this.webServiceURL + 'motivocalificacionconductor/leer')
    .subscribe(r => {
      if(JSON.stringify(r.json())=='[0]'){
        return;
      }
      this.motivosCalificacionConductor = r.json() as MotivoCalificacionConductor[];
    }, error => {

    });
  }


  getMotivosCalificacionEstiloConduccion() {
    this.http.get(this.webServiceURL + 'motivocalificacionestiloconduccion/leer')
    .subscribe(r => {
      if(JSON.stringify(r.json())=='[0]'){
        return;
      }
      this.motivosCalificacionEstiloConduccion = r.json() as MotivoCalificacionEstiloConduccion[];
    }, error => {

    });
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
        this.adjunto.nombreArchivo = 'foto_desde_camara_viaje_' + this.viaje.id + '.jpg';
        this.adjunto.tipoArchivo = 'image/jpeg';
        this.adjunto.adjunto = imageData;
       }, (err) => {
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
        this.adjunto.nombreArchivo = 'adjunto_viaje_' + this.viaje.id + '.jpg';
        this.adjunto.tipoArchivo = file.type;
        this.adjunto.adjunto = reader.result.split(',')[1];
      };
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EvaluatePage');
  }

  closeModal(){
    this.view.dismiss();
  }

  showToast(mensaje: string, time: number):void {
    let toast = this.toastCtrl.create({
      message: mensaje,
      position: 'middle',
      duration: time
    });
    toast.present();
  }

  enviar(){
    if(this.adjunto.nombreArchivo!=null || this.adjunto.nombreArchivo!=''){
      this.http.post(this.webServiceURL + 'adjunto/crear',JSON.stringify(this.adjunto))
      .subscribe(respuesta => {
        if(respuesta){
          let data = {columna: 'nombreArchivo', tipo_filtro: 'coincide', filtro: this.adjunto.nombreArchivo};
          this.http.post(this.webServiceURL + 'adjunto/leer_filtrado',JSON.stringify(data))
          .subscribe(respuesta => {
            this.adjunto = respuesta.json()[0] as Adjunto;
            this.expresion.idAdjunto = this.adjunto.id;
            this.http.post(this.webServiceURL + 'expresion/crear',JSON.stringify(this.expresion))
            .subscribe(respuesta => {
              this.showToast('Gracias por tu evaluación.', 3000);
              this.closeModal();
            }, error => {

            });
          }, error => {

          });
        }else{
          this.showToast('Ocurrió un error al guardar los datos.', 3000);
        }
      }, error => {

      });
    }else{
      this.http.post(this.webServiceURL + '/expresion/crear',JSON.stringify(this.expresion))
      .subscribe(respuesta => {
        this.showToast('Gracias por tu evaluación.', 3000);
        this.closeModal();
      }, error => {

      });
    }

  }
}
