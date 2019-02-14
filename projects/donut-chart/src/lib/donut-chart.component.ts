import { Component, OnInit, OnDestroy, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'iazi-charts-donut',
  templateUrl: './donut-chart.component.html'
})
export class DonutChartComponent implements OnInit, OnDestroy, AfterViewInit {
  /**
    [containerId] = string - the unique ID to select the container of the chart.
    [data] = array - with object = name: "some label", number: value as number.
    [prefixValue] = string - prefix fot he value to show example: marktwert.
    [color] = array - with hex colors. Length of this array needs to be equal to data array!
    (dataClickCallback) = emitter for the click event.
   */
  @Input() public containerId: string;
  @Input() public data: any[];
  @Input() public prefixValue: string;
  @Input() public color: any[];
  @Output() dataClickCallback = new EventEmitter<Object>();
  public callbackData;
  private isready = false;

  constructor() { }
  public ngOnInit() {

  }
  public ngAfterViewInit() {
    this.isready = true;
    if (this.containerId) {
      this.initChart();
    }
  }
  public ngOnDestroy() {
    d3.select(window).on(`resize.${this.containerId}`, null);
  }

  public initChart() {
    if (this.data.length !== this.color.length) {
      console.error('data array lenght is not the same as the color array lenght!');
      return false;
    }

    d3.select(`.${this.containerId}`).remove();

    const margin = { top: 250, right: 0, bottom: 0, left: 470 };
    const width = 960 - margin.left - margin.right;
    const height = 700 - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;

    const padAngle = 0.015;
    const arc: any = d3.arc().innerRadius(radius * 0.67).outerRadius(radius - 1);
    const data = this.data;
    const arcs = d3.pie()
      .padAngle(padAngle)
      .value(function (d: any) { return d.number; });


    const svg = d3.select(`#${this.containerId}`)
      .append('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .attr('class', this.containerId)
      .call(responsivefy)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);


    const colors = this.color;
    const valueTextPrefix = this.prefixValue;

    svg.selectAll('path')
      .data(arcs(<any>data))
      .enter()
      .append('path')
      .attr('fill', (d, i) => {
        return this.color[i];
      })
      .attr('d', arc)
      .style('cursor', 'pointer')
      .on('click', (e) => {
        this.callbackData = e.data;
        this.dataClickCallback.next(this.callbackData);
      })
      .on('mouseover', function (d, i, el) { // d = data, i = index, el = elements

        d3.selectAll(<any>el)
          .filter(':not(:hover)') // filter the the one element that is being hovered
          .call(fade, 0.4);

        d3.select(this).style('stroke', colors[i]);
        d3.select((<any>this).nextSibling).style('display', 'block'); // nextSibling = text element.
        // show values
        const dataText: any = d.data['name'];
        const dataValueText: any = d.data['number'];
        svg.select('text.text-tooltip')
          .text(`${dataText}`);
        svg.select('text.text-value-tooltip')
          .text(`${valueTextPrefix} = ${dataValueText}`);
      })
      .on('mouseout', function (d, i, el) {
        d3.selectAll(<any>el)
          .call(fade, 1);
        d3.selectAll(<any>el).style('stroke', 'none');
        d3.selectAll('.histo-labels').style('display', 'none');
        // remove text values
        svg.select('text.text-tooltip')
          .text(``);
        svg.select('text.text-value-tooltip')
          .text(``);
      });


    svg.append('text')
      .attr('class', 'text-value-tooltip')
      .attr('text-anchor', 'middle')
      .style('font-size', '2rem')
      .style('color', 'black')
      .attr('dy', `${height * .8}`)
      .text('');

    svg.append('text')
      .attr('class', 'text-tooltip')
      .attr('text-anchor', 'middle')
      .style('font-size', '1.8rem')
      .style('color', 'black')
      .attr('dy', `${height * .88}`)
      .text('');

    // ===================
    function fade(selection, value) {
      selection.style('fill-opacity', value);
    }

    function responsivefy(svg) {
      // get container + svg aspect ratio
      const container = d3.select(svg.node().parentNode);
      const width = parseInt(svg.style('width'), 10);
      const height = parseInt(svg.style('height'), 10);
      const aspect = width / height;

      // add viewBox and preserveAspectRatio properties,
      // and call resize so that svg resizes on inital page load
      svg.attr('viewBox', '0 0 ' + width + ' ' + height)
        .attr('preserveAspectRatio', 'xMinYMid')
        .call(resize);

      d3.select(window).on('resize.' + container.attr('id'), resize);

      // get width of container and resize svg to fit it
      function resize() {
        const targetWidth = parseInt(container.style('width'), 10);
        svg.attr('width', targetWidth);
        svg.attr('height', Math.round(targetWidth / aspect));
      }
    }
  }
}
