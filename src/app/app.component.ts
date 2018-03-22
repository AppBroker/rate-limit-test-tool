import {Component, ViewChild} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClockComponent } from '../clock/clock.component';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rate Limiter Tool';
  hits = 0;
  squeal = '';
  jsonStr = '';
  jsonObject = null;
  endpointValue = '';
  amountHitsValue = 10;
  headerObj = { 'Content-Type': 'application/json'};
  @ViewChild(ClockComponent)
  private clock: ClockComponent;
  httpOptions = {};
  selectedRestOption;
  restOptions = [
    {id: 0, description: 'GET'},
    {id: 1, description: 'POST'},
    {id: 2, description: 'PUT'},
    {id: 3, description: 'DELETE'}
  ];

  @ViewChild(ListComponent)
  private list: ListComponent;

  constructor(private http: HttpClient) {
    this.selectedRestOption = this.restOptions[0];
  }

  onSelectionChange(entry) {
    this.selectedRestOption = entry;
  }

  random(): string {
    return Math.random().toString(36).substr(2, 10).toUpperCase();
  }

  prepareHeaders(): void {
    this.list.getHeaderValues().forEach(header => {
      this.headerObj[header.headerName] = header.headerValue;
    });
    this.httpOptions = {
      headers: new HttpHeaders(this.headerObj)
    };
  }

  validateJSON(): void {
    try {
      this.jsonObject = JSON.parse(this.jsonStr);
      this.jsonObject = this.jsonObject.length ?  this.jsonObject : [ this.jsonObject ];
    } catch (e) {
      this.jsonObject = null;
    }
    if (!this.jsonObject) {
      this.jsonObject = [{}];
    }
    return this.jsonObject;
  }

  churnHttp(json = null): void {
    this.hits = 0;
    this.amountHitsValue = json ? json.length + 1 : this.amountHitsValue;

    for (let i = 0, p: Promise<any> = Promise.resolve(); i < this.amountHitsValue; i++) {
      p = p.then(_ => new Promise(resolve => {
          if ( this.selectedRestOption.description === 'GET') {
            this.http.get(this.endpointValue + '?random=' + this.random(), {observe: 'response'}).subscribe(data => {
              console.log(data);
              this.hits++;
              this.squeal += `${ this.hits } - The response was ${ data.statusText } ${ data.status }\n`;
              if (this.hits === this.amountHitsValue - 1) {
                this.clock.stop();
              }
              resolve();
            }, error => {
              console.log('oops', error);
              console.log('amnt hits', this.amountHitsValue);
              this.hits++;
              this.clock.stop();
              this.squeal += `${ this.hits } - Response has died... response was ${ error.statusText } ${ error.status }\n`;
              return error;
            });
          }
          if ( this.selectedRestOption.description === 'POST') {
            this.http.post(this.endpointValue + '?random=' + this.random(), json[i], this.httpOptions).subscribe(response => {
              console.log(response);
              this.hits++;
              this.squeal += `${ this.hits } - The response was ${ response } \n`;
              if (this.hits === this.amountHitsValue - 1) {
                this.clock.stop();
              }
              resolve();
            }, error => {
              console.log('oops', error);
              console.log('amnt hits', this.amountHitsValue);
              this.hits++;
              this.clock.stop();
              this.squeal += `${ this.hits } - Response has died... response was ${ error.statusText } ${ error.status }\n`;
              return error;
            });
          }
        }
      ));
    }
  }
  start(): void {
    this.clock.start();
    this.prepareHeaders();
    this.churnHttp(this.validateJSON());
  }
}
