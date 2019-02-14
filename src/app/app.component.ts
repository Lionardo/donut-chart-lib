import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  public containerdonut = 'donutcontainer';
  public dataDonut = [
    {name: 'Genferseeregion', number: 1},
    {name: 'Nordwestschweiz', number: 3},
    {name: 'Mittelland', number: 4},
    {name: 'Zürich', number: 7},
    {name: 'Tessin', number: 8}
  ];
  public prefixValueDonut = 'Marktwert';
  public colorDonut = [
    '#7728F8',
    '#5fda94',
    '#a0ce6b',
    '#fbbe55',
    '#095682'
  ];
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {

  }
  ngOnDestroy() {

  }
  public donutCallBack(data) {
    console.log(data);
  }


}
