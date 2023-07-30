import Table from 'react-bootstrap/Table';

type MostPopularItemsProps = {
    items: PopularItem[];
}

function MostPopularItems({items}: MostPopularItemsProps) {
    return (
        <div>
            <h3>Most Popular Items</h3>
            <Table striped hover>
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Image</th>
                    <th>Orders</th>
                    <th>Quantity</th>
                </tr>
                </thead>
                <tbody>
                {items.map(item => <tr key={item.product}>
                    <td>{item.product}</td>
                    <td><img src={item.image} width="60" alt={item.product}/></td>
                    <td>{item.orders}</td>
                    <td>{item.quantity}</td>
                </tr>)}
                </tbody>
            </Table>
        </div>
    );
}

export default MostPopularItems;