import React, {Component} from 'react';
import logo from './logo.svg';
import './app.css';
import Product from '../product/product';
import Wishlist from '../wishlist/wishlist';
import Http from '../services/http';

let http = new Http();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {products: [], wishlists: []};

    this.productList = this.productList.bind(this);
    this.wishlistList = this.wishlistList.bind(this);
  }

  componentDidMount() {
    http.getWishlists().then(wishs => this.setState({wishlists: wishs}, () =>
    http.getProducts().then(prods => this.setState({products: prods}))));
  }

  productList = () => {
    const list = this.state.products.map(product =>
      <div className="col-lg-6 col-xl-4" key={product._id}>
        <Product product={product} wishlists={this.state.wishlists}/>
      </div>
    );
    return (list);
  }

  wishlistList = () => {
    const list = this.state.wishlists.map(wishlist =>
      <div className="col-12" key={wishlist._id}>
        <Wishlist wishlist={wishlist} />
      </div>
    );
    return (list);
  }

  render() {
    console.log(this.state);
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
