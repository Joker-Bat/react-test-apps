import React from "react";

import { Link, useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="../login" state={{ from: location.pathname }}>
        To login page
      </Link>
    </div>
  );
};

export default Dashboard;
