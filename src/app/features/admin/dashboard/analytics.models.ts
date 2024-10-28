interface ChurchAttendanceMonthlyTotals {
    year: number | string;
    month: number;
    totalAttendance: number;
    totalNewConverts: number | null;
    totalFirstTimers: number | null;
}

export interface ChurchAttendanceAnnualBreakdown {
    year: number | string;
    data: ChurchAttendanceMonthlyTotals[];
}

export interface DashboardCount {
  name: string;
  count: number;
}

export interface DashboardCounts {
  connectionStatus: DashboardCount[],
  gender: DashboardCount[],
  age: DashboardCount[],
}

