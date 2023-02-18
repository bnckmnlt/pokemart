import React from 'react';
import { useOutletContext } from 'react-router-dom';

const PokemonDetails = () => {
  const { id } = useOutletContext();
  return <div>PokemonDetails {id}</div>;
};

export default PokemonDetails;
