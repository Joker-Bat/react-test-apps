import "./App.css";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import ReactRouterStore from "./components/ReactRouterStore";
import ErrorHandling from "./components/ErrorHandling";
import ErrorBoundary from "./components/ErrorHandling/ErrorBoundary";

const Home = () => {
  return (
    <>
      <Link to="react-router">React Router</Link>{" "}
      <Link to="error-handling">ErrorHandling</Link>{" "}
    </>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/react-router/*" element={<ReactRouterStore />} />
          <Route
            path="/error-handling"
            element={
              // <ErrorBoundary>
              <ErrorHandling />
              // </ErrorBoundary>
            }
          />
          <Route path="/error" element={<h1>Error page</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
