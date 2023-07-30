import React, {useEffect, useState} from 'react';
import OrdersRecent from "./OrdersRecent";
import {queryDashboard} from "./API";
import OrdersInfo from "./OrdersInfo";
import OrdersRevenue from "./OrdersRevenue";
import {Container} from "react-bootstrap";
import OrdersPopular from "./OrdersPopular";

function App() {
    const [dashboard, setDashboard] = useState<Dashboard>({
        ordersInfo: undefined,
        ordersRecent: [],
        ordersRevenue: [],
        mostPopularItems: [],
        mostPopularCategories: []
    });
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

    useEffect(() => {
        // for the first time, query immediately
        queryDashboard()
            .then(dashboard => setDashboard(dashboard))
            .then(() => setLastUpdated(new Date()));

        const interval = setInterval(() => {
            queryDashboard()
                .then(dashboard => setDashboard(dashboard))
                .then(() => setLastUpdated(new Date()));
        }, 15000)

        return () => clearInterval(interval);
    }, []);

    return (
        <Container className="d-flex flex-column gap-3 p-5 w-100" style={{maxWidth: "100%"}}>
            <div>
                <h1>All About That Dough Dashboard 🍕</h1>
                <p>Last updated: {lastUpdated.toLocaleString()}</p>
            </div>
            <OrdersInfo ordersInfo={dashboard.ordersInfo}/>
            <OrdersRevenue orderStats={dashboard.ordersRevenue}/>
            <OrdersPopular items={dashboard.mostPopularItems} categories={dashboard.mostPopularCategories} />
            <OrdersRecent orders={dashboard.ordersRecent}/>
        </Container>
    );
}

export default App;
