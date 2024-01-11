// UserProfile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from the backend
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/');
            return;
          }

        const response = await axios.get('http://localhost:8081/users/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {userData ? (
        <div>
          <p>Username: {userData.username}</p>
          <p>First Name: {userData.firstname}</p>
          <p>Last Name: {userData.lastname}</p>
          <p>Address: {userData.address}</p>
          <p>Number: {userData.number}</p>
          <p>City: {userData.city}</p>
          <p>State: {userData.state}</p>
          <p>ZIP: {userData.zip}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
