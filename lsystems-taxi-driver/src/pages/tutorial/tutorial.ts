import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {

  slides = [
    {
      title: "Inicia el día!",
      description: "En la pantalla principal activa el modo disponible y el sistema te asignará un pasajero que requiera tus servicios. Puedes pasar a modo no disponible si requieres un descanso",
      image: "assets/img/ica-slidebox-img-1.png",
    },
    {
      title: "Recibiendo un pasajero",
      description: "Cuando se te ha asignado atender un viaje recibirás una notificación en la pantalla principal con los datos de contacto y la ruta de tu pasajero.",
      image: "assets/img/ica-slidebox-img-2.png",
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "assets/img/ica-slidebox-img-3.png",
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');
  }

}
