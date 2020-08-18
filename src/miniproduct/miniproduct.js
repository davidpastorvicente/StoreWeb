import React, {Component} from 'react';
import './miniproduct.css';

class Miniproduct extends Component {
  render() {
    return(
      <li className="list-group-item miniproduct">
        <a className="btn btn-outline-danger">X</a>
        <p>{this.props.product.title} | <b>${this.props.product.price}</b></p>
      </li>
    );
  }
}

export default Miniproduct;
