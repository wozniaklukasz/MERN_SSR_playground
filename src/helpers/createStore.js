import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import rootReducer from "../client/rootReducer";

export default (req) => {
  const axiosInstance = axios.create({
    baseURL: "http://react-ssr-api.herokuapp.com", // ? reduntant because of proxy?
    headers: { cookie: req.get("cookie") || "" },
  });

  const store = createStore(
    rootReducer,
    {},
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  );

  return store;
};
