import React, { useState, useEffect } from "react";
import axios from "axios";

const Transaction = ({ id }) => {
  const [transactions, setTransactions] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    const getTransactions = async () => {
      const result = await axios.get(
        `http://localhost:3001/transactions?transactionId=${id}`
      );
      setTransactions(result.data);
    };
    getTransactions();
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      let result = 0;
      transactions.forEach((el) => {
        result += el.total;
      });
      setGrandTotal(result);
    }
  }, [transactions]);

  const formatRupiah = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div>
      {transactions.length > 0 ? (
        <div>
          <h1>Detail Transaksi</h1>
          <p>Kode Transaksi : {transactions[0].transactionId}</p>
          <p>Pelanggan : {transactions[0].customer}</p>
          <p>No Telp : {transactions[0].phone}</p>
          <table border={1} className={"tableContainer"}>
            <thead>
              <tr>
                <td>No</td>
                <td>Nama Produk</td>
                <td>Harga Satuan</td>
                <td>Jumlah</td>
                <td>Sub Total</td>
              </tr>
            </thead>
            <tbody>
              {transactions.map((el, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{el.product}</td>
                    <td>{el.price}</td>
                    <td>{el.quantity}</td>
                    <td>Rp {formatRupiah(el.total)}</td>
                  </tr>
                );
              })}
              <tr>
                <td>Total</td>
                <td></td>
                <td></td>
                <td></td>
                <td>Rp {formatRupiah(grandTotal)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <h1>loading</h1>
      )}
    </div>
  );
};

export default Transaction;
