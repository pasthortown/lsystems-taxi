import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailRatingsPage } from './detail-ratings';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    DetailRatingsPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailRatingsPage),
    Ionic2RatingModule
  ],
})
export class DetailRatingsPageModule {}
