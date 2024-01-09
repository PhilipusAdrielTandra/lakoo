
import { useEffect, useState } from 'react';
import ProductItem from '../components/ProductItem';


export default function ProductList() {

    const [products, setProducts] = useState([])

    useEffect(() => {

        async function fetchData() {
            try {
                const response = await fetch('http://localhost:8081/products'); // Replace '/api/products' with your actual API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        
        fetchData();
    })

    if (products && products.length > 0) {
        return (
            <div className='w-full flex flex-col items-center justify-center '>
                {
                    products.map((product) => {
                        return <ProductItem key={product._id} product={product} />
                    })
                }
            </div>
        )
    } else {
        return (
            <div className="w-full text-center border border-slate-400 p-3">
                Data is empty
            </div>
        )
    }
}