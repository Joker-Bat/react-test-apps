import React, { useEffect } from "react";

import {
  Routes,
  Route,
  Link,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

const Home = () => {
  return (
    <div>
      <h1>ReactRouterStore</h1>
      <Link to="login">To login page</Link>
    </div>
  );
};

const WithId = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    console.log("Called");
  }, [location.pathname]);

  const handleClick = () => {
    navigate("/react-router/123");
  };

  console.log(location);
  return (
    <div>
      <h1>{id}</h1>
      <button onClick={handleClick}>Some random 2</button>
    </div>
  );
};

const ReactRouterStore = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":id" element={<WithId />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
      <Link to="abc">Some random 1</Link>
    </div>
  );
};

export default ReactRouterStore;
