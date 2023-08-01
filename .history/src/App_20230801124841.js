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
  const [editedName, setEditedName] = useState("");

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
    setEditedName(productToEdit.name);
  };

  const updateProduct = (productToUpdate) => {
    setProducts(
      products.map((product) =>
        product === productToUpdate
          ? { ...product, name: editedName, isEditing: false }
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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <input
        className="inputSearch"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products"
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
      <div className="inputContainer">
        <input
          className="inputWithButton"
          type="text"
          placeholder="New Brand Name"
          value={newBrandName}
          onChange={(e) => setNewBrandName(e.target.value)}
        />
        <span className="insideButton" onClick={addBrandName}>
          +
        </span>
      </div>

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
            {filteredProducts
              .filter((p) => p.brand === brandName)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((product, i) => (
                <tr key={i}>
                  <td>
                    {product.isEditing ? (
                      <input
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                      />
                    ) : (
                      product.name
                    )}
                  </td>
                  <td>
                    {product.isEditing ? (
                      <button onClick={() => updateProduct(product)}>
                        Save
                      </button>
                    ) : (
                      <button onClick={() => editProduct(product)}>✏</button>
                    )}
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

export default App;
