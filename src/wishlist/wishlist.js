import React, {Component} from 'react';
import './wishlist.css';
import Notification from '../services/notification';
import Miniproduct from '../miniproduct/miniproduct';

let notif = new Notification();

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {listProducts: this.props.wishlist.products};

    this.createWishlist = this.createWishlist.bind(this);
    this.modifyWishlist = this.modifyWishlist.bind(this);

    notif.post(this.props.wishlist._id, this.props.wishlist);
  }

  componentDidMount() {
    notif.add(this.props.wishlist._id, this, this.modifyWishlist);
  }

  componentWillUnmount() {
    notif.remove(this.props.wishlist._id, this);
  }

  createWishlist = () => {
    const list = this.state.listProducts.map(product =>
      <Miniproduct product={product} key={product._id} wishlist={this.props.wishlist} />);
    return (list);
  }

  modifyWishlist = newWishlist => {
    this.setState({listProducts: newWishlist.products});
  }

  render() {
    return(
      <div className="card wishlist">
        <div className="card-block">
          <h4 className="card-title">Wishlist {this.props.wishlist.title}</h4>
          <ul className="list-group">
           {this.createWishlist()}
          </ul>
        </div>
      </div>
    );
  }
}

export default Wishlist;
