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
      image: "assets/imgs/ready_to_go.png",
    },
    {
      title: "Recibiendo un pasajero",
      description: "Cuando se te ha asignado atender un viaje recibirás una notificación en la pantalla principal con los datos de contacto y la ruta de tu pasajero.",
      image: "assets/imgs/Passenger_assigned.png",
    },
    {
      title: "Contacta con tu pasajero",
      description: "Si necesitas comunicarte con el cliente, podrás hacer uso de las opciones del viaje para contactarlo.",
      image: "assets/imgs/User_contact.png",
    },
    {
      title: "Dirígete a tu destino",
      description: "Cuando llegues donde tu cliente, confirma que ha subido a la unidad y automáticamente pasaras a modo “En camino a destino solicitado”.",
      image: "assets/imgs/Passenger_aborded.png",
    },
    {
      title: "Termina tu viaje",
      description: "Una vez alcanzado el punto de destino, utiliza las opciones de viaje para registrar el valor cobrado y finalizar el viaje. Ahora estarás listo para tu próximo viaje.",
      image: "assets/imgs/Mission_completed.png",
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');
  }

}
