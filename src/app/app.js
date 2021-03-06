import React, {Component} from 'react';
import logo from './logo.svg';
import './app.css';
import Product from '../product/product';
import Wishlist from '../wishlist/wishlist';
import Http from '../services/http';
import Notification, {NEW, DEL, MOD} from '../services/notification';

let http = new Http();
let notif = new Notification();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {products: [], wishlists: [], click: false, newName: ""};

    this.productList = this.productList.bind(this);
    this.wishlistList = this.wishlistList.bind(this);
    this.addWishlist = this.addWishlist.bind(this);
    this.removeWishlist = this.removeWishlist.bind(this);
    this.modifyWishlist = this.modifyWishlist.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    notif.add(NEW, this, this.addWishlist);
    notif.add(DEL, this, this.removeWishlist);
    notif.add(MOD, this, this.modifyWishlist);
  }

  componentDidMount() {
    http.getWishlists().then(wishs => this.setState({wishlists: wishs}, () =>
    http.getProducts().then(prods => this.setState({products: prods}))));
  }

  productList = () => {
    const list = this.state.products.map(product =>
      <div className="col-lg-6 col-xl-4" key={product._id}>
        <Product product={product} wishlists={this.state.wishlists}/></div>);
    return (list);
  }

  wishlistList = () => {
    const list = this.state.wishlists.map(wishlist =>
      <div className="col-12" key={wishlist._id}>
        <Wishlist wishlist={wishlist}/></div>);
    return (list);
  }

  addWishlist = wishlist => {
    var listWishlists = this.state.wishlists;
    listWishlists.push(wishlist);
    this.setState({wishlists: listWishlists});
    this.setState({click: false});
  }

  removeWishlist = wishlist => {
    var listWishlists = this.state.wishlists;
    for(var x=0; x<listWishlists.length; x++)
      if(listWishlists[x]._id === wishlist._id) {
        listWishlists.splice(x, 1);
        break;
      }
    this.setState({wishlists: listWishlists});
  }

  modifyWishlist = () => {
    http.getWishlists().then(wishs => this.setState({wishlists: wishs}));
  }

  handleClick(event, click) {
    this.setState({click: click});
    event.preventDefault();
  }

  handleName(event) {
    this.setState({newName: event.target.value});
  }

  handleSubmit(event) {
    http.postWishlist(this.state.newName);
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="container-fluid App-main">
          <div className="row">
            <div className="col-md-6 col-lg-8">
              <div className="row">
                {this.productList()}
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="row">
                <div className={this.state.click ? "col-12 d-none" : "col-12 d-block"}>
                  <button className="btn btn-primary newWish" onClick={e => this.handleClick(e, true)}>Crear una wishlist</button>
                </div>

                <div className={this.state.click ? "col-12 d-block" : "col-12 d-none"}>
                  <form className="form-inline newWish">
                    <label className="sr-only" htmlFor="name">Nombre</label>
                    <input type="text" className="form-control mr-2" id="name" onChange={this.handleName} placeholder="Introduzca el título"/>
                    <button className="btn btn-primary mr-2" onClick={this.handleSubmit}>Crear</button>
                    <button className="btn btn-danger" onClick={e => this.handleClick(e, false)}>Cancelar</button>
                  </form>
                </div>
                {this.wishlistList()}
              </div>
            </div>
          </div>
        </div>
      </div>


    );
  }
}

export default App;
