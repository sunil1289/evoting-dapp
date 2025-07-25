const path = require("path");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost
      port: 8545, // Matches Ganache
      network_id: "5777", // Matches Ganache
      gas: 10000000, // Match or exceed Ganache’s Gas Limit (increased from 10000000 for safety)
      gasPrice: 20000000000, // Matches Ganache’s 20 gwei
    },
    // Another network with more advanced options (commented out)
    // advanced: {
    //   port: 8777,
    //   network_id: 1342,
    //   gas: 8500000,
    //   gasPrice: 20000000000,
    //   from: <address>,
    //   websocket: true
    // },
    // Useful for deploying to a public network (commented out)
    // ropsten: {
    //   provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/YOUR-PROJECT-ID`),
    //   network_id: 3,
    //   gas: 5500000,
    //   confirmations: 2,
    //   timeoutBlocks: 200,
    //   skipDryRun: true
    // },
    // Useful for private networks (commented out)
    // private: {
    //   provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
    //   network_id: 2111,
    //   production: true
    // }
  },
  mocha: {
    // timeout: 100000
  },
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
};