import ProductItem from './ProductItem';

export default function ProductList( {products} ) {

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