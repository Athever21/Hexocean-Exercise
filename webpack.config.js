const path = require("path");
const nodeExternals = require("webpack-node-externals");
const cwd = process.cwd();

module.exports = {
  name: "server",
  entry: [path.join(cwd,"server","index.ts")],
  output: {
    path: path.join(cwd,"build"),
    filename: "server.js",
    publicPath: "/build/"
  },
  externals: nodeExternals(),
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        include: path.join(cwd,"server")
      }
    ]
  },
  resolve: {
    extensions: [".ts",".js",".json"]
  }
}