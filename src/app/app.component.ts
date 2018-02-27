import {Component, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClockComponent } from '../clock/clock.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rate Limiter Tool';
  hits = 0;
  squeal = '';
  endpointValue = '';
  amountHitsValue = 10;
  @ViewChild('child')
  private clock: ClockComponent;


  constructor(private http: HttpClient) {
  }

  random(): string {
    return Math.random().toString(36).substr(2, 10).toUpperCase();
  }
  churnHttp(): void {
    for (let i = 0, p: Promise<any> = Promise.resolve(); i < this.amountHitsValue; i++) {
      p = p.then(_ => new Promise(resolve =>
        this.http.get(this.endpointValue + '?random=' + this.random(), {observe: 'response'}).subscribe(data => {
          console.log(data);
          this.hits++;
          this.squeal += `${ this.hits } - The response was ${ data.statusText } ${ data.status }\n`;
          if(this.hits === this.amountHitsValue - 1) {
            this.clock.stop();
          }
          resolve();
        }, error => {
          console.log('oops', error);
          console.log('amnt hits', this.amountHitsValue);
          //Stop counter....
          this.hits++;
          this.clock.stop();
          //Stop hitting....
          this.squeal += `${ this.hits } - Response has died... response was ${ error.statusText } ${ error.status }\n`;
          return error;
        })
      ));
    }
  }

  start(): void {
    this.clock.start();
    this.churnHttp();

  }
}
