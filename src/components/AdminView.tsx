import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from './ProductList';

function AdminView() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const history = useNavigate();

  const handleSignOut = () => {
    // Clear the access token from localStorage
    localStorage.removeItem('token');
    
    // Redirect to the login page
    history('/admin');
  };

  useEffect(() => {
    // ----------- Function to check if the user is an admin
    const checkAdminStatus = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          // Redirect to login page or handle unauthorized access
          history('/admin');
          return;
        }

        const response = await fetch('/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const usersData = await response.json();
          setUsers(usersData);

          // Check if the first user is an admin
          if (usersData.length > 0 && usersData[0].isAdmin) {
            setIsAdmin(true);
          } else {
            // Redirect to login page or handle unauthorized access
            history('/admin');
          }
        } else if (response.status === 403) {
          // Redirect to login page or handle unauthorized access
          history('/admin');
        } else {
          // Handle other error cases
          console.error('Error fetching users:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // ----------- Function to fetch data from backend
  
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          history('/login');
          return;
        }

        const response = await fetch('http://localhost:8081/products', { // Adjust the URL as per your API
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const productsData = await response.json();
          setProducts(productsData);
        } else {
          // Handle errors
          console.error('Error fetching products:', response.statusText);
        }
        } catch (error) {
          console.error('Error:', error);
        }
      };

 
    checkAdminStatus();
    fetchProducts();
    }, [history]);

  return (
    <div>
      {isAdmin && (
        <div>
          <h2>Users</h2>
          {/* ... (users table) */}
        </div>
      )}

      {/* Header Section */}
      <div className="flex justify-between items-center p-4 bg-black">
        {/* LOGO */}
        <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-5 w-auto"
                    src="src/assets/images/logotextred.png"
                    alt="Lakoo"
                  />
        </div>
        <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
        <button onClick={handleSignOut} className="text-sm bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-3 rounded">
          Sign Out
        </button>
      </div>

      <div className="mt-4 p-4 max-w-4xl mx-auto shadow-lg bg-white">
        {/* Products Table Container */}
        <div className='overflow-auto'>
          <h2 className="text-lg font-semibold mb-2">Products</h2>
          <ProductList products={products} />
        </div>
      </div>

    </div>
  );
}

export default AdminView;
