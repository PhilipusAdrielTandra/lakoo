import { useState, FC } from 'react';
import clsx from 'clsx';

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

interface ModalProps {
  product: Product;
  onClose: () => void;
}

interface ProductItemProps {
  product: Product;
}

const Modal: FC<ModalProps> = ({ product, onClose }) => {
    const [statusRejected, setStatusRejected] = useState<boolean>(product.status === 'Rejected');
    const [statusPending, setStatusPending] = useState<boolean>(product.status === 'Pending');
    const [statusAccepted, setStatusAccepted] = useState<boolean>(product.status === 'Accepted');
  
    const handleStatusChange = (status: string) => {
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
                <h3  className="text-center text-xl font-bold">{product.name}</h3>

                <table className='table-detail'>
                    <tbody className='text-sm'>
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
                            <label className="flex items-center space-x-2 py-2 px-2">
                                <input 
                                    className="m-2"
                                    type="checkbox" 
                                    checked={statusRejected} 
                                    onChange={() => handleStatusChange('Rejected')}
                                />
                                Rejected
                            </label>

                            <label className="flex items-center space-x-2 py-2 px-2">
                                <input 
                                    className="m-2"
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
                            <td>
                                <a href={product.image} target="_blank" rel="noopener noreferrer" className="text-red-700 hover:text-red-900">
                                    View Image
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <th>Name of customer</th>
                            <td>{product.firstname + ' ' + product.lastname}</td>
                        </tr>
                        <tr>
                            <th>Address of customer</th>
                            <td>{product.address + ', ' + product.city + ', ' + product.state + ', ' + product.zip}</td>
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

const ProductItem: FC<ProductItemProps> = ({ product }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
  
    const toggleModal = () => {
      setShowModal(!showModal);
    };

    const getStatusColor = () => {
        switch (product.status) {
          case 'Accepted':
            return 'text-green-700';
          case 'Rejected':
            return 'text-red-700';
          case 'Pending':
            return 'text-yellow-400';
          default:
            return 'text-gray-500'; // Add a default color if status is not recognized
        }
    };

    return (
        <tr className="border-b">
                <td className={clsx('p-5')}>
                    {product.name}
                </td>
                <td className="p-5">
                    {product.createdAt} 
                </td>
                <td className="p-5">
                    {product.username} 
                </td>
                <td className="p-5">
                    {product.number} 
                </td>
                <td className={clsx('p-5', getStatusColor())}>
                    {product.status}
                </td>
                <td className="p-5">
                    <button onClick={toggleModal} className="flex justify-center rounded-md bg-red-700 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800">
                        Detail
                    </button>
                    {showModal && (
                        <Modal product={product} onClose={toggleModal} />
                    )}
                </td>
        </tr>
    )
}
export default ProductItem;
