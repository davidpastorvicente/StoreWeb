import React, {Component} from 'react';
import './wishlist.css';
import Data from '../services/data';
import Notification, {NOTIF_WCHANGE} from '../services/notification';
import Http from '../services/http';
import Miniproduct from '../miniproduct/miniproduct';

let notif = new Notification();
let http = new Http();
let data = new Data();

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {wishlist: []};
    this.initWishlist = this.initWishlist.bind(this);
    this.createWishlist = this.createWishlist.bind(this);
    this.modifyWishlist = this.modifyWishlist.bind(this);
    this.initWishlist();
  }

  componentDidMount() {
    notif.add(NOTIF_WCHANGE, this, this.modifyWishlist);
  }

  componentWillUnmount() {
    notif.remove(NOTIF_WCHANGE, this);
  }

  initWishlist = () => {
    http.getWishlist().then(wishs => {
      this.setState({wishlist: wishs[0].products});
      for(var x=0; x<this.state.wishlist.length; x++)
        data.add(this.state.wishlist[x]);
    });
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
