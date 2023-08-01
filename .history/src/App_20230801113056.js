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
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <br />
      <select
        style={{ maxHeight: "100px", overflow: "auto" }}
        onChange={(e) => setCurrentBrand(e.target.value)}
      >
        {brandNames.map((brandName, index) => (
          <option key={index} value={brandName}>
            {brandName}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="New Brand Name"
        value={newBrandName}
        onChange={(e) => setNewBrandName(e.target.value)}
      />
      <button onClick={addBrandName}>+</button>
      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <button onClick={addProduct}>Add</button>
      {brandNames.map((brandName, index) => (
        <table key={index}>
          <thead>
            <tr>
              <th>{brandName}</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter((p) => p.brand === brandName)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((product, i) => (
                <tr key={i}>
                  <td>
                    {product.isEditing ? (
                      <input
                        value={product.name}
                        onChange={(e) => updateProduct(product, e.target.value)}
                      />
                    ) : (
                      product.name
                    )}
                  </td>
                  <td>
                    <button onClick={() => editProduct(product)}>✏</button>
                    <button onClick={() => deleteProduct(product)}>❌</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ))}
    </div>
  );
}
