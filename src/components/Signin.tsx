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
import { Carousel } from "@material-tailwind/react";
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
        <div className="flex items-center justify-center h-screen">
          <div className="mx-auto max-w-full lg:max-w-screen-xl rounded-lg overflow-hidden bg-white shadow-lg md:shadow-xl">
            {/* LOGIN SIDE */}
            <div className="flex min-h-full flex-1 flex-col float-left w-1/2 px-6 py-12 lg:px-8">
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

                {/* <!-- Divider -->
                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                    <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                      OR
                    </p>
                </div>

                {/* <!-- Social login buttons -->
                <TERipple rippleColor="light" className="w-full">
                    <a
                      className="mb-3 flex w-full items-center justify-center rounded border border-red-500 px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-red-500 transition duration-150 ease-in-out hover:bg-gray-100 hover:border-red-600 hover:text-red-600 focus:bg-gray-100 focus:border-red-600 focus:text-red-600 focus:outline-none focus:ring-0 active:bg-gray-200 active:border-red-700 active:text-red-700 dark:border-red-800 dark:hover:bg-gray-200 dark:focus:bg-gray-200 dark:hover:border-red-700 dark:focus:border-red-700 dark:active:bg-gray-300 dark:active:border-red-900"
                      style={{ backgroundColor: "white" }}
                      href="#!"
                      role="button"
                    >
                      {<svg className="h-6 w-6 mr-2" 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="800px" 
                        height="800px" 
                        viewBox="-0.5 0 48 48" version="1.1"> 
                        <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> 
                        <g id="Color-" transform="translate(-401.000000, -860.000000)"> 
                        <g id="Google" transform="translate(401.000000, 860.000000)"> 
                        <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> 
                        <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> 
                        <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> 
                        <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> 
                      </svg>}
                      Continue with Google
                    </a>
                </TERipple> */}
              </div>
            </div>

            {/* CAROUSEL SIDE */}
            <div className="flex h-full flex-1 flex-col float-right w-1/2">
              <Carousel className="flex-1">
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
              </Carousel>
            </div>
          </div>
        </div>
        </div>
      </>
    )
  }
  