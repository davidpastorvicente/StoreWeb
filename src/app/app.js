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
    this.state = {products: [], wishlists: [], click: false};

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
      </div>);
    return (list);
  }

  wishlistList = () => {
    const list = this.state.wishlists.map(wishlist =>
      <div className="col-12" key={wishlist._id}>
        <Wishlist wishlist={wishlist} />
      </div>);
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
              <div className="row">
                <div className={this.state.click ? "col-12 d-none" : "col-12 d-block"}>
                  <button className="btn btn-primary newWish" onClick={() => this.setState({click: true})}>Crear una wishlist</button>
                </div>

                <div className={this.state.click ? "col-12 d-block" : "col-12 d-none"}>
                  <form className="form-inline newWish">
                    <label className="sr-only" htmlFor="name">Name</label>
                    <input type="text" className="form-control mr-2" id="name" placeholder="Introduzca el título"/>
                    <button type="submit" className="btn btn-primary mr-2">Crear</button>
                    <button className="btn btn-danger" onClick={() => this.setState({click: false})}>Cancelar</button>
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
