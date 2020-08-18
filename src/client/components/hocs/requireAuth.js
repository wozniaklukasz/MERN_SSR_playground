import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getCurrentUser } from "../features/auth/authSelectors";

const requireAuth = (ChildComponent) => (props) => {
  const auth = useSelector(getCurrentUser);

//   if (auth === null) return <div>Loading...</div>;

  if (!auth) return <Redirect to="/" />;

  return <ChildComponent {...props} />;
};

export default requireAuth;
