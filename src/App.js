import "./App.scss";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import ReactRouterStore from "./components/0-ReactRouterStore";
import ErrorHandling from "./components/1-ErrorHandling";
import ErrorBoundary from "./components/1-ErrorHandling/ErrorBoundary";
import Stepper from "./components/3-Stepper/Stepper";
import QrCodeFrame from "./components/4-QrCodeFrame/QrCodeFrame";

const Home = () => {
  return (
    <>
      <Link to="/react-router" className="route-link">
        React Router
      </Link>
      <Link to="error-handling" className="route-link">
        ErrorHandling
      </Link>
      <Link to="/stepper" className="route-link">
        Stepper Component
      </Link>
      <Link to="/qr-code" className="route-link">
        Qr Code Frame
      </Link>
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
              <ErrorBoundary>
                <ErrorHandling />
              </ErrorBoundary>
            }
          />

          <Route path="/stepper" element={<Stepper />} />
          <Route path="/qr-code" element={<QrCodeFrame />} />

          <Route path="/error" element={<h1>Error page</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
