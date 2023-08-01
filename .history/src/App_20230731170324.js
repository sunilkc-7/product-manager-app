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

  //function to handle brand change
  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value;
    setSelectedBrands(selectedBrand);

    //Filter the products based on the selected brand
    const selectedProduct = productList.filter(
      (product) => product.brand === selectedBrands
    );
    setSelectedProducts(selectedProduct);
  };

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

        {selectedBrands && (
          <div className="table-container">
            <h2>Selected Brand:{selectedBrands}</h2>
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  {brandList.map((brand) => (
                    <th key={brand}>{brand}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((product) => (
                  <tr key={product.name}>
                    <td>{product.name}</td>
                    {brandList.map((brand) => (
                      <td key={brand}>{product.brand === brand ? "X" : ""}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
