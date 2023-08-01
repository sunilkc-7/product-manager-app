import "./App.css";
import productsData from "./data/data.json";
import { useEffect, useState } from "react";

function App() {
  const [brandList, setBrandList] = useState(productsData.brands);
  const [productList, setProductList] = useState(productsData.products);
  //state to keep track of selected brands
  const [selectedBrands, setSelectedBrands] = useState("");
  //state to keep track of selected products
  const [selectedProducts, setSelectedProducts] = useState([]);

  //useEffect to show initial selected brand products based on data.json
  if (selectedBrands !== "") {
    const initialSelectedProducts = productList.filter(
      (product) => product.brand === selectedBrands
    );
    setSelectedProducts(initialSelectedProducts);
  }

  return (
    <div className="App">
      <h1>Product Manager App</h1>
      <div className="form-container">
        <label>Select Brand:</label>
        <select>
          <option value="">Select brand</option>
          {brandList.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        <input type="text" placeholder="Enter Product name" />

        <button>Add</button>
      </div>
    </div>
  );
}

export default App;