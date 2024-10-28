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

export interface ConnectionStatusCount {
  name: string;
  count: number;
}

