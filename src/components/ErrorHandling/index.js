import React, { useState, useEffect } from "react";

import axios from "axios";
import ErrorBoundary from "./ErrorBoundary";

const ErrorHandling = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data: productsData } = await axios.get(
        "https://freeestoreapi.herokuapp.com/api/v1/products"
      );

      setProducts(productsData.data.products);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // throw new Error("I Crashed");

  if (loading) return <div></div>;

  return (
    <div>
      <h1>ErrorHandling</h1>
      <ErrorBoundary fallBackUi={<h1>Something Went wrong</h1>}>
        <ul>
          <li>{products}</li>
        </ul>
      </ErrorBoundary>
    </div>
  );
};

export default ErrorHandling;
