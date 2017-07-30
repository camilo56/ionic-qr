import { Text } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular'; 
import { ToastController, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { EmailComposer } from '@ionic-native/email-composer';

import { MapasPage } from './../../pages/index.pages';

import { ScanData } from "../../pages/models/scanData.model";

@Injectable()
export class HistoryProvider {

  private history: ScanData[] = [];
  
  constructor(private iab: InAppBrowser,
              private platform: Platform,
              private contacts: Contacts,
              public toastCtrl: ToastController,
              private emailComposer: EmailComposer,
              private modalController: ModalController) {}

  get load(){
    return this.history;
  }

  add(text: string){
    let data = new ScanData( text );
    this.history.unshift(data);
    this.open(0);
  }

  open(index: number){
    let item = this.history[index];
    switch(item.tipo){
      case 'http': 
        this.iab.create(item.info, '_system');
      break; 
      case 'mapa': 
      this.modalController.create(MapasPage, {'coords': item.info})
                          .present();
      break;
      case 'contact': 
      this.createContact(item.info);
      break;
      case 'email': 
      this.createEmail(item.info);
      break;
      default:
        this.ShowToast('tipo no soportado'); 
      break;
    }
  }

  private createEmail(text: string){
    console.log(text.split(';'))
    let data = text.split(';');
    let email = data[0].replace('MATMSG:TO:', '');
    let sub = data[1].replace('SUB:', '');
    let body = data[2].replace('BODY:', '');
    let info = {
      to: email,
      subject: sub,
      body: body,
      isHtml: true
    };
    console.log(info);
    this.emailComposer.isAvailable().then(
      (available: boolean) =>{
/*         console.log('antes available: '+available);
        if(available) { */
          this.emailComposer.open(info);
          this.ShowToast('Email Enviado');
          console.log('Email Enviado');
/*         }  */
      },
      () => this.ShowToast('No se puede enviar el email')
    );

  }
  private createContact(text: string){
    let data: any = this.parse_vcard(text);

    if(!this.platform.is('cordova')){
      console.log('estoy en pc')
      return;
    }

    let contact: Contact = this.contacts.create();
    contact.name = new ContactName(null, data.fn);
    contact.phoneNumbers = [new ContactField('mobile', data.tel[1].value[0])];
    contact.save().then(
      () => this.ShowToast(`Contacto guardado`),
      (error: any) => this.ShowToast(`Error saving contact. ${error}`)
    );

  }

  private parse_vcard( input:string ) {

    var Re1 = /^(version|fn|title|org):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var ReKey = /item\d{1,2}\./;
    var fields = {};

    input.split(/\r\n|\r|\n/).forEach(function (line) {
        var results, key;

        if (Re1.test(line)) {
            results = line.match(Re1);
            key = results[1].toLowerCase();
            fields[key] = results[2];
        } else if (Re2.test(line)) {
            results = line.match(Re2);
            key = results[1].replace(ReKey, '').toLowerCase();

            var meta = {};
            results[2].split(';')
                .map(function (p, i) {
                var match = p.match(/([a-z]+)=(.*)/i);
                if (match) {
                    return [match[1], match[2]];
                } else {
                    return ["TYPE" + (i === 0 ? "" : i), p];
                }
            })
                .forEach(function (p) {
                meta[p[0]] = p[1];
            });

            if (!fields[key]) fields[key] = [];

            fields[key].push({
                meta: meta,
                value: results[3].split(';')
            })
        }
    });

    return fields;
  }

  ShowToast(info: string, position: string = 'top'){
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
