import { Component, OnInit } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'app-main-view',
  templateUrl: 'main-view.component.html',
  styleUrls: ['main-view.component.css'],
  directives: [
    MD_BUTTON_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MD_GRID_LIST_DIRECTIVES,
    MD_ICON_DIRECTIVES,

  ]
})
export class MainViewComponent implements OnInit {
  hideSearch = false;
  hideResults = true;
  hideEmail = true;
  hideSuccess = true;
  searchString: string = '';
  userEmail: string = '';
  inputColor = "primary";
  textColor = "black";
  selectedCourse: any;
  courses: FirebaseListObservable<any[]>;
  result = []

  constructor(private _af: AngularFire) {}

  ngOnInit() {}

  search(searchString: string) {
    if (searchString.length >= 3) {
      this._af.database.list('courses').subscribe(courses => {
        this.result = [];
        for (let category of courses) {
          delete category.key
          for (let course in category) {
            var searchable = category[course].course + " " + category[course].title
            if (searchable.toUpperCase().indexOf(searchString.toUpperCase()) > -1){
              this.result.push(category[course]);
            }
          }
        }
      }).add(() => {
        for (let obj of this.result) {
          console.log(obj.course);
        }
        if (this.result.length > 0){
          this.hideSearch = true;
          this.hideResults = false;
        }       
      }).unsubscribe();
    }
  }
  properSearch() {
    if (this.searchString.length >= 3) {
      return "primary";
    } else {
      return "warn";
    }
  }
  selectItem(item: any) {
    this.selectedCourse = item;
    console.log(this.selectedCourse);
    this.hideResults = true;
    this.hideEmail = false;
  }
  subscribeItem() {
    this._af.database.list('tracked/' + this.selectedCourse.crn + '/users').push(this.userEmail);
    this.hideEmail = true;
    this.hideSuccess = false;
    this.userEmail = '';
    this.searchString = '';
    setTimeout(()=>{ this.hideSuccess = true; this.hideSearch = false}, 3000);
  }
}
