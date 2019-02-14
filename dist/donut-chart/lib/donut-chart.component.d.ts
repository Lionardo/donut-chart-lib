import { OnInit, OnDestroy, AfterViewInit, EventEmitter } from '@angular/core';
export declare class DonutChartComponent implements OnInit, OnDestroy, AfterViewInit {
    /**
      [containerId] = string - the unique ID to select the container of the chart.
      [data] = array - with object = name: "some label", number: value as number.
      [prefixValue] = string - prefix fot he value to show example: marktwert.
      [color] = array - with hex colors. Length of this array needs to be equal to data array!
      (dataClickCallback) = emitter for the click event.
     */
    containerId: string;
    data: any[];
    prefixValue: string;
    color: any[];
    dataClickCallback: EventEmitter<Object>;
    callbackData: any;
    private isready;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    initChart(): boolean;
}
