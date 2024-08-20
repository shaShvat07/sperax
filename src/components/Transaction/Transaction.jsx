import React, { useState } from "react";
import { ethers } from "ethers";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Transaction() {
  const INFURA_PROJECT_ID = import.meta.env.VITE_APP_INFURA_PROJECT_ID;
  const PRIVATE_KEY = import.meta.env.VITE_APP_PRIVATE_KEY;
  const metaMaskProvider = new ethers.providers.Web3Provider(window.ethereum);
  const infuraProvider = new ethers.providers.InfuraProvider("sepolia", INFURA_PROJECT_ID);

  const [currentBlockNumber, setCurrentBlockNumber] = useState(null);
  const [webTransactionSent, setWebTransactionSent] = useState(null);
  const [infuraTransactionSent, setInfuraTransactionSent] = useState(null);

  const handleInfuraButton = async () => {
    const latestBlockNumber = await infuraProvider.getBlockNumber("latest");
    setCurrentBlockNumber(latestBlockNumber);
  };

  const handleMetaMaskButton = async () => {
    const latestBlockNumber = await metaMaskProvider.getBlockNumber("latest");
    setCurrentBlockNumber(latestBlockNumber);
  };

  const handleWebTransactionSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const recipientAddress = data.get("address");
    const amount = data.get("amount");
    sendTransaction(recipientAddress, amount);
  };

  const handleInfuraTransactionSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const recipientAddress = data.get("address");
    const amount = data.get("amount");
    const signer = new ethers.Wallet(PRIVATE_KEY, infuraProvider);
    sendTransaction(recipientAddress, amount, signer);
  };

  const sendTransaction = async (address, amount, signer = null) => {
    if (signer == null) {
      if (!window.ethereum) console.error("No wallet found!");
      else {
        await window.ethereum.send("eth_requestAccounts");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const webSigner = provider.getSigner();
        const tx = await webSigner.sendTransaction({
          to: address,
          value: ethers.utils.parseEther(amount),
          gasLimit: 1000000,
        });
        console.log("tx", tx);
        setWebTransactionSent("Transaction initiated! Tx hash: " + tx.hash);
      }
    } else {
      const tx = await signer.sendTransaction({
        to: address,
        value: ethers.utils.parseEther(amount),
      });
      console.log("tx", tx);
      setInfuraTransactionSent("Transaction initiated! Tx hash: " + tx.hash);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box mb={4}>
          <Typography variant="h3" gutterBottom>
            Press one of the buttons to find out the latest block number:
          </Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="contained" onClick={handleInfuraButton}>
              InfuraProvider
            </Button>
            <Button variant="contained" onClick={handleMetaMaskButton}>
              Web3Provider
            </Button>
            <Typography variant="h6">{currentBlockNumber}</Typography>
          </Box>
        </Box>

        <Box mb={4}>
          <Typography variant="h3" gutterBottom>
            Fill out the form to send a transaction via Web3Provider:
          </Typography>
          <Box component="form" onSubmit={handleWebTransactionSubmit}>
            <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
              <InputLabel htmlFor="web-transaction-address">Recipient Address</InputLabel>
              <OutlinedInput id="web-transaction-address" name="address" label="Recipient Address" />
            </FormControl>
            <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
              <InputLabel htmlFor="web-transaction-amount">Amount (ETH)</InputLabel>
              <OutlinedInput id="web-transaction-amount" name="amount" label="Amount (ETH)" />
            </FormControl>
            <Button type="submit" variant="contained" fullWidth>
              Send w/ Web3Provider
            </Button>
          </Box>
          <Typography variant="body1">{webTransactionSent}</Typography>
        </Box>

        <Box mb={4}>
          <Typography variant="h3" gutterBottom>
            Fill out the form to send a transaction via InfuraProvider:
          </Typography>
          <Box component="form" onSubmit={handleInfuraTransactionSubmit}>
            <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
              <InputLabel htmlFor="infura-transaction-address">Recipient Address</InputLabel>
              <OutlinedInput id="infura-transaction-address" name="address" label="Recipient Address" />
            </FormControl>
            <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
              <InputLabel htmlFor="infura-transaction-amount">Amount (ETH)</InputLabel>
              <OutlinedInput id="infura-transaction-amount" name="amount" label="Amount (ETH)" />
            </FormControl>
            <Button type="submit" variant="contained" fullWidth>
              Send w/ InfuraProvider
            </Button>
          </Box>
          <Typography variant="body1">{infuraTransactionSent}</Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Transaction;