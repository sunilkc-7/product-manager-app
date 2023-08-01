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
          <tr>
            <th>Apple</th>
            <th>Samsung</th>
            <th>Google</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1.Macbook</td>
            <td>2.Macbook</td>
            <td>
              3.Macbook
              <span>Delete</span>
              <span>Edit</span>
            </td>
          </tr>
          <tr>
            <td>1.Macbook</td>
            <td>2.Macbook</td>
            <td>3.Macbook</td>
          </tr>
        </tbody>
      </table>
      {}
    </div>
  );
}

export default App;
