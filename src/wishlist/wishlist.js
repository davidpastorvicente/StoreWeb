import React, {Component} from 'react';
import './wishlist.css';
import Miniproduct from '../miniproduct/miniproduct';

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {wishlist: [
      {
        title: "A",
        price: 23,
        _id: "aosl"
      },
      {
        title: "B",
        price: 233,
        _id: "aosls"
      },
      {
        title: "C",
        price: 2323,
        _id: "aossdl"
      }
    ]};

    this.createWishlist = this.createWishlist.bind(this);
  }


  createWishlist = () => {
    const list = this.state.wishlist.map(data =>
      <Miniproduct product={data} key={data._id} />
    );

    return (list);
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
