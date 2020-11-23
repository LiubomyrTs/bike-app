const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: { filename: "bundle.js" },
  resolve: { extensions: [".ts", ".tsx", ".js", ".css"] },
  module: {
    rules: [
      { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.js$/, enforce: 'pre', use: ['source-map-loader'] },
    ],
  },
  devServer: {
    contentBase: "./assets",
    port: 4500,
  },  
  plugins: [
    new SourceMapDevToolPlugin({
      filename: "[file].map"
    }),
  ],
};
