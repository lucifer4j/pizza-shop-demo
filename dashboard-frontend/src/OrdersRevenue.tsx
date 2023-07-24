import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Chart from "./Chart";
import React from "react";

type OrdersRevenueProps = {
    orderStats: OrderStat[]
};

function OrdersRevenue({orderStats}: OrdersRevenueProps) {
    const ordersSerie = orderStats.map(item => ({'x': item.dateMin, 'y': item.orders}));
    const revenueSerie = orderStats.map(item => ({'x': item.dateMin, 'y': item.revenue}));

    return (
        <Row style={{height: "50vh"}}>
            <Col>
                <Chart
                    name="Total Orders"
                    color="purpleRed_green"
                    id="orders"
                    stats={ordersSerie}
                />
            </Col>
            <Col>
                <Chart
                    name="Total Revenue (in 1K $)"
                    color="spectral"
                    id="revenue"
                    stats={revenueSerie}
                    yAxisFormat={value => (value as number) / 1000}
                />
            </Col>
        </Row>
    );
}

export default OrdersRevenue;
