import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EvaluatePage } from './evaluate';

import { Ionic2RatingModule } from "ionic2-rating";

@NgModule({
  declarations: [
    EvaluatePage,
  ],
  imports: [
    IonicPageModule.forChild(EvaluatePage),
    Ionic2RatingModule
  ],
})
export class EvaluatePageModule {}
