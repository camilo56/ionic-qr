import { Component } from '@angular/core';
import { ToastController, Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HistoryProvider } from './../../providers/history/history';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private barcodeScanner: BarcodeScanner,
              private platform: Platform,
              private historyProvider: HistoryProvider,
              public toastCtrl: ToastController) {
  }

  scan(){

    if(!this.platform.is('cordova')){
         this.historyProvider.add('MATMSG:TO:camilo@gmail.com;SUB:Hola app;BODY:Hola des la app de camilo;;');   
       /* this.historyProvider.add('MATMSG:TO:camilo@gmail.com;SUB:;BODY:Hola des la app de camilo dsd fdsf sdf sdf dfxczxcz xc;;');  */
/*       this.historyProvider.add(`BEGIN:VCARD
VERSION:2.1
N:colorado;camilo
FN:camilo colorado
ORG:
TEL;HOME;VOICE:5832008
TEL;TYPE=cell:3153668116
ADR;TYPE=work:;;;
EMAIL:camilocolmenares7@hotmail.com
END:VCARD`); */
      /* this.historyProvider.add('geo:6.266670499244969,-75.59512942509764'); */
      /* this.historyProvider.add('http://ionicframework.com/docs/api/components/toast/ToastController/'); */
      return;
    }

    this.barcodeScanner.scan().then((barcodeData) => {
      console.log('info scan-.......---------')
      console.log(barcodeData.text)
      if(barcodeData.cancelled === false){
        this.historyProvider.add(barcodeData.text);
      }
    }, (err) => {
      this.ShowToast(`ERROR realizando scan ${err}`, 'bottom');
    });

  }

  ShowToast(info: string, position: string){
    let toast = this.toastCtrl.create({
      message: info,
      duration: 3000,
      position: position,
      showCloseButton: true,
      closeButtonText: 'Cerrar',
    });
    toast.present();
  }
}
