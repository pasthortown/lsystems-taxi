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
      title: "Solicita un Taxi!",
      description: "Toca el mapa en el lugar hacia donde deseas ir, o haciendo usa de las opciones de viaje, podrás buscarlo por nombre o dirección",
      image: "assets/imgs/search_destination.png",
    },
    {
      title: "Confirma tu destino",
      description: "En las opciones de viaje, selecciona la opción de solicitud de servicio. En instantes te informaremos los datos del conductor y la unidad que atenderá tu requerimiento.",
      image: "assets/imgs/travel_confirmed.png",
    },
    {
      title: "Ruta a tu destino",
      description: "Se mostrará la ruta más eficiente hacia tu destino, y la ubicación a tiempo real de la unidad que va en camino a tu encuentro.",
      image: "assets/imgs/route_shown.png",
    },
    {
      title: "Contacta con tu conductor",
      description: "Utiliza las opciones de información para revisar los datos del conductor y la unidad que acudirá a tu posición y atenderá tu requerimiento.",
      image: "assets/imgs/driver_contact.png",
    },
    {
      title: "Termina tu viaje",
      description: "Al finalizar -si lo deseas-, encontrarás la opción de calificación de servicio recibido.",
      image: "assets/imgs/Rate_us.png",
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');
  }

}
