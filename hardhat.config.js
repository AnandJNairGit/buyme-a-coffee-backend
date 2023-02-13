require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


const INFURA_API_KEY = process.env.INFURA_API_KEY;
const INFURA_URL = "https://goerli.infura.io/v3/" + INFURA_API_KEY;
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: INFURA_URL,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};
