import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { supabase } from "../../utils/supabase";

const WatchlistButton = ({ num }) => {
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    useEffect(() => {
        checkWatchlistStatus();
    }, [num]);

    const checkWatchlistStatus = async () => {
        const { data, error } = await supabase
            .from('watchlist')
            .select()
            .eq('index', num);
        if (error) {
            console.error('Error checking watchlist status:', error);
        } else {
            setIsInWatchlist(data.length > 0);
        }
    };

    const handleWatchlistToggle = async () => {
        if (isInWatchlist) {
            // Remove from watchlist
            const { error } = await supabase
                .from('watchlist')
                .delete()
                .eq('index', num);

            if (error) {
                console.error('Error removing from watchlist:', error);
            } else {
                setIsInWatchlist(false);
            }
        } else {
            // Add to watchlist
            const { error } = await supabase
                .from('watchlist')
                .insert({ index: num });

            if (error) {
                console.error('Error adding to watchlist:', error);
            } else {
                setIsInWatchlist(true);
            }
        }
    };

    return (
        <Button 
            variant="contained" 
            color={isInWatchlist ? "error" : "primary"}
            onClick={handleWatchlistToggle}
        >
            {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </Button>
    );
};

export default WatchlistButton;