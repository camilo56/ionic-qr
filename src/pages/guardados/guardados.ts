import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HistoryProvider } from './../../providers/history/history';
import { ScanData } from "../models/scanData.model";

@Component({
  selector: 'page-guardados',
  templateUrl: 'guardados.html',
})
export class GuardadosPage {

  history: any[] = [] ;

  constructor(private historyProvider: HistoryProvider) {
  }

  ionViewDidLoad() {
    this.history = this.historyProvider.load;
  }

  open(index: number){
    this.historyProvider.open(index);
  }
}
