import React, {Component} from 'react';
import './product.css';
import Data from '../services/data';

let data = new Data();

class Product extends Component {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
  }

  add = () => {
    data.add(this.props.product);
  }

  render() {
    return(
      <div className="card product">
        <img className="card-img-top img-fluid" alt="Product" src={this.props.product.url}></img>
        <div className="card-block">
          <h4 className="card-title">{this.props.product.title}</h4>
          <p className="card-text">Price: {this.props.product.price}</p>
          <a href="#" onClick={() => this.add()}className="btn btn-primary">Add to wishlist</a>
        </div>
      </div>
    );
  }
}

export default Product;
