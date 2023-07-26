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
    average1Min: number;
    average1Min2Min: number;
};

type PopularItem = {
    product: string;
    image: string;
    orders: number;
    quantity: number;
};

type PopularCategory = {
    category: string;
    orders: number;
    quantity: number;
};

type DashboardAPI = {
    ordersInfo?: OrderInfo;
    ordersRevenue?: OrderStatAPI[];
    ordersRecent?: Order[];
    mostPopularItems?: PopularItem[];
    mostPopularCategories?: PopularCategory[];
};

type Dashboard = {
    ordersInfo?: OrderInfo;
    ordersRevenue: OrderStat[];
    ordersRecent: Order[];
    mostPopularItems: PopularItem[];
    mostPopularCategories: PopularCategory[];
};
