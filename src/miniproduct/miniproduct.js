import React, {Component} from 'react';
import './miniproduct.css';
import Data from '../services/data';

let data = new Data();

class Miniproduct extends Component {
  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
  }

  remove = () => {
    data.remove(this.props.product);
  }

  render() {
    return(
      <li className="list-group-item miniproduct">
        <p>{this.props.product.title} | <b>${this.props.product.price}</b></p>
        <a className="btn btn-outline-danger" onClick={() => this.remove()}>X</a>
      </li>
    );
  }
}

export default Miniproduct;
