import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-poll-view',
  templateUrl: 'poll-view.component.html',
  styleUrls: ['poll-view.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class PollViewComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }


}
