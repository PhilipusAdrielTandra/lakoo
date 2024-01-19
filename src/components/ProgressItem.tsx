import React, { useState } from 'react';

const steps = ['Pending', 'In Review', 'Accepted', 'Dispatched'];

const ProgressItem = ({ product }) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    // Function to toggle expansion
    const toggleExpansion = () => {
      setIsExpanded(!isExpanded);
    };
  
    // // Function to determine progress step based on status
    // const getProgressStep = (status) => {
    //   switch (status) {
    //     case 'pending':
    //       return 1;
    //     case 'accepted':
    //       return 2;
    //     case 'rejected':
    //       return 2;
    //     case 'dispatched':
    //       return 3;
    //     default:
    //       return 0;
    //   }
    // };

    const getProgressStep = (status) => {
        return steps.indexOf(status.charAt(0).toUpperCase() + status.slice(1));
      };
    
    const currentStep = getProgressStep(product.status);
  
    // const progressStep = getProgressStep(product.status);
  
    return (
      <div className="flex flex-col bg-white shadow-md rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">ID: {product._id}</p>
            <p className="text-lg font-semibold">{product.name}</p>
          </div>
          <button
            onClick={toggleExpansion}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          >
            {isExpanded ? 'Hide Details' : 'Track My Status'}
          </button>
        </div>

        {/* Deets */}
        {isExpanded && (
          <div className="mt-4">
            {/* <div className="flex items-center">
              <div className={`w-1/${3-progressStep} bg-green-500 h-2 rounded-full transition-width duration-300`}></div>
              <div className={`flex-1 bg-gray-300 h-2 rounded-full`}></div>
            </div> */}

            <div className="relative flex justify-between mb-4 w-full max-w-md mx-auto">
                {steps.map((label, index) => {
                    let stepState = '';
                    if (index < currentStep) stepState = 'completed';
                    if (index === currentStep) stepState = 'in-progress';

                    // Adjust line style based on stepState
                    const lineStyle = index <= currentStep ? 'bg-blue-500' : 'bg-gray-300';

                    return (
                        <div key={label} className="text-center py-2 flex flex-col">
                            <div className={`w-5 h-5 rounded-full mx-auto mb-1 flex items-center justify-center ${stepState === 'completed' ? 'bg-green-500' : stepState === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'}`}>
                                {stepState === 'completed' && (
                                <svg className="w-3 h-3 text-white mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                )}
                            </div>
                            <span className="text-sm font-semibold">{label}</span>
                            <span className="text-xs text-gray-500">{stepState.replace('-', ' ')}</span>
                        </div>
                    );
                })}
            </div>

            <div className="mt-4">
              {/* Additional product details */}
              <p>Status: {product.status}</p>
              <p>Description: {product.description}</p>
              {/* ... other details */}
            </div>
          </div>
        )}
      </div>
    );
  };

export default ProgressItem;