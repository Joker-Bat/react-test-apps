import React, { Component } from "react";
import { Navigate } from "react-router-dom";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: "", errorInfo: "" };
  }

  componentDidMount() {
    console.log("Mounted");
  }

  static getDerivedStateFromError(error) {
    console.log("Error on derivedState: ", error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error on did catch: ", error);
    console.log("Error info on did catch: ", errorInfo);
    // this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          {this.props.fallBackUi}
          {/* <h1>Something went wrong</h1> */}
          {/* <button onClick={() => this.setState({ hasError: false })}>
            Clear error
          </button>
          <Navigate to="/error" /> */}
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
