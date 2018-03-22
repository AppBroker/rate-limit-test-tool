import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exp-list',
  templateUrl: './exp.component.html'
})
export class ExpComponent {
  _ref: any;
  headerName: string;
  headerValue: string;
  constructor() { }

  removeObject(){
    this._ref.destroy();
  }

  save() {
    if ( this.headerName && this.headerValue) {
      alert(`Language: ${this.headerName} & Experience: ${this.headerValue}`);
    } else {
      alert('Please enter value to save');
    }
  }
}
