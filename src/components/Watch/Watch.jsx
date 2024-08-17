import React, { useState, useEffect } from 'react';
import './Watch.css';

function Watch() {
  const [cryptoData, setCryptoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCryptoData();
  }, []);

  const fetchCryptoData = async () => {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false';

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCryptoData(data);
      setIsLoading(false);
    } catch (e) {
      setError('Failed to fetch crypto data. Please try again later.');
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="Watch">
      <h1>Top 50 Cryptocurrencies</h1>
      <br>
      </br>
      <div className="crypto-container">
        {cryptoData.map(coin => (
          <div key={coin.id} className="coin">
            <img src={coin.image} alt={coin.name} width="30" />
            <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
            <span>Price: ${coin.current_price.toFixed(2)}</span>
            <span>Market Cap: ${coin.market_cap.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watch;