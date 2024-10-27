import {patchState, signalStore, watchState, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {computed, inject} from "@angular/core";
import {ApexAxisChartSeries, ApexOptions} from "ng-apexcharts";
import moment from "moment/moment";
import {DashboardDataService} from "@features/admin/dashboard/dashboard-data.service";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {pipe, switchMap, tap} from "rxjs";
import {tapResponse} from '@ngrx/operators'
import {
  annualChurchAttendanceChart,
  annualNewConvertsVsFirstTimersChart, ncVsFtStatsChart
} from "@features/admin/dashboard/dashboard-chart-definitions";

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
    hasData: computed((): boolean => data()?.length > 0),
    chartAttendanceSeries: computed((): (string | number)[] => data()?.map(x => x.year)),
    chartChurchAttendanceDefinition: computed((): ApexOptions => annualChurchAttendanceChart),
    chartNcVsFtDefinition: computed((): ApexOptions => annualNewConvertsVsFirstTimersChart),
    chartNcStatsChartDefinition: computed((): ApexOptions => ncVsFtStatsChart),
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

      return series;
    }),
    chartNewConvertsStats: computed(() => {
      const tempNcAndFtDatasets: { [year: string]: {name: string, data: number[]}; } = {};
      // WE REVERSE THE LISTS BECAUSE WE SHOW DATA FROM JAN
      data()?.forEach(record => {
        tempNcAndFtDatasets[record.year] = {
          name: 'New Converts',
          data: record.data.map(x => x.totalNewConverts).reverse()
        };
      });

      const period = newConvertsPeriodSelection();

      const s = [];
      for (const year in tempNcAndFtDatasets) {
        s[year] = tempNcAndFtDatasets[year];
      }

      const currentYear = moment().year();
      const currentMonth = moment().month();

      const series = s[currentYear];

      if (series?.data == null ) return {};

      // Only show up to the selection period
      series.data = series.data?.slice(series.data.length - parseInt(period));

      // Determine the lables of the selected period
      const labels = series.data?.map((x, index) =>
        (  moment({year: currentYear, month: currentMonth - parseInt(period) + index}).format('MMM YYYY') ));

      // Calculate total for period
      const total = series.data.reduce((prev, curr) => prev + curr)

      // Ensure there are data
      let percentageChange = 0;
      if (series.data?.length >= 1) {
        const firstMonth = series.data[0];
        // Calculate the average so we can calculate the change from the first value
        const averageSales = series.data.reduce((sum, value) => sum + value, 0) / series.data.length;
        percentageChange = ((averageSales - firstMonth) / firstMonth) * 100;
      }

      return {
        series: [series],
        labels,
        total,
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


      // Add conversion rate of FT to NC
      const totalNcAndFt = {};
      for (const year in tempNcAndFtDatasets) {
        totalNcAndFt[year] = tempNcAndFtDatasets[year].map(x => x.data.reduce((prev: number, current: number) => prev + current));
        const totalNc = totalNcAndFt[year][0];
        const totalFt = totalNcAndFt[year][1];
        totalNcAndFt[year] = [...totalNcAndFt[year], Math.round(totalNc / totalFt * 100)];
      }

      console.log('totalNcAndFt', totalNcAndFt)

      return {
        series,
        totalNcAndFt
      };
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