import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    brand: '',
    condition: '',
    style: '',
    price: '',
    status: '',
    image: null,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('accessToken'); // Replace with your authentication token

    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('category', formData.category);
    form.append('brand', formData.brand);
    form.append('condition', formData.condition);
    form.append('style', formData.style);
    form.append('price', formData.price);
    form.append('status', formData.status);
    form.append('image', formData.image);

    try {
      const response = await axios.post('http://localhost:8081/products', form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Product inserted successfully', response.data);
      // Add any additional handling or redirection logic here
    } catch (error) {
      console.error('Failed to insert product', error);
      // Handle error, display an error message, etc.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
      </label>

      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleInputChange} />
      </label>

      <label>
        Category:
        <input type="text" name="category" value={formData.category} onChange={handleInputChange} />
      </label>

      <label>
        Brand:
        <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} />
      </label>

      <label>
        Condition:
        <input type="text" name="condition" value={formData.condition} onChange={handleInputChange} />
      </label>

      <label>
        Style:
        <input type="text" name="style" value={formData.style} onChange={handleInputChange} />
      </label>

      <label>
        Price:
        <input type="text" name="price" value={formData.price} onChange={handleInputChange} />
      </label>

      <label>
        Status:
        <input type="text" name="status" value={formData.status} onChange={handleInputChange} />
      </label>

      <label>
        Image:
        <input type="file" name="image" onChange={handleImageChange} />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;