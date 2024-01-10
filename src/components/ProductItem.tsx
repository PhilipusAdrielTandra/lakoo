import clsx from "clsx";
import { Link } from 'react-router-dom';

function ProductItem( {product} ) {
    return (
        <div className="w-full flex items-center justify-between border border-slate-400 p-2 mb-1">
            <div className={clsx('ps-2')}>{product.name}</div>
            <Link to={`/detail/${product._id}`} className='btn btn-secondary text-xs'>Detail</Link>
        </div>
    )
}

export default ProductItem;