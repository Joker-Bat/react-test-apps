import React from "react";

// import { useLocation } from "react-router-dom";

import { Link, useLocation, useNavigate } from "react-router-dom";
import withRouter from "../utils/withRouter";

const Login = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location);
  // const location = useLocation();

  const handleLogin = () => {
    navigate(location.state?.from ? location.state?.from : "..");
  };

  // console.log(location);

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login</button>
      <Link to="../dashboard">To Dashboard</Link>
    </div>
  );
};

export default withRouter(Login);
