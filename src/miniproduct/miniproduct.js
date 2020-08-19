import React, {Component} from 'react';
import './miniproduct.css';
import Http from '../services/http';

let http = new Http();

class Miniproduct extends Component {
  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
  }

  remove = () => {
    http.deleteWishlist(this.props.product);
  }

  render() {
    return(
      <li className="list-group-item miniproduct">
        <p>{this.props.product.title} | <b>{this.props.product.price} €</b></p>
        <button className="btn btn-outline-danger" onClick={() => this.remove()}>X</button>
      </li>
    );
  }
}

export default Miniproduct;
