import Col from "react-bootstrap/Col";
import Chart from "./Chart";
import React from "react";
import Row from "react-bootstrap/Row";

type OrdersRevenueProps = {
    orderStats: OrderStat[]
};

function OrdersRevenue({orderStats}: OrdersRevenueProps) {
    const ordersSerie = orderStats.map(item => ({'x': item.dateMin, 'y': item.orders}));
    const revenueSerie = orderStats.map(item => ({'x': item.dateMin, 'y': item.revenue}));

    return (
        <Row className="gx-5">
            <Col>
                <p>Orders per minute</p>
                <div className="h-50" style={{minHeight: "50vh"}}>
                    <Chart
                        name="Total Orders"
                        color="purpleRed_green"
                        id="orders"
                        stats={ordersSerie}
                    />
                </div>
            </Col>
            <Col>
                <p>Revenue per minute</p>
                <div className="h-50" style={{minHeight: "50vh"}}>
                    <Chart
                        name="Total Revenue (in 1K $)"
                        color="spectral"
                        id="revenue"
                        stats={revenueSerie}
                        yAxisFormat={value => (value as number) / 1000}
                    />
                </div>
            </Col>
        </Row>
    );
}

export default OrdersRevenue;
