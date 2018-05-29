import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';


/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {
  testRadioOpen: boolean;
  testRadioResult;

  constructor(public alerCtrl: AlertController) {
  }

  aceptarViaje(){
    return 'ok';
  }

  doRadio() {
    let alert = this.alerCtrl.create();
    alert.setTitle('Selecciona una razón del rechazo');

    alert.addInput({
      type: 'radio',
      label: 'Blue',
      value: 'blue',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Green',
      value: 'green'
    });

    alert.addInput({
      type: 'radio',
      label: 'Red',
      value: 'red'
    });

    alert.addInput({
      type: 'radio',
      label: 'Yellow',
      value: 'yellow'
    });

    alert.addInput({
      type: 'radio',
      label: 'Purple',
      value: 'purple'
    });

    alert.addInput({
      type: 'radio',
      label: 'White',
      value: 'white'
    });

    alert.addInput({
      type: 'radio',
      label: 'Black',
      value: 'black'
    });

    alert.addButton({
      text: 'Ok',
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
        return data;
      }
    });

    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }

}
