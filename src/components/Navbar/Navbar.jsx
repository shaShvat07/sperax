import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from "../../utils/AuthProvider";
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const { auth, signOut } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const { error } = await signOut();
            console.log(error);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className='w-full h-20 backdrop-blur-sm fixed z-20 top-0 start-0 flex items-center'>
                <div className='ml-5 text-white'>
                    <Typography variant="h5">EnvyMask</Typography>
                </div>
                <div className='flex justify-end w-full h-full items-center'>
                    {auth ? (
                        <>
                            <div className='mr-5 '>
                                <Typography variant="h5">Hello Newbie :) </Typography>
                            </div>
                            <div className='mr-5'>
                                <Button type="submit" variant="contained" onClick={() => {navigate('./watchlist')}}>
                                    <Typography variant="h5">Watchlist</Typography>
                                </Button>
                            </div>
                            <div className='mr-5'>
                                <Button onClick={handleLogout} color="error" variant="contained">
                                    <Typography variant="h5">Sign Out</Typography>
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='mr-5 '>
                                <Button variant="contained"><Link to="/signup"><Typography variant="h5">Sign Up</Typography></Link></Button>
                            </div>
                            <div className='mr-5'>
                                <Button variant="contained"><Link to="/login"><Typography variant="h5">Sign In</Typography></Link></Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Navbar;