import React, { useState } from "react";
import { Carousel } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom'; 

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpass, setConfirmPass] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8081/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.success) {
        console.log('Login successful:', data);
        // Handle login success (e.g., store the token, redirect, etc.)
        navigate('/list-item');
      } else {
        console.error('Login failed:', data.error);
        // Handle login failure
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network error
    }
  };

    return (
      <>
        {/* BIG CONTAINER */}
        <div className="bg-cover bg-no-repeat bg-center h-screen" style={{backgroundImage: 'url("src/assets/images/background.jpeg")'}}>
        <div className="flex items-center justify-center h-screen ">
            <div className="mx-auto lg:max-w-screen-xl overflow-y-auto rounded-lg bg-white shadow-lg md:shadow-xl" style={{ height: '90%', width: '55%'}}>
                {/* TITLE */}
                <div className="flex min-h-full flex-1 flex-col px-6 py-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                        className="mx-auto h-20 w-auto"
                        src="src/assets/images/logo_circle.png"
                        alt="Lakoo Logo"
                        />
                        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Register a New Account
                        </h2>
                    </div>

                <div>
                    <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                        <div className="flex justify-between mt-5">
                        <div className="sm:mx-auto sm:max-w-sm" style={{ width: '45%' }}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Username
                                </label>

                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="username"
                                        autoComplete="username"
                                        required
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
            
                            <div>
                                <div className="flex items-center justify-between mt-4">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                </div>
                                
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mt-4">
                                <label htmlFor="confirmpass" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm Password
                                </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="confirmpass"
                                        name="confirmpass"
                                        type="confirmpass"
                                        autoComplete="confirmpass"
                                        required
                                        onChange={(e) => setConfirmPass(e.target.value)}
                                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mt-4">
                                <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                                    First Name
                                </label>
                                </div>
                                <div className="mt-2">
                                <input
                                    id="firstname"
                                    name="firstname"
                                    type="firstname"
                                    autoComplete="firstname"
                                    required
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mt-4">
                                <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last Name
                                </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="lastname"
                                        name="lastname"
                                        type="lastname"
                                        autoComplete="lastname"
                                        required
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="sm:mx-auto sm:max-w-s" style={{ width: '45%' }}>
                            <div>
                                <label htmlFor="number" className="block text-sm font-medium leading-6 text-gray-900">
                                    Phone Number
                                </label>

                                <div className="mt-2">
                                    <input
                                        id="number"
                                        name="number"
                                        type="number"
                                        autoComplete="number"
                                        required
                                        onChange={(e) => setNumber(e.target.value)}
                                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
            
                            <div>
                                <div className="flex items-center justify-between mt-4">
                                    <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                        Street Address
                                    </label>
                                </div>
                                
                                <div className="mt-2">
                                    <input
                                        id="address"
                                        name="address"
                                        type="address"
                                        autoComplete="address"
                                        required
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mt-4">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    City
                                </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="city"
                                        name="city"
                                        type="city"
                                        autoComplete="city"
                                        required
                                        onChange={(e) => setCity(e.target.value)}
                                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mt-4">
                                <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                    State/Province
                                </label>
                                </div>
                                <div className="mt-2">
                                <input
                                    id="state"
                                    name="state"
                                    type="state"
                                    autoComplete="state"
                                    required
                                    onChange={(e) => setState(e.target.value)}
                                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mt-4">
                                <label htmlFor="zip" className="block text-sm font-medium leading-6 text-gray-900">
                                    ZIP/Postal Code
                                </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="zip"
                                        name="zip"
                                        type="zip"
                                        autoComplete="zip"
                                        required
                                        onChange={(e) => setZip(e.target.value)}
                                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        </div>
                        
                        <div>
                            <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                            Create Account
                            </button>
                        </div>
                    </form>
        
                    <p className="mt-5 text-center text-sm text-gray-500">
                    Already a member?{' '}
                    <a href="#" className="font-semibold leading-6 text-red-900 hover:text-red-600">
                        Sign in here
                    </a>
                    </p>
                </div>
                </div>
            </div>
            </div>
            </div>
      </>
    )
  }
  