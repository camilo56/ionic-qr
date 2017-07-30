import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-mapas',
  templateUrl: 'mapas.html',
})

export class MapasPage {
  
  lat: number;
  lng: number;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    let coordsArray = this.navParams.get('coords').split(',');
    this.lat = Number(coordsArray[0].replace('geo:', ''));
    this.lng = Number(coordsArray[1]);
  }

  ionViewDidLoad() {
    /* console.log('ionViewDidLoad MapasPage'); */
  }

  close(){
    this.viewCtrl.dismiss();
  }
}
