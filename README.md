#Sperax Asssignment

## Introduction

MyToken Transfer is a decentralized application (dApp) built on the Ethereum blockchain that allows users to transfer tokens from one wallet to another wallet and allows them to monitor their favourite cryptocurrency using watchlist feature. This project demonstrates the integration of smart contracts with a modern web frontend, providing a seamless user experience for token transfers.

## Technology Stack

The application leverages the following technologies:

- **Backend:**
  - Supabase
- **Frontend:**
  - React.js
  - TailwindCSS
  - Vite.js
  - Ethers.js
- **Third Party Integrations**
  - MetaMask
  - Infura
  - CoinGekko APIs

## Features

- ```Authentication:``` Implemented secure user authentication using Supabase with email verfication for new users.
- ```Authorization:``` Authorized users can personalied their own Watchlists, Wallets etc. 
- ```Wallet Integrations:``` Effortlessly integrate your Metamask wallets with the applications and get real-time updates of balance, wallet address, network etc.
- ```Trending Crytocurrencies:``` Get a organised view of top 50 cryptocurrencies and filter/sort them on the basis of price, rank etc.
- ```Watchlist``` Conveniently add and monitor your favourite cryptocurrency by adding them in the watchlist 
- ```Transaction via Web3``` Users can opt this method if they want to pay via Metamask
- ```Transaction via Infura:``` Users can pay directly without the interference of Metamask via this method

## Project Structure
The project is structured as follows, ensuring modular and organized management of various functionalities.

```bash
src
    ├───index.css
    ├───Components
    │   ├───Card
    │   ├───Dashboard
    │   ├───Home
    │   ├───Login
    │   ├───LandingPage
    │   ├───Main
    │   ├───Navbar
    │   ├───PageNotFound
    │   ├───Sidebar
    │   ├───SignUp
    │   ├───TaskModal
    │   ├───UpdateTaskModal
    │   ├───App.jsx
    │   ├───index.js
    └───main.jsx
```
## Setup and Installation

Setup
```bash
Clone the Repository by running this command 
[git clone https://github.com/shaShvat07/task_mgt.git](https://github.com/shaShvat07/sperax.git)
cd sperax
```

Installating Dependencies
```bash
npm i
```

Run the Application
```bash
npm run dev
```
Link to the deployed website 
```bash
[SOON]
```

## Usage

Once the application is running:

1. Connect your MetaMask wallet to the application
2. Ensure you're connected to the Sepolia testnet
3. View your token balance
4. Use the transfer form to send tokens to another address
5. For the application to work completely you need to integrate your supabase database with its clientId and projectId mentioning them in the dotenv file
6. Also, you need to create an account in Infura, if you want to do transaction via Infura for this you need projectId from Infura and for payment via Web3 you just need Private key from Metamask. Mention both these key in the dotenv file
   
## Routes

* ```/ ``` - Home Page
* ```/login ``` - Login Page
* ```/signup ``` - Signup Page
* ```/transaction ``` - Transaction Page
* ```/watchlist ``` - Watchlist Page

## Security

This project is for educational purposes only. Always exercise caution when dealing with real cryptocurrencies and never share your private keys.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check [issues page](link-to-your-issues-page) if you want to contribute.


