import React, {useEffect, useState} from 'react';
import OrdersRecent from "./OrdersRecent";
import {queryDashboard} from "./API";
import OrdersInfo from "./OrdersInfo";
import OrdersRevenue from "./OrdersRevenue";

function App() {
    const [dashboard, setDashboard] = useState<Dashboard>({
        ordersInfo: undefined,
        ordersRecent: [],
        ordersRevenue: []
    });

    useEffect(() => {
        // for the first time, query immediately
        queryDashboard().then(dashboard => setDashboard(dashboard));

        const interval = setInterval(() => {
            queryDashboard().then(dashboard => setDashboard(dashboard));
        }, 15000)

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{textAlign: "center", padding: "24px"}}>
            <div>
                <OrdersInfo orderInfo={dashboard.ordersInfo}/>
            </div>
            <div>
                <OrdersRevenue orderStats={dashboard.ordersRevenue}/>
            </div>
            <div>
                <OrdersRecent orders={dashboard.ordersRecent}/>
            </div>
        </div>
    );
}

export default App;
