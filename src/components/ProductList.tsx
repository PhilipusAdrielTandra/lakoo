import React from 'react';
import ProductItem from './ProductItem';

interface Product {
    _id: string;
    name: string;
    createdAt: string;
    username: string;
    number: string;
    status: string;
    description: string;
    brand: string;
    condition: string;
    style: string;
    price: string;
    image: string;
    address: string;
    state: string;
    city: string;
    zip: string;
    firstname: string;
    lastname: string;
}

interface ProductListProps {
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    if (products && products.length > 0) {
        return (
            <div className='w-full flex flex-col items-center justify-center '>
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="p-2">Name</th>
                            <th className="p-2">Date/Time</th>
                            <th className="p-2">Username</th>
                            <th className="p-2">Phone number</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <ProductItem key={product._id} product={product} />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    } else {
        return (
            <div className="w-full text-center border border-slate-400 p-3">
                Data is empty
            </div>
        );
    }
};

export default ProductList;
