import "./App.css";
import productsData from "../public/data.json";
import { useState } from "react";

function App() {
  const [brandList, setBrandList] = useState(productsData.brands);
  const [productList, setProductList] = useState(productsData.products);
  return (
    <div className="App">
      <h1>Product Manager App</h1>
      <div className="form-container">
        <label>Brand:</label>
      </div>
    </div>
  );
}

export default App;
