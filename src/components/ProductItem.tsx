import React, { useState } from 'react';
import clsx from "clsx";

const updateProductStatus = async (productId, newStatus) => {
    try {
        const response = await fetch(`/products/edit/status/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include auth token if needed
            },
            body: JSON.stringify({ status: newStatus }),
        });

        if (response.ok) {
            console.log('Status updated successfully');
        } else {
            console.error('Failed to update status');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const Modal = ({ product, onClose }) => {
    const [statusRejected, setStatusRejected] = useState(product.status === 'Rejected');
    const [statusPending, setStatusPending] = useState(product.status === 'Pending');
    const [statusAccepted, setStatusAccepted] = useState(product.status === 'Accepted');

    const handleStatusChange = (status) => {
        // Reset all statuses
        setStatusRejected(false);
        setStatusPending(false);
        setStatusAccepted(false);

        // Set the selected status
        if (status === 'Rejected') {
            setStatusRejected(true);
        } else if (status === 'Pending') {
            setStatusPending(true);
        } else if (status === 'Accepted') {
            setStatusAccepted(true);
        }
    };

    const handleSaveChanges = async () => {
        // Call your API endpoint to update the status

        let updatedStatus = '';
        if (statusRejected) updatedStatus = 'Rejected';
        if (statusPending) updatedStatus = 'Pending';
        if (statusAccepted) updatedStatus = 'Accepted';

        try {
            const response = await fetch(`http://localhost:8081/products/edit/status/${product._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ status: updatedStatus })
            });

            if (response.ok) {
                // Handle successful update
                console.log('Status updated successfully');
                window.location.reload();
                
            } else {
                // Handle errors
                console.error('Failed to update status');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h3  className="text-center mb-3 text-xl font-bold">{product.name}</h3>

                <table className='table-detail'>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <td>{product._id}</td>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <td>{product.description}</td>
                        </tr>
                        <tr>
                            <th>Brand</th>
                            <td>{product.brand}</td>
                        </tr>
                        <tr>
                            <th>Condition</th>
                            <td>{product.condition}</td>
                        </tr>
                        <tr>
                            <th>Style</th>
                            <td>{product.style}</td>
                        </tr>
                        <tr>
                            <th>Price</th>
                            <td>{product.price}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <label className="flex items-center space-x-2">
                                <input 
                                    type="checkbox" 
                                    checked={statusRejected} 
                                    onChange={() => handleStatusChange('Rejected')}
                                />
                                Rejected
                            </label>

                            <label className="flex items-center space-x-2">
                                <input 
                                    type="checkbox" 
                                    checked={statusAccepted} 
                                    onChange={() => handleStatusChange('Accepted')}
                                />
                                Accepted
                            </label>
                        </tr>
                        <tr>
                            <th>Date/Time submitted</th>
                            <td>{product.createdAt}</td>
                        </tr>
                        <tr>
                            <th>Images</th>
                            <td>{product.img}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex justify-center mt-4">
                    <button 
                        className='btn btn-primary text-xs mr-2' 
                        onClick={handleSaveChanges}
                    >
                        Save Changes
                    </button>
                    <button 
                        className='btn btn-secondary text-xs' 
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
                {/* <button className='btn btn-secondary text-xs mt-4' onClick={onClose}>Close</button> */}
            </div>
        </div>
    );
};

export default function ProductItem({ product }) {    
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <tr className="border-b">
                <td className={clsx('p-2')}>
                    {product.name}
                </td>
                <td className="p-2">
                    {product.createdAt} 
                </td>
                <td className="p-2">
                    {product.username} 
                </td>
                <td className="p-2">
                    {product.status}
                </td>
                <td className="p-2">
                    {/* <Link to={`/detail/${product._id}`} className="btn btn-secondary text-xs">
                        Detail
                    </Link> */}
                    <button onClick={toggleModal} className="btn btn-secondary text-xs">
                        Detail
                    </button>
                    {showModal && (
                        <Modal product={product} onClose={toggleModal} />
                    )}
                </td>
        </tr>

        // <div className="w-full flex items-center justify-between border p-2 mb-1">
        //     {/* <div className={clsx('ps-2', { 'line-through': product.status })}>{product.name}</div>
        //     <Link to={`/detail/${product._id}`} className='btn btn-secondary text-xs'>Detail</Link> */}
            
        // </div>
    )
}