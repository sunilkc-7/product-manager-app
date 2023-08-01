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

      <table>
        <thead>
          {productList.map((productHead, idx) => (
            <tr>
              <td>
                {idx + 1}.{productHead.brand}
              </td>
            </tr>
          ))}
          {/* <tr>
            <th>Apple</th>
            <th>Samsung</th>
            <th>Google</th>
          </tr> */}
        </thead>
        <tbody>
          {productList.map((product, idx) => (
            <tr>
              <td>
                {idx + 1}.{product.name}
                <span className="tableEdit">Delete</span>
                <span className="tableEdit">Edit</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {}
    </div>
  );
}

export default App;
