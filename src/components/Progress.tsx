import React, { useState, useEffect } from 'react';
import ProgressList from './ProgressList';

const Progress = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const token = localStorage.getItem('accessToken');
          if (!token) {
            console.error('No token found');
            return;
          }

          // Assuming you have the user's ID stored, for example in localStorage
          const userId = localStorage.getItem('userId');
          if (!userId) {
            console.error('No user ID found');
            return;
          }

          console.log("Token:", token)
          console.log("UserId: ", userId)

          const response = await fetch(`http://localhost:8081/products/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const productsData = await response.json();
            console.log(productsData);
            setProducts(productsData);
          } else {
            console.error('Error fetching products:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchProducts();
  }, []);

  return (
      <div className="progress-page">
        <h2 className="text-base font-semibold leading-7 text-gray-900 text-xl">List an item</h2>
        <ProgressList products={products} />
      </div>
  );
};

// function Progress() {
  
//   return (
//     <div className="bg-cover bg-no-repeat bg-center h-screen" style={{backgroundImage: 'url("src/assets/images/background.jpeg")'}}>
//       <div className="text-center">
//       <h1 className="mb-12 pt-40 text-6xl font-semibold text-red-700" style={{ textShadow: '5px 5px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black' }}>
//         Progress here
//       </h1>
    
//       </div>
//     </div>

//   );
// }

export default Progress;