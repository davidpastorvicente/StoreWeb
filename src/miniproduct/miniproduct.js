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
    http.deleteFromWishlist(this.props.product, this.props.wishlist);
  }

  render() {
    return(
      <li className="list-group-item miniproduct">
        <p>{this.props.product.title} <b className="bg-primary">{this.props.product.price} €</b></p>
        <i className="fas fa-trash-alt text-danger float-right" onClick={this.remove}></i>
      </li>
    );
  }
}

export default Miniproduct;
