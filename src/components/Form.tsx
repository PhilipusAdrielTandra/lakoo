/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { PhotoIcon } from '@heroicons/react/24/solid';
import Select from 'react-select';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

interface FormData {
  name: string;
  description: string;
  category: string;
  brand: string;
  condition: string;
  style: string;
  price: string;
  status: string;
  image: File | null;
}


const style_opt = [
  { value: 'streetwear', label: 'Streetwear' },
  { value: 'goth', label: 'Goth' },
  { value: 'y2k', label: 'Y2K' },
  { value: 'coquette', label: 'Coquette' },
  // Add more options as needed
];

const brand_opt = [
  { value: 'gucci', label: 'Gucci' },
  { value: 'dickies', label: 'Dickies' },
  // Add more options as needed
]

const category_opt = [
  { value: 'tops', label: 'Tops' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'jacket', label: 'Jacket' },
  // Add more options as needed
]

const condition_opt = [
  { value: 'brandnew', label: 'Brand New - unused with original packaging or tags' },
  { value: 'likenew', label: 'Like New - mint condition pre-owned or new without tags' },
  { value: 'used', label: 'Used - lightly used but no noticeable flaws' },
  // Add more options as needed
]

const ProductForm: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState<FormData>({
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
  const [isUser, setIsUser] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const history = useNavigate();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('brand', formData.brand);
    data.append('condition', formData.condition);
    data.append('style', formData.style);
    data.append('price', formData.price);
    data.append('status', formData.status);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const response = await axios.post('http://localhost:8081/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      console.log(response.data);
      // Handle success or redirect to product list page
    } catch (error) {
      console.error('Error posting product:', error);
      // Handle error
    }
  };
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          history('/home');
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
          if (usersData.length > 0 && usersData[0].isUser) {
              setIsUser(true);
          } else {
            // Redirect to login page or handle unauthorized access
            history('/home');
          }
        } else if (response.status === 403) {
          // Redirect to login page or handle unauthorized access
          history('/home');
        } else {
          // Handle other error cases
          console.error('Error fetching users:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    checkLogin();

  }, [history]);
  return (
    <form className="form m-11" onSubmit={handleSubmit}>
      <div className="px-24">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">List an item</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

          {/* UPLOAD PHOTOS */}
          <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Photos
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-red-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-red-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
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
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">e.g. small grey Nike t-shirt, only worn a few times.</p>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12 py-10">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Information</h2>
          {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}

          <div className="sm:col-span-3 py-3">
              <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                Category
              </label>
              <div className="mt-2">
                <Select
                  id="style"
                  name="style"
                  options={category_opt}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  maxMenuHeight={150}
                  closeMenuOnSelect={false}
                />
              </div>
          </div>

          <div className="sm:col-span-3 py-3">
              <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                Brand
              </label>
              <div className="mt-2">
                <Select
                  id="style"
                  name="style"
                  options={brand_opt}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  maxMenuHeight={150}
                  closeMenuOnSelect={false}
                />
              </div>
          </div>

          <div className="sm:col-span-3 py-3">
              <label htmlFor="condition" className="block text-sm font-medium leading-6 text-gray-900">
                Condition
              </label>
              <div className="mt-2">
                <Select
                  id="style"
                  name="style"
                  options={condition_opt}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  maxMenuHeight={150}
                  closeMenuOnSelect={false}
                />  
              </div>
          </div>

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
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">Pick relevant tags to describe this item's style. Add up to 3.</p>
          </div>

          <div className="sm:col-span-3 py-3">
              <label htmlFor="item-price" className="block text-sm font-medium leading-6 text-gray-900">
                Item Price
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">IDR</span>
                  <input
                    type="text"
                    name="item-price"
                    id="item-price"
                    autoComplete="item-price"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="0,00"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">This is only a starting price. Admins can negotiate based on the quality.</p>
              </div>
            </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12 py-10">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            We'll always let you know about important changes.
          </p>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                      Comments
                    </label>
                    <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="candidates" className="font-medium text-gray-900">
                      Candidates
                    </label>
                    <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="offers" className="font-medium text-gray-900">
                      Offers
                    </label>
                    <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                    Everything
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                    Same as email
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                    No push notifications
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6 px-24">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default ProductForm;