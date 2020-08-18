import React from "react";
import Header from "./Header";
import { renderRoutes } from "react-router-config";
import { fetchCurrentUser } from "./features/auth/authSlice";

const App = ({ route }) => {
  return (
    <div>
      <Header />
      {renderRoutes(route.routes)}
    </div>
  );
};

const loadData = (store) => store.dispatch(fetchCurrentUser());

export default {
  component: App,
  loadData,
};
