import React from "react";
import { Link } from "react-router-dom";

import "./Orders.scss";


const Orders = ({ orders, loading }) => {
  if (loading) {
    return;
  }

  return (
    <div className="orders">
      <table className="order-table">
        <thead>
          <tr>
            <th>Order Placed</th>
            <th>Total</th>
            <th>Order Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order.id}>
                <td>{order.date}</td>
                <td>${order.total}</td>
                <td>
                  <Link to={{ pathname: "/orderDetails", state: { order } }}>View Details</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
