import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useFetchData = (url) => {
  const location = useLocation();
  const [dataList, setDataList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const methodCheck = location.pathname === '/products' ? 'item' : 'pokemon';

  useEffect(() => {
    setIsLoaded(false);
    if (location.pathname === '/products' || location.pathname === '/pokemon') {
      setIsLoaded(false);
      async function fetchData() {
        const abortController = new AbortController();

        const getList = await fetch(url)
          .then((res) => res.json())
          .then((data) => data.results)
          .catch((err) => console.log(`Error: ${err}`));

        const tempdata = await Promise.all(
          getList.map(async ({ name }) => {
            const pokemonRes = await fetch(
              `https://pokeapi.co/api/v2/${methodCheck}/${name}`
            )
              .then((res) => res.json())
              .then((data) => data)
              .catch((err) => {
                if (err.name === 'AbortError') {
                  console.log(`Aborted`);
                } else {
                  console.log(`Error: ${err.message}`);
                }
              });
            if (methodCheck === 'pokemon') {
              const shapeRes = await fetch(
                `https://pokeapi.co/api/v2/pokemon-species/${name}`
              )
                .then((res) => res.json())
                .then((data) => data);
              return {
                id: pokemonRes.id,
                names: name,
                sprite:
                  pokemonRes.sprites.other['official-artwork'].front_default,
                shape: shapeRes.shape.name,
                price: pokemonRes.types[1]
                  ? `${Math.trunc(Math.random() * (20 - 15) + 15)}99`
                  : `${Math.trunc(Math.random() * (14 - 10) + 10)}99`,
                type: pokemonRes.types[1]
                  ? [
                      pokemonRes.types[0].type.name,
                      pokemonRes.types[1].type.name,
                    ]
                  : [pokemonRes.types[0].type.name],
              };
            }
            return {
              id: pokemonRes.id,
              names: name,
              sprite: pokemonRes.sprites.default,
              category: pokemonRes.category.name,
              price:
                pokemonRes.id > 1
                  ? `${Math.trunc(Math.random() * (10 - 1) + 1)}99`
                  : `${Math.trunc(Math.random() * (50 - 20) + 20)}99`,
              effect: pokemonRes.effect_entries[0].short_effect,
            };
          })
        );
        setDataList(tempdata);
        setIsLoaded(true);

        return () => abortController.abort();
      }

      fetchData();
    }

    setIsLoaded(true);
  }, [url, methodCheck]);

  return { dataList, isLoaded };
};

export default useFetchData;
