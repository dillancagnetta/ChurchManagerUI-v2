import {patchState, signalStore, watchState, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {computed, inject} from "@angular/core";
import {ApexAxisChartSeries} from "ng-apexcharts";
import moment from "moment/moment";
import {DashboardDataService} from "@features/admin/dashboard/dashboard-data.service";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {pipe, switchMap, tap} from "rxjs";
import {tapResponse} from '@ngrx/operators'
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

export type Period = '3' | '6' | '12';

type DashboardState = {
  data: any;
  isLoading: boolean;
  newConvertsPeriodSelection:  Period;
  churchIdSelected: number;
};

const initialState: DashboardState = {
  data: null,
  isLoading: false,
  newConvertsPeriodSelection: '3',
  churchIdSelected: 0 // 0 = -- All Churches --
};

export const DashboardStore = signalStore(
  withState(initialState),

  // 👇 Selectors
  withComputed(({data, newConvertsPeriodSelection, isLoading}) => ({
    hasData: computed((): boolean => !!data()?.length),
    chartAttendanceSeries: computed((): (string | number)[] => data()?.map(x => x.year)),
    chartAttendance: computed(() => {

      const tempDatasets: { [year: string]: ApexAxisChartSeries; } = {};

      // WE REVERSE THE LISTS BECAUSE WE SHOW DATA FROM JAN
      data()?.forEach(record => {
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
        chart: {
          animations: {
            speed: 400,
            animateGradually: {
              enabled: false
            }
          },
          fontFamily: 'inherit',
          foreColor: 'inherit',
          width: '100%',
          height: '100%',
          type: 'area',
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        colors: ['#818CF8'],
        dataLabels: {
          enabled: false
        },
        fill: {
          colors: ['#312E81']
        },
        grid: {
          show: true,
          borderColor: '#334155',
          padding: {
            top: 10,
            bottom: -20,
            left: 20,
            right: 20
          },
          position: 'back',
          xaxis: {
            lines: {
              show: true
            }
          }
        },
        series: series,
        stroke: {
          width: 3
        },
        tooltip: {
          followCursor: true,
          theme: 'dark',
          y: {
            formatter(value: number): string {
              return `${value}`;
            }
          }
        },
        xaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            stroke: {
              color: '#475569',
              dashArray: 0,
              width: 2
            }
          },
          labels: {
            offsetY: -5,
            style: {
              colors: '#CBD5E1'
            }
          },
          tickAmount: 20,
          tooltip: {
            enabled: false
          },
          categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
        },
        yaxis: {
          axisTicks: {
            show: false
          },
          axisBorder: {
            show: false
          },
          min: min => min - 750,
          max: max => max + 250,
          tickAmount: 5,
          show: false
        }
      }; // Chart

      return chartAttendance;
    }),
    newConvertsVsFirstTimersStats: computed(() => {
      const tempNcAndFtDatasets: { [year: string]: {name: string, data: number[]}; } = {};
      // WE REVERSE THE LISTS BECAUSE WE SHOW DATA FROM JAN
      data()?.forEach(record => {
        tempNcAndFtDatasets[record.year] = {
          name: 'New Converts',
          data: record.data.map(x => x.totalNewConverts).reverse()
        };
      });

      const period = newConvertsPeriodSelection();

      const s = {};
      for (const year in tempNcAndFtDatasets) {
        s[year] = tempNcAndFtDatasets[year];
      }

      const currentYear = moment().year();
      const currentMonth = moment().month();

      const series = s[currentYear];

      if (series?.data == null ) return {};

      series.data = series.data?.slice(series.data.length - parseInt(period));

     /* const labels = series.data?.map((x, index) =>
        ( new Date(currentYear, currentMonth - parseInt(period) + index + 1, 1)).toDateString());*/

      const labels = series.data?.map((x, index) =>
        (  moment({year: currentYear, month: currentMonth - parseInt(period) + index}).format('MMM YYYY') ));

      const total = series.data.reduce((prev, curr) => prev + curr)

      // Ensure there are data
      let percentageChange = 0;
      if (series.data?.length >= 1) {
        const firstMonth = series.data[0];
        // Calculate the average
        const averageSales = series.data.reduce((sum, value) => sum + value, 0) / series.data.length;
        percentageChange = ((averageSales - firstMonth) / firstMonth) * 100;
      }

      console.log('computed', {
        total,
        labels,
        currentYearSeries: series,
        percentageChange
      })

      const chart = {
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
        series : [series],
        stroke : {
          curve: 'smooth'
        },
        tooltip: {
          followCursor: true,
          theme: 'dark',
          x: {
            format: 'MMM, yyyy'
          }
        },
        xaxis  : {
          type      : 'category',
          categories: labels
        },
        yaxis  : {
          labels: {
            formatter: (val) => {
              return val.toString();
            }
          }
        }
      };

      return {
        total,
        chart,
        percentageChange
      }
    }),
    newConvertsVsFirstTimersChart: computed(() => {
      const tempNcAndFtDatasets: { [year: string]: ApexAxisChartSeries; } = {};
      // WE REVERSE THE LISTS BECAUSE WE SHOW DATA FROM JAN
      data()?.forEach(record => {
        tempNcAndFtDatasets[record.year] = [
          {
            name: 'New Converts',
            data: record.data.map(x => x.totalNewConverts).reverse()
          },
          {
            name: 'First Timers',
            data: record.data.map(x => x.totalFirstTimers).reverse()
          }
        ];
      });

      // Adjust to match format
      const series = {};
      for (const year in tempNcAndFtDatasets) {
        series[year] = tempNcAndFtDatasets[year];
      }

      const ncAndFtChart = {
        chart: {
          animations: {
            enabled: false
          },
          fontFamily: 'inherit',
          foreColor: 'inherit',
          height: '100%',
          type: 'area',
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        colors: ['#64748B', '#94A3B8'],
        dataLabels: {
          enabled: false
        },
        fill: {
          colors: ['#64748B', '#94A3B8'],
          opacity: 0.5
        },
        grid: {
          show: false,
          padding: {
            top: 10,
            bottom: -40,
            left: 20,
            right: 20
          }
        },
        legend: {
          show: false
        },
        series: series,
        stroke: {
          curve: 'smooth',
          width: 2
        },
        tooltip: {
          followCursor: true,
          theme: 'dark',
          x: {
            format: 'MMM, yyyy'
          }
        },
        xaxis: {
          axisBorder: {
            show: false
          },
          labels: {
            offsetY: -20,
            rotate: 0,
            style: {
              colors: 'var(--fuse-text-secondary)'
            }
          },
          // tickAmount: 60,
          tooltip: {
            enabled: false
          },
          categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
          //type      : 'datetime'
        },
        yaxis: {
          labels: {
            style: {
              colors: 'var(--fuse-text-secondary)'
            }
          },
          max: max => max + 250,
          min: min => min - 250,
          show: false,
          tickAmount: 5
        }
      }; // Chart

      const totalNcAndFt = {};
      for (const year in tempNcAndFtDatasets) {
        totalNcAndFt[year] = tempNcAndFtDatasets[year].map(x => x.data.reduce((prev: number, current: number) => prev + current));
        const totalNc = totalNcAndFt[year][0];
        const totalFt = totalNcAndFt[year][1];
        totalNcAndFt[year] = [...totalNcAndFt[year], Math.round(totalNc / totalFt * 100)];
      }

      return {
        ncAndFtChart,
        totalNcAndFt,
      }

    }),
    availableMonthsPeriods: computed(() => {
      const currentMonth = moment().month();

      const periods: Period[] = ['3', '6', '12'];

      // Filter periods based on the current month
      const availablePeriods: Period[] = periods.filter(period => currentMonth >= +period);

      return availablePeriods;
    })
  })),

  // 👇 Defining methods to load data etc.
  withMethods((store, service = inject(DashboardDataService)) => ({
    getChurchAttendance: rxMethod<number>(
      pipe(
        tap(() => patchState(store, {isLoading: true})),
        switchMap((churchId) => {
          return service.getChurchAttendance$(churchId).pipe(
            tapResponse({
              next: (data) => patchState(store, {data, churchIdSelected: churchId}),
              error: console.error,
              finalize: () => patchState(store, {isLoading: false}),
            })
          );
        })
      )
    ),

    updateNewConvertPeriod: (period:  Period) => {
      patchState(store, { newConvertsPeriodSelection: period });
    },
    updateChurchSelection: (churchId:  number) => {
      patchState(store, { churchIdSelected: churchId });
    },
  })),

  withHooks({
    onInit(store) {
      store.getChurchAttendance(0);

      watchState(store, (state) => {
        console.log('[watchState] dashboard state', state);
      });
    },
    onDestroy(store) {
      console.log('store on destroy');
    },
  }),
);