import "./App.css";
import productsData from "./data/data.json";
import { useEffect, useState } from "react";

function App() {
  const [brandList, setBrandList] = useState(productsData.brands);
  const [productList, setProductList] = useState(productsData.products);
  // State to keep track of selected brand
  const [selectedBrand, setSelectedBrand] = useState("");
  // State to keep track of selected products
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Function to handle brand change
  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value;
    setSelectedBrand(selectedBrand);
  };

  // Filter the products based on the selected brand and update selectedProducts
  useEffect(() => {
    const filteredProducts = productList.filter(
      (product) => product.brand === selectedBrand
    );
    setSelectedProducts(filteredProducts);
  }, [selectedBrand, productList]);

  return (
    <div className="App">
      <h1>Product Manager App</h1>
      <div className="form-container">
        <label>Select Brand:</label>
        <select value={selectedBrand} onChange={handleBrandChange}>
          <option value="">Select brand</option>
          {brandList.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        <input type="text" placeholder="Enter Product name" />

        <button>Add</button>

        {selectedBrand && (
          <div className="table-container">
            <h2>Selected Brand: {selectedBrand}</h2>
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
