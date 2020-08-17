import React, {Component} from 'react';
import logo from './logo.svg';
import './app.css';
import Product from '../product/product';
import Http from '../services/http';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {products:[]};
    this.loadData = this.loadData.bind(this);
    this.productList = this.productList.bind(this);
    this.loadData();
  }

  loadData = () => {
    const http = new Http();
    var self = this;
    http.getProducts().then(data => self.setState({products: data}));
  }

  productList = () => {
    const list = this.state.products.map(product =>
      <div className="col-sm-4" key={product._id}>
        <Product title={product.title} price={product.price} url={product.url} />
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
        <div className="container App-main">
          <div className="row">
            {this.productList()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
