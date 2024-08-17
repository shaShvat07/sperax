import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { 
    field: 'name', 
    headerName: 'Name', 
    width: 150,
    renderCell: (params) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={params.row.image} alt={params.value} style={{ width: 30, marginRight: 10 }} />
        {params.value}
      </div>
    ),
  },
  { field: 'symbol', headerName: 'Symbol', width: 100 },
  {
    field: 'current_price',
    headerName: 'Price (USD)',
    type: 'number',
    width: 130,
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
    width: 150,
    valueFormatter: (params) => {
      if (params != null) {
        return `${params.toLocaleString()}`;
      }
      return 'N/A';
    },
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
    <div style={{ height: 650, width: '100%' }}>
      <h1>Top 50 Cryptocurrencies</h1>
      <DataGrid
        rows={cryptoData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        checkboxSelection
        sx={{
          '& .MuiDataGrid-cell': {
            color: 'white',
          },
        }}
      />
    </div>
  );
}