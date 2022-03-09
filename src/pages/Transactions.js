import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Transaction from "./Transaction";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  const search = useLocation().search;
  const trId = new URLSearchParams(search).get("transactionId");

  useEffect(() => {
    const getTransactions = async () => {
      const result = await axios.get("http://localhost:3001/transactions");
      console.log("jalan");
      setTransactions(result.data);
    };
    getTransactions();
  }, []);

  return (
    <div>
      {trId ? (
        <Transaction id={trId} />
      ) : (
        <div>
          <h1>Data Transaksi</h1>
          <table border={1} className={"tableContainer"}>
            <thead>
              <tr>
                <th>No</th>
                <th>Kode Transaksi</th>
                <th>Tanggal</th>
                <th>Pelanggan</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((el, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{el.transactionId}</td>
                    <td>
                      {new Date(el.date).toLocaleDateString("id-ID", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td>{el.customer}</td>
                    <td>{el.price}</td>
                    <td>
                      <button
                        onClick={() => {
                          navigate(
                            `/transactions?transactionId=${el.transactionId}`,
                            { replace: true }
                          );
                        }}
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transactions;
