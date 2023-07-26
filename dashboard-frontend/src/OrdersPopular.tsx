import Table from 'react-bootstrap/Table';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MostPopularItems from "./MostPopularItems";
import MostPopularCategories from "./MostPopularCategories";
import React from "react";

type OrdersPopularProps = {
    items: PopularItem[];
    categories: PopularCategory[];
}

function OrdersPopular({items, categories}: OrdersPopularProps) {
    return (
        <Row>
            <Col className="h-100">
                <MostPopularItems items={items}/>
            </Col>
            <Col className="h-100">
                <MostPopularCategories categories={categories}/>
            </Col>
        </Row>
    );
}

export default OrdersPopular;