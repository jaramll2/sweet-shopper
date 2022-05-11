import React from "react";
import { connect } from "react-redux";
import { getCandy } from "../../store/candy";
import { getTags } from "../../store/tags";

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
      currentPage: ( JSON.parse(window.localStorage.getItem('pageNumber')) || 1),
      postsPerPage: 6
    };
    this.paginate = this.paginate.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
  }
  
  async componentDidMount() {
    await this.props.getCandy();
    await this.props.getTags();
    if(this.props.match.params.num){
      this.setState({currentPage: this.props.match.params.num});
    }
  }

  componentWillUnmount() {
    window.localStorage.removeItem('pageNumber');
  }

  paginate (pageNum){
    this.setState({currentPage: pageNum});
    window.localStorage.setItem('pageNumber', JSON.stringify(pageNum));
  }

  handleSort = (event) => {
    // this.setState({ sortBy: event.target.value });
    const { filter, history } = this.props;

    if(filter){
      const url = `/candy/page/1/filter/${JSON.stringify(filter)}`
      history.push(`${url}/${event.target.value}`);
    }
    else{
      history.push(`/candy/page/1/filter/[]/${event.target.value}`)
    }

    this.setState({currentPage: 1});
  };

  getSortedCandies = (candies) => {
    const { sort } = this.props;

    const sortBy = sort;
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

  //takes a string and adds it to the url if it's not already there,
  //or removes the filter if it is already there
  toggleFilter(filter){
    const { sort } = this.props;
    if(!this.props.filter){
      this.props.history.push(`/candy/page/1/filter/${JSON.stringify([filter])}`)
    }
    else{
      if(this.props.filter.includes(filter)){
        this.props.history.push(`/candy/page/1/filter/${JSON.stringify([...this.props.filter.filter(filt => filt !== filter)])}${sort ? `/${sort}` : ''}`)
      }
      else{
        this.props.history.push(`/candy/page/1/filter/${JSON.stringify([...this.props.filter, filter])}${sort ? `/${sort}` : ''}`)
      }
    }
    console.log(this.props);
    this.setState({currentPage: 1});
  }

  render() {
    let { candies, tags, filter, sort } = this.props;
    const { currentPage } = this.state;
    //filter candies based on the array of filters that are on the url
    if(filter){
      candies = candies.filter(candy => {
        return filter.every((filt) => {
          let hasTag = false;
          candy.tags.forEach(tag => {
            if(tag.name === filt)
              hasTag = true;
            })
            return hasTag;
        })
      })
    }
    const containerCountMsg = `${candies.length} product${candies.length > 1 ? "s" : ""}`;
    const sortedCandies = this.getSortedCandies(candies);


    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexofFirstPost = indexOfLastPost - this.state.postsPerPage;
    let currentCandies = sortedCandies.slice(indexofFirstPost,indexOfLastPost);
    const heroText = filter?.length > 0 ? filter.join(", ") : "All Candies";

    return (
      <div className="shop">
        <div className="shop-header">
          <img src="/candy-image.jpeg" />
          <div className="shop-name">{heroText}</div>
        </div>
        <div className="shop-body">
          <div className="category-container">
            {tags.map(tag => {
              return(
                <div 
                className={`category ${filter?.includes(tag.name) ? `selected` : null}`}
                key={tag.id} 
                onClick={() => this.toggleFilter(tag.name)}>
                  {tag.name}
                </div>
              )
            })}
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
                    value={sort || ''}
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
            <Candies candies={currentCandies}/>
          </div>
        </div>
        <div className="pagination"> 
          <Pagination 
            postsPerPage={this.state.postsPerPage} 
            totalPosts = {candies.length}
            paginate={this.paginate}
            currentPage={currentPage}
            compName = 'candy'
            filter = {filter}
            sort = {sort}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, {match}) => {

  //grabs array of filters from the url
  let filter;
  if(match.params.filter){
    filter = JSON.parse(match.params?.filter);
  }

  return {
    filter,
    ...state,
    sort: match.params.sort
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCandy: async () => {
      return dispatch(getCandy());
    },
    getTags: function(){
      return dispatch(getTags());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CandyList);
