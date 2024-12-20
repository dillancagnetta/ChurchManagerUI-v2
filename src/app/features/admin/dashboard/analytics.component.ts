import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
  Signal,
  ViewEncapsulation
} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ApexOptions} from 'ng-apexcharts';
import {AnalyticsService} from './analytics.service';
import {DashboardStore, Period} from "@features/admin/dashboard/dashboard.store";
import {MatSelectChange} from "@angular/material/select";

@Component({
    selector       : 'analytics',
    templateUrl    : './analytics.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsComponent implements OnInit, OnDestroy
{
    chartVisitors: ApexOptions;
    chartConversions: ApexOptions;
    chartImpressions: ApexOptions;
    chartVisits: ApexOptions;
    chartVisitorsVsPageViews: ApexOptions;
    data: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    chartAge: ApexOptions;
    chartGender: ApexOptions;
    chartLanguage: ApexOptions;
    chartNewVsReturning: ApexOptions;

    // Attendance Chart
    readonly store = inject(DashboardStore);
    $isChartAttendanceLoading: Signal<boolean> = this.store.isLoading;
    $chartChurchAttendanceDefinition: Signal<ApexOptions> = this.store.chartChurchAttendanceDefinition;
    $chartNcVsFtDefinition: Signal<ApexOptions> = this.store.chartNcVsFtDefinition;
    $chartNcStatsDefinition: Signal<ApexOptions> = this.store.chartNcStatsChartDefinition;
    $chartFtStatsDefinition: Signal<ApexOptions> = this.store.chartFtStatsChartDefinition;
    $chartAttendanceData: Signal<any> = this.store.chartAttendance;
    $chartNcVsFtData: Signal<any> = this.store.newConvertsVsFirstTimersChart;
    $chartNcStatsData: Signal<any> = this.store.chartNewConvertsStats;
    $chartFtStatsData: Signal<any> = this.store.chartFirstTimersStats;
    $chartConnectionStatusDefinition: Signal<any> = this.store.chartConnectionStatusDefinition;
    $chartConnectionStatusData: Signal<any> = this.store.chartConnectionStatus;
    $chartGenderDefinition: Signal<any> = this.store.chartGenderDefinition;
    $chartGenderData: Signal<any> = this.store.chartGender;
    $chartAgeDefinition: Signal<any> = this.store.chartAgeDefinition;
    $chartAgeData: Signal<any> = this.store.chartAgeClassification;

  /**
     * Constructor
     */
    constructor(
        private _analyticsService: AnalyticsService,
        private _router: Router
    )
    {
      effect(() => {
        const data = this.$chartAttendanceData();
        console.log('data', data);


      });
    }



    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the data
        this._analyticsService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {

                // Store the data
                this.data = data;

                // Prepare the chart data
                this._prepareChartData();
            });

        // Attach SVG fill fixer to all ApexCharts
        window['Apex'] = {
            chart: {
                events: {
                    mounted: (chart: any, options?: any) => {
                        this._fixSvgFill(chart.el);
                    },
                    updated: (chart: any, options?: any) => {
                        this._fixSvgFill(chart.el);
                    }
                }
            }
        };

        //this.$chartVisitorsYearsSeries = this.store.chartSeries()

        /*this._dashboardData.getChurchAttendance$()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                records => {

                    const tempDatasets: { [year: string]: ApexAxisChartSeries; } = {};
                    const tempNcAndFtDatasets: { [year: string]: ApexAxisChartSeries; } = {};

                    // WE REVERSE THE LISTS BECAUSE WE SHOW DATA FROM JAN
                    records.forEach( record => {
                        tempDatasets[record.year] = [
                            {
                                name: 'Attendance',
                                data: record.data.map( value => ({x: moment().month(value.month - 1).format('MMM'), y: value.totalAttendance})  ).reverse(),
                            }
                        ];

                        tempNcAndFtDatasets[record.year] = [
                            {
                                name: 'New Converts',
                                data: record.data.map( x => x.totalNewConverts).reverse()
                            },
                            {
                                name: 'First Timers',
                                data: record.data.map( x => x.totalFirstTimers).reverse()
                            }
                        ];
                    });

                    // Adjust to match format
                    const series = {};
                    for (const year in tempDatasets) {
                        series[year] = tempDatasets[year]
                        // Add the years to series
                        this.$chartVisitorsYearsSeries.update( x => x.concat(year))
                    }

                    if ( series ) {
                        const chartVisitors = {
                            chart     : {
                                animations: {
                                    speed           : 400,
                                    animateGradually: {
                                        enabled: false
                                    }
                                },
                                fontFamily: 'inherit',
                                foreColor : 'inherit',
                                width     : '100%',
                                height    : '100%',
                                type      : 'area',
                                toolbar   : {
                                    show: false
                                },
                                zoom      : {
                                    enabled: false
                                }
                            },
                            colors    : ['#818CF8'],
                            dataLabels: {
                                enabled: false
                            },
                            fill      : {
                                colors: ['#312E81']
                            },
                            grid      : {
                                show       : true,
                                borderColor: '#334155',
                                padding    : {
                                    top   : 10,
                                    bottom: -20,
                                    left  : 20,
                                    right : 20
                                },
                                position   : 'back',
                                xaxis      : {
                                    lines: {
                                        show: true
                                    }
                                }
                            },
                            series    : series,
                            stroke    : {
                                width: 3
                            },
                            tooltip   : {
                                followCursor: true,
                                theme       : 'dark',
                                y           : {
                                    formatter(value: number): string
                                    {
                                        return `${value}`;
                                    }
                                }
                            },
                            xaxis     : {
                                axisBorder: {
                                    show: false
                                },
                                axisTicks : {
                                    show: false
                                },
                                crosshairs: {
                                    stroke: {
                                        color    : '#475569',
                                        dashArray: 0,
                                        width    : 2
                                    }
                                },
                                labels    : {
                                    offsetY: -5,
                                    style  : {
                                        colors: '#CBD5E1'
                                    }
                                },
                                tickAmount: 20,
                                tooltip   : {
                                    enabled: false
                                },
                                categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
                            },
                            yaxis     : {
                                axisTicks : {
                                    show: false
                                },
                                axisBorder: {
                                    show: false
                                },
                                min       : min => min - 750,
                                max       : max => max + 250,
                                tickAmount: 5,
                                show      : false
                            }
                        };
                        this.chartVisitors$.next( chartVisitors );
                    }

                }
            );*/
    }

    /**
     * Getter for current year
     */
    get currentYear(): number
    {
      return new Date().getFullYear();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next({});
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Fix the SVG fill references. This fix must be applied to all ApexCharts
     * charts in order to fix 'black color on gradient fills on certain browsers'
     * issue caused by the '<base>' tag.
     *
     * Fix based on https://gist.github.com/Kamshak/c84cdc175209d1a30f711abd6a81d472
     *
     * @param element
     * @private
     */
    private _fixSvgFill(element: Element): void
    {
        // Current URL
        const currentURL = this._router.url;

        // 1. Find all elements with 'fill' attribute within the element
        // 2. Filter out the ones that doesn't have cross reference so we only left with the ones that use the 'url(#id)' syntax
        // 3. Insert the 'currentURL' at the front of the 'fill' attribute value
        Array.from(element.querySelectorAll('*[fill]'))
             .filter((el) => el.getAttribute('fill').indexOf('url(') !== -1)
             .forEach((el) => {
                 const attrVal = el.getAttribute('fill');
                 el.setAttribute('fill', `url(${currentURL}${attrVal.slice(attrVal.indexOf('#'))}`);
             });
    }

    /**
     * Prepare the chart data from the data
     *
     * @private
     */
    private _prepareChartData(): void
    {
        // Visitors
        this.chartVisitors = {
            chart     : {
                animations: {
                    speed           : 400,
                    animateGradually: {
                        enabled: false
                    }
                },
                fontFamily: 'inherit',
                foreColor : 'inherit',
                width     : '100%',
                height    : '100%',
                type      : 'area',
                toolbar   : {
                    show: false
                },
                zoom      : {
                    enabled: false
                }
            },
            colors    : ['#818CF8'],
            dataLabels: {
                enabled: false
            },
            fill      : {
                colors: ['#312E81']
            },
            grid      : {
                show       : true,
                borderColor: '#334155',
                padding    : {
                    top   : 10,
                    bottom: -40,
                    left  : 0,
                    right : 0
                },
                position   : 'back',
                xaxis      : {
                    lines: {
                        show: true
                    }
                }
            },
            series    : this.data.visitors.series,
            stroke    : {
                width: 2
            },
            tooltip   : {
                followCursor: true,
                theme       : 'dark',
                x           : {
                    format: 'yyyy' // MMM dd, yyyy
                },
                y           : {
                    formatter(value: number): string
                    {
                        return `${value}`;
                    }
                }
            },
            xaxis     : {
                axisBorder: {
                    show: false
                },
                axisTicks : {
                    show: false
                },
                crosshairs: {
                    stroke: {
                        color    : '#475569',
                        dashArray: 0,
                        width    : 2
                    }
                },
                labels    : {
                    offsetY: -20,
                    style  : {
                        colors: '#CBD5E1'
                    }
                },
                tickAmount: 20,
                tooltip   : {
                    enabled: false
                },
                type      : 'datetime'
            },
            yaxis     : {
                axisTicks : {
                    show: false
                },
                axisBorder: {
                    show: false
                },
                min       : min => min - 750,
                max       : max => max + 250,
                tickAmount: 5,
                show      : false
            }
        };


        //this.chartVisitors$.next( this.chartVisitors);

        // Conversions
        this.chartConversions = {
            chart  : {
                animations: {
                    enabled: false
                },
                fontFamily: 'inherit',
                foreColor : 'inherit',
                height    : '100%',
                type      : 'area',
                sparkline : {
                    enabled: true
                }
            },
            colors : ['#38BDF8'],
            fill   : {
                colors : ['#38BDF8'],
                opacity: 0.5
            },
            series : this.data.conversions.series,
            stroke : {
                curve: 'smooth'
            },
            tooltip: {
                followCursor: true,
                theme       : 'dark'
            },
            xaxis  : {
                type      : 'category',
                categories: this.data.conversions.labels
            },
            yaxis  : {
                labels: {
                    formatter: (val) => {
                        return val.toString();
                    }
                }
            }
        };

        // Impressions
        this.chartImpressions = {
            chart  : {
                animations: {
                    enabled: false
                },
                fontFamily: 'inherit',
                foreColor : 'inherit',
                height    : '100%',
                type      : 'area',
                sparkline : {
                    enabled: true
                }
            },
            colors : ['#34D399'],
            fill   : {
                colors : ['#34D399'],
                opacity: 0.5
            },
            series : this.data.impressions.series,
            stroke : {
                curve: 'smooth'
            },
            tooltip: {
                followCursor: true,
                theme       : 'dark'
            },
            xaxis  : {
                type      : 'category',
                categories: this.data.impressions.labels
            },
            yaxis  : {
                labels: {
                    formatter: (val) => {
                        return val.toString();
                    }
                }
            }
        };

        // Visits
        this.chartVisits = {
            chart  : {
                animations: {
                    enabled: false
                },
                fontFamily: 'inherit',
                foreColor : 'inherit',
                height    : '100%',
                type      : 'area',
                sparkline : {
                    enabled: true
                }
            },
            colors : ['#FB7185'],
            fill   : {
                colors : ['#FB7185'],
                opacity: 0.5
            },
            series : this.data.visits.series,
            stroke : {
                curve: 'smooth'
            },
            tooltip: {
                followCursor: true,
                theme       : 'dark'
            },
            xaxis  : {
                type      : 'category',
                categories: this.data.visits.labels
            },
            yaxis  : {
                labels: {
                    formatter: (val) => {
                        return val.toString();
                    }
                }
            }
        };

        // New Converts vs. First Timers
        this.chartVisitorsVsPageViews = {
            chart     : {
                animations: {
                    enabled: false
                },
                fontFamily: 'inherit',
                foreColor : 'inherit',
                height    : '100%',
                type      : 'area',
                toolbar   : {
                    show: false
                },
                zoom      : {
                    enabled: false
                }
            },
            colors    : ['#64748B', '#94A3B8'],
            dataLabels: {
                enabled: false
            },
            fill      : {
                colors : ['#64748B', '#94A3B8'],
                opacity: 0.5
            },
            grid      : {
                show   : false,
                padding: {
                    bottom: -40,
                    left  : 0,
                    right : 0
                }
            },
            legend    : {
                show: false
            },
            series    : this.data.visitorsVsPageViews.series,
            stroke    : {
                curve: 'smooth',
                width: 2
            },
            tooltip   : {
                followCursor: true,
                theme       : 'dark',
                x           : {
                    format: 'MMM dd, yyyy'
                }
            },
            xaxis     : {
                axisBorder: {
                    show: false
                },
                labels    : {
                    offsetY: -20,
                    rotate : 0,
                    style  : {
                        colors: 'var(--fuse-text-secondary)'
                    }
                },
                tickAmount: 3,
                tooltip   : {
                    enabled: false
                },
                type      : 'datetime'
            },
            yaxis     : {
                labels    : {
                    style: {
                        colors: 'var(--fuse-text-secondary)'
                    }
                },
                max       : max => max + 250,
                min       : min => min - 250,
                show      : false,
                tickAmount: 5
            }
        };

        // New vs. returning
        this.chartNewVsReturning = {
            chart      : {
                animations: {
                    speed           : 400,
                    animateGradually: {
                        enabled: false
                    }
                },
                fontFamily: 'inherit',
                foreColor : 'inherit',
                height    : '100%',
                type      : 'donut',
                sparkline : {
                    enabled: true
                }
            },
            colors     : ['#3182CE', '#63B3ED'],
            labels     : this.data.newVsReturning.labels,
            plotOptions: {
                pie: {
                    customScale  : 0.9,
                    expandOnClick: false,
                    donut        : {
                        size: '70%'
                    }
                }
            },
            series     : this.data.newVsReturning.series,
            states     : {
                hover : {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                }
            },
            tooltip    : {
                enabled        : true,
                fillSeriesColor: false,
                theme          : 'dark',
                custom         : ({
                    seriesIndex,
                    w
                }) => {
                    return `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                <div class="ml-2 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
                            </div>`;
                }
            }
        };

        // Gender
        this.chartGender = {
            chart      : {
                animations: {
                    speed           : 400,
                    animateGradually: {
                        enabled: false
                    }
                },
                fontFamily: 'inherit',
                foreColor : 'inherit',
                height    : '100%',
                type      : 'donut',
                sparkline : {
                    enabled: true
                }
            },
            colors     : ['#319795', '#4FD1C5'],
            labels     : this.data.gender.labels,
            plotOptions: {
                pie: {
                    customScale  : 0.9,
                    expandOnClick: false,
                    donut        : {
                        size: '70%'
                    }
                }
            },
            series     : this.data.gender.series,
            states     : {
                hover : {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                }
            },
            tooltip    : {
                enabled        : true,
                fillSeriesColor: false,
                theme          : 'dark',
                custom         : ({
                    seriesIndex,
                    w
                }) => {
                    return `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                <div class="ml-2 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
                            </div>`;
                }
            }
        };

        // Age
        this.chartAge = {
            chart      : {
                animations: {
                    speed           : 400,
                    animateGradually: {
                        enabled: false
                    }
                },
                fontFamily: 'inherit',
                foreColor : 'inherit',
                height    : '100%',
                type      : 'donut',
                sparkline : {
                    enabled: true
                }
            },
            colors     : ['#DD6B20', '#F6AD55'],
            labels     : this.data.age.labels,
            plotOptions: {
                pie: {
                    customScale  : 0.9,
                    expandOnClick: false,
                    donut        : {
                        size: '70%'
                    }
                }
            },
            series     : this.data.age.series,
            states     : {
                hover : {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                }
            },
            tooltip    : {
                enabled        : true,
                fillSeriesColor: false,
                theme          : 'dark',
                custom         : ({
                    seriesIndex,
                    w
                }) => {
                    return `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                <div class="ml-2 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
                            </div>`;
                }
            }
        };

        // Language
        this.chartLanguage = {
            chart      : {
                animations: {
                    speed           : 400,
                    animateGradually: {
                        enabled: false
                    }
                },
                fontFamily: 'inherit',
                foreColor : 'inherit',
                height    : '100%',
                type      : 'donut',
                sparkline : {
                    enabled: true
                }
            },
            colors     : ['#805AD5', '#B794F4'],
            labels     : this.data.language.labels,
            plotOptions: {
                pie: {
                    customScale  : 0.9,
                    expandOnClick: false,
                    donut        : {
                        size: '70%'
                    }
                }
            },
            series     : this.data.language.series,
            states     : {
                hover : {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                }
            },
            tooltip    : {
                enabled        : true,
                fillSeriesColor: false,
                theme          : 'dark',
                custom         : ({
                    seriesIndex,
                    w
                }) => {
                    return `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                <div class="ml-2 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
                            </div>`;
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

  newConvertPeriodChange(period: Period) {
    this.store.updateNewConvertPeriod(period);
  }

  onChurchSelected({value}: MatSelectChange) {
    console.log('onChurchSelected', value);
    this.store.getChurchAttendance(value);
    this.store.getPeopleBreakdowns(value);
  }

  updateFtPeriodChange(period: Period) {
    this.store.updateFtPeriodChange(period);
  }
}
