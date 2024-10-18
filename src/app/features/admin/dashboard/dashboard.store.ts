import {ChurchAttendanceAnnualBreakdown} from "@features/admin/dashboard/analytics.models";
import {patchState, signalStore, watchState, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {computed, inject} from "@angular/core";
import {ApexAxisChartSeries, ApexOptions} from "ng-apexcharts";
import moment from "moment/moment";
import {DashboardDataService} from "@features/admin/dashboard/dashboard-data.service";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {pipe, tap, switchMap} from "rxjs";
import {tapResponse} from '@ngrx/operators'
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

type DashboardState = {
    data: any;
    isLoading: boolean;
};

const initialState: DashboardState = {
    data: null,
    isLoading: false
};

export const DashboardStore = signalStore(
    withState(initialState),

    // 👇 Selectors
    withComputed(({data, isLoading }) => ({
        hasData: computed((): boolean => !!data()?.length),
        chartAttendanceSeries: computed((): (string | number)[] => data()?.map(x => x.year)),
        chartAttendance: computed(() => {

            const tempDatasets: { [year: string]: ApexAxisChartSeries; } = {};

            // WE REVERSE THE LISTS BECAUSE WE SHOW DATA FROM JAN
            data()?.forEach( record => {
                tempDatasets[record.year] = [
                    {
                        name: 'Attendance',
                        data: record.data.map(value => ({
                            x: moment().month(value.month - 1).format('MMM'),
                            y: value.totalAttendance
                        })).reverse(),
                    }
                ];
            });

            // Adjust to match format
            const series = {};
            for (const year in tempDatasets) {
                series[year] = tempDatasets[year];
            }

            const chartAttendance = {
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
            }; // Chart

            return chartAttendance;
        }),
    })),

    // 👇 Defining methods to load data etc.
    withMethods((store, service = inject(DashboardDataService)) => ({
        getChurchAttendance: rxMethod<void>(
            pipe(
                tap(() => patchState(store, { isLoading: true })),
                switchMap(() => {
                    return service.getChurchAttendance$().pipe(
                        takeUntilDestroyed(),
                        tapResponse({
                            next: (data) => patchState(store, { data }),
                            error: console.error,
                            finalize: () => patchState(store, { isLoading: false }),
                        })
                    );
                })
            )
        )
    })),

    withHooks({
        onInit(store) {
            store.getChurchAttendance();

            watchState(store, (state) => {
                console.log('[watchState] dashboard state', state);
            });
        },
        onDestroy(store) {
            console.log('store on destroy');
        },
    }),

);