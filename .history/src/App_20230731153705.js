import "./App.css";
import productsData from "./data/data.json";
import { useState } from "react";

function App() {
  const [brandList, setBrandList] = useState(productsData.brands);
  const [productList, setProductList] = useState(productsData.products);
  return (
    <div className="App">
      <h1>Product Manager App</h1>
      <div className="form-container">
        <label>Select Brand:</label>
        <select>
          {/* <select value={selectedBrand} onChange={handleBrandChange}> */}
          <option value="">Select a brand</option>
          {brandList.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        <input type="text" placeholder="Enter Product name" />

        {/* </select> */}
      </div>
    </div>
  );
}

export default App;
