import { PhotoIcon } from '@heroicons/react/24/solid';
import Select from 'react-select';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'



const style_opt = [
  { value: 'streetwear', label: 'Streetwear' },
  { value: 'goth', label: 'Goth' },
  { value: 'y2k', label: 'Y2K' },
  { value: 'coquette', label: 'Coquette' },
  { value: 'bohemian', label: 'Bohemian' },
  { value: 'vintage', label: 'Vintage' },
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'athleisure', label: 'Athleisure' },
  { value: 'preppy', label: 'Preppy' },
  { value: 'boho-chic', label: 'Boho Chic' },
  { value: 'grunge', label: 'Grunge' },
  { value: 'casual', label: 'Casual' },
  { value: 'punk', label: 'Punk' },
  { value: 'retro', label: 'Retro' },
  { value: 'edgy', label: 'Edgy' },
  { value: 'romantic', label: 'Romantic' },
  { value: 'sporty', label: 'Sporty' },
  { value: 'vibrant', label: 'Vibrant' },
  { value: 'classic', label: 'Classic' },
  { value: 'modern', label: 'Modern' },
  { value: 'chic', label: 'Chic' },
  // Add more options as needed
];

const brand_opt = [
  { value: 'gucci', label: 'Gucci' },
  { value: 'dickies', label: 'Dickies' },
  { value: 'adidas', label: 'Adidas' },
  { value: 'nike', label: 'Nike' },
  { value: 'calvin-klein', label: 'Calvin Klein' },
  { value: 'zara', label: 'Zara' },
  { value: 'versace', label: 'Versace' },
  { value: 'h&m', label: 'H&M' },
  { value: 'chanel', label: 'Chanel' },
  { value: 'puma', label: 'Puma' },
  { value: 'tommy-hilfiger', label: 'Tommy Hilfiger' },
  { value: 'louis-vuitton', label: 'Louis Vuitton' },
  { value: 'nordstrom', label: 'Nordstrom' },
  { value: 'reebok', label: 'Reebok' },
  { value: 'burberry', label: 'Burberry' },
  { value: 'balenciaga', label: 'Balenciaga' },
  { value: 'vans', label: 'Vans' },
  { value: 'fendi', label: 'Fendi' },
  { value: 'converse', label: 'Converse' },
  { value: 'prada', label: 'Prada' },
  { value: 'under-armour', label: 'Under Armour' },
  // Add more options as needed
]

const category_opt = [
  { value: 'tops', label: 'Tops' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'jacket', label: 'Jacket' },
  { value: 'dress', label: 'Dress' },
  { value: 'shoes', label: 'Shoes' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'swimwear', label: 'Swimwear' },
  { value: 'activewear', label: 'Activewear' },
  { value: 'outerwear', label: 'Outerwear' },
  { value: 'sweaters', label: 'Sweaters' },
  { value: 'pants', label: 'Pants' },
  { value: 'skirts', label: 'Skirts' },
  { value: 'hats', label: 'Hats' },
  { value: 'bags', label: 'Bags' },
  { value: 'sunglasses', label: 'Sunglasses' },
  { value: 'watches', label: 'Watches' },
  { value: 'scarves', label: 'Scarves' },
  { value: 'belts', label: 'Belts' },
  { value: 'socks', label: 'Socks' },
  // Add more options as needed
]

const condition_opt = [
  { value: 'brandnew', label: 'Brand New - unused with original packaging or tags' },
  { value: 'likenew', label: 'Like New - mint condition pre-owned or new without tags' },
  { value: 'used', label: 'Used - lightly used but no noticeable flaws' },
  // Add more options as needed
]

const ProductForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    brand: '',
    condition: '',
    style: '',
    price: '',
    status: 'Pending',
    image: '',
  });
  const [column, setColumn] = useState(""); 
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(e.target.checked);
  };

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

  const handleSelectChange = (name: string, selectedOption: any) => {
    let value;
  
    if (Array.isArray(selectedOption)) {
      // For multi-select fields, extract values from an array of objects
      value = selectedOption.map((option) => option.value);
    } else {
      // For single-select fields, extract the value directly
      value = selectedOption ? selectedOption.value : null;
    }
  
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert('Please accept the terms and conditions.');
      return;
    }

    const token = localStorage.getItem('accessToken'); // Replace with your authentication token
    

    const form = new FormData();
    const URL = `https://drive.google.com/drive/folders/${formData.image}`
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('category', formData.category);
    form.append('brand', formData.brand);
    form.append('condition', formData.condition);
    form.append('style', formData.style);
    form.append('price', formData.price);
    form.append('status', formData.status);
    form.append('image', URL);

    try {
      const response = await axios.post('http://localhost:8081/products', form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Product inserted successfully', response.data);
      navigate('/success');
      // Add any additional handling or redirection logic here
    } catch (error) {
      console.error('Failed to insert product', error);
      // Handle error, display an error message, etc.
    }
  };

  return (
    <form className="form m-11" onSubmit={handleSubmit}>
      <div className="px-24">
      <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">List an item</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
      {/* <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
      </label> */}
       
      <div className="col-span-full">
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
          Name
        </label>
        <div className="mt-2">
          <textarea
            id="name"
            name="name"
            rows={1} 
            className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
            defaultValue={''}
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleInputChange} />
      </label> */}

      <div className="col-span-full">
        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900 mt-2">
          Description
        </label>
        <div className="mt-2">
          <textarea
            id="about"
            name="description"
            rows={3}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
            defaultValue={''}
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <p className="mt-3 text-sm leading-6 text-gray-600">e.g. small grey Nike t-shirt, only worn a few times.</p>
      </div>

      {/* <label>
        Category:
        <input type="text" name="category" value={formData.category} onChange={handleInputChange} />
      </label> */}

      <div className="sm:col-span-3 py-3">
        <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
        Category
        </label>
        <div className="mt-2">
            <Select
              id="style"
              name="category"
              options={category_opt}
              className="basic-multi-select"
              classNamePrefix="select"
              maxMenuHeight={150}
              closeMenuOnSelect={false}
              onChange={(selectedOption) => handleSelectChange("category", selectedOption)}
            />
        </div>
      </div>

      {/* <label>
        Brand:
        <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} />
      </label> */}
      <div className="sm:col-span-3 py-3">
        <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
        Brand
        </label>
          <div className="mt-2">
            <Select
              id="style"
              name="brand"
              options={brand_opt}
              className="basic-multi-select"
              classNamePrefix="select"
              maxMenuHeight={150}
              closeMenuOnSelect={false}
              onChange={(selectedOption) => handleSelectChange("brand", selectedOption)}
            />
        </div>
      </div>

      {/* <label>
        Condition:
        <input type="text" name="condition" value={formData.condition} onChange={handleInputChange} />
      </label> */}
      <div className="sm:col-span-3 py-3">
        <label htmlFor="condition" className="block text-sm font-medium leading-6 text-gray-900">
        Condition
        </label>
        <div className="mt-2">
          <Select
            id="style"
            name="condition"
            options={condition_opt}
            className="basic-multi-select"
            classNamePrefix="select"
            maxMenuHeight={150}
            closeMenuOnSelect={false}
            onChange={(selectedOption) => handleSelectChange("condition", selectedOption)}
          />  
        </div>
      </div>

      {/* <label>
        Style:
        <input type="text" name="style" value={formData.style} onChange={handleInputChange} />
      </label> */}
      <div className="sm:col-span-3 py-3">
        <label htmlFor="style" className="block text-sm font-medium leading-6 text-gray-900">
          Style
        </label>
        <div className="mt-2">
          <Select
            id="style"
            name="style"
            options={style_opt}
            isMulti
            className="basic-multi-select"
            classNamePrefix="select"
            maxMenuHeight={150}
            closeMenuOnSelect={false}
            onChange={(selectedOption) => handleSelectChange("style", selectedOption)}
          />
        </div>
        <p className="mt-3 text-sm leading-6 text-gray-600">Pick relevant tags to describe this item's style. Add up to 3.</p>
      </div>

      {/* <label>
        Price:
        <input type="text" name="price" value={formData.price} onChange={handleInputChange} />
      </label> */}
      <div className="sm:col-span-3 py-3">
        <label htmlFor="item-price" className="block text-sm font-medium leading-6 text-gray-900">
          Item Price
        </label>
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">IDR</span>
              <input
                type="text"
                name="price"
                id="item-price"
                autoComplete="item-price"
                pattern="[0-9]*"
                inputMode="numeric"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="0,00"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">This is only a starting price. Admins can negotiate based on the quality.</p>
          </div>
        </div>

      {/* <label>
        Status:
        <input type="text" name="status" value={formData.status} onChange={handleInputChange} />
      </label> */}


{/* 
      <label>
        Image:
        <input type="file" name="image" onChange={handleImageChange} />
      </label> */}

      <div className="col-span-full py-3">
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
          Images:
        </label>
        <p className="mt-3 text-sm leading-6 text-gray-600">Please upload all photos (front and back, in clear natural light, showing any possible defects) to a <a href="https://www.google.com/drive/" className="text-red-700 hover:text-red-500 hover:underline font-bold">Google Drive folder</a>.</p> 
        <p className="mt-3 text-sm leading-6 text-gray-600">e.g. <a href="https://drive.google.com/drive/folders/1DODTsr8lxk3szSdpexTIiYD7C5W_RGVk?usp=sharing" className="text-red-700 hover:text-red-500 hover:underline">https://drive.google.com/drive/folders/1DODTsr8lxk3szSdpexTIiYD7C5W_RGVk?usp=sharing</a></p> 
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">https://drive.google.com/drive/folders/</span>
                <input
                  type="text"
                  name="image"
                  id="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
        </div>
      </div>

      {/* Terms and Conditions Checkbox */}
      <div className="mt-8 flex justify-between items-center">
        <label className="flex items-center space-x-2">
            <input 
                type="checkbox" 
                checked={termsAccepted} 
                onChange={handleTermsChange}
                className="form-checkbox h-5 w-5 text-red-600 mr-3" 
            />
            <span className="text-sm text-gray-700">
                I accept that the information is correct and I give consent to provide information.
            </span>
        </label>
        <div className="flex items-center gap-x-6">
            <button
                type="submit"
                className="rounded-md bg-red-600 px-10 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Submit
            </button>
        </div>
      </div>

      
      {/* <button type="submit">Submit</button> */}
    </div>
    </div>
    </div>
    </div>
    </form>
  );
};

export default ProductForm;