import webpack from "webpack";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackConfig from "../webpack.client";
import {Express} from "express";

export default (app: Express) => {
  const compiler = webpack(webpackConfig as any);
  const middleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
}