import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcceptanceRatePage } from './acceptance-rate';

@NgModule({
  declarations: [
    AcceptanceRatePage,
  ],
  imports: [
    IonicPageModule.forChild(AcceptanceRatePage),
  ],
})
export class AcceptanceRatePageModule {}
