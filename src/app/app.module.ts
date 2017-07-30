import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { AgmCoreModule } from '@agm/core';
import { Contacts } from '@ionic-native/contacts';
import { EmailComposer } from '@ionic-native/email-composer';

import { MyApp } from './app.component';
import { HomePage, GuardadosPage, MapasPage, 
          TapsPage } from '../pages/index.pages';
import { HistoryProvider } from '../providers/history/history';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GuardadosPage,
    MapasPage,
    TapsPage
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBK0Bx5qZ2wwYIlo3fRjEz8QflPz-x2hvM'
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GuardadosPage,
    MapasPage,
    TapsPage
  ],
  providers: [
    Contacts,
    StatusBar,
    InAppBrowser,
    SplashScreen,
    EmailComposer,
    BarcodeScanner,
    HistoryProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
