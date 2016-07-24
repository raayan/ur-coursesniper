import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Injectable()
export class FirebaseDataService {
  currentResult: string;
  constructor(private af: AngularFire) {

  }
  createPoll(poll: any) {
    return this.af.database.list('/polls').push(poll).key;
  }
  getPoll(id: string) {
    return this.af.database.object('/polls/' + id);
  }
  getPolls() {
    return this.af.database.list('/polls/');
  }
  votePoll(id: string, ind: string, option: any) {
    this.af.database.object('/polls/' + id + '/options/' + ind).update(option);
  }
  setPollResult(id: string) {
    this.currentResult = id;
  }
  getPollResult() {
    return this.currentResult;
  }
}
