import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUser } from "./features/auth/authSelectors";

const Header = () => {
  const auth = useSelector(getCurrentUser);

  const authButton = (a) => a ? (
    <a href="/api/logout">Logout</a>
  ) : (
    <a href="/api/auth/google">Login</a>
  );

  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
      <Link to="/admins">Admins</Link>
      {authButton(auth)}
    </div>
  );
};

export default Header;
