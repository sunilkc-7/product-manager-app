import React, { useState, useEffect } from "react";
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
  const [brandNames, setBrandNames] = useState([]);

  useEffect(() => {
    setBrandNames([...Array.from(new Set(products.map((p) => p.brand)))]);
  }, [products]);

  const addBrand = () => {
    if (newBrandName) {
      setBrandNames([newBrandName, ...brandNames]);
      setNewBrandName("");
    }
  };

  const addProduct = () => {
    if ((currentBrand || newBrandName) && productName) {
      setProducts([
        ...products,
        {
          brand: currentBrand,
          name: productName,
          isEditing: false,
        },
      ]);
      setProductName("");
    }
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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const maxProductsInBrand = brandNames.reduce((max, brandName) => {
    const relatedProducts = filteredProducts.filter(
      (p) => p.brand === brandName
    );
    return relatedProducts.length > max ? relatedProducts.length : max;
  }, 0);

  return (
    <div className="App">
      <input
        className="inputSearch"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products"
      />
      <div className="select-container">
        <select
          style={{ maxHeight: "100px", overflow: "auto" }}
          onChange={(e) => setCurrentBrand(e.target.value)}
        >
          <option value="">Select Brand</option>
          {brandNames.map((brandName, index) => (
            <option key={index} value={brandName}>
              {brandName}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <button className="buttonContainer" onClick={addProduct}>
          Add
        </button>
      </div>
      <div className="inputContainer">
        <input
          className="inputWithButton"
          type="text"
          placeholder="New Brand Name"
          value={newBrandName}
          onChange={(e) => setNewBrandName(e.target.value)}
        />
        <button className="insideButton" onClick={addBrand}>
          +
        </button>
      </div>
      <table>
        <thead>
          <tr>
            {brandNames.map((brandName) => (
              <th key={brandName}>{brandName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: maxProductsInBrand }, (_, i) => (
            <tr key={i}>
              {brandNames.map((brandName) => {
                const relatedProducts = filteredProducts
                  .filter((p) => p.brand === brandName)
                  .sort((a, b) => a.name.localeCompare(b.name));

                const product = relatedProducts[i];
                return product ? (
                  <td key={product.name}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {product.isEditing ? (
                        <input
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                        />
                      ) : (
                        <div style={{ whiteSpace: "nowrap" }}>
                          {product.name}
                        </div>
                      )}
                      {product.isEditing ? (
                        <button onClick={() => updateProduct(product)}>
                          Save
                        </button>
                      ) : (
                        <button onClick={() => editProduct(product)}>✏</button>
                      )}
                      <button onClick={() => deleteProduct(product)}>❌</button>
                    </div>
                  </td>
                ) : (
                  <td key={brandName + i}></td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
