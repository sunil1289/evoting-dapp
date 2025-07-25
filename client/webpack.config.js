const path = require('path');

module.exports = {
  entry: './src/index.js', // Adjust to your main client entry file (e.g., src/index.js)
  output: {
    path: path.resolve(__dirname, 'dist'), // Output to client/dist
    filename: 'bundle.js', // Output bundle file
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          /node_modules\/face-api\.js/,
          /node_modules\/web3/,
        ],
      },
    ],
  },
  resolve: {
    fallback: {
      fs: false, // Disable fs for browser environment
    },
  },
  ignoreWarnings: [
    {
      module: /node_modules\/face-api\.js/,
      message: /Failed to parse source map/,
    },
    {
      module: /node_modules\/web3/,
      message: /Failed to parse source map/,
    },
  ],
};