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
import React, { useState } from "react";
// import { TEInput, TERipple } from "tw-elements-react";
import Carousel  from "../components/Carousel"
import { useNavigate } from 'react-router-dom'; 

export default function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

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
  
        // Use the access token for subsequent requests
        const accessToken = data.accessToken;
        localStorage.setItem('accessToken', accessToken);
  
        // Handle login success (e.g., store the token, redirect, etc.)
        navigate('/form');
      } else {
        console.error('Login failed:', data.error);
        // Handle login failure
        setValidationMessage(data.error || "Login failed. Username/password incorrect.");
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network error
    }
  };;

    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
        {/*<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">*/}
        <div className="bg-cover bg-no-repeat bg-center h-screen" style={{backgroundImage: 'url("src/assets/images/background.jpeg")'}}>
        {/* BIG CONTAINER */}
        <div className="flex flex-col lg:flex-row items-center justify-center h-screen">
          <div className="mx-auto max-w-full lg:max-w-screen-xl rounded-lg overflow-hidden bg-white shadow-lg md:shadow-xl lg:flex lg:w-full" >
            {/* LOGIN SIDE */}
            <div className="flex flex-col w-full lg:w-1/2 px-16 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                  className="mx-auto h-20 w-auto"
                  src="src/assets/images/logo_circle.png"
                  alt="Lakoo Logo"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Sign in to your account
                </h2>
              </div>
      
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
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
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          setValidationMessage('');
                        }}
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
      
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                      </label>
                      <div className="text-sm">
                        <a href="#" className="font-semibold text-red-900 hover:text-red-600">
                          Forgot password?
                        </a>
                      </div>
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                          setValidationMessage('');
                        }}
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
      
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign in
                    </button>
                  </div>
                </form>

                 {/* Display validation message */}
                 {validationMessage && (
                      <div className="text-red-600">{validationMessage}</div>
                  )}
      
                <p className="mt-10 text-center text-sm text-gray-500">
                  Not a member?{' '}
                  <a href="/register" className="font-semibold leading-6 text-red-900 hover:text-red-600">
                    Register here
                  </a>
                </p>
                <p className="mt-5 text-center text-sm text-gray-500">
                  Are you an Admin?{' '}
                  <a href="/admin" className="font-semibold leading-6 text-red-900 hover:text-red-600">
                    Sign in
                  </a>
                </p>
              </div>
            </div>

            {/* CAROUSEL SIDE */}
            <div className="hidden lg:flex flex-1 flex-col w-1/2">
                  <Carousel/>
              {/* <Carousel className="flex-1">
                <img
                  src="src/assets/images/carousel1.png"
                  alt="image 1"
                  className="h-full w-full object-cover"
                />
                <img
                  src="src/assets/images/carousel2.png"
                  alt="image 2"
                  className="h-full w-full object-cover"
                />
                <img
                  src="src/assets/images/carousel3.png"
                  alt="image 3"
                  className="h-full w-full object-cover"
                />
              </Carousel> */}
            </div>
          </div>
        </div>
        </div>
      </>
    )
  }
  