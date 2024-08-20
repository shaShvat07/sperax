import React, { useState } from 'react'
import { Button } from '@mui/material';

const WatchlistButton = () => {
    const [isInWatchlist, setIsInWatchlist] = useState(false);

    return (
        <div>
            {isInWatchlist ? (
                <Button variant="contained" color="error"> Remove from Watchlist </Button>
            ) : (
                <Button variant="contained"> Add to Watchlist </Button>
            )}
        </div>
    )
}

export default WatchlistButton;