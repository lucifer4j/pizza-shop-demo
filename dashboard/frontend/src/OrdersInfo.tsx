import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import Metric from "./Metric";

type OrdersInfoProps = {
    ordersInfo?: OrderInfo
};

function OrdersInfo({ordersInfo}: OrdersInfoProps) {
    return (
        <div>
            <h3>Orders in the last 1 minute</h3>
            <Row>
                <Col>
                    <Metric
                        label="# of Orders"
                        current={ordersInfo?.events1Min}
                        previous={ordersInfo?.events1Min2Min}
                        isMoney={false}
                    />
                </Col>
                <Col>
                    <Metric
                        label="Revenue in $"
                        current={ordersInfo?.total1Min}
                        previous={ordersInfo?.total1Min2Min}
                        isMoney
                    />
                </Col>
                <Col>
                    <Metric
                        label="Average order value in $"
                        current={ordersInfo?.average1Min}
                        previous={ordersInfo?.average1Min2Min}
                        isMoney
                    />
                </Col>
            </Row>
        </div>
    );
}

export default OrdersInfo;
