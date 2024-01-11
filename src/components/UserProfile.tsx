import { useState } from 'react';

const UserProfile = () => {
  const userId = 'user_id_here'; // Replace with the actual user ID
  const [formData, setFormData] = useState({
    address: '',
    number: '',
    firstname: '',
    lastname: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateUser = async () => {
    try {
      const response = await fetch(`http://localhost:8081/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getTokenFromLocalStorage()}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('User updated successfully');
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Internal Server Error');
    }
  };

  const getTokenFromLocalStorage = () => {
    // Replace with your logic to retrieve the JWT token from local storage
    return localStorage.getItem('accessToken');
  };

  return (
    <div>
      <h1>User Profile</h1>
      <form>
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />

        <label htmlFor="number">Number:</label>
        <input type="text" id="number" name="number" value={formData.number} onChange={handleChange} required />

        <label htmlFor="firstname">First Name:</label>
        <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} required />

        <label htmlFor="lastname">Last Name:</label>
        <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} required />

        <label htmlFor="city">City:</label>
        <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />

        <label htmlFor="state">State:</label>
        <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} required />

        <label htmlFor="zip">ZIP Code:</label>
        <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleChange} required />

        <button type="button" onClick={updateUser}>Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
