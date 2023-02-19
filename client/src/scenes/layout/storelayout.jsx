import { useEffect, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  ChevronRightIcon,
  PlusIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import { DoubleBubble } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';
import useFetchData from '../../hook/useFetchData';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Pokedex from 'pokedex-promise-v2';

const StoreLayout = () => {
  const location = useLocation();
  const { id } = useParams();
  const [itemSize, setItemSize] = useState(44);
  const [shapeList, setShapeList] = useState([]);
  const [showTopBtn, setShowTopBtn] = useState(false);

  const { dataList: data, isLoaded } = useFetchData(
    location.pathname === '/pokemon'
      ? `https://pokeapi.co/api/v2/pokemon?limit=${itemSize}&offset=0`
      : `https://pokeapi.co/api/v2/item?limit=${itemSize}&offset=0`
  );

  function increaseSize() {
    setItemSize(itemSize + 20);
  }

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });

    P.getPokemonShapesList(interval).then((data) => {
      setShapeList(data.results);
    });
  }, []);

  return (
    <HelmetProvider>
      <div className='antialiased'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>PokéMart</title>
          <link rel='canonical' href='http://mysite.com/example' />
        </Helmet>

        <Navbar />
        {(location.pathname === '/products' ||
          location.pathname === '/pokemon' ||
          location.pathname === '/abilities') && (
          <div className='mx-auto max-w-7xl p-4'>
            <nav className='flex' aria-label='Breadcrumb'>
              <ol className='inline-flex items-center space-x-1'>
                <li className='inline-flex items-center'>
                  <a
                    href='/'
                    className='transform text-xs tracking-tighter text-gray-600 transition-all delay-75 duration-150 ease-in-out hover:text-blue-600 hover:underline'>
                    Home
                  </a>
                </li>
                <li>
                  <div className='flex items-center'>
                    <ChevronRightIcon className='h-4 w-4 text-gray-600' />
                    <a
                      href='/'
                      className='transform text-xs tracking-tighter text-gray-600 transition-all delay-75 duration-150 ease-in-out hover:text-blue-600 hover:underline'>
                      {location.pathname
                        .replace('/', '')
                        .charAt(0)
                        .toUpperCase() + location.pathname.slice(2)}
                    </a>
                  </div>
                </li>
                <li aria-current='page'>
                  <div className='flex items-center'>
                    <ChevronRightIcon className='h-4 w-4 text-gray-600' />
                    <span className='text-xs tracking-tighter text-gray-400'>
                      All
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <div className='my-4 block flex-col flex-wrap items-center justify-start md:flex md:flex-row md:items-center md:justify-between'>
              <h2 className='text-lg font-semibold tracking-tight'>
                <span className='text-gray-800'>
                  {location.pathname.replace('/', '').charAt(0).toUpperCase() +
                    location.pathname.slice(2)}
                </span>
              </h2>
              <div className='flex items-center justify-end md:w-1/4'>
                <p className='w-full text-xs tracking-tight'>
                  3000+ Items found |
                  <span className='font-semibold'> SORT BY</span>
                </p>
                <select
                  className='hover:bg-gray-10 inline-flex w-2/3 items-center justify-center rounded-md border border-gray-200 bg-white p-2 text-xs font-medium text-gray-700 outline-none focus:border-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100'
                  id='menu-button'>
                  <option>Popularity</option>
                  <option>Lowest Price</option>
                  <option>Highest Price</option>
                  <option>On Sale</option>
                </select>
              </div>
            </div>
          </div>
        )}
        <div className='mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-20 md:flex-row lg:space-x-4'>
          {(location.pathname === '/products' ||
            location.pathname === '/pokemon' ||
            location.pathname === '/abilities') && (
            <div className='hidden h-screen w-1/4 border border-gray-200 lg:block'>
              <div className='flex items-center justify-between border-b p-3 '>
                <h2 className='text-xs font-semibold tracking-tight '>
                  <span className='text-gray-700'>REFINE</span>
                </h2>
                <button className='rounded-sm border border-gray-200 bg-gray-50 py-1 px-2 text-xs font-semibold tracking-tight text-gray-600'>
                  Clear All
                </button>
              </div>
              <div className='border-b bg-slate-100 p-3'>
                <button className='flex w-full items-start space-x-2'>
                  <PlusIcon className='h-3 w-3 self-center stroke-gray-700' />
                  <h3 className='text-sm font-semibold tracking-tight'>
                    <span className='text-gray-700'>SHAPES</span>
                  </h3>
                </button>
                <ul className='pt-3' role='group'>
                  {shapeList &&
                    shapeList.map((data, index) => (
                      <li key={index} className='w-full py-1.5'>
                        <div className='flex items-center'>
                          <input
                            type='checkbox'
                            value=''
                            className='dark:focus:ring-blue-60 h-4 w-4 rounded border-0 bg-slate-100 text-blue-600 outline-0 ring-0 focus:ring-blue-500 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700'
                          />
                          <label className='ml-2 w-full text-xs font-medium text-gray-600'>
                            {data.name.charAt(0).toUpperCase() +
                              data.name.slice(1)}
                          </label>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}
          {!isLoaded && data ? (
            <div className='fixed right-10 bottom-10'>
              <DoubleBubble center={false} width={'70px'} height={'70px'} />
            </div>
          ) : (
            <div className='w-full'>
              <Outlet
                context={{
                  data,
                  increaseSize,
                  isLoaded,
                  id,
                  location,
                  splitString,
                }}
              />
            </div>
          )}
          {showTopBtn && isLoaded && (
            <div className='fixed right-10 bottom-10'>
              <button
                className='rounded-full bg-sky-500 p-3 text-white drop-shadow'
                onClick={goToTop}>
                <ChevronUpIcon className='h-6 w-6' />
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </HelmetProvider>
  );
};

const P = new Pokedex();

const interval = {
  limit: 50,
  offset: 0,
};

function splitString(string) {
  const stringArray = string.split('-');
  return `${stringArray[0].charAt(0).toUpperCase() + stringArray[0].slice(1)} ${
    stringArray[1].charAt(0).toUpperCase() + stringArray[1].slice(1)
  }`;
}

export default StoreLayout;
