import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Example() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear the token from storage
    localStorage.removeItem('accessToken'); // or sessionStorage.removeItem('token');
    navigate('/'); // Replace '/login' with the path to your login page
};

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center p-4 px-16 bg-black">
        {/* LOGO */}
        <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-5 w-auto"
                    src="src/assets/images/logotextred.png"
                    alt="Lakoo"
                  />
        </div>
        <h1 className="text-xl font-semibold text-white">List an item</h1>

          {/* Profile dropdown */}
          <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-black hover:bg-red-700">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        {/* <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        /> */}
                        <FontAwesomeIcon icon={faUser} className="h-6 w-6 m-2 text-white"/>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/editprofile"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Update Your Account
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              onClick={handleSignOut}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
      </div>
    
  )
}
