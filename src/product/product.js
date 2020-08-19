import React, {Component} from 'react';
import './product.css';
import Http from '../services/http';
import Data from '../services/data';
import Notification, {NOTIF_WCHANGE} from '../services/notification';

let http = new Http();
let data = new Data();
let notif = new Notification();

class Product extends Component {
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
    this.state = {added: data.isAdded(this.props.product)};
  }

  componentDidMount() {
    notif.add(NOTIF_WCHANGE, this, this.modifyItem);
  }

  componentWillUnmount() {
    notif.remove(NOTIF_WCHANGE, this);
  }

  click = () => {
    if(this.state.added)
      data.remove(this.props.product);
    else {
      data.add(this.props.product);
      http.putWishlist(this.props.product._id);
    }
  }

  modifyItem = () => {
    this.setState({added: data.isAdded(this.props.product)})
  }

  render() {
    var btn;
    if(this.state.added) btn = "btn btn-danger";
    else btn = "btn btn-primary";

    return(
      <div className="card product">
        <img className="card-img-top img-fluid" alt="Product" src={this.props.product.url}></img>
        <div className="card-block">
          <h4 className="card-title">{this.props.product.title}</h4>
          <p className="card-text">Price: {this.props.product.price}</p>
          <a href="#" onClick={() => this.click()} className={btn}>
          {this.state.added ? "Remove from wishlist" : "Add to wishlist"}</a>
        </div>
      </div>
    );
  }
}

export default Product;
