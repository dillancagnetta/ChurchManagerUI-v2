/*Annual Church Attendance Chart*/
import {ApexOptions} from "ng-apexcharts";

export const annualChurchAttendanceChart: ApexOptions = {
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
  series: [],
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
  },
  noData: {
    text: 'loading',
    align: 'center',
    verticalAlign: 'middle',
    offsetX: 0,
    offsetY: 0,
    style: {
      color: undefined,
      fontSize: '14px',
      fontFamily: undefined
    }
  }
}

/*New Converts vs First Timers Chart*/
export const annualNewConvertsVsFirstTimersChart: ApexOptions = {
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
      left: 10,
      right: 5
    }
  },
  legend: {
    show: false
  },
  series: [],
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
};

/*Smaller chart*/
export const ncVsFtStatsChart: ApexOptions = {
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
  series : [],
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
    categories: []
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
export const firstTimersStatsChart : ApexOptions = {
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
  series : [],
  stroke : {
    curve: 'smooth'
  },
  tooltip: {
    followCursor: true,
    theme       : 'dark'
  },
  xaxis  : {
    type      : 'category',
    categories: []
  },
  yaxis  : {
    labels: {
      formatter: (val) => {
        return val.toString();
      }
    }
  }
};

export const connectionStatusChart: ApexOptions = {
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
  colors     : ['#805AD5', '#B794F4', '#4051C1'],
  labels     : [],
  plotOptions: {
    pie: {
      customScale  : 0.9,
      expandOnClick: false,
      donut        : {
        size: '70%'
      }
    }
  },
  series     : [],
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

export const genderChart: ApexOptions = {
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
  colors     : ['#319795', '#4FD1C5', '#9AC2C5'],
  labels     : [],
  plotOptions: {
    pie: {
      customScale  : 0.9,
      expandOnClick: false,
      donut        : {
        size: '70%'
      }
    }
  },
  series     : [],
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

export const  ageChart: ApexOptions = {
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
  colors     : ['#DD6B20', '#F6AD55', '#F1CD55'],
  labels     : [],
  plotOptions: {
    pie: {
      customScale  : 0.9,
      expandOnClick: false,
      donut        : {
        size: '70%'
      }
    }
  },
  series     : [],
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
