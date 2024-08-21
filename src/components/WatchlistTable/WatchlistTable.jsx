import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Button } from '@mui/material';
import WatchlistButton from '../WatchlistButton/WatchlistButton';
import { supabase } from '../../utils/supabase';
import CachedCryptoData from '../../utils/CachedCryptoData';
import { useNavigate } from 'react-router-dom';
const WatchlistTable = () => {
    const navigate = useNavigate();
    const [tableData, setTableData] = useState([]);
    const { cryptoData, isLoading, error } = CachedCryptoData();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data: watchlistData, error } = await supabase.from('watchlist').select();
          if (error) {
            console.error('Error fetching watchlist:', error);
          } else {
            const indices = watchlistData.map((item) => item.index);
            const filteredData = cryptoData.filter(item => indices.includes(item.index));
            setTableData(filteredData);
          }
        } catch (e) {
          console.error('Error fetching data:', e);
        }
      };
      fetchData();
    }, [cryptoData]);
  

    const columns = [
        { field: 'index', headerName: 'ID', width: 200 },
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
            renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={params.row.image} alt={params.value} style={{ width: 30, marginRight: 10 }} />
                    {params.value}
                </div>
            ),
        },
        { field: 'symbol', headerName: 'Symbol', width: 200 },
        {
            field: 'current_price',
            headerName: 'Price (USD)',
            type: 'number',
            width: 200,
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
            width: 300,
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
            width: 300,
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

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <div style={{ marginTop: "6rem" }}></div>
            <div style={{ height: 690, width: '100%', color: 'white', marginBottom: '3rem' }}>
                <Typography sx={{ color: 'white', justifyContent: 'center', marginBottom: '2rem' }} variant="h2">Watchlist</Typography>
                <div style={{ height: 'calc(100% - 60px)', width: '100%', marginBottom: '2rem' }}>
                    <DataGrid
                        rows={tableData}
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
                                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                                backdropFilter: 'blur(5px)',
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
                <Button type="submit" variant="contained" onClick={() => { navigate('/') }}>
                    <Typography variant="h5">Back Home</Typography>
                </Button>
            </div>
        </>
    );
};

export default WatchlistTable;