import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from "../../utils/AuthProvider";
import { Button } from '@mui/material';
const Navbar = () => {
    const { auth, signOut } = useAuth();
    // console.log(auth);
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
            <div className='w-full h-20 bg-black flex items-center'>
                <div className='ml-5 text-white'>
                    Ethreum
                </div>
                <div className='flex justify-end w-full h-full items-center'>
                    {auth ? (
                        <>
                            <div className='mr-5 '>
                                Welcome, Shashvat
                            </div>
                            <div className='mr-5'>
                                <Button onClick={handleLogout} variant="contained">Sign Out</Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='mr-5 '>
                                <Button variant="contained"><Link to="/signup">Sign Up</Link></Button>
                            </div>
                            <div className='mr-5'>
                                <Button variant="contained"><Link to="/login">Login</Link></Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Navbar;