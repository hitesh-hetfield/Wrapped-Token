/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();
const { wanchainTestnet } = require("viem/chains");

account_pvt_key = process.env.PVT_KEY !== undefined ? [process.env.PVT_KEY] : []

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.4.22",
        settings: {
          evmVersion: "london",
          optimizer: {
            enabled: false,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    thunder: {
      url: "https://rpc.testnet.5ire.network",
      chainId: 997,
      accounts: account_pvt_key
    },
    qa: {
      url: "https://rpc.qa.5ire.network",
      accounts: account_pvt_key
    },
    wanchainTestnet: {
      url: wanchainTestnet.rpcUrls.default.http[0],
      accounts: process.env.PVT_KEY_1 !== undefined ? [process.env.PVT_KEY_1] : [],
      gasPrice: 1e9,
      gas: 6e6,
    }
  },
  etherscan: {
    apiKey: {
      thunder: process.env.API_KEY !== undefined ? [process.env.API_KEY] : [],
      qa: process.env.API_KEY !== undefined ? [process.env.API_KEY] : []
    },
  customChains: [
    {
      network: "thunder",
        chainId: 997,
        urls: {
          apiURL: "https://contract.evm.testnet.5ire.network/5ire/verify",
          browserURL: "https://testnet.5irescan.io/dashboard"
        }
      },
      {
        network: "qa",
          chainId: 997,
          urls: {
            apiURL: "https://contract.evm.qa.5ire.network/5ire/verify",
          browserURL: "https://qa.5ire.network"
          }
        }
    ]
  }
};