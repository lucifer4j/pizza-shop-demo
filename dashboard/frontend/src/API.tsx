function queryDashboard(): Promise<Dashboard> {
    return fetch("/api/dashboard")
        .then(response => response.json())
        .then((data: DashboardAPI) => ({
            ordersInfo: data.ordersInfo,
            ordersRevenue: data.ordersRevenue?.map((item: OrderStatAPI) => ({
                dateMin: new Date(item.dateMin),
                orders: item.orders,
                revenue: item.revenue
            })) ?? [],
            ordersRecent: data.ordersRecent ?? [],
            mostPopularItems: data.mostPopularItems ?? [],
            mostPopularCategories: data.mostPopularCategories ?? []
        }));
}

export {
    queryDashboard
};
