import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import validation from "../helpers/validation";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [shouldCallForm, setShouldCallForm] = useState({
    status: false,
    type: "",
    index: 0,
  });
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const getCustomers = async () => {
    const result = await axios.get("http://localhost:3001/users");
    setCustomers(result.data);
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const handleUpdate = (i) => {
    setNewCustomer(customers[i]);
  };

  const resetNewCustomer = () =>
    setNewCustomer({ name: "", address: "", phone: "" });

  const resetShouldCallForm = () =>
    setShouldCallForm({
      status: false,
      type: "",
      index: 0,
    });

  const handleSubmit = async () => {
    const { name, address, phone } = newCustomer;
    if (shouldCallForm.type === "update") {
      const result = await axios.put(
        `http://localhost:3001/users/update/${
          customers[shouldCallForm.index].id
        }`,
        { name, address, phone }
      );
    } else {
      const result = await axios.post("http://localhost:3001/users/add", {
        name,
        address,
        phone,
      });
    }
    resetNewCustomer();
    resetShouldCallForm();
    getCustomers();
  };

  const handleDelete = async (id) => {
    const result = await axios.delete(
      `http://localhost:3001/users/delete/${id}`
    );
    getCustomers();
  };

  const renderForm = useCallback(
    (i) => {
      return (
        <div>
          <p>Nama</p>
          <input
            placeholder="input nama disini"
            value={newCustomer.name ? newCustomer.name : ""}
            onChange={(e) => {
              const isNumber = validation.isNumber(
                e.target.value[e.target.value.length - 1]
              );
              const isSpcChar = validation.isSpcChar(
                e.target.value[e.target.value.length - 1]
              );
              if (!isNumber && !isSpcChar) {
                setNewCustomer({ ...newCustomer, name: e.target.value });
              }
            }}
          />
          <p>Alamat</p>
          <input
            placeholder="input alamat disini"
            value={newCustomer.address}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, address: e.target.value })
            }
          />
          <p>No Telepon </p>
          <input
            placeholder="input nomor telepon disini"
            value={newCustomer.phone}
            onChange={(e) => {
              const isNumber = validation.isNumber(
                e.target.value[e.target.value.length - 1]
              );
              if (isNumber) {
                setNewCustomer({ ...newCustomer, phone: e.target.value });
              }
            }}
          />
          <br />
          <br />
          <button onClick={() => handleSubmit(i)}>submit</button>
        </div>
      );
    },
    [shouldCallForm, newCustomer]
  );

  return (
    <div>
      {customers.length > 0 ? (
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
          <h1>Data Pelanggan</h1>
          <table className="tableContainer" border={1}>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Alamat</th>
                <th>No Telp</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{customer.name}</td>
                    <td>{customer.address}</td>
                    <td>{customer.phone}</td>
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
                          handleDelete(customer.id);
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

export default Customers;
