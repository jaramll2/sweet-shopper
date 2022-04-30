import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import { loadPurchased } from '../../store/cart'
import { Link } from "react-router-dom";
import Orders from "../Orders/Orders";
import Pagination from "../Pagination/Pagination";

class OrderHistory extends Component{

    constructor(){
        super();
        this.state = {
            orders: [],
            loading: false,
            currentPage: 1,
            postsPerPage: 5 
        }
    }

    componentDidMount(){
        this.props.loadPurchased();
    }

    componentDidUpdate(prevProps){
        if(this.props !== prevProps){
            this.setState({loading:true});
            this.setState({orders: this.props.orderHistory});
            this.setState({loading:false});
        }
    }

    render(){
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexofFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentOrders= this.state.orders.slice(indexofFirstPost,indexOfLastPost);

        if(this.state.orders.length <= 0){
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

                <Orders orders={currentOrders} loading={this.state.loading}/>
                <Pagination postsPerPage={this.state.postsPerPage} totalPosts = {this.state.orders.length}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadPurchased: ()=> {
        dispatch(loadPurchased());
      },
    };
};

export default connect(state => state,mapDispatchToProps)(OrderHistory);