import {patchState, signalStore, watchState, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {computed, inject} from "@angular/core";
import {ApexAxisChartSeries, ApexOptions} from "ng-apexcharts";
import moment from "moment/moment";
import {DashboardDataService} from "@features/admin/dashboard/dashboard-data.service";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {pipe, switchMap, tap} from "rxjs";
import {tapResponse} from '@ngrx/operators'
import {
  ageChart,
  annualChurchAttendanceChart,
  annualNewConvertsVsFirstTimersChart, connectionStatusChart, firstTimersStatsChart, genderChart, ncVsFtStatsChart
} from "@features/admin/dashboard/dashboard-chart-definitions";
import {
  ChurchAttendanceAnnualBreakdown,
  DashboardCounts
} from "@features/admin/dashboard/analytics.models";

export type Period = '3' | '6' | '12';

type DashboardState = {
  data: ChurchAttendanceAnnualBreakdown[];
  countData: DashboardCounts,
  isLoading: boolean;
  newConvertsPeriodSelection:  Period;
  firstTimersPeriodSelection:  Period;
  churchIdSelected: number;
};

const initialState: DashboardState = {
  data: [],
  countData: {connectionStatus:[], age: [], gender: []},
  isLoading: false,
  newConvertsPeriodSelection: '3',
  firstTimersPeriodSelection: '3',
  churchIdSelected: 0 // 0 = -- All Churches --
};

export const DashboardStore = signalStore(
  withState(initialState),

  // 👇 Selectors
  withComputed(({data, newConvertsPeriodSelection, firstTimersPeriodSelection, countData}) => ({
    hasData: computed((): boolean => data()?.length > 0),
    chartAttendanceSeries: computed((): (string | number)[] => data()?.map(x => x.year)),
    chartChurchAttendanceDefinition: computed((): ApexOptions => annualChurchAttendanceChart),
    chartNcVsFtDefinition: computed((): ApexOptions => annualNewConvertsVsFirstTimersChart),
    chartNcStatsChartDefinition: computed((): ApexOptions => ncVsFtStatsChart),
    chartFtStatsChartDefinition: computed((): ApexOptions => firstTimersStatsChart),
    chartConnectionStatusDefinition: computed((): ApexOptions => connectionStatusChart),
    chartAgeDefinition: computed((): ApexOptions => ageChart),
    chartGenderDefinition: computed((): ApexOptions => genderChart),
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
    chartConnectionStatus: computed(() => {

      if (countData()?.connectionStatus?.length) {
        const data = countData()?.connectionStatus;
        const labels = data?.map(x => x.name);
        const series = data?.map(x => x.count);
        const total = series?.reduce((prev, curr)  => prev + curr);

        console.log('chartConnectionStatus', labels, series, total)

        return {
          labels,
          series,
          total
        }
      }

    }),
    chartAgeClassification: computed(() => {

      if (countData()?.age?.length) {
        const data = countData()?.age;
        const labels = data?.map(x => x.name);
        const series = data?.map(x => x.count);
        const total = series?.reduce((prev, curr)  => prev + curr);

        console.log('chartConnectionStatus', labels, series, total)

        return {
          labels,
          series,
          total
        }
      }

    }),
    chartGender: computed(() => {

      if (countData()?.gender?.length) {
        const data = countData()?.gender;
        const labels = data?.map(x => x.name);
        const series = data?.map(x => x.count);
        const total = series?.reduce((prev, curr)  => prev + curr);

        console.log('chartConnectionStatus', labels, series, total)

        return {
          labels,
          series,
          total
        }
      }

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
    chartFirstTimersStats: computed(() => {
      const tempNcAndFtDatasets: { [year: string]: {name: string, data: number[]}; } = {};
      // WE REVERSE THE LISTS BECAUSE WE SHOW DATA FROM JAN
      data()?.forEach(record => {
        tempNcAndFtDatasets[record.year] = {
          name: 'First Timers',
          data: record.data.map(x => x.totalFirstTimers).reverse()
        };
      });

      const period = firstTimersPeriodSelection();

      const s = [];
      for (const year in tempNcAndFtDatasets) {
        s[year] = tempNcAndFtDatasets[year];
      }

      const currentYear = moment().year();
      const currentMonth = moment().month();

      const series = s[currentYear];

      if (series?.data == null) return {};

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

    getPeopleBreakdowns: rxMethod<number>(
      pipe(
        tap(() => patchState(store, {isLoading: true})),
        switchMap((churchId) => {
          return service.getPeopleConnectionStatus$(churchId).pipe(
            tapResponse({
              next: (countData) => patchState(store, {countData}),
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
    updateFtPeriodChange: (period:  Period) => {
      patchState(store, { firstTimersPeriodSelection: period });
    },
    updateChurchSelection: (churchId:  number) => {
      patchState(store, { churchIdSelected: churchId });
    },
  })),

  withHooks({
    onInit(store) {
      store.getChurchAttendance(0);
      store.getPeopleBreakdowns(0);

      watchState(store, (state) => {
        console.log('[watchState] dashboard state', state);
      });
    },
    onDestroy(store) {
      console.log('store on destroy');
    },
  }),
);