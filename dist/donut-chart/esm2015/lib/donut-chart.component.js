/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';
export class DonutChartComponent {
    constructor() {
        this.dataClickCallback = new EventEmitter();
        this.isready = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.isready = true;
        if (this.containerId) {
            this.initChart();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        d3.select(window).on(`resize.${this.containerId}`, null);
    }
    /**
     * @return {?}
     */
    initChart() {
        if (this.data.length !== this.color.length) {
            console.error('data array lenght is not the same as the color array lenght!');
            return false;
        }
        d3.select(`.${this.containerId}`).remove();
        /** @type {?} */
        const margin = { top: 250, right: 0, bottom: 0, left: 470 };
        /** @type {?} */
        const width = 960 - margin.left - margin.right;
        /** @type {?} */
        const height = 700 - margin.top - margin.bottom;
        /** @type {?} */
        const radius = Math.min(width, height) / 2;
        /** @type {?} */
        const padAngle = 0.015;
        /** @type {?} */
        const arc = d3.arc().innerRadius(radius * 0.67).outerRadius(radius - 1);
        /** @type {?} */
        const data = this.data;
        /** @type {?} */
        const arcs = d3.pie()
            .padAngle(padAngle)
            .value((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.number; }));
        /** @type {?} */
        const svg = d3.select(`#${this.containerId}`)
            .append('svg')
            .attr('width', width + margin.right + margin.left)
            .attr('height', height + margin.top + margin.bottom)
            .attr('class', this.containerId)
            .call(responsivefy)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);
        /** @type {?} */
        const colors = this.color;
        /** @type {?} */
        const valueTextPrefix = this.prefixValue;
        svg.selectAll('path')
            .data(arcs((/** @type {?} */ (data))))
            .enter()
            .append('path')
            .attr('fill', (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        (d, i) => {
            return this.color[i];
        }))
            .attr('d', arc)
            .style('cursor', 'pointer')
            .on('click', (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            this.callbackData = e.data;
            this.dataClickCallback.next(this.callbackData);
        }))
            .on('mouseover', (/**
         * @param {?} d
         * @param {?} i
         * @param {?} el
         * @return {?}
         */
        function (d, i, el) {
            d3.selectAll((/** @type {?} */ (el)))
                .filter(':not(:hover)') // filter the the one element that is being hovered
                .call(fade, 0.4);
            d3.select(this).style('stroke', colors[i]);
            d3.select(((/** @type {?} */ (this))).nextSibling).style('display', 'block'); // nextSibling = text element.
            // nextSibling = text element.
            // show values
            /** @type {?} */
            const dataText = d.data['name'];
            /** @type {?} */
            const dataValueText = d.data['number'];
            svg.select('text.text-tooltip')
                .text(`${dataText}`);
            svg.select('text.text-value-tooltip')
                .text(`${valueTextPrefix} = ${dataValueText}`);
        }))
            .on('mouseout', (/**
         * @param {?} d
         * @param {?} i
         * @param {?} el
         * @return {?}
         */
        function (d, i, el) {
            d3.selectAll((/** @type {?} */ (el)))
                .call(fade, 1);
            d3.selectAll((/** @type {?} */ (el))).style('stroke', 'none');
            d3.selectAll('.histo-labels').style('display', 'none');
            // remove text values
            svg.select('text.text-tooltip')
                .text(``);
            svg.select('text.text-value-tooltip')
                .text(``);
        }));
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
        /**
         * @param {?} selection
         * @param {?} value
         * @return {?}
         */
        function fade(selection, value) {
            selection.style('fill-opacity', value);
        }
        /**
         * @param {?} svg
         * @return {?}
         */
        function responsivefy(svg) {
            // get container + svg aspect ratio
            /** @type {?} */
            const container = d3.select(svg.node().parentNode);
            /** @type {?} */
            const width = parseInt(svg.style('width'), 10);
            /** @type {?} */
            const height = parseInt(svg.style('height'), 10);
            /** @type {?} */
            const aspect = width / height;
            // add viewBox and preserveAspectRatio properties,
            // and call resize so that svg resizes on inital page load
            svg.attr('viewBox', '0 0 ' + width + ' ' + height)
                .attr('preserveAspectRatio', 'xMinYMid')
                .call(resize);
            d3.select(window).on('resize.' + container.attr('id'), resize);
            // get width of container and resize svg to fit it
            /**
             * @return {?}
             */
            function resize() {
                /** @type {?} */
                const targetWidth = parseInt(container.style('width'), 10);
                svg.attr('width', targetWidth);
                svg.attr('height', Math.round(targetWidth / aspect));
            }
        }
    }
}
DonutChartComponent.decorators = [
    { type: Component, args: [{
                selector: 'iazi-charts-donut',
                template: "<div [id]=\"containerId\"></div>"
            }] }
];
/** @nocollapse */
DonutChartComponent.ctorParameters = () => [];
DonutChartComponent.propDecorators = {
    containerId: [{ type: Input }],
    data: [{ type: Input }],
    prefixValue: [{ type: Input }],
    color: [{ type: Input }],
    dataClickCallback: [{ type: Output }]
};
if (false) {
    /**
     * [containerId] = string - the unique ID to select the container of the chart.
     * [data] = array - with object = name: "some label", number: value as number.
     * [prefixValue] = string - prefix fot he value to show example: marktwert.
     * [color] = array - with hex colors. Length of this array needs to be equal to data array!
     * (dataClickCallback) = emitter for the click event.
     * @type {?}
     */
    DonutChartComponent.prototype.containerId;
    /** @type {?} */
    DonutChartComponent.prototype.data;
    /** @type {?} */
    DonutChartComponent.prototype.prefixValue;
    /** @type {?} */
    DonutChartComponent.prototype.color;
    /** @type {?} */
    DonutChartComponent.prototype.dataClickCallback;
    /** @type {?} */
    DonutChartComponent.prototype.callbackData;
    /**
     * @type {?}
     * @private
     */
    DonutChartComponent.prototype.isready;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9udXQtY2hhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vZG9udXQtY2hhcnQvIiwic291cmNlcyI6WyJsaWIvZG9udXQtY2hhcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixLQUFLLEVBQWlCLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFNekIsTUFBTSxPQUFPLG1CQUFtQjtJQWdCOUI7UUFKVSxzQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBRWpELFlBQU8sR0FBRyxLQUFLLENBQUM7SUFFUixDQUFDOzs7O0lBQ1YsUUFBUTtJQUVmLENBQUM7Ozs7SUFDTSxlQUFlO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDbEI7SUFDSCxDQUFDOzs7O0lBQ00sV0FBVztRQUNoQixFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzRCxDQUFDOzs7O0lBRU0sU0FBUztRQUNkLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDMUMsT0FBTyxDQUFDLEtBQUssQ0FBQyw4REFBOEQsQ0FBQyxDQUFDO1lBQzlFLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7O2NBRXJDLE1BQU0sR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUs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RyxNQUFNO1lBRTdCLGtEQUFrRDtZQUNsRCwwREFBMEQ7WUFDMUQsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDO2lCQUMvQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsVUFBVSxDQUFDO2lCQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFaEIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7Ozs7O1lBRy9ELFNBQVMsTUFBTTs7c0JBQ1AsV0FBVyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDMUQsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQy9CLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDdkQsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDOzs7WUF6SkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLDRDQUEyQzthQUM1Qzs7Ozs7MEJBU0UsS0FBSzttQkFDTCxLQUFLOzBCQUNMLEtBQUs7b0JBQ0wsS0FBSztnQ0FDTCxNQUFNOzs7Ozs7Ozs7OztJQUpQLDBDQUFvQzs7SUFDcEMsbUNBQTRCOztJQUM1QiwwQ0FBb0M7O0lBQ3BDLG9DQUE2Qjs7SUFDN0IsZ0RBQXlEOztJQUN6RCwyQ0FBb0I7Ozs7O0lBQ3BCLHNDQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIElucHV0LCBBZnRlclZpZXdJbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpYXppLWNoYXJ0cy1kb251dCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9kb251dC1jaGFydC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgRG9udXRDaGFydENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcbiAgLyoqXG4gICAgW2NvbnRhaW5lcklkXSA9IHN0cmluZyAtIHRoZSB1bmlxdWUgSUQgdG8gc2VsZWN0IHRoZSBjb250YWluZXIgb2YgdGhlIGNoYXJ0LlxuICAgIFtkYXRhXSA9IGFycmF5IC0gd2l0aCBvYmplY3QgPSBuYW1lOiBcInNvbWUgbGFiZWxcIiwgbnVtYmVyOiB2YWx1ZSBhcyBudW1iZXIuXG4gICAgW3ByZWZpeFZhbHVlXSA9IHN0cmluZyAtIHByZWZpeCBmb3QgaGUgdmFsdWUgdG8gc2hvdyBleGFtcGxlOiBtYXJrdHdlcnQuXG4gICAgW2NvbG9yXSA9IGFycmF5IC0gd2l0aCBoZXggY29sb3JzLiBMZW5ndGggb2YgdGhpcyBhcnJheSBuZWVkcyB0byBiZSBlcXVhbCB0byBkYXRhIGFycmF5IVxuICAgIChkYXRhQ2xpY2tDYWxsYmFjaykgPSBlbWl0dGVyIGZvciB0aGUgY2xpY2sgZXZlbnQuXG4gICAqL1xuICBASW5wdXQoKSBwdWJsaWMgY29udGFpbmVySWQ6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIGRhdGE6IGFueVtdO1xuICBASW5wdXQoKSBwdWJsaWMgcHJlZml4VmFsdWU6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIGNvbG9yOiBhbnlbXTtcbiAgQE91dHB1dCgpIGRhdGFDbGlja0NhbGxiYWNrID0gbmV3IEV2ZW50RW1pdHRlcjxPYmplY3Q+KCk7XG4gIHB1YmxpYyBjYWxsYmFja0RhdGE7XG4gIHByaXZhdGUgaXNyZWFkeSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcblxuICB9XG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5pc3JlYWR5ID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5jb250YWluZXJJZCkge1xuICAgICAgdGhpcy5pbml0Q2hhcnQoKTtcbiAgICB9XG4gIH1cbiAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgIGQzLnNlbGVjdCh3aW5kb3cpLm9uKGByZXNpemUuJHt0aGlzLmNvbnRhaW5lcklkfWAsIG51bGwpO1xuICB9XG5cbiAgcHVibGljIGluaXRDaGFydCgpIHtcbiAgICBpZiAodGhpcy5kYXRhLmxlbmd0aCAhPT0gdGhpcy5jb2xvci5sZW5ndGgpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ2RhdGEgYXJyYXkgbGVuZ2h0IGlzIG5vdCB0aGUgc2FtZSBhcyB0aGUgY29sb3IgYXJyYXkgbGVuZ2h0IScpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGQzLnNlbGVjdChgLiR7dGhpcy5jb250YWluZXJJZH1gKS5yZW1vdmUoKTtcblxuICAgIGNvbnN0IG1hcmdpbiA9IHsgdG9wOiAyNTAsIHJpZ2h0OiAwLCBib3R0b206IDAsIGxlZnQ6IDQ3MCB9O1xuICAgIGNvbnN0IHdpZHRoID0gOTYwIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQ7XG4gICAgY29uc3QgaGVpZ2h0ID0gNzAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG4gICAgY29uc3QgcmFkaXVzID0gTWF0aC5taW4od2lkdGgsIGhlaWdodCkgLyAyO1xuXG4gICAgY29uc3QgcGFkQW5nbGUgPSAwLjAxNTtcbiAgICBjb25zdCBhcmM6IGFueSA9IGQzLmFyYygpLmlubmVyUmFkaXVzKHJhZGl1cyAqIDAuNjcpLm91dGVyUmFkaXVzKHJhZGl1cyAtIDEpO1xuICAgIGNvbnN0IGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgY29uc3QgYXJjcyA9IGQzLnBpZSgpXG4gICAgICAucGFkQW5nbGUocGFkQW5nbGUpXG4gICAgICAudmFsdWUoZnVuY3Rpb24gKGQ6IGFueSkgeyByZXR1cm4gZC5udW1iZXI7IH0pO1xuXG5cbiAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoYCMke3RoaXMuY29udGFpbmVySWR9YClcbiAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAuYXR0cignd2lkdGgnLCB3aWR0aCArIG1hcmdpbi5yaWdodCArIG1hcmdpbi5sZWZ0KVxuICAgICAgLmF0dHIoJ2hlaWdodCcsIGhlaWdodCArIG1hcmdpbi50b3AgKyBtYXJnaW4uYm90dG9tKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgdGhpcy5jb250YWluZXJJZClcbiAgICAgIC5jYWxsKHJlc3BvbnNpdmVmeSlcbiAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHttYXJnaW4ubGVmdH0sICR7bWFyZ2luLnRvcH0pYCk7XG5cblxuICAgIGNvbnN0IGNvbG9ycyA9IHRoaXMuY29sb3I7XG4gICAgY29uc3QgdmFsdWVUZXh0UHJlZml4ID0gdGhpcy5wcmVmaXhWYWx1ZTtcblxuICAgIHN2Zy5zZWxlY3RBbGwoJ3BhdGgnKVxuICAgICAgLmRhdGEoYXJjcyg8YW55PmRhdGEpKVxuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCAoZCwgaSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xvcltpXTtcbiAgICAgIH0pXG4gICAgICAuYXR0cignZCcsIGFyYylcbiAgICAgIC5zdHlsZSgnY3Vyc29yJywgJ3BvaW50ZXInKVxuICAgICAgLm9uKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tEYXRhID0gZS5kYXRhO1xuICAgICAgICB0aGlzLmRhdGFDbGlja0NhbGxiYWNrLm5leHQodGhpcy5jYWxsYmFja0RhdGEpO1xuICAgICAgfSlcbiAgICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24gKGQsIGksIGVsKSB7IC8vIGQgPSBkYXRhLCBpID0gaW5kZXgsIGVsID0gZWxlbWVudHNcblxuICAgICAgICBkMy5zZWxlY3RBbGwoPGFueT5lbClcbiAgICAgICAgICAuZmlsdGVyKCc6bm90KDpob3ZlciknKSAvLyBmaWx0ZXIgdGhlIHRoZSBvbmUgZWxlbWVudCB0aGF0IGlzIGJlaW5nIGhvdmVyZWRcbiAgICAgICAgICAuY2FsbChmYWRlLCAwLjQpO1xuXG4gICAgICAgIGQzLnNlbGVjdCh0aGlzKS5zdHlsZSgnc3Ryb2tlJywgY29sb3JzW2ldKTtcbiAgICAgICAgZDMuc2VsZWN0KCg8YW55PnRoaXMpLm5leHRTaWJsaW5nKS5zdHlsZSgnZGlzcGxheScsICdibG9jaycpOyAvLyBuZXh0U2libGluZyA9IHRleHQgZWxlbWVudC5cbiAgICAgICAgLy8gc2hvdyB2YWx1ZXNcbiAgICAgICAgY29uc3QgZGF0YVRleHQ6IGFueSA9IGQuZGF0YVsnbmFtZSddO1xuICAgICAgICBjb25zdCBkYXRhVmFsdWVUZXh0OiBhbnkgPSBkLmRhdGFbJ251bWJlciddO1xuICAgICAgICBzdmcuc2VsZWN0KCd0ZXh0LnRleHQtdG9vbHRpcCcpXG4gICAgICAgICAgLnRleHQoYCR7ZGF0YVRleHR9YCk7XG4gICAgICAgIHN2Zy5zZWxlY3QoJ3RleHQudGV4dC12YWx1ZS10b29sdGlwJylcbiAgICAgICAgICAudGV4dChgJHt2YWx1ZVRleHRQcmVmaXh9ID0gJHtkYXRhVmFsdWVUZXh0fWApO1xuICAgICAgfSlcbiAgICAgIC5vbignbW91c2VvdXQnLCBmdW5jdGlvbiAoZCwgaSwgZWwpIHtcbiAgICAgICAgZDMuc2VsZWN0QWxsKDxhbnk+ZWwpXG4gICAgICAgICAgLmNhbGwoZmFkZSwgMSk7XG4gICAgICAgIGQzLnNlbGVjdEFsbCg8YW55PmVsKS5zdHlsZSgnc3Ryb2tlJywgJ25vbmUnKTtcbiAgICAgICAgZDMuc2VsZWN0QWxsKCcuaGlzdG8tbGFiZWxzJykuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAvLyByZW1vdmUgdGV4dCB2YWx1ZXNcbiAgICAgICAgc3ZnLnNlbGVjdCgndGV4dC50ZXh0LXRvb2x0aXAnKVxuICAgICAgICAgIC50ZXh0KGBgKTtcbiAgICAgICAgc3ZnLnNlbGVjdCgndGV4dC50ZXh0LXZhbHVlLXRvb2x0aXAnKVxuICAgICAgICAgIC50ZXh0KGBgKTtcbiAgICAgIH0pO1xuXG5cbiAgICBzdmcuYXBwZW5kKCd0ZXh0JylcbiAgICAgIC5hdHRyKCdjbGFzcycsICd0ZXh0LXZhbHVlLXRvb2x0aXAnKVxuICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAuc3R5bGUoJ2ZvbnQtc2l6ZScsICcycmVtJylcbiAgICAgIC5zdHlsZSgnY29sb3InLCAnYmxhY2snKVxuICAgICAgLmF0dHIoJ2R5JywgYCR7aGVpZ2h0ICogLjh9YClcbiAgICAgIC50ZXh0KCcnKTtcblxuICAgIHN2Zy5hcHBlbmQoJ3RleHQnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ3RleHQtdG9vbHRpcCcpXG4gICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgIC5zdHlsZSgnZm9udC1zaXplJywgJzEuOHJlbScpXG4gICAgICAuc3R5bGUoJ2NvbG9yJywgJ2JsYWNrJylcbiAgICAgIC5hdHRyKCdkeScsIGAke2hlaWdodCAqIC44OH1gKVxuICAgICAgLnRleHQoJycpO1xuXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PVxuICAgIGZ1bmN0aW9uIGZhZGUoc2VsZWN0aW9uLCB2YWx1ZSkge1xuICAgICAgc2VsZWN0aW9uLnN0eWxlKCdmaWxsLW9wYWNpdHknLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzcG9uc2l2ZWZ5KHN2Zykge1xuICAgICAgLy8gZ2V0IGNvbnRhaW5lciArIHN2ZyBhc3BlY3QgcmF0aW9cbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGQzLnNlbGVjdChzdmcubm9kZSgpLnBhcmVudE5vZGUpO1xuICAgICAgY29uc3Qgd2lkdGggPSBwYXJzZUludChzdmcuc3R5bGUoJ3dpZHRoJyksIDEwKTtcbiAgICAgIGNvbnN0IGhlaWdodCA9IHBhcnNlSW50KHN2Zy5zdHlsZSgnaGVpZ2h0JyksIDEwKTtcbiAgICAgIGNvbnN0IGFzcGVjdCA9IHdpZHRoIC8gaGVpZ2h0O1xuXG4gICAgICAvLyBhZGQgdmlld0JveCBhbmQgcHJlc2VydmVBc3BlY3RSYXRpbyBwcm9wZXJ0aWVzLFxuICAgICAgLy8gYW5kIGNhbGwgcmVzaXplIHNvIHRoYXQgc3ZnIHJlc2l6ZXMgb24gaW5pdGFsIHBhZ2UgbG9hZFxuICAgICAgc3ZnLmF0dHIoJ3ZpZXdCb3gnLCAnMCAwICcgKyB3aWR0aCArICcgJyArIGhlaWdodClcbiAgICAgICAgLmF0dHIoJ3ByZXNlcnZlQXNwZWN0UmF0aW8nLCAneE1pbllNaWQnKVxuICAgICAgICAuY2FsbChyZXNpemUpO1xuXG4gICAgICBkMy5zZWxlY3Qod2luZG93KS5vbigncmVzaXplLicgKyBjb250YWluZXIuYXR0cignaWQnKSwgcmVzaXplKTtcblxuICAgICAgLy8gZ2V0IHdpZHRoIG9mIGNvbnRhaW5lciBhbmQgcmVzaXplIHN2ZyB0byBmaXQgaXRcbiAgICAgIGZ1bmN0aW9uIHJlc2l6ZSgpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0V2lkdGggPSBwYXJzZUludChjb250YWluZXIuc3R5bGUoJ3dpZHRoJyksIDEwKTtcbiAgICAgICAgc3ZnLmF0dHIoJ3dpZHRoJywgdGFyZ2V0V2lkdGgpO1xuICAgICAgICBzdmcuYXR0cignaGVpZ2h0JywgTWF0aC5yb3VuZCh0YXJnZXRXaWR0aCAvIGFzcGVjdCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19