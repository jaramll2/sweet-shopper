import React, { Component } from "react";
import { connect } from "react-redux";
import { getPurchased } from '../../store/cart'
import { Link } from "react-router-dom";

class OrderHistory extends Component{
    componentDidMount(){
        this.props.getPurchased();
    }

    render(){
        const carts = this.props.orderHistory;
        console.log('CARTS');
        console.log(carts);
        
        if(carts.length <= 0){
            return (
                <div>
                    <h3>Order History</h3>
                    <span>No orders.</span>
                </div>
            )
        }

        return(
            <div>
                <h3>Order History</h3>

                <table width='60%'>
                    <thead>
                        <tr>
                            <th align='left'>Order Placed</th>
                            <th align='left'>Total</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                            {carts.map(cart=>{
                                return (
                                    <tr key = {cart.id}>
                                        <td width='25%'>{cart.date}</td>
                                        <td width='25%'>{cart.total}</td>
                                        <td width='25%'><Link to='/orderDetails'>View Details</Link></td>
                                    </tr>
                                )
                            }) }
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPurchased: ()=> {
        dispatch(getPurchased());
      },
    };
};

export default connect(state => state,mapDispatchToProps)(OrderHistory);