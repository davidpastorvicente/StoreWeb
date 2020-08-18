import React, {Component} from 'react';
import logo from './logo.svg';
import './app.css';
import Product from '../product/product';
import Wishlist from '../wishlist/wishlist';
import Http from '../services/http';

const http = new Http();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {products:[]};

    this.productList = this.productList.bind(this);
    http.getProducts().then(data => this.setState({products: data}));
  }

  productList = () => {
    const list = this.state.products.map(product =>
      <div className="col-lg-6 col-xl-4" key={product._id}>
        <Product product={product} />
      </div>
    );
    return (list);
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
              <Wishlist />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
