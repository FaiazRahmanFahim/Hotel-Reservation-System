export class DashboardStatsDTO {
    totalBookings: number;
    totalRevenue: number;
    totalCustomers: number;
    monthlyRevenue: MonthlyRevenueDTO[];
}

export class MonthlyRevenueDTO {
    month: string;
    revenue: number;
}