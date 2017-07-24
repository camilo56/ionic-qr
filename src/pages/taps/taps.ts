import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage, GuardadosPage } from './../index.pages';

@Component({
  selector: 'page-taps',
  templateUrl: 'taps.html',
})
export class TapsPage {

  tab1: any = HomePage;
  tab2: any = GuardadosPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
