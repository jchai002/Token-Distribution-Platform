require("dotenv").config();
require("babel-register");
require("babel-polyfill");

const HDWalletProvider = require("truffle-hdwallet-provider");

const providerWithMnemonic = (mnemonic, rpcEndpoint) =>
  new HDWalletProvider(mnemonic, rpcEndpoint);

const infuraProvider = network =>
  providerWithMnemonic(
    process.env.MNEMONIC || "",
    `https://${network}.infura.io/${process.env.INFURA_API_KEY}`
  );

const ropstenProvider = process.env.SOLIDITY_COVERAGE
  ? undefined
  : infuraProvider("ropsten");

module.exports = {
  networks: {
    development: {
      host: "localhost", // Connect to geth on the specified port
      port: 8545,
      from: "0x11f0cdddd75259b02418e5c116d904621632a590", // default address to use for any transaction Truffle makes during migrations
      network_id: 4,
      gas: 6500000
    },
    ropsten: {
      provider: ropstenProvider,
      network_id: 3 // eslint-disable-line camelcase
    },
    coverage: {
      host: "localhost",
      network_id: "*", // eslint-disable-line camelcase
      port: 8555,
      gas: 0xfffffffffff,
      gasPrice: 0x01
    },
    testrpc: {
      host: "localhost",
      port: 8545,
      network_id: "*" // eslint-disable-line camelcase
    },
    ganache: {
      host: "localhost",
      port: 7545,
      network_id: "*" // eslint-disable-line camelcase
    },
    rinkeby: {
      host: "localhost", // Connect to geth on the specified port
      port: 8545,
      from: "0x11f0cdddd75259b02418e5c116d904621632a590", // default address to use for any transaction Truffle makes during migrations
      network_id: 4,
      gas: 6500000
    }
  }
};
