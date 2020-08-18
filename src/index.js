import "@babel/polyfill";
import express from "express";
import { matchRoutes } from "react-router-config";
import proxy from "express-http-proxy";
import mongoose from "mongoose";
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";
import Routes from "./client/Routes";

const app = express();

app.use(
  "/api",
  proxy("http://react-ssr-api.herokuapp.com", {
    proxyReqOptDecorator(opts) {
      opts.headers["x-forwarded-host"] = "localhost:3000";
      return opts;
    },
  })
);

app.use(express.static("public"));

app.get("*", (req, res) => {
  const store = createStore(req);
  const { path } = req;

  // Get components to render on given URL and call theirs loadData()
  const promises = matchRoutes(Routes, path)
    .map(({ route }) => (route.loadData ? route.loadData(store) : null))
    .map((promise) => {
      if (promise) {
        // second map with alvays resolved promises - SSR approach to render app even if some api fails
        return new Promise((resolve, reject) =>
          promise.then(resolve).catch((e) => {
            // console.log(`Error while rendering ${path}:`, e);
            resolve();
          })
        );
      }
    });

  // thanks to above logic, all promises will be resolved so Promise.all alvays will be resolved to (and do render)
  Promise.all(promises)
    .then(() => {
      const context = {};
      const content = renderer(path, store, context);

      if (context.url) {
        // requireAuth uses Redirect
        return res.redirect(301, context.url);
      }

      if (context.notFound) res.status(404);

      res.send(content);
    })
    .catch((e) => console.log(e));
});

// Database
// mongoose.connect(
//   "mongodb://localhost:27017/merndb",
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   () => {
//     console.log("Connected successfully to database (mongoose)");
//   }
// );

app.listen(3000, () => {
  console.log("App started on 3000");
});
