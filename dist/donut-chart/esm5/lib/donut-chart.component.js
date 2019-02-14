/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';
var DonutChartComponent = /** @class */ (function () {
    function DonutChartComponent() {
        this.dataClickCallback = new EventEmitter();
        this.isready = false;
    }
    /**
     * @return {?}
     */
    DonutChartComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    DonutChartComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.isready = true;
        if (this.containerId) {
            this.initChart();
        }
    };
    /**
     * @return {?}
     */
    DonutChartComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        d3.select(window).on("resize." + this.containerId, null);
    };
    /**
     * @return {?}
     */
    DonutChartComponent.prototype.initChart = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.data.length !== this.color.length) {
            console.error('data array lenght is not the same as the color array lenght!');
            return false;
        }
        d3.select("." + this.containerId).remove();
        /** @type {?} */
        var margin = { top: 250, right: 0, bottom: 0, left: 470 };
        /** @type {?} */
        var width = 960 - margin.left - margin.right;
        /** @type {?} */
        var height = 700 - margin.top - margin.bottom;
        /** @type {?} */
        var radius = Math.min(width, height) / 2;
        /** @type {?} */
        var padAngle = 0.015;
        /** @type {?} */
        var arc = d3.arc().innerRadius(radius * 0.67).outerRadius(radius - 1);
        /** @type {?} */
        var data = this.data;
        /** @type {?} */
        var arcs = d3.pie()
            .padAngle(padAngle)
            .value((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.number; }));
        /** @type {?} */
        var svg = d3.select("#" + this.containerId)
            .append('svg')
            .attr('width', width + margin.right + margin.left)
            .attr('height', height + margin.top + margin.bottom)
            .attr('class', this.containerId)
            .call(responsivefy)
            .append('g')
            .attr('transform', "translate(" + margin.left + ", " + margin.top + ")");
        /** @type {?} */
        var colors = this.color;
        /** @type {?} */
        var valueTextPrefix = this.prefixValue;
        svg.selectAll('path')
            .data(arcs((/** @type {?} */ (data))))
            .enter()
            .append('path')
            .attr('fill', (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) {
            return _this.color[i];
        }))
            .attr('d', arc)
            .style('cursor', 'pointer')
            .on('click', (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.callbackData = e.data;
            _this.dataClickCallback.next(_this.callbackData);
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
            var dataText = d.data['name'];
            /** @type {?} */
            var dataValueText = d.data['number'];
            svg.select('text.text-tooltip')
                .text("" + dataText);
            svg.select('text.text-value-tooltip')
                .text(valueTextPrefix + " = " + dataValueText);
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
                .text("");
            svg.select('text.text-value-tooltip')
                .text("");
        }));
        svg.append('text')
            .attr('class', 'text-value-tooltip')
            .attr('text-anchor', 'middle')
            .style('font-size', '2rem')
            .style('color', 'black')
            .attr('dy', "" + height * .8)
            .text('');
        svg.append('text')
            .attr('class', 'text-tooltip')
            .attr('text-anchor', 'middle')
            .style('font-size', '1.8rem')
            .style('color', 'black')
            .attr('dy', "" + height * .88)
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
            var container = d3.select(svg.node().parentNode);
            /** @type {?} */
            var width = parseInt(svg.style('width'), 10);
            /** @type {?} */
            var height = parseInt(svg.style('height'), 10);
            /** @type {?} */
            var aspect = width / height;
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
                var targetWidth = parseInt(container.style('width'), 10);
                svg.attr('width', targetWidth);
                svg.attr('height', Math.round(targetWidth / aspect));
            }
        }
    };
    DonutChartComponent.decorators = [
        { type: Component, args: [{
                    selector: 'iazi-charts-donut',
                    template: "<div [id]=\"containerId\"></div>"
                }] }
    ];
    /** @nocollapse */
    DonutChartComponent.ctorParameters = function () { return []; };
    DonutChartComponent.propDecorators = {
        containerId: [{ type: Input }],
        data: [{ type: Input }],
        prefixValue: [{ type: Input }],
        color: [{ type: Input }],
        dataClickCallback: [{ type: Output }]
    };
    return DonutChartComponent;
}());
export { DonutChartComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9udXQtY2hhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vZG9udXQtY2hhcnQvIiwic291cmNlcyI6WyJsaWIvZG9udXQtY2hhcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixLQUFLLEVBQWlCLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFFekI7SUFvQkU7UUFKVSxzQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBRWpELFlBQU8sR0FBRyxLQUFLLENBQUM7SUFFUixDQUFDOzs7O0lBQ1Ysc0NBQVE7OztJQUFmO0lBRUEsQ0FBQzs7OztJQUNNLDZDQUFlOzs7SUFBdEI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQzs7OztJQUNNLHlDQUFXOzs7SUFBbEI7UUFDRSxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxZQUFVLElBQUksQ0FBQyxXQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7OztJQUVNLHVDQUFTOzs7SUFBaEI7UUFBQSxpQkF1SEM7UUF0SEMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUMxQyxPQUFPLENBQUMsS0FBSyxDQUFDLDhEQUE4RCxDQUFDLENBQUM7WUFDOUUsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBSSxJQUFJLENBQUMsV0FBYSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7O1lBRXJDLE1BQU0sR0FBRyxFQUFFLEdB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WUFDMUQsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDO2lCQUMvQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsVUFBVSxDQUFDO2lCQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFaEIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7Ozs7O1lBRy9ELFNBQVMsTUFBTTs7b0JBQ1AsV0FBVyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDMUQsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQy9CLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDdkQsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDOztnQkF6SkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLDRDQUEyQztpQkFDNUM7Ozs7OzhCQVNFLEtBQUs7dUJBQ0wsS0FBSzs4QkFDTCxLQUFLO3dCQUNMLEtBQUs7b0NBQ0wsTUFBTTs7SUEwSVQsMEJBQUM7Q0FBQSxBQTFKRCxJQTBKQztTQXRKWSxtQkFBbUI7Ozs7Ozs7Ozs7SUFROUIsMENBQW9DOztJQUNwQyxtQ0FBNEI7O0lBQzVCLDBDQUFvQzs7SUFDcEMsb0NBQTZCOztJQUM3QixnREFBeUQ7O0lBQ3pELDJDQUFvQjs7Ozs7SUFDcEIsc0NBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSwgSW5wdXQsIEFmdGVyVmlld0luaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBkMyBmcm9tICdkMyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lhemktY2hhcnRzLWRvbnV0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RvbnV0LWNoYXJ0LmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBEb251dENoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICAvKipcbiAgICBbY29udGFpbmVySWRdID0gc3RyaW5nIC0gdGhlIHVuaXF1ZSBJRCB0byBzZWxlY3QgdGhlIGNvbnRhaW5lciBvZiB0aGUgY2hhcnQuXG4gICAgW2RhdGFdID0gYXJyYXkgLSB3aXRoIG9iamVjdCA9IG5hbWU6IFwic29tZSBsYWJlbFwiLCBudW1iZXI6IHZhbHVlIGFzIG51bWJlci5cbiAgICBbcHJlZml4VmFsdWVdID0gc3RyaW5nIC0gcHJlZml4IGZvdCBoZSB2YWx1ZSB0byBzaG93IGV4YW1wbGU6IG1hcmt0d2VydC5cbiAgICBbY29sb3JdID0gYXJyYXkgLSB3aXRoIGhleCBjb2xvcnMuIExlbmd0aCBvZiB0aGlzIGFycmF5IG5lZWRzIHRvIGJlIGVxdWFsIHRvIGRhdGEgYXJyYXkhXG4gICAgKGRhdGFDbGlja0NhbGxiYWNrKSA9IGVtaXR0ZXIgZm9yIHRoZSBjbGljayBldmVudC5cbiAgICovXG4gIEBJbnB1dCgpIHB1YmxpYyBjb250YWluZXJJZDogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgZGF0YTogYW55W107XG4gIEBJbnB1dCgpIHB1YmxpYyBwcmVmaXhWYWx1ZTogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgY29sb3I6IGFueVtdO1xuICBAT3V0cHV0KCkgZGF0YUNsaWNrQ2FsbGJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE9iamVjdD4oKTtcbiAgcHVibGljIGNhbGxiYWNrRGF0YTtcbiAgcHJpdmF0ZSBpc3JlYWR5ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbiAgcHVibGljIG5nT25Jbml0KCkge1xuXG4gIH1cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmlzcmVhZHkgPSB0cnVlO1xuICAgIGlmICh0aGlzLmNvbnRhaW5lcklkKSB7XG4gICAgICB0aGlzLmluaXRDaGFydCgpO1xuICAgIH1cbiAgfVxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgZDMuc2VsZWN0KHdpbmRvdykub24oYHJlc2l6ZS4ke3RoaXMuY29udGFpbmVySWR9YCwgbnVsbCk7XG4gIH1cblxuICBwdWJsaWMgaW5pdENoYXJ0KCkge1xuICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoICE9PSB0aGlzLmNvbG9yLmxlbmd0aCkge1xuICAgICAgY29uc29sZS5lcnJvcignZGF0YSBhcnJheSBsZW5naHQgaXMgbm90IHRoZSBzYW1lIGFzIHRoZSBjb2xvciBhcnJheSBsZW5naHQhJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZDMuc2VsZWN0KGAuJHt0aGlzLmNvbnRhaW5lcklkfWApLnJlbW92ZSgpO1xuXG4gICAgY29uc3QgbWFyZ2luID0geyB0b3A6IDI1MCwgcmlnaHQ6IDAsIGJvdHRvbTogMCwgbGVmdDogNDcwIH07XG4gICAgY29uc3Qgd2lkdGggPSA5NjAgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodDtcbiAgICBjb25zdCBoZWlnaHQgPSA3MDAgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcbiAgICBjb25zdCByYWRpdXMgPSBNYXRoLm1pbih3aWR0aCwgaGVpZ2h0KSAvIDI7XG5cbiAgICBjb25zdCBwYWRBbmdsZSA9IDAuMDE1O1xuICAgIGNvbnN0IGFyYzogYW55ID0gZDMuYXJjKCkuaW5uZXJSYWRpdXMocmFkaXVzICogMC42Nykub3V0ZXJSYWRpdXMocmFkaXVzIC0gMSk7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMuZGF0YTtcbiAgICBjb25zdCBhcmNzID0gZDMucGllKClcbiAgICAgIC5wYWRBbmdsZShwYWRBbmdsZSlcbiAgICAgIC52YWx1ZShmdW5jdGlvbiAoZDogYW55KSB7IHJldHVybiBkLm51bWJlcjsgfSk7XG5cblxuICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdChgIyR7dGhpcy5jb250YWluZXJJZH1gKVxuICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoICsgbWFyZ2luLnJpZ2h0ICsgbWFyZ2luLmxlZnQpXG4gICAgICAuYXR0cignaGVpZ2h0JywgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pXG4gICAgICAuYXR0cignY2xhc3MnLCB0aGlzLmNvbnRhaW5lcklkKVxuICAgICAgLmNhbGwocmVzcG9uc2l2ZWZ5KVxuICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke21hcmdpbi5sZWZ0fSwgJHttYXJnaW4udG9wfSlgKTtcblxuXG4gICAgY29uc3QgY29sb3JzID0gdGhpcy5jb2xvcjtcbiAgICBjb25zdCB2YWx1ZVRleHRQcmVmaXggPSB0aGlzLnByZWZpeFZhbHVlO1xuXG4gICAgc3ZnLnNlbGVjdEFsbCgncGF0aCcpXG4gICAgICAuZGF0YShhcmNzKDxhbnk+ZGF0YSkpXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAuYXR0cignZmlsbCcsIChkLCBpKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbG9yW2ldO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKCdkJywgYXJjKVxuICAgICAgLnN0eWxlKCdjdXJzb3InLCAncG9pbnRlcicpXG4gICAgICAub24oJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgdGhpcy5jYWxsYmFja0RhdGEgPSBlLmRhdGE7XG4gICAgICAgIHRoaXMuZGF0YUNsaWNrQ2FsbGJhY2submV4dCh0aGlzLmNhbGxiYWNrRGF0YSk7XG4gICAgICB9KVxuICAgICAgLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbiAoZCwgaSwgZWwpIHsgLy8gZCA9IGRhdGEsIGkgPSBpbmRleCwgZWwgPSBlbGVtZW50c1xuXG4gICAgICAgIGQzLnNlbGVjdEFsbCg8YW55PmVsKVxuICAgICAgICAgIC5maWx0ZXIoJzpub3QoOmhvdmVyKScpIC8vIGZpbHRlciB0aGUgdGhlIG9uZSBlbGVtZW50IHRoYXQgaXMgYmVpbmcgaG92ZXJlZFxuICAgICAgICAgIC5jYWxsKGZhZGUsIDAuNCk7XG5cbiAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnN0eWxlKCdzdHJva2UnLCBjb2xvcnNbaV0pO1xuICAgICAgICBkMy5zZWxlY3QoKDxhbnk+dGhpcykubmV4dFNpYmxpbmcpLnN0eWxlKCdkaXNwbGF5JywgJ2Jsb2NrJyk7IC8vIG5leHRTaWJsaW5nID0gdGV4dCBlbGVtZW50LlxuICAgICAgICAvLyBzaG93IHZhbHVlc1xuICAgICAgICBjb25zdCBkYXRhVGV4dDogYW55ID0gZC5kYXRhWyduYW1lJ107XG4gICAgICAgIGNvbnN0IGRhdGFWYWx1ZVRleHQ6IGFueSA9IGQuZGF0YVsnbnVtYmVyJ107XG4gICAgICAgIHN2Zy5zZWxlY3QoJ3RleHQudGV4dC10b29sdGlwJylcbiAgICAgICAgICAudGV4dChgJHtkYXRhVGV4dH1gKTtcbiAgICAgICAgc3ZnLnNlbGVjdCgndGV4dC50ZXh0LXZhbHVlLXRvb2x0aXAnKVxuICAgICAgICAgIC50ZXh0KGAke3ZhbHVlVGV4dFByZWZpeH0gPSAke2RhdGFWYWx1ZVRleHR9YCk7XG4gICAgICB9KVxuICAgICAgLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uIChkLCBpLCBlbCkge1xuICAgICAgICBkMy5zZWxlY3RBbGwoPGFueT5lbClcbiAgICAgICAgICAuY2FsbChmYWRlLCAxKTtcbiAgICAgICAgZDMuc2VsZWN0QWxsKDxhbnk+ZWwpLnN0eWxlKCdzdHJva2UnLCAnbm9uZScpO1xuICAgICAgICBkMy5zZWxlY3RBbGwoJy5oaXN0by1sYWJlbHMnKS5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgIC8vIHJlbW92ZSB0ZXh0IHZhbHVlc1xuICAgICAgICBzdmcuc2VsZWN0KCd0ZXh0LnRleHQtdG9vbHRpcCcpXG4gICAgICAgICAgLnRleHQoYGApO1xuICAgICAgICBzdmcuc2VsZWN0KCd0ZXh0LnRleHQtdmFsdWUtdG9vbHRpcCcpXG4gICAgICAgICAgLnRleHQoYGApO1xuICAgICAgfSk7XG5cblxuICAgIHN2Zy5hcHBlbmQoJ3RleHQnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ3RleHQtdmFsdWUtdG9vbHRpcCcpXG4gICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgIC5zdHlsZSgnZm9udC1zaXplJywgJzJyZW0nKVxuICAgICAgLnN0eWxlKCdjb2xvcicsICdibGFjaycpXG4gICAgICAuYXR0cignZHknLCBgJHtoZWlnaHQgKiAuOH1gKVxuICAgICAgLnRleHQoJycpO1xuXG4gICAgc3ZnLmFwcGVuZCgndGV4dCcpXG4gICAgICAuYXR0cignY2xhc3MnLCAndGV4dC10b29sdGlwJylcbiAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgLnN0eWxlKCdmb250LXNpemUnLCAnMS44cmVtJylcbiAgICAgIC5zdHlsZSgnY29sb3InLCAnYmxhY2snKVxuICAgICAgLmF0dHIoJ2R5JywgYCR7aGVpZ2h0ICogLjg4fWApXG4gICAgICAudGV4dCgnJyk7XG5cbiAgICAvLyA9PT09PT09PT09PT09PT09PT09XG4gICAgZnVuY3Rpb24gZmFkZShzZWxlY3Rpb24sIHZhbHVlKSB7XG4gICAgICBzZWxlY3Rpb24uc3R5bGUoJ2ZpbGwtb3BhY2l0eScsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNwb25zaXZlZnkoc3ZnKSB7XG4gICAgICAvLyBnZXQgY29udGFpbmVyICsgc3ZnIGFzcGVjdCByYXRpb1xuICAgICAgY29uc3QgY29udGFpbmVyID0gZDMuc2VsZWN0KHN2Zy5ub2RlKCkucGFyZW50Tm9kZSk7XG4gICAgICBjb25zdCB3aWR0aCA9IHBhcnNlSW50KHN2Zy5zdHlsZSgnd2lkdGgnKSwgMTApO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gcGFyc2VJbnQoc3ZnLnN0eWxlKCdoZWlnaHQnKSwgMTApO1xuICAgICAgY29uc3QgYXNwZWN0ID0gd2lkdGggLyBoZWlnaHQ7XG5cbiAgICAgIC8vIGFkZCB2aWV3Qm94IGFuZCBwcmVzZXJ2ZUFzcGVjdFJhdGlvIHByb3BlcnRpZXMsXG4gICAgICAvLyBhbmQgY2FsbCByZXNpemUgc28gdGhhdCBzdmcgcmVzaXplcyBvbiBpbml0YWwgcGFnZSBsb2FkXG4gICAgICBzdmcuYXR0cigndmlld0JveCcsICcwIDAgJyArIHdpZHRoICsgJyAnICsgaGVpZ2h0KVxuICAgICAgICAuYXR0cigncHJlc2VydmVBc3BlY3RSYXRpbycsICd4TWluWU1pZCcpXG4gICAgICAgIC5jYWxsKHJlc2l6ZSk7XG5cbiAgICAgIGQzLnNlbGVjdCh3aW5kb3cpLm9uKCdyZXNpemUuJyArIGNvbnRhaW5lci5hdHRyKCdpZCcpLCByZXNpemUpO1xuXG4gICAgICAvLyBnZXQgd2lkdGggb2YgY29udGFpbmVyIGFuZCByZXNpemUgc3ZnIHRvIGZpdCBpdFxuICAgICAgZnVuY3Rpb24gcmVzaXplKCkge1xuICAgICAgICBjb25zdCB0YXJnZXRXaWR0aCA9IHBhcnNlSW50KGNvbnRhaW5lci5zdHlsZSgnd2lkdGgnKSwgMTApO1xuICAgICAgICBzdmcuYXR0cignd2lkdGgnLCB0YXJnZXRXaWR0aCk7XG4gICAgICAgIHN2Zy5hdHRyKCdoZWlnaHQnLCBNYXRoLnJvdW5kKHRhcmdldFdpZHRoIC8gYXNwZWN0KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=