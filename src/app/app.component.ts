import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MdButton } from '@angular2-material/button';
import { MdCard, MdCardHeader, MdCardTitleGroup, MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdToolbar } from '@angular2-material/toolbar';
import { FirebaseDataService }from './firebase-data.service';
import { AngularFire }from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    ROUTER_DIRECTIVES, 
    MdIcon,
    MdButton, MdToolbar,
    MdCard, MdCardTitleGroup, MdCardHeader, MD_CARD_DIRECTIVES],
  providers: [MdIconRegistry]
})
export class AppComponent {
  title = 'DropPoll';
  sub_title = "A stylable, real-time poll"

  constructor(private router: Router, private fbds: FirebaseDataService, private af: AngularFire) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
