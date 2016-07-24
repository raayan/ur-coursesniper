import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdCard, MdCardTitleGroup, MdCardHeader, MD_CARD_DIRECTIVES} from '@angular2-material/card';
import { MdButton, MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import { MdInput,MdPlaceholder,MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import { MdIcon, MD_ICON_DIRECTIVES} from '@angular2-material/icon';
import { FirebaseDataService } from '../firebase-data.service';
import { FirebaseListObservable } from 'angularfire2';
import {} from '@angular2-material/';

@Component({
  moduleId: module.id,
  selector: 'app-landing-page',
  templateUrl: 'landing-page.component.html',
  styleUrls: ['landing-page.component.css'],
  directives: [
    MdCard, MdCardHeader, MdCardTitleGroup, MD_CARD_DIRECTIVES,
    MdButton, MD_BUTTON_DIRECTIVES,
    MdInput,MdPlaceholder,MD_INPUT_DIRECTIVES,
    ]
})
export class LandingPageComponent implements OnInit {
  poll: any;
  options: any[];
  polls: FirebaseListObservable<any[]>;
  totals: number[];
  error: any;
  constructor(private fbds: FirebaseDataService, private router: Router) {}

  ngOnInit() {
    this.error = {title: false, author: false, options: false};
    this.initPoll();
    this.polls.forEach((obj: any) => {
      var count = 0;
      this.totals = []
      for (let ob of obj) {
        ob.total = 0
        for (let opt of ob.options) {
          ob.total += opt.score;
        }
        this.totals[count] = ob.total;
        count += 1;
      }
    });
  }
  initPoll() {
    this.poll = {
      name: "",
      author: "",
      total: 0,
      options: [{value: "", score: 0}]
    };
    this.polls = this.fbds.getPolls();
  }
  checkPoll() {
    var tmp_options = []
    for (let e of this.poll.options) {
      if (e.value === "") {

      } else {
        tmp_options.push(e);
      }
    }
    return tmp_options;
  }
  cleanPoll() {
    var tmp_options = []
    for (let e of this.poll.options) {
      if (e.value === "") {

      } else {
        tmp_options.push(e);
      }
    }
    this.poll.options = tmp_options;
  }
  beforeCheck(option: any) {

  }
  afterCheck(option: any) {
    var filled = true;
    for (let e of this.poll.options) {
      if (e.value === "") {
        filled = false;
      }
    }
    if (filled) {
      this.poll.options.push({value: "", score: 0});
    } else {

    }
  }
  isFirst(i: number) {
    if (i === 0 && this.poll.options.length === 1) {
      return true;
    }
    return false;
  }
  removeOption(option: any) {
    var newoptions = []
    for (let e of this.poll.options) {
      if (e === option) {

      }else{
        newoptions.push(e);
      }
    }
    this.poll.options = newoptions;
  }
  submitPoll() {
    var errored = false;

    if (this.poll.name === "") {
      console.log("Enter a title")
      this.error.title = true;
      errored = true;
    } 
    if (this.poll.author === "") {
      console.log("Enter a your name")
      this.error.author = true;
      errored = true;
    } 
    if (this.checkPoll().length === 0) {
      console.log("Enter some options")
      this.error.options = true;
      errored = true;
    } 

    if (!errored) {
      // Success
      this.cleanPoll();
      var key = this.fbds.createPoll(this.poll);
      // Reset all fields
      this.initPoll();
      this.router.navigate(['/', key])
    }
    this.resetErrors(2000);
  }
  goToPoll(id: string) {
    this.router.navigate(['/', id])
  }
  resetErrors(time: number) {
    setTimeout(() => { this.error = {title: false, author: false, options: false}; }, time);
  }
}