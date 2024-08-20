require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.VITE_APP_INFURA_PROJECT_ID}`,
      accounts: [process.env.VITE_APP_PRIVATE_KEY]
    }
  }
};