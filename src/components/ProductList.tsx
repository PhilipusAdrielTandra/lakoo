import ProductItem from './ProductItem';

export default function ProductList({ products }) {

    if (products && products.length > 0) {
        return (
            <div className='w-full flex flex-col items-center justify-center '>
                {/* {
                    products.map((product) => {
                        return <ProductItem key={product._id} product={product} />
                    })
                } */}

                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="p-2">Name</th>
                            <th className="p-2">Date/Time</th>
                            <th className="p-2">Username</th>
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
        )
    } else {
        return (
            <div className="w-full text-center border border-slate-400 p-3">
                Data is empty
            </div>
        )
    }
}