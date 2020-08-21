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
    this.state = {added: {}};

    this.modifyItem = this.modifyItem.bind(this);
    this.classAdded = this.classAdded.bind(this);
    this.msgAdded = this.msgAdded.bind(this);
    this.click = this.click.bind(this);
    this.listButtons = this.listButtons.bind(this);
  }

  componentDidMount() {
    var listWishlists = this.props.wishlists;
    for(var x=0; x<listWishlists.length; x++) {
      notif.add(listWishlists[x]._id, this, this.modifyItem);
      this.modifyItem(listWishlists[x]);
    }
  }

  componentWillUnmount() {
    var listWishlists = this.props.wishlists;
    for(var x=0; x<listWishlists.length; x++)
      notif.remove(listWishlists[x]._id, this);
  }

  modifyItem = wishlist => {
    var newAdded = this.state.added;
    newAdded[wishlist._id] = data.isAdded(this.props.product, wishlist);
    this.setState({added: newAdded});
  }

  classAdded = wishlist => this.state.added[wishlist._id] ? "bg-danger" : "bg-primary"

  msgAdded = wishlist => this.state.added[wishlist._id] ? "-" : "+"

  click = wishlist => {
    if(this.state.added[wishlist._id]) http.deleteFromWishlist(this.props.product, wishlist);
    else http.putOnWishlist(this.props.product, wishlist);
  }

  listButtons = () => {
    const list = this.props.wishlists.map(wishlist =>
      <button onClick={() => this.click(wishlist)} className="dropdown-item" key={wishlist._id}>
        <span className={this.classAdded(wishlist)}>{this.msgAdded(wishlist)}</span> {wishlist.title}
      </button>);
    return (list);
  }

  render() {
    return(
      <div className="card product">
        <img className="card-img-top img-fluid" alt="Product" src={this.props.product.url}></img>
        <div className="card-block">
          <h4 className="card-title">{this.props.product.title}</h4>
          <p className="card-text">Price: {this.props.product.price} €</p>
          <div className="btn-group" role="group">
            <button id="wishGroup" type="button" className="btn btn-primary dropdown-toggle"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Añadir a la wishlist</button>
            <div className="dropdown-menu" aria-labelledby="wishGroup">
              {this.listButtons()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
