import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppComponent, environment } from './app/';

import { APP_ROUTER_PROVIDERS } from './app/app.routes';

import { HTTP_PROVIDERS } from '@angular/http';

import { FIREBASE_PROVIDERS, defaultFirebase, 
  // AuthMethods, 
  // AuthProviders, 
  // firebaseAuthConfig
} from 'angularfire2';

import { FirebaseDataService } from './app/firebase-data.service';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  FirebaseDataService,
  HTTP_PROVIDERS,
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: "AIzaSyDJplHLR1-jfcBB7_KyvgJ8MXawdG1Kl9E",
    authDomain: "ur-coursesniper-e2a0d.firebaseapp.com",
    databaseURL: "https://ur-coursesniper-e2a0d.firebaseio.com",
    storageBucket: "",
  }),
  // firebaseAuthConfig({
  //   provider: AuthProviders.Anonymous,
  //   method: AuthMethods.Anonymous
  // })
]);
