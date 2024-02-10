import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

module.exports = {
  module: {
    rules: [
      {
        exclude: /src/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin({})]
  }
}
