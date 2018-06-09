import { TutorialPage } from './../pages/tutorial/tutorial';
import { AccountPage } from './../pages/account/account';
import { EarningsPage } from './../pages/earnings/earnings';
import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Ionic2RatingModule } from 'ionic2-rating';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { CallNumber } from '@ionic-native/call-number';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    EarningsPage,
    AccountPage,
    TutorialPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    EarningsPage,
    AccountPage,
    TutorialPage
  ],
  providers: [
    StatusBar,
    Camera,
    SplashScreen,
    CallNumber,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
