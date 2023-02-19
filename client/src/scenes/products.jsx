import { useOutletContext, Link } from 'react-router-dom';
import { CircleStackIcon } from '@heroicons/react/24/outline';

const Products = () => {
  const { data, increaseSize, isLoaded } = useOutletContext();

  return (
    <div className='grid w-full grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4'>
      {isLoaded &&
        data.map(({ id, names, sprite, price, category }) => (
          <div
            key={id}
            className='container rounded-md border-gray-300 p-4 hover:border'>
            <Link to={`/item/${id}`}>
              <div className='relative'>
                <div className='mx-auto flex h-full max-h-[250px] justify-center rounded-lg bg-gradient-to-b from-transparent via-slate-50 to-slate-400 object-fill p-4'>
                  <img
                    src={sprite}
                    alt={names}
                    className='h-full w-full max-w-[200px] scale-90 transform self-center transition-all delay-75 duration-150 ease-linear hover:scale-75'
                  />
                </div>
                <div className='absolute right-3 top-3'>
                  <p className='flex items-center justify-center space-x-1 rounded-full bg-emerald-500 px-2 py-1 drop-shadow'>
                    <CircleStackIcon className='h-4 w-4 stroke-white' />
                    <span className='text-xs font-bold tracking-tighter text-white drop-shadow-sm md:text-sm'>
                      {price}
                    </span>
                  </p>
                </div>
              </div>
              <div className='space-y my-4'>
                <p className='text-sm font-semibold text-gray-700'>
                  {names.includes('-')
                    ? splitString(names)
                    : names.charAt(0).toUpperCase() + names.slice(1)}
                </p>
                {category && (
                  <p className='text-xs font-medium tracking-tight text-gray-500'>
                    {category.includes('-')
                      ? splitString(category)
                      : category.charAt(0).toUpperCase() + category.slice(1)}
                  </p>
                )}
              </div>
            </Link>
            <button className='w-full transform rounded-md bg-blue-500 px-4 py-1.5 text-sm font-semibold tracking-tight text-white transition-colors delay-75 duration-150 ease-linear hover:bg-blue-600'>
              Add to bag
            </button>
          </div>
        ))}
      <div className='col-span-2 w-full md:col-span-3 lg:col-span-4'>
        <div className='flex items-center justify-center'>
          <button
            onClick={increaseSize}
            className='transform rounded-full border px-4 py-2 font-semibold tracking-tight text-sky-600 shadow transition-all delay-75 duration-150 ease-linear hover:scale-90 hover:text-sky-800'>
            Load more
          </button>
        </div>
      </div>
    </div>
  );
};

function splitString(string) {
  const stringArray = string.split('-');
  return `${stringArray[0].charAt(0).toUpperCase() + stringArray[0].slice(1)} ${
    stringArray[1].charAt(0).toUpperCase() + stringArray[1].slice(1)
  }`;
}

export default Products;
