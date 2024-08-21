import { useState, useEffect } from 'react';

const CachedCryptoData = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      const cachedData = localStorage.getItem('cryptoData');
      if (cachedData) {
        setCryptoData(JSON.parse(cachedData));
        setIsLoading(false);
      } else {
        try {
          const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false';
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          const dataWithIndex = data.map((item, index) => ({
            ...item,
            index: index + 1
          }));
          setCryptoData(dataWithIndex);
          localStorage.setItem('cryptoData', JSON.stringify(dataWithIndex));
          setIsLoading(false);
        } catch (e) {
          setError('Failed to fetch crypto data. Please try again later.');
          setIsLoading(false);
        }
      }
    };

    fetchCryptoData();
  }, []);

  return { cryptoData, isLoading, error };
};

export default CachedCryptoData;