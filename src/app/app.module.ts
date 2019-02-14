import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// import { DonutChartModule } from 'projects/donut-chart/src/public_api';
// import { DonutChartModule } from '../../dist/donut-chart';
import { DonutChartModule } from 'donut-chart';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DonutChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
