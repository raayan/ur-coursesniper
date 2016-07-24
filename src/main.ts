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
    apiKey: "AIzaSyB8UKkBLQUxJCZOn4Y9K4GbkSir97ftfnY",
    authDomain: "droppoll-6e9ae.firebaseapp.com",
    databaseURL: "https://droppoll-6e9ae.firebaseio.com",
    storageBucket: "droppoll-6e9ae.appspot.com",
  }),
  // firebaseAuthConfig({
  //   provider: AuthProviders.Anonymous,
  //   method: AuthMethods.Anonymous
  // })
]);
