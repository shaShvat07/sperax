import React, { useState, useEffect } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
	Typography
} from '@mui/material';
import axios from 'axios';
import { ethers } from 'ethers';
function Wallet() {
	const [account, setAccount] = useState(null);
	const [balance, setBalance] = useState(null);
	const [provider, setProvider] = useState(null);
	const [network, setNetwork] = useState(null);
	const [price, setPrice] = useState(null);
	useEffect(() => {
		if (window.ethereum) {
			initializeProvider();
			window.ethereum.on('accountsChanged', handleAccountsChanged);
			window.ethereum.on('chainChanged', handleChainChanged);
		}

		return () => {
			if (window.ethereum) {
				window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
				window.ethereum.removeListener('chainChanged', handleChainChanged);
			}
		};
	}, []);

	useEffect(() => {
		if (provider) {
			connectWallet();
		}
	}, [provider]);

	const getTokenPrice = async (tokenId) => {
		try {
			const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`);
			setPrice(response.data[tokenId].usd);
		} catch (error) {
			console.error("Error fetching price data:", error);
			return null;
		}
	}

	const initializeProvider = () => {
		const newProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(newProvider);
	};

	const connectWallet = async () => {
		if (provider) {
			try {
				await provider.send("eth_requestAccounts", []);
				const signer = provider.getSigner();
				const address = await signer.getAddress();
				setAccount(address);
				await refreshBalance(address);
				await getNetwork();
			} catch (error) {
				console.error("Failed to connect wallet:", error);
				alert('Please integrate your metamask first');
			}
		} else {
			console.log("Provider not initialized.");
		}
	};

	const disconnectWallet = () => {
		setAccount(null);
		setBalance(null);
		setNetwork(null);
		setProvider(null);
	};

	const refreshBalance = async (address) => {
		if (provider) {
			const balance = await provider.getBalance(address);
			setBalance(ethers.utils.formatEther(balance));
		}
	};

	const handleAccountsChanged = async (accounts) => {
		if (accounts.length > 0) {
			setAccount(accounts[0]);
			await refreshBalance(accounts[0]);
		} else {
			disconnectWallet();
		}
	};

	const handleChainChanged = async () => {
		initializeProvider();
	};

	const getNetwork = async () => {
		if (provider) {
			const network = await provider.getNetwork();
			console.log(network);
			setNetwork(network.name);
		}
	};

	return (
		<>
			<div className='flex w-full h-min-30'>
				<Typography sx={{ color: "white", width: "50%", borderRight: "solid 5px" }} variant="h2" align="center">Wallet Information</Typography>
				{account ? (
					<TableContainer component={Paper} sx={{ backgroundColor: "black", color: "white", width: "50%" }}>
						<Table>
							{/* <TableHead>
								<TableRow>
									<TableCell colSpan={2}>
									</TableCell>
								</TableRow>
							</TableHead> */}
							<TableBody>
								<TableRow>
									<TableCell variant="head">
										<Typography sx={{ color: "white" }} variant="h6">Connected Account</Typography>
									</TableCell>
									<TableCell sx={{ color: "white" }}>{account}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell variant="head">
										<Typography sx={{ color: "white" }} variant="h6">Balance</Typography>
									</TableCell>
									<TableCell sx={{ color: "white" }} >{balance} ETH</TableCell>
								</TableRow>
								<TableRow>
									<TableCell variant="head">
										<Typography sx={{ color: "white" }} variant="h6">Current Network</Typography>
									</TableCell>
									<TableCell sx={{ color: "white" }}>{network}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell colSpan={2} align="center">
										<Button sx={{ color: "white" }} variant="contained" onClick={() => refreshBalance(account)}>
											Refresh Balance
										</Button>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell colSpan={2} align="center">
										<Button sx={{ color: "white" }} variant="contained" color="error" onClick={disconnectWallet}>
											Disconnect Wallet
										</Button>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				) : (
					<div className='mt-5 mb-5 w-half ml-auto mr-auto'>
						<Typography variant="h5" sx={{ marginBottom: "1rem" }}> Looks like you haven't connected your Wallet! </Typography>
						<Button onClick={initializeProvider} variant="contained">Connect MetaMask</Button>
					</div>
				)}
			</div>
		</>
	);
}

export default Wallet;
