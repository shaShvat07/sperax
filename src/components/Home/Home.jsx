import React from 'react'
import Wallet from '../Wallet/Wallet';
import CryptoTable from '../CryptoTable/CryptoTable';
import { useAuth } from "../../utils/AuthProvider";
import { Navigate } from 'react-router-dom';
const Home = () => {
  const { user } = useAuth();
  return (
    <>
      {user ? (
        <div>
          <div className='w-full'>
            <Wallet />
            <CryptoTable />
          </div>
        </div>
      ) : (
        <div>
          <Navigate to="/login" replace />
        </div>
      )}
    </>
  )
}

export default Home;