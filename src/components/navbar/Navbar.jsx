import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation(); // Get current route
  const Navigate = useNavigate();
  // const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isLoggedIn = useSelector((state) => state.isLoggedIn) || localStorage.getItem("isLoggedIn") === "true";

  // const logout = (e) => {
  //   e.preventDefault();
  //   dispatch(authActions.logout());
  //   localStorage.removeItem("isLoggedIn"); // Clear login state from local storage
  //   Navigate("/");

  // };

  const logout = () => {
    sessionStorage.removeItem("id");  // Clear the user ID
    localStorage.removeItem("isLoggedIn");  // Clear login state
    dispatch(authActions.logout());
    Navigate('/');
  };
  
  

  const navItems = isLoggedIn
    ? [
        { name: 'Home', path: '/' },
        { name: 'Post', path: '/post' },
        {name: 'allPost', path:'/allPost'},
        { name: 'AddPost', path: '/addPost' },
        { name: 'Logout', path: '/logout', onClick: logout, },
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'Login', path: '/login' },
        { name: 'Signup', path: '/signup' },
      ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-around sm:items-stretch sm:justify-around">
            <div className="flex flex-shrink-0 items-left">
              <h1 className='text-white text-2xl'>PostApp</h1>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={item.onClick} // Call logout function if defined
                    className={classNames(
                      location.pathname === item.path
                        ? 'bg-slate-100 text-gray-900'
                        : 'text-white hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2 flex flex-col justify-center items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={item.onClick} // Call logout function if defined
              className={classNames(
                location.pathname === item.path
                  ? 'bg-slate-100 text-gray-900'
                  : 'text-white hover:bg-gray-700 hover:text-white',
                'rounded-md px-3 py-2 w-full text-sm text-center font-medium'
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;
