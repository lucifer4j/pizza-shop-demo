import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import Metric from "./Metric";

type OrdersInfoProps = {
    orderInfo?: OrderInfo
};

function OrdersInfo({orderInfo}: OrdersInfoProps) {
    return (
        <Row>
          <Col>
              <Metric label="Orders" current={orderInfo?.events1Min} previous={orderInfo?.events1Min2Min} />
          </Col>
          <Col>
              <Metric label="Revenue" current={orderInfo?.total1Min} previous={orderInfo?.total1Min2Min} />
          </Col>
        </Row>
    );
}

export default OrdersInfo;
