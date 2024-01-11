import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

const UserProfileForm = () => {
  const [formData, setFormData] = useState({
    address: '',
    number: '',
    firstname: '',
    lastname: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem('accessToken'); // Replace with your authentication token
    const userId = 'replace-with-the-actual-user-id'; // Replace with the actual user ID

    try {
      const response = await axios.put(
        `http://your-api-url/users/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('User profile updated successfully', response.data);
      // Add any additional handling or redirection logic here
    } catch (error) {
      console.error('Failed to update user profile', error);
      // Handle error, display an error message, etc.
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {/* Add your form fields similar to ProductForm */}
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
      </label>

      {/* Add other form fields similarly */}

      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UserProfileForm;
