type Order = {
    dateTime: string;
    status: string;
    price: number;
    userId: string;
    productsOrdered: number;
    totalQuantity: number;
};

type OrderStatAPI = {
    dateMin: string;
    orders: number;
    revenue: number;
}

type OrderStat = {
    dateMin: Date;
    orders: number;
    revenue: number;
}

type OrderInfo = {
    events1Min: number;
    events1Min2Min: number;
    total1Min: number;
    total1Min2Min: number;
};

type DashboardAPI = {
    ordersInfo?: OrderInfo;
    ordersRevenue?: OrderStatAPI[];
    ordersRecent?: Order[];
};

type Dashboard = {
    ordersInfo?: OrderInfo;
    ordersRevenue: OrderStat[];
    ordersRecent: Order[];
};
