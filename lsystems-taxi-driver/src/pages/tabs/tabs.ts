
import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { RatingsPage } from './../ratings/ratings';
import { EarningsPage } from './../earnings/earnings';
import { AccountPage } from '../account/account';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
tab4Root = AccountPage;
  tab1Root = HomePage;
  tab2Root = EarningsPage;
  tab3Root = RatingsPage;


  constructor() {

  }
}
