import React, {Component} from 'react';
import './product.css';
import Http from '../services/http';
import Data from '../services/data';
import Notification, {NEW} from '../services/notification';

let http = new Http();
let data = new Data();
let notif = new Notification();

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {added: {}};

    this.addWishlist = this.addWishlist.bind(this);
    this.modifyItem = this.modifyItem.bind(this);
    this.classAdded = this.classAdded.bind(this);
    this.click = this.click.bind(this);
    this.listButtons = this.listButtons.bind(this);

    notif.add(NEW, this, this.addWishlist);
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

  addWishlist = wishlist => {
    notif.add(wishlist._id, this, this.modifyItem);
  }

  modifyItem = wishlist => {
    var newAdded = this.state.added;
    newAdded[wishlist._id] = data.isAdded(this.props.product, wishlist);
    this.setState({added: newAdded});
  }

  classAdded = wishlist => this.state.added[wishlist._id] ? "fas fa-minus-square text-danger" : "fas fa-plus-square text-primary"

  click = wishlist => {
    if(this.state.added[wishlist._id]) http.deleteFromWishlist(this.props.product, wishlist);
    else http.putOnWishlist(this.props.product, wishlist);
  }

  listButtons = () => {
    const list = this.props.wishlists.map(wishlist =>
      <button onClick={() => this.click(wishlist)} className="dropdown-item" key={wishlist._id}>
        <i className={this.classAdded(wishlist)}></i>{wishlist.title}</button>);
    return (list);
  }

  render() {
    return(
      <div className="card product">
        <div className="card-header">
          <h3 className="card-head float-left d-inline">Producto</h3>
        </div>

        <div className="card-block">
          <img className="card-img-top img-fluid" alt="Product" src={this.props.product.url}></img>
          <h4 className="card-title">{this.props.product.title}</h4>
          <p className="card-text">Precio: {this.props.product.price} €</p>
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
