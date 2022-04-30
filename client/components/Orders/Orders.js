import React from 'react'
import { Link } from "react-router-dom";

const Orders = ({orders, loading})=>{

    if(loading){
        return;
    }
    
    return (
        <div>
            <table width='60%'>
                    <thead>
                        <tr>
                            <th align='left'>Order Placed</th>
                            <th align='left'>Total</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                            {orders.map(order=>{
                                return (
                                    <tr key = {order.id}>
                                        <td width='25%'>{order.date}</td>
                                        <td width='25%'>${order.total}</td>
                                        <td width='25%'><Link to={{ pathname: "/orderDetails", state: { order } }}>View Details</Link></td>
                                    </tr>
                                )
                            }) }
                    </tbody>
                </table>
        </div>
    )
}

export default Orders;