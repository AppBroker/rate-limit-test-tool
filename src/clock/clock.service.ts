import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import * as moment from 'moment';


@Injectable()
export class ClockService {

  private clock: Observable<any>;
  private startDate: Date;
  private stopped:Boolean;

  constructor() {
    this.stopped = true;
  }

  startClock() {
  this.stopped = false;
    this.startDate = new Date();
    this.clock = Observable.interval(1000).map((tick) => {
    console.log(tick)
    return this.stopped ? '' : moment.utc(moment(new Date(), 'DD/MM/YYYY HH:mm:ss')
      .diff(moment(this.startDate, 'DD/MM/YYYY HH:mm:ss')))
      .format('HH:mm:ss') }).share();
  }

  stopClock() {
  console.log('stop the clock')
    this.stopped = true;
  }

  getClock(): any {
    return this.stopped ? '' : this.clock;
  }
}
