import {Component, OnDestroy, OnInit, NgZone} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ClockService} from './clock.service';

@Component({
  selector: 'app-clock-component',
  template: `<div style="text-align:center">
    <span>Seconds Endured</span>
    <br/>
    <span class="huge">{{time}}</span>
    <br/>
    <span>Thus Far</span>
  </div>`
})
export class ClockComponent implements OnDestroy, OnInit {

  _clockSubscription: Subscription;
  time: String;

  constructor(private clockService: ClockService, private zone: NgZone) {
  }

  ngOnInit() {
    this.time = '00:00:00';
  }



  start() {

  console.log('start clock');
    this.clockService.startClock();
    this._clockSubscription = this.clockService.getClock().subscribe(timer => {
      this.zone.run(() => {
        this.time = timer;
      });
    });
  }

  stop() {
    console.log('Stopping',this.clockService.getClock());
    this._clockSubscription.unsubscribe();
    this.clockService.stopClock();
  }

  ngOnDestroy(): void {
    this.stop();
  }

}
