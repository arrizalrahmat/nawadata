import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import validation from "../helpers/validation";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [shouldCallForm, setShouldCallForm] = useState({
    status: false,
    type: "",
    index: 0,
  });
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    description: "",
  });

  const getProducts = async () => {
    const result = await axios.get("http://localhost:3001/products");
    setProducts(result.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleUpdate = (i) => {
    setNewProduct(products[i]);
  };

  const resetNewProduct = () =>
    setNewProduct({ name: "", price: 0, description: "" });

  const resetShouldCallForm = () =>
    setShouldCallForm({
      status: false,
      type: "",
      index: 0,
    });

  const handleSubmit = async () => {
    const { name, price, description } = newProduct;
    if (shouldCallForm.type === "update") {
      const result = await axios.put(
        `http://localhost:3001/products/update/${
          products[shouldCallForm.index].id
        }`,
        { name, price: Number(price), description }
      );
    } else {
      const result = await axios.post("http://localhost:3001/products/add", {
        name,
        price: Number(price),
        description,
      });
    }
    resetNewProduct();
    resetShouldCallForm();
    getProducts();
  };

  const handleDelete = async (id) => {
    const result = await axios.delete(
      `http://localhost:3001/products/delete/${id}`
    );
    getProducts();
  };

  const renderForm = useCallback(
    (i) => {
      return (
        <div>
          <p>Nama</p>
          <input
            placeholder="input nama disini"
            value={newProduct.name ? newProduct.name : ""}
            onChange={(e) => {
              setNewProduct({ ...newProduct, name: e.target.value });
            }}
          />
          <p>Harga</p>
          <input
            placeholder="input harga disini"
            value={newProduct.price}
            onChange={(e) => {
              const isNumber = validation.isNumber(
                e.target.value[e.target.value.length - 1]
              );
              if (isNumber) {
                setNewProduct({ ...newProduct, price: e.target.value });
              }
            }}
          />
          <p>Deskripsi </p>
          <input
            placeholder="input nomor telepon disini"
            value={newProduct.description}
            onChange={(e) => {
              setNewProduct({ ...newProduct, description: e.target.value });
            }}
          />
          <br />
          <br />
          <button onClick={() => handleSubmit(i)}>submit</button>
        </div>
      );
    },
    [shouldCallForm, newProduct]
  );

  return (
    <div>
      {products.length > 0 ? (
        <div>
          <button
            onClick={() => {
              setShouldCallForm({
                ...shouldCallForm,
                status: !shouldCallForm.status,
                type: "create",
              });
            }}
          >
            Add
          </button>
          <h1>Data Produk</h1>
          <table className="tableContainer" border={1}>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Harga</th>
                <th>Deskripsi</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                    <td>
                      <button
                        onClick={() => {
                          handleUpdate(i);
                          setShouldCallForm({
                            status: !shouldCallForm.status,
                            type: "update",
                            index: i,
                          });
                        }}
                      >
                        Update
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(product.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {shouldCallForm.status ? renderForm() : <></>}
        </div>
      ) : (
        <h1>loading</h1>
      )}
    </div>
  );
};

export default Products;
