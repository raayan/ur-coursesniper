import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { FirebaseDataService } from '../../firebase-data.service';
import { FirebaseObjectObservable } from 'angularfire2';
import { MdCard, MdCardTitleGroup, MdCardHeader, MD_CARD_DIRECTIVES} from '@angular2-material/card';
import { MdButton, MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import { MdInput,MdPlaceholder,MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import { MdIcon, MD_ICON_DIRECTIVES} from '@angular2-material/icon';
import { MdProgressBar, MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar';

@Component({
  moduleId: module.id,
  selector: 'app-poll-result-view',
  templateUrl: 'poll-result-view.component.html',
  styleUrls: ['poll-result-view.component.css'],
  directives: [
    MdCard, MdCardHeader, MdCardTitleGroup, MD_CARD_DIRECTIVES,
    MdButton, MD_BUTTON_DIRECTIVES,
    MdInput,MdPlaceholder,MD_INPUT_DIRECTIVES,
    MdProgressBar, MD_PROGRESS_BAR_DIRECTIVES,
    ]
})
export class PollResultViewComponent implements OnInit {

  poll: FirebaseObjectObservable<any>;
  pollID: string;
  total: number;
  constructor(private fbds: FirebaseDataService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.total = 0;
    this.pollID = this.fbds.getPollResult();
    if (this.pollID === undefined) {
      // janky way to get current pollID
      this.pollID = location.pathname.replace('/results','').replace('/','');
    }
    if (document.cookie.indexOf(this.pollID) === -1) {
      if (this.pollID !== undefined) {
        document.cookie =  " " + this.pollID
      }
    }
    this.poll = this.fbds.getPoll(this.pollID)
    this.poll.subscribe((snap: any) => {
      if (snap.options !== undefined) {
        this.total = 0;
        for (let obj of snap.options) {
          this.total += obj.score;
          // console.log(obj.score);
        }
        // console.log(this.total);
      }
    });
  }
  exportCSV() {
    var dataString = "heyjoheyjoheyjoheyjo";
    var data = [];
    var filename = "";
    this.poll.subscribe((snap: any) => {
      if (snap.options !== undefined) {
        filename = snap.name.split(' ').join('') + ".results";
        for (let obj of snap.options) {
          data.push([obj.value, obj.score]);
        }
        data.push(['Total', this.total]);
      }
    });
    var csvContent = "data:text/csv;charset=utf-8,";
    data.forEach(function(infoArray, index){
      dataString = infoArray.join(",");
      csvContent += index < data.length ? dataString+ "\n" : dataString;
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename+".csv");
    document.body.appendChild(link); // Required for FF
    link.click(); // This will download the data file named "my_data.csv".
  }
}
