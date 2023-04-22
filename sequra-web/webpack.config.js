const path = require('path');

module.exports = {
  entry: './index.js',
  mode: 'production',
  output: {
    filename: 'sequra.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
