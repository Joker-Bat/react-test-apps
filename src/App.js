import "./App.css";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import ReactRouterStore from "./components/ReactRouterStore";

const Home = () => {
  return <Link to="react-router">React Router</Link>;
};

function App() {
  return (
    <div className="App">
      <Router>
        <h1>Hello World</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/react-router/*" element={<ReactRouterStore />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
