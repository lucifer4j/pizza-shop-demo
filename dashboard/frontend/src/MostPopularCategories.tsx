import Table from 'react-bootstrap/Table';

type MostPopularCategoriesProps = {
    categories: PopularCategory[];
}

function MostPopularCategories({categories}: MostPopularCategoriesProps) {
    return (
        <div>
            <h3>Most Popular Categories</h3>
            <Table striped hover>
                <thead>
                <tr>
                    <th>Category</th>
                    <th>Orders</th>
                    <th>Quantity</th>
                </tr>
                </thead>
                <tbody>
                {categories.map(category => <tr key={category.category}>
                    <td>{category.category}</td>
                    <td>{category.orders}</td>
                    <td>{category.quantity}</td>
                </tr>)}
                </tbody>
            </Table>
        </div>
    );
}

export default MostPopularCategories;