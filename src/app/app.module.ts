import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MomentModule } from 'angular2-moment/moment.module';


import { AppComponent } from './app.component';
import { ClockComponent } from '../clock/clock.component';
import { ClockService } from '../clock/clock.service';
import { ListComponent } from '../list/list.component';
import { ExpComponent } from '../list/exp.component';

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    ListComponent,
    ExpComponent
  ],
  entryComponents: [
    ExpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MomentModule
  ],
  providers: [
    ClockComponent,
    ClockService
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
