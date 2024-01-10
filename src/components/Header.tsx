import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'List an item', href: '#', current: true },
  { name: 'Track progress', href: '#', current: false }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear the token from storage
    localStorage.removeItem('accessToken'); // or sessionStorage.removeItem('token');
    navigate('/'); // Replace '/login' with the path to your login page
};
  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center p-4 bg-black">
        {/* LOGO */}
        <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-5 w-auto"
                    src="src/assets/images/logotextred.png"
                    alt="Lakoo"
                  />
        </div>
        <h1 className="text-xl font-semibold text-white">List an item</h1>
        <button onClick={handleSignOut} className="text-sm bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-3 rounded">
          Sign Out
        </button>
      </div>
    </div>
    
  )
}
