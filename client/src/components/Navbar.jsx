import { useState, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const location = useLocation();
  const [showNav, setShowNav] = useState(false);

  return (
    <nav className='bg-white py-4 px-4 dark:bg-gray-900 md:px-4 md:py-2'>
      <div className='container mx-auto flex max-w-7xl flex-wrap items-center justify-between md:flex-nowrap'>
        <a href='/' className='flex items-center'>
          <img src='/pokemart.png' className='h-11' alt='Flowbite Logo' />
        </a>
        <div className='flex md:order-2'>
          <button
            onClick={() => setShowNav(!showNav)}
            type='button'
            className='inline-flex items-center rounded-lg p-2 text-sm text-gray-500 dark:text-gray-400 focus:dark:text-white md:hidden'>
            <MagnifyingGlassIcon className='h-6 w-6 text-gray-700 dark:text-gray-500' />
            <span className='sr-only'>Search</span>
          </button>
          <div className='relative hidden md:block'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <MagnifyingGlassIcon className='h-5 w-5 text-gray-700 dark:text-gray-500' />
            </div>
            <input
              type='text'
              id='search-navbar'
              autoComplete='false'
              autoCorrect='false'
              className='block w-full rounded-md bg-slate-100 p-2 pl-10 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
              placeholder='Search...'
            />
          </div>
          <div className='flex items-center space-x-2 md:ml-4'>
            <Menu as='div' className='relative flex items-center'>
              <Menu.Button className='relative'>
                <UserIcon className='h-6 w-8 text-gray-700 dark:text-gray-500 hover:dark:text-white' />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter='transform ease-out duration-100'
                enterFrom='transform scale-95'
                enterTo='transform scale-100'
                leave='transition duration-75 ease-in'
                leaveFrom='transform scale-100'
                leaveTo='transform scale-95'>
                <Menu.Items className='absolute right-0 z-30 mt-80 w-64 rounded-md bg-white shadow drop-shadow-md dark:bg-gray-700 md:right-0 md:mt-80'>
                  <div className='w-full py-[15px] px-[25px]'>
                    <div className='py-3'>
                      <h3 className='mb-5 text-center text-sm font-semibold text-sky-500'>
                        Login to my Account
                      </h3>
                      <p className='text-center text-xs font-light tracking-tighter text-gray-700 dark:text-white'>
                        Enter your email and password.
                      </p>
                      <form action=''>
                        <input
                          type='email'
                          placeholder='Email'
                          className='peer/email mt-4 w-full rounded-md border border-gray-500 bg-transparent py-2 px-2 text-xs tracking-tight text-gray-700 outline-none dark:text-white'
                        />
                        <p className='mt-1 hidden text-[10px] tracking-tight text-pink-500 peer-invalid/email:block'>
                          Please supply a valid email address.
                        </p>
                        <input
                          type='passsword'
                          placeholder='Password'
                          className='peer/email mt-2.5 w-full rounded-md border border-gray-500 bg-transparent py-2 px-2 text-xs tracking-tight text-gray-700 outline-none dark:text-white'
                        />
                      </form>
                      <button className='text-bold mt-5 w-full rounded-sm bg-blue-500 py-2 text-center text-xs tracking-tight text-white'>
                        Login
                      </button>
                      <div className='mt-5'>
                        <p className='text-center text-[10px] font-semibold tracking-tight text-gray-700 dark:text-white'>
                          New customer?
                          <a href='/' className='ml-1 text-sky-500'>
                            Create your account
                          </a>
                        </p>
                        <p className='mt text-center text-[10px] font-semibold tracking-tight text-gray-700 dark:text-white'>
                          Lost password?
                          <a href='/' className='ml-1 text-sky-500 '>
                            Recover password
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <Menu as='div' className='relative flex items-center'>
              <Menu.Button className='relative'>
                <ShoppingBagIcon className='h-6 w-8 text-gray-700 dark:text-gray-500 hover:dark:text-white' />
                <div className='text-dark absolute -top-2 -right-2 inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-[9px] font-bold dark:border-gray-900'>
                  0
                </div>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter='transform ease-out duration-100'
                enterFrom='transform scale-95'
                enterTo='transform scale-100'
                leave='transition duration-75 ease-in'
                leaveFrom='transform scale-100'
                leaveTo='transform scale-95'>
                <Menu.Items className='absolute right-0 z-30 mt-80 w-64 rounded-md bg-white shadow drop-shadow-md dark:bg-gray-700 md:right-0 md:mt-80'>
                  <div className='w-full py-4 px-8'>
                    <p className='text-center text-lg font-semibold tracking-tight'>
                      <span className='text-gray-800 dark:text-white'>
                        Shopping Cart
                      </span>
                    </p>
                    <div className='p-4'>
                      <p className='text-center text-sm font-medium tracking-tight text-gray-700 dark:text-slate-50'>
                        There's nothing here...
                      </p>
                    </div>
                    <div className='space-y-2'>
                      <button className='w-full rounded-sm bg-slate-100 py-2 px-4 text-xs font-medium tracking-tight text-gray-700'>
                        View Cart
                      </button>
                      <button className='w-full rounded-sm bg-blue-500 py-2 px-4 text-xs font-medium tracking-tight text-white'>
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <button
            onClick={() => setShowNav(!showNav)}
            type='button'
            className='inline-flex items-center rounded-lg p-2 text-sm text-gray-500 dark:text-gray-400 focus:dark:text-white md:hidden'>
            <span className='sr-only'>Open menu</span>
            <Bars3Icon className='h-8 w-8 text-gray-700 dark:text-gray-500' />
          </button>
        </div>
        <div
          className={`${
            showNav ? '' : 'hidden'
          } w-full items-center justify-between md:order-1 md:flex md:w-auto`}
          id='navbar-search'>
          <div className='relative mt-3 md:hidden'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <MagnifyingGlassIcon className='h-5 w-5 text-gray-500' />
            </div>
            <input
              type='text'
              id='search-navbar'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
              placeholder='Search...'
            />
          </div>
          <ul className='mt-4 flex flex-col space-y-1 rounded-lg border border-gray-100 bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-y-0 md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900'>
            <li>
              <Link
                to='/'
                className={
                  location.pathname === '/' ? 'btn-navbar-active' : 'btn-navbar'
                }>
                Home
              </Link>
            </li>
            <li>
              <Link
                to={'/products'}
                className={
                  location.pathname === '/products'
                    ? 'btn-navbar-active'
                    : 'btn-navbar'
                }>
                Items
              </Link>
            </li>
            <li>
              <Link
                to='/services'
                className={
                  location.pathname === '/services'
                    ? 'btn-navbar-active'
                    : 'btn-navbar'
                }>
                Services
              </Link>
            </li>
            <li>
              <Link
                to='/pokemon'
                className={
                  location.pathname === '/pokemon'
                    ? 'btn-navbar-active'
                    : 'btn-navbar'
                }>
                Pokémon
              </Link>
            </li>
            <li>
              <Link
                to='/abilities'
                className={
                  location.pathname === '/abilities'
                    ? 'btn-navbar-active'
                    : 'btn-navbar'
                }>
                Abilities
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
