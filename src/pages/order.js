import React, { useEffect, useState } from "react";
import axios from "../config/axios.config";
import { Table } from "react-bootstrap";
import Loader from "../components/Loader";
import { useHistory } from "react-router-dom";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/orders")
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        // setLoading(false);
      });
  }, []);

  return (
    <div className="my-5">
      <h2>Order History</h2>
      <hr />

      <Table responsive="sm" className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Total Price</th>
            <th>Address</th>
            <th>Sort Code</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
              <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.createdAt.split('T')[0]}</td>
              <td>£{order.price}</td>
              <td>{order.address}</td>
              <td>{order.sortCode}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
