import React from 'react';
import ProgressItem from './ProgressItem';

const ProgressList = ({ products }) => {
    if (!products.length) {
        return <p className="text-center text-gray-600">No submissions found.</p>;
      }
    
    return (
        <div className="submission-list" >
            {products.map(product => (
                <ProgressItem key={product._id} product={product} />
            ))}
        </div>
    );
};

export default ProgressList;
