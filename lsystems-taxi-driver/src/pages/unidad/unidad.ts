
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

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, public toastCtrl: ToastController, public navParams: NavParams, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnidadPage');
  }

  ngOnInit() {
    this.registroMunicipal = '';
    this.refresh();
  }

  refresh() {
  }

  escanear() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.registroMunicipal = barcodeData.text;
    }, (err) => {
      this.showToast('Ocurrió un error. Por favor, vuelva a intentarlo', 3000);
    });
  }

  confirmar() {
    this.showToast('Verificando, por favor espere...', 3000);
    this.http.get(this.webServiceURL + '/leer_filtrado?columna=registroMunicipal&tipo_filtro=coincide&filtro='+this.registroMunicipal)
    .subscribe(respuesta => {
      if(JSON.stringify(respuesta.json())=='[0]'){
        sessionStorage.removeItem('isLoggedin');
        sessionStorage.removeItem('logedResult');
        sessionStorage.removeItem('unidad');
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
