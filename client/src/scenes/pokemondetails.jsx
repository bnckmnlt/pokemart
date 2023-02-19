import React, { useEffect, useState, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  ChevronRightIcon,
  PlusIcon,
  MinusIcon,
} from '@heroicons/react/24/outline';
import { Tabs } from 'flowbite-react';

const PokemonDetails = () => {
  const { id, splitString } = useOutletContext();
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
            <ul className='text--900 inline-flex items-center space-x-1'>
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
            </ul>
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
              <p className='text-[15px] font-medium md:text-base md:text-[26px]'>
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
              <div className='pb-2'>
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
              <button className='underline underline-offset-4'>
                Type Guide
              </button>
            </div>
          </div>
          <div className='mt-6 flex flex-col-reverse md:flex-row'>
            <div className='mt-6 h-auto w-full md:mt-0 md:w-2/3'>
              <Tabs.Group className='w-full'>
                <Tabs.Item active={true} title='BASE STATS'>
                  <div className='grid grid-cols-2 leading-7 text-gray-900'>
                    <p className='text-[15px] tracking-wide md:text-base'>
                      <span className='font-semibold'>Ability: </span>
                      {descriptionData.ability.charAt(0).toUpperCase() +
                        descriptionData.ability.slice(1)}
                    </p>
                    <p className='text-[15px] tracking-wide md:text-base'>
                      <span className='font-semibold'>Base Experience: </span>
                      {descriptionData.base_experience}
                    </p>
                    {descriptionData.base_stats.map((stat) => (
                      <p className='text-[15px] tracking-wide md:text-base'>
                        <span className='font-semibold'>
                          {stat.stat.name.includes('-')
                            ? splitString(stat.stat.name)
                            : stat.stat.name.charAt(0).toUpperCase() +
                              stat.stat.name.slice(1)}
                          :{' '}
                        </span>
                        {stat.base_stat}
                      </p>
                    ))}
                  </div>
                </Tabs.Item>
                <Tabs.Item title='SHIPPING & RETURNS'>
                  <div className='leading-6'>
                    <p className='text-center text-[14px]'>
                      <span className='font-semibold text-emerald-500'>✔</span>
                      {'  '}
                      Free Shipping For Metro Manila Orders Above ₱1,500
                    </p>
                    <p className='text-center text-[14px]'>
                      <span className='font-semibold text-emerald-500'>✔</span>
                      {'  '}
                      Free Shipping For Provincial Orders Above ₱2,500
                    </p>
                  </div>
                  <p className='mt-4 w-full text-justify text-[15px] tracking-tight md:text-base'>
                    <span className='font-semibold'>Note: </span>
                    Kindly note that we are unable to accept product exchanges
                    for type based issues on personal preference. A type chart
                    is provided before making your purchase. We can only
                    accommodate exchanges if the product is defective and does
                    not match the size chart. Thank you for your understanding.
                  </p>
                </Tabs.Item>
              </Tabs.Group>
            </div>
            <div className='w-full pt-4 md:pl-20 md:pt-0'>
              <div>
                <p className='text-[13px] font-semibold'>Quantity: </p>
                <div class='custom-number-input h-10 w-32'>
                  <div class='relative mt-2 flex h-10 w-full flex-row rounded-lg bg-transparent'>
                    <button
                      data-action='decrement'
                      class=' flex h-full w-20 cursor-pointer justify-center  border-2 border-gray-500 bg-transparent text-gray-600 outline-none hover:bg-gray-400 hover:text-gray-700'>
                      <span class='m-auto text-2xl font-thin'>
                        <MinusIcon className='h-4 w-4 text-gray-900' />
                      </span>
                    </button>
                    <input
                      type='text'
                      class='text-md flex w-full cursor-default items-center overflow-hidden overflow-y-hidden border-y-2 border-gray-500 bg-transparent text-center font-semibold text-gray-700 outline-none hover:text-black focus:text-black focus:outline-none md:text-base'
                      name='custom-input-number'
                      value='0'
                    />
                    <button
                      data-action='increment'
                      class='flex h-full w-20 cursor-pointer justify-center  border-2 border-gray-500 bg-transparent text-gray-600 hover:bg-gray-400 hover:text-gray-700'>
                      <span class='m-auto text-2xl font-thin'>
                        <PlusIcon className='h-4 w-4 text-gray-900' />
                      </span>
                    </button>
                  </div>
                </div>
                <div className='mt-8 flex flex-col space-y-2'>
                  <button className='transform border-2 border-gray-500 py-2 px-4 font-semibold uppercase shadow transition-colors delay-75 duration-200 ease-linear hover:border-blue-500 hover:bg-blue-500'>
                    Add to cart
                  </button>
                  <button className='transform border-2 border-gray-900 bg-gray-900 py-2 px-4 font-semibold uppercase text-white shadow transition-colors delay-75 duration-200 ease-linear hover:border-blue-500 hover:bg-blue-500 hover:text-gray-900'>
                    Buy it now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
