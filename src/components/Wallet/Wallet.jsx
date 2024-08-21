import React, { useState, useEffect } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
	Button,
	Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

function Wallet() {
	const navigate = useNavigate();
	const [account, setAccount] = useState(null);
	const [balance, setBalance] = useState(null);
	const [provider, setProvider] = useState(null);
	const [network, setNetwork] = useState(null);
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
				{account ? (
					<>
						<div className='w-full flex-col'>
							<Typography sx={{ color: "white", marginBottom: "2rem", marginTop: "8rem" }} variant="h2">Wallet Information</Typography>
							<TableContainer
								component={Paper}
								sx={{
									width: "50%",
									backgroundColor: "rgba(255, 255, 255, 0.12)",
									backdropFilter: "blur(5px)", 
									color: "white",
									borderRadius: "10px",
									marginLeft: "25%",
									border: "solid 2px white" 
								}}>
								<Table>
									<TableBody>
										<TableRow>
											<TableCell variant="head">
												<Typography sx={{ color: "white" }} variant="h5">Connected Account</Typography>
											</TableCell>
											<TableCell sx={{ color: "white" }}> <Typography variant="h6">{account}</Typography></TableCell>
										</TableRow>
										<TableRow>
											<TableCell variant="head">
												<Typography sx={{ color: "white" }} variant="h5">Balance</Typography>
											</TableCell>
											<TableCell sx={{ color: "white" }} > <Typography variant="h6">{balance} ETH</Typography> </TableCell>
										</TableRow>
										<TableRow>
											<TableCell variant="head">
												<Typography sx={{ color: "white" }} variant="h5">Current Network</Typography>
											</TableCell>
											<TableCell sx={{ color: "white" }}><Typography variant="h6">{network}</Typography></TableCell>
										</TableRow>
										<TableRow>
											<TableCell variant="head">
												<Button sx={{ color: "white" }} variant="contained" onClick={() => refreshBalance(account)}>
													Refresh Balance
												</Button>
											</TableCell>
											<TableCell >
												<Button sx={{ color: "white" }} variant="contained" onClick={() => navigate('./transaction')}>
													Send Money
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
						</div>
					</>
				) : (
					<div className='w-full flex-col'>
							<Typography variant="h5" sx={{ marginBottom: "1rem", marginTop: "8rem" }}> Looks like you haven't connected your Wallet! </Typography>
							<Button onClick={initializeProvider} variant="contained">Connect MetaMask</Button>
					</div>
				)}
			</div>
		</>
	);
}

export default Wallet;
