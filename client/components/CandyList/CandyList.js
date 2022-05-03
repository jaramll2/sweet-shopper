import React from "react";
import { connect } from "react-redux";
import { getCandy } from "../../store/candy";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Footer from "../Footer";
import CandyItem from "../CandyItem";
import Candies from "../Candies/Candies";
import Pagination from "../Pagination/Pagination";

import "./CandyList.scss";

class CandyList extends React.Component {
  constructor(){
    super();
    this.state = {
      sortBy: "",
      loading: false,
      currentPage: JSON.parse(window.localStorage.getItem('pageNumber')) || 1,
      postsPerPage: 6
    };
    this.paginate = this.paginate.bind(this);
  }
  
  async componentDidMount() {
    await this.props.getCandy();
  }

  componentWillUnmount() {
    window.localStorage.removeItem('pageNumber');
  }

  paginate (pageNum){
    this.setState({currentPage: pageNum});
    window.localStorage.setItem('pageNumber', JSON.stringify(pageNum));
  }

  handleSort = (event) => {
    this.setState({ sortBy: event.target.value });
  };

  getSortedCandies = () => {
    const { sortBy } = this.state;
    const { candies } = this.props;

    const sortOption = {
      "nameAsc": (a, b) => a.name.localeCompare(b.name),
      "nameDesc": (a, b) => b.name.localeCompare(a.name),
      "priceAsc": (a, b) => a.price - b.price,
      "priceDesc": (a, b) => b.price - a.price,
    }

    if (sortBy in sortOption) {
      return [...candies].sort(sortOption[sortBy]);
    }

    return candies;
  };

  render() {
    const { sortBy } = this.state;
    const { candies } = this.props;
    const containerCountMsg = `${candies.length} product${candies.length > 1 ? "s" : ""}`;
    const sortedCandies = this.getSortedCandies();
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexofFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentCandies= sortedCandies.slice(indexofFirstPost,indexOfLastPost);

    console.log(this.props);
    console.log(sortedCandies);
    console.log(currentCandies);
    return (
      <div className="shop">
        <div className="shop-header">
          <img src="./candy-image.jpeg" />
          <div className="shop-name">Category</div>
        </div>
        <div className="shop-body">
          <div className="category-container">
            <div>Candy</div>
            <div>Caramel</div>
            <div>Chocolate</div>
            <div>Gummy</div>
          </div>
          <div className="item-container">
            <div className="container-header">
              <span className="product-count">{containerCountMsg}</span>
              <span className="sort-container">
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="container-sort">Sort By</InputLabel>
                  <Select
                    labelId="container-sort"
                    id="container-sort"
                    value={sortBy}
                    label="Sort By"
                    onChange={this.handleSort}
                  >
                    <MenuItem value="nameAsc">Name: A  -  Z</MenuItem>
                    <MenuItem value="nameDesc">Name: Z  -  A</MenuItem>
                    <MenuItem value="priceAsc">Price: Low to High</MenuItem>
                    <MenuItem value="priceDesc">Price: High to Low</MenuItem>
                  </Select>
                </FormControl>
              </span>
            </div>
            {/* <div className="container-contents">
              {this.getSortedCandies().map((candy) => (
                <CandyItem key={candy.id} candy={candy} />
              ))}
            </div> */}
            <Candies candies={currentCandies}/>
          </div>
        </div>
        <div className="page"> 
          <Pagination postsPerPage={this.state.postsPerPage} totalPosts = {this.props.candies.length} paginate={this.paginate}/>
        </div>
        <Footer />
      </div>
    );
  }
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  background: "#ffffff",
  transform: "translate(-50%, -50%)",
  minWidth: "40%",
  maxWidth: "80%",
  border: "none",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCandy: async () => {
      return dispatch(getCandy());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CandyList);
