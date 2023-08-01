import "./App.css";
import productsData from "./data/data.json";
import { useEffect, useState } from "react";

function App() {
  const [brandList, setBrandList] = useState(productsData.brands);
  const [productList, setProductList] = useState(productsData.products);
  const [selectedBrands, setSelectedBrands] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value;
    setSelectedBrands(selectedBrand);
  };

  useEffect(() => {
    const selectedProduct = productList.filter(
      (product) => product.brand === selectedBrands
    );
    setSelectedProducts(selectedProduct);
  }, [selectedBrands, productList]);

  // Prepare the table rows array
  const tableRows = brandList.map((brand) => {
    const productsForBrand = productList.filter(
      (product) => product.brand === brand
    );
    return {
      brand: brand,
      products: productsForBrand.map((product) => product.name),
    };
  });

  return (
    <div className="App">
      <h1>Product Manager App</h1>
      <div className="form-container">
        <label>Select Brand:</label>
        <select value={selectedBrands} onChange={handleBrandChange}>
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
            <h2>Selected Brand: {selectedBrands}</h2>
            <table>
              <thead>
                <tr>
                  <th>Brand</th>
                  {brandList.map((brand) => (
                    <th key={brand}>{brand}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.brand}>
                    <td>{row.brand}</td>
                    {brandList.map((brand) => (
                      <td key={brand}>
                        {row.products.includes(brand) ? "X" : ""}
                      </td>
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
