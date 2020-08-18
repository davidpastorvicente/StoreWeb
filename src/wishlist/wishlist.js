import React, {Component} from 'react';
import './wishlist.css';
import Data from '../services/data';
import Notification, {NOTIF_WCHANGE} from '../services/notification'
import Miniproduct from '../miniproduct/miniproduct';

let notif = new Notification();

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {wishlist: []};
    this.createWishlist = this.createWishlist.bind(this);
    this.modifyWishlist = this.modifyWishlist.bind(this);
  }

  componentDidMount() {
    notif.add(NOTIF_WCHANGE, this, this.modifyWishlist);
  }

  componentWillUnmount() {
    notif.remove(NOTIF_WCHANGE, this);
  }

  createWishlist = () => {
    const list = this.state.wishlist.map(data =>
      <Miniproduct product={data} key={data._id} />
    );

    return (list);
  }

  modifyWishlist = newWishlist => {
    this.setState({wishlist: newWishlist});
  }

  render() {
    return(
      <div className="card wishlist">
        <div className="card-block">
          <h4 className="card-title">Wishlist</h4>
          <ul className="list-group">
           {this.createWishlist()}
          </ul>
        </div>
      </div>
    );
  }
}

export default Wishlist;
