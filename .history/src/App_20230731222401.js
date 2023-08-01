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

      <table className="tb">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Product Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {brandList.map((brand) => (
            <React.Fragment key={brand}>
              <tr>
                <td colSpan="3">
                  <strong>{brand}</strong>
                </td>
              </tr>
              {productList
                .filter((product) => product.brand === brand)
                .map((product) => (
                  <tr key={product.id}>
                    <td>{product.brand}</td>
                    <td>{product.name}</td>
                    <td>
                      <span className="tableEdit">Delete</span>
                      <span className="tableEdit">Edit</span>
                    </td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
