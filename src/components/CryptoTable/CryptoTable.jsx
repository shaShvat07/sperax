import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import WatchlistButton from '../WatchlistButton/WatchlistButton';

const columns = [
  { field: 'index', headerName: 'ID', width: 250 },
  {
    field: 'name',
    headerName: 'Name',
    width: 250,
    renderCell: (params) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={params.row.image} alt={params.value} style={{ width: 30, marginRight: 10 }} />
        {params.value}
      </div>
    ),
  },
  { field: 'symbol', headerName: 'Symbol', width: 250 },
  {
    field: 'current_price',
    headerName: 'Price (USD)',
    type: 'number',
    width: 250,
    valueFormatter: (params) => {
      if (params != null) {
        return `$${params.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
      return 'N/A';
    },
  },
  {
    field: 'market_cap',
    headerName: 'Market Cap',
    type: 'number',
    width: 250,
    valueFormatter: (params) => {
      if (params != null) {
        return `${params.toLocaleString()}`;
      }
      return 'N/A';
    },
  },
  {
    field: 'watchlist',
    headerName: 'Watchlist',
    width: 350,
    type: 'number',
    renderCell: (params) => (
      <>
        <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', height: '100%' }}>
          <WatchlistButton num={params.row.index} />
        </div>
      </>
    ),
  },
];



export default function CryptoTable() {
  const [cryptoData, setCryptoData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
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
      const dataWithIndex = data.map((item, index) => ({
        ...item,
        index: index + 1
      }));
      setCryptoData(dataWithIndex);
      setIsLoading(false);
    } catch (e) {
      setError('Failed to fetch crypto data. Please try again later.');
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ height: 690, width: '100%', color: 'white', marginTop: "1rem", marginBottom: "3rem" }}>
      <Typography  sx={{ color: "white", justifyContent: "center", marginBottom: "2rem" }} variant="h2">Top 50 Cryptocurrencies</Typography>
      <div style={{ height: 'calc(100% - 60px)', width: '100%' }}>
        <DataGrid
          rows={cryptoData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          sx={{
            '.MuiDataGrid-main': {
              color: 'white',
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(5px)", 
            },
            '.MuiDataGrid-topContainer': {
              color: 'black',
              
            },
            '.MuiToolbar-root': {
              color: 'white',
            },
          }}
        />
      </div>
    </div>
  );
}