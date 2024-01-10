import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    // Function to check if the user is an admin
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

    checkAdminStatus();
  }, [history]);

  return (
    <div>
      {isAdmin && (
        <div>
          <h2>Users</h2>
          {/* ... (users table) */}
        </div>
      )}

      <h2>Products</h2>
      {/* ... (products table) */}
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default AdminView;
