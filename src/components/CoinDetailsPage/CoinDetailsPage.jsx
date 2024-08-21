import * as React from 'react';
import { useParams } from 'react-router-dom';

const CoinDetailsPage = () => {
  const { id } = useParams();
  return (
      <div className="mt-20 text-white">Hello {id}</div>
  );
};

export default CoinDetailsPage;