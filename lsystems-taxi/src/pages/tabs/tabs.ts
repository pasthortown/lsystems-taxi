import { Persona } from './../../app/entidades/CRUD/Persona';
import { ToastController } from 'ionic-angular';

import { Component, OnInit } from '@angular/core';

import { HomePage } from '../home/home';
import { RatingsPage } from './../ratings/ratings';
import { EarningsPage } from './../earnings/earnings';
import { AccountPage } from '../account/account';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit{
  tab4Root = AccountPage;
  tab1Root = HomePage;
  tab2Root = EarningsPage;
  tab3Root = RatingsPage;


  constructor(public toastCtrl: ToastController) {

  }

  ngOnInit() {
    let personaLogeada = JSON.parse(sessionStorage.getItem('logedResult')) as Persona;
    this.showToast('Saludos, ' + personaLogeada.nombres + ' ' + personaLogeada.apellidos,3000)
    this.refresh();
  }

  refresh() {

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
