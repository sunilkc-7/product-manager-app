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
  const [allBrands, setAllBrands] = useState([]);
  const [usedBrands, setUsedBrands] = useState([]);

  const addProduct = () => {
    if (currentBrand && productName) {
      setProducts([
        ...products,
        { brand: currentBrand, name: productName, isEditing: false },
      ]);
      if (!usedBrands.includes(currentBrand)) {
        setUsedBrands([...usedBrands, currentBrand]);
      }
      setProductName("");
    }
  };

  const deleteProduct = (productToDelete) => {
    const newProducts = products.filter(
      (product) => product !== productToDelete
    );
    setProducts(newProducts);

    const brandProducts = newProducts.filter(
      (product) => product.brand === productToDelete.brand
    );
    if (brandProducts.length === 0) {
      setUsedBrands(
        usedBrands.filter((brand) => brand !== productToDelete.brand)
      );
    }
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
    if (newBrandName && !allBrands.includes(newBrandName)) {
      setAllBrands([...allBrands, newBrandName]);
      setNewBrandName("");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const maxProductsInBrand = usedBrands.reduce((max, brandName) => {
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
          {allBrands.map((brandName, index) => (
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
        <button className="insideButton" onClick={addBrandName}>
          +
        </button>
      </div>
      <table>
        <thead>
          <tr>
            {usedBrands.map((brandName) => (
              <th key={brandName}>{brandName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: maxProductsInBrand }, (_, i) => (
            <tr key={i}>
              {usedBrands.map((brandName) => {
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
