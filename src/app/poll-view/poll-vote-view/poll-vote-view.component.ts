import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseObjectObservable } from 'angularfire2';
import { FirebaseDataService } from '../../firebase-data.service';
import { MdCard, MdCardTitleGroup, MdCardHeader, MD_CARD_DIRECTIVES} from '@angular2-material/card';
import { MdButton, MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import { MdInput,MdPlaceholder,MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import { MdIcon, MD_ICON_DIRECTIVES} from '@angular2-material/icon';

@Component({
  moduleId: module.id,
  selector: 'app-poll-vote-view',
  templateUrl: 'poll-vote-view.component.html',
  styleUrls: ['poll-vote-view.component.css'],
  directives: [
    MdCard, MdCardHeader, MdCardTitleGroup, MD_CARD_DIRECTIVES,
    MdButton, MD_BUTTON_DIRECTIVES,
    MdInput,MdPlaceholder,MD_INPUT_DIRECTIVES
    ]
})
export class PollVoteViewComponent implements OnInit {
  poll: FirebaseObjectObservable<any>;
  pollID: string;
  voted: boolean;
  constructor(private fbds: FirebaseDataService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.pollID = this.route.snapshot._lastUrlSegment.path;
    this.poll = this.fbds.getPoll(this.pollID)
    if (document.cookie.indexOf(this.pollID) >= 0) {
      this.voted = true;
    } else {
      this.voted = false;
    }
  }
  toResult() {
    if (document.cookie.indexOf(this.pollID) >= 0){
      // console.log("You've voted already");
    } else {
      document.cookie += " " + this.pollID;
    }
    this.fbds.setPollResult(this.pollID);
    this.router.navigate(['/', this.pollID, '/results'])
  }
  submitVote(option: any, ind: any) {
    if (document.cookie.indexOf(this.pollID) >= 0){
    } else {
      option.score += 1
      this.fbds.votePoll(this.pollID, ind, option);
      document.cookie += " " + this.pollID;
    }
    this.toResult();
  }
  

}
