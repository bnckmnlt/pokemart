import React from 'react';
import { useOutletContext } from 'react-router-dom';

const ItemDetails = () => {
  const { id } = useOutletContext();
  return <div>itemdetails {id}</div>;
};

export default ItemDetails;
