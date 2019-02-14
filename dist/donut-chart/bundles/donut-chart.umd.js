(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('donut-chart', ['exports', 'd3', '@angular/core'], factory) :
    (factory((global['donut-chart'] = {}),global.d3,global.ng.core));
}(this, (function (exports,d3,i0) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DonutChartService = /** @class */ (function () {
        function DonutChartService() {
        }
        DonutChartService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        DonutChartService.ctorParameters = function () { return []; };
        /** @nocollapse */ DonutChartService.ngInjectableDef = i0.defineInjectable({ factory: function DonutChartService_Factory() { return new DonutChartService(); }, token: DonutChartService, providedIn: "root" });
        return DonutChartService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DonutChartComponent = /** @class */ (function () {
        function DonutChartComponent() {
            this.dataClickCallback = new i0.EventEmitter();
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
                    .value(( /**
             * @param {?} d
             * @return {?}
             */function (d) { return d.number; }));
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
                    .data(arcs(( /** @type {?} */(data))))
                    .enter()
                    .append('path')
                    .attr('fill', ( /**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */function (d, i) {
                    return _this.color[i];
                }))
                    .attr('d', arc)
                    .style('cursor', 'pointer')
                    .on('click', ( /**
             * @param {?} e
             * @return {?}
             */function (e) {
                    _this.callbackData = e.data;
                    _this.dataClickCallback.next(_this.callbackData);
                }))
                    .on('mouseover', ( /**
             * @param {?} d
             * @param {?} i
             * @param {?} el
             * @return {?}
             */function (d, i, el) {
                    d3.selectAll(( /** @type {?} */(el)))
                        .filter(':not(:hover)') // filter the the one element that is being hovered
                        .call(fade, 0.4);
                    d3.select(this).style('stroke', colors[i]);
                    d3.select((( /** @type {?} */(this))).nextSibling).style('display', 'block'); // nextSibling = text element.
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
                    .on('mouseout', ( /**
             * @param {?} d
             * @param {?} i
             * @param {?} el
             * @return {?}
             */function (d, i, el) {
                    d3.selectAll(( /** @type {?} */(el)))
                        .call(fade, 1);
                    d3.selectAll(( /** @type {?} */(el))).style('stroke', 'none');
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
            { type: i0.Component, args: [{
                        selector: 'iazi-charts-donut',
                        template: "<div [id]=\"containerId\"></div>"
                    }] }
        ];
        /** @nocollapse */
        DonutChartComponent.ctorParameters = function () { return []; };
        DonutChartComponent.propDecorators = {
            containerId: [{ type: i0.Input }],
            data: [{ type: i0.Input }],
            prefixValue: [{ type: i0.Input }],
            color: [{ type: i0.Input }],
            dataClickCallback: [{ type: i0.Output }]
        };
        return DonutChartComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DonutChartModule = /** @class */ (function () {
        function DonutChartModule() {
        }
        DonutChartModule.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [DonutChartComponent],
                        imports: [],
                        exports: [DonutChartComponent]
                    },] }
        ];
        return DonutChartModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.DonutChartService = DonutChartService;
    exports.DonutChartComponent = DonutChartComponent;
    exports.DonutChartModule = DonutChartModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=donut-chart.umd.js.map