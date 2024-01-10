import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 

export default function Success() {
    const navigate = useNavigate();

    const handleReturn = () => {
      navigate('/form');
    };

    return (
      <>
        <div className="bg-cover bg-no-repeat bg-center h-screen" style={{backgroundImage: 'url("src/assets/images/background.jpeg")'}}>
        <div className="flex flex-col lg:flex-row items-center justify-center h-screen">
          <div className="mx-auto max-w-full lg:max-w-screen-xl rounded-lg overflow-hidden">
            <div className="min-h-full px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                  className="mx-auto h-50 w-auto"
                  src="src/assets/images/thankyou.png"
                  alt="Thank you for choosing us image"
                />
                <div className="mt-5">
                    <button
                      onClick={handleReturn}
                      className="flex w-full justify-center rounded-md bg-red-800 px-3 py-1.5 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Return
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </>
    )
  }
  