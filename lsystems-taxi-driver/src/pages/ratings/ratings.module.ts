import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RatingsPage } from './ratings';
import { Ionic2RatingModule } from "ionic2-rating";




@NgModule({
  declarations: [
    RatingsPage,
  ],
  imports: [
    IonicPageModule.forChild(RatingsPage),
    Ionic2RatingModule,
  ],
})
export class RatingsPageModule {}
