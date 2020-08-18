import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import serialize from "serialize-javascript"; // prevent XSS attacks
import { Helmet } from "react-helmet";
import Routes from "../client/Routes";

export default (path, store, context) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={path} context={context}>
        {renderRoutes(Routes)}
      </StaticRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic();

  return `
      <html>
          <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
          </head>
          <body>
              <div id="root">${content}</div>
              <script>window.INITIAL_STATE=${serialize(
                store.getState()
              )}</script>
              <script src="bundle.js"></script>
          </body>
      </html>
    `;
};
