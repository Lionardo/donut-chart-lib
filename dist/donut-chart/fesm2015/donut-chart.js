import { select, arc, pie, selectAll } from 'd3';
import { Injectable, Component, Input, Output, EventEmitter, NgModule, defineInjectable } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DonutChartService {
    constructor() { }
}
DonutChartService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
DonutChartService.ctorParameters = () => [];
/** @nocollapse */ DonutChartService.ngInjectableDef = defineInjectable({ factory: function DonutChartService_Factory() { return new DonutChartService(); }, token: DonutChartService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DonutChartComponent {
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
        select(window).on(`resize.${this.containerId}`, null);
    }
    /**
     * @return {?}
     */
    initChart() {
        if (this.data.length !== this.color.length) {
            console.error('data array lenght is not the same as the color array lenght!');
            return false;
        }
        select(`.${this.containerId}`).remove();
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
        const arc$$1 = arc().innerRadius(radius * 0.67).outerRadius(radius - 1);
        /** @type {?} */
        const data = this.data;
        /** @type {?} */
        const arcs = pie()
            .padAngle(padAngle)
            .value((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.number; }));
        /** @type {?} */
        const svg = select(`#${this.containerId}`)
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
            .attr('d', arc$$1)
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
            selectAll((/** @type {?} */ (el)))
                .filter(':not(:hover)') // filter the the one element that is being hovered
                .call(fade, 0.4);
            select(this).style('stroke', colors[i]);
            select(((/** @type {?} */ (this))).nextSibling).style('display', 'block'); // nextSibling = text element.
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
            selectAll((/** @type {?} */ (el)))
                .call(fade, 1);
            selectAll((/** @type {?} */ (el))).style('stroke', 'none');
            selectAll('.histo-labels').style('display', 'none');
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
            const container = select(svg.node().parentNode);
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
            select(window).on('resize.' + container.attr('id'), resize);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DonutChartModule {
}
DonutChartModule.decorators = [
    { type: NgModule, args: [{
                declarations: [DonutChartComponent],
                imports: [],
                exports: [DonutChartComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { DonutChartService, DonutChartComponent, DonutChartModule };

//# sourceMappingURL=donut-chart.js.map