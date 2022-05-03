import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import { loadPurchased } from '../../store/cart'
import Orders from "../Orders/Orders";
import Pagination from "../Pagination/Pagination";

class OrderHistory extends Component{

    constructor(){
        super();
        this.state = {
            orders: [],
            loading: false,
            currentPage: JSON.parse(window.localStorage.getItem('pageNumber')) || 1,
            postsPerPage: 5 
        }

        this.paginate = this.paginate.bind(this);
    }

    componentDidMount(){
        this.props.loadPurchased();
    }

    componentWillUnmount() {
        window.localStorage.removeItem('pageNumber');
      }

    componentDidUpdate(prevProps){
        if(this.props !== prevProps){
            this.setState({loading:true});
            this.setState({orders: this.props.orderHistory});
            this.setState({loading:false});
        }
    }

    paginate (pageNum){
        this.setState({currentPage: pageNum});
        window.localStorage.setItem('pageNumber', JSON.stringify(pageNum));
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
                <Pagination postsPerPage={this.state.postsPerPage} totalPosts = {this.state.orders.length} paginate={this.paginate}/>
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
