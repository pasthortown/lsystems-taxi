
import { TabsPage } from './../tabs/tabs';
import { LoginPage } from './../login/login';
import { environment } from './../../../environments/environment';
import { Unidad } from './../../app/entidades/CRUD/Unidad';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-unidad',
  templateUrl: 'unidad.html',
})
export class UnidadPage implements OnInit {
  webServiceURL = environment.apiUrl + 'unidad';
  registroMunicipal: string;
  verificando: boolean;

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, public toastCtrl: ToastController, public navParams: NavParams, public http: Http) {
  }

  ionViewDidLoad() {

  }

  ngOnInit() {
    this.registroMunicipal = '';
    this.verificando = false;
    this.refresh();
  }

  refresh() {
  }

  escanear() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.registroMunicipal = barcodeData.text;
     }).catch(err => {
         console.log(err);
     });
  }

  confirmar() {
    this.verificando = true;
    this.http.get(this.webServiceURL + '/leer_filtrado?columna=registroMunicipal&tipo_filtro=coincide&filtro='+this.registroMunicipal)
    .subscribe(respuesta => {
      if(JSON.stringify(respuesta.json())=='[0]'){
        sessionStorage.removeItem('isLoggedin');
        sessionStorage.removeItem('logedResult');
        sessionStorage.removeItem('unidad');
        this.verificando = false;
        this.navCtrl.push(LoginPage);
        return;
      }
      let unidad = respuesta.json()[0] as Unidad;
      sessionStorage.setItem('unidad', JSON.stringify(unidad));
      this.navCtrl.push(TabsPage);
    }, error => {
      sessionStorage.removeItem('isLoggedin');
      sessionStorage.removeItem('logedResult');
      sessionStorage.removeItem('unidad');
      this.verificando = false;
      this.showToast('Ocurrió un error al buscar la unidad', 3000);
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
}
