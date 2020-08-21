import React, {Component} from 'react';
import './product.css';
import Http from '../services/http';
import Data from '../services/data';
import Notification from '../services/notification';

let http = new Http();
let data = new Data();
let notif = new Notification();

class Product extends Component {
  constructor(props) {
    super(props);
    this.initStates = this.initStates.bind(this);
    this.modifyItem = this.modifyItem.bind(this);
    this.classAdded = this.classAdded.bind(this);
    this.msgAdded = this.msgAdded.bind(this);
    this.click = this.click.bind(this);
    this.listButtons = this.listButtons.bind(this);
    this.state = {added: {}};
    var listWishlists = this.props.wishlists;
    for(var x=0; x<listWishlists.length; x++)
      notif.add(listWishlists[x]._id, this, this.modifyItem);
  }

  initStates = () => {
    var listWishlists = this.props.wishlists;
    for(var x=0; x<listWishlists.length; x++) {
      var added = this.state.added;
      added[listWishlists[x]._id] = data.isAdded(this.props.product, listWishlists[x]);
      this.setState(added);
    }
  }

  modifyItem = wishlist => {
    var added = this.state.added;
    added[wishlist._id] = data.isAdded(this.props.product, wishlist);
    this.setState(added);
  }

  classAdded = wishlist => this.state.added[wishlist._id] ? "btn btn-danger" : "btn btn-primary"

  msgAdded = wishlist => this.state.added[wishlist._id] ? "-" : "+"

  click = wishlist => {
    if(this.state.added[wishlist._id]) http.deleteFromWishlist(this.props.product, wishlist);
    else http.putOnWishlist(this.props.product, wishlist);
  }

  listButtons = () => {
    const list = this.props.wishlists.map(wishlist =>
      <button onClick={() => this.click(wishlist)} className={this.classAdded(wishlist)}
        key={wishlist._id}>{this.msgAdded(wishlist)}</button>
    );
    return (list);
  }

  render() {
    return(
      <div className="card product">
        <img className="card-img-top img-fluid" alt="Product" src={this.props.product.url}></img>
        <div className="card-block">
          <h4 className="card-title">{this.props.product.title}</h4>
          <p className="card-text">Price: {this.props.product.price} €</p>
          <div className="card-buttons">
            {this.listButtons()}
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
