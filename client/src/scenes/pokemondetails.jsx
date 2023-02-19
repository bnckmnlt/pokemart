import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const PokemonDetails = () => {
  const { id, location } = useOutletContext();
  const [descriptionData, setDescriptionData] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function getDetails() {
      const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
        signal: abortController.signal,
      })
        .then((res) => res.json())
        .catch((err) => {
          if (err.name === 'AbortError') {
            console.log('Fetch Aborted');
          } else {
            console.log(`Error: ${err.name}`);
          }
        });

      const tempdata = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`,
        { signal: abortController.signal }
      )
        .then((res) => res.json())
        .catch((err) => {
          if (err.name === 'AbortError') {
            console.log('Fetch Aborted');
          } else {
            console.log(`Error: ${err.name}`);
          }
        });

      await setDescriptionData({
        id: id,
        sprite: [
          data.sprites.other['official-artwork'].front_default,
          data.sprites.other['official-artwork'].front_shiny,
        ],
        entry: tempdata.flavor_text_entries[6].flavor_text,
        name: tempdata.name,
        color: tempdata.color.name,
        is_baby: tempdata.is_baby,
        is_legendary: tempdata.is_legendary,
        is_mythical: tempdata.is_mythical,
        base_stats: data.stats,
        ability: data.abilities[0].ability.name,
        base_experience: data.base_experience,
        genus: tempdata.genera[7].genus,
        type: data.types,
        price:
          data.types.length === 2
            ? `${Math.trunc(Math.random() * (20 - 15) + 15)}99`
            : `${Math.trunc(Math.random() * (14 - 10) + 10)}99`,
      });

      return () => abortController.abort();
    }

    getDetails();
  }, [id]);

  const colorValues = {
    grass: 'emerald',
    poison: 'fuchsia',
    water: 'blue',
    fairy: 'pink',
    rock: 'stone',
    fighting: 'rose',
    ground: 'amber',
    dark: 'gray',
    ghost: 'violet',
    bug: 'orange',
    steel: 'slate',
    normal: 'white',
    flying: 'sky',
    electric: 'yellow',
    psychic: 'purple',
    ice: 'cyan',
    dragon: 'indigo',
    fire: 'red',
  };

  return (
    <div>
      {descriptionData && (
        <div className='mt-4 py-[36px] md:px-4'>
          <nav className='flex' aria-label='Breadcrumb'>
            <ol className='bg--500 text--900 inline-flex items-center space-x-1'>
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
                    href='/pokemon'
                    className='transform text-xs tracking-tighter text-gray-600 transition-all delay-75 duration-150 ease-in-out hover:text-blue-600 hover:underline'>
                    Pokemon
                  </a>
                </div>
              </li>
              <li aria-current='page'>
                <div className='flex items-center'>
                  <ChevronRightIcon className='h-4 w-4 text-gray-600' />
                  <span className='text-xs uppercase tracking-tighter text-gray-400'>
                    {descriptionData.name}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          <div className='mt-6 flex w-full flex-col md:flex-row'>
            <div className='flex gap-5 overflow-hidden md:w-2/3'>
              {descriptionData.sprite.map((source, index) => (
                <img
                  key={index}
                  src={source}
                  alt=''
                  className={`w-full rounded-sm bg-slate-100 bg-gradient-to-b from-transparent object-contain`}
                />
              ))}
            </div>
            <div className='w-full space-y-4 pt-8 md:pl-20 md:pt-0'>
              <h1 className='w-full text-[33px] font-semibold uppercase leading-tight text-gray-900 md:text-start md:text-[44px]'>
                {`${descriptionData.genus}: ${descriptionData.name} (${descriptionData.color})`}
              </h1>
              <p className='text-[15px] font-medium md:text-base md:text-[25px]'>
                {descriptionData.types > 1
                  ? `₱${Math.trunc(Math.random() * (20 - 15) + 15)}99`
                  : `₱${Math.trunc(Math.random() * (14 - 10) + 10)}99`}
              </p>
              <span className='text-[10px] tracking-wide'>Tax included.</span>
              <p className='text-[15px] leading-6 md:text-base'>
                {descriptionData.entry.replace('', ' ')}
              </p>
              <p className='text-[15px] leading-6 md:text-base'>
                <span className='font-semibold'>Disclaimer: </span>Product color
                may slightly vary due to photographic lighting sources or your
                monitor/screen settings.
              </p>
              <p className='text-[15px] leading-6 md:text-base'>
                <span className='font-semibold'>Note: </span>Please be informed
                that we cannot allow product exchanges due to the customer's
                personal preference in choosing types. The type chart displayed
                on each product and type chart section are for your reference.
                Unless the product is defective and does not follow the type
                chart as displayed on our official website, we cannot
                accommodate this.
              </p>
              <div className='pb-4'>
                <p className='text-[13px] font-semibold'>Type:</p>
                <div className='mt-4 flex gap-2'>
                  {descriptionData.type.map(({ type }) => (
                    <div
                      key={type.name}
                      className={`-skew-x-6 rounded-md text-[12px] uppercase drop-shadow bg-${
                        colorValues[type.name]
                      }-500 p-2 font-semibold tracking-tight text-${
                        colorValues[type.name]
                      }-900`}>
                      {type.name}
                    </div>
                  ))}
                </div>
              </div>
              <button className='underline underline-offset-2'>
                Type Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
