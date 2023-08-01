import React, { useState } from "react";
import "./App.css";
import data from "./data/data.json";

function App() {
  const [products, setProducts] = useState(
    data.map((p) => ({ ...p, isEditing: false }))
  );
  const [productName, setProductName] = useState("");
  const [search, setSearch] = useState("");
  const [newBrandName, setNewBrandName] = useState("");
  const [currentBrand, setCurrentBrand] = useState("");

  const addProduct = () => {
    setProducts([
      ...products,
      { brand: currentBrand, name: productName, isEditing: false },
    ]);
    setProductName("");
  };

  const deleteProduct = (productToDelete) => {
    setProducts(products.filter((product) => product !== productToDelete));
  };

  const editProduct = (productToEdit) => {
    setProducts(
      products.map((product) =>
        product === productToEdit ? { ...product, isEditing: true } : product
      )
    );
  };

  const updateProduct = (productToUpdate, newName) => {
    setProducts(
      products.map((product) =>
        product === productToUpdate
          ? { ...product, name: newName, isEditing: false }
          : product
      )
    );
  };

  const addBrandName = () => {
    setProducts([
      ...products,
      { brand: newBrandName, name: "", isEditing: false },
    ]);
    setNewBrandName("");
  };

  const brandNames = Array.from(new Set(products.map((p) => p.brand)));

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
        <th>
          {productList.map((productHead) => (
            <tr>
              <td>{productHead.brand}</td>
            </tr>
          ))}
        </th>
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
