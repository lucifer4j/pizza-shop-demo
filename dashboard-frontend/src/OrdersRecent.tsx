import Table from 'react-bootstrap/Table';

type OrdersRecentProps = {
  orders: Order[];
}

function OrdersRecent({ orders }: OrdersRecentProps) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Order Time</th>
          <th>Status</th>
          <th>Price</th>
          <th>User</th>
          <th>Products Ordered</th>
          <th>Total Quantity</th>
        </tr>
      </thead>
      <tbody>
      {orders.map(order => <tr key={`${order.dateTime}-${order.userId}`}>
        <td>{order.dateTime}</td>
        <td>{order.status}</td>
        <td>{order.price}</td>
        <td>{order.userId}</td>
        <td>{order.productsOrdered}</td>
        <td>{order.totalQuantity}</td>
      </tr>)}
      </tbody>
    </Table>
  );
}

export default OrdersRecent;