import 'whatwg-fetch';
import Data from './data';

let instance = null;
let data = new Data();

class Http {
  constructor() {
    if(!instance) instance = this;
    return instance;
  }

  getProducts = () => {
    var promise = new Promise((resolve, reject) => {
      fetch('http://localhost:3001/product')
      .then(response => resolve(response.json()))
    });
    return promise;
  }

  getWishlists = () => {
    var promise = new Promise((resolve, reject) => {
      fetch('http://localhost:3001/wishlist')
      .then(response => resolve(response.json()))
    });
    return promise;
  }

  putOnWishlist = (product, wishlist) => {
    fetch('http://localhost:3001/wishlist/add', {
       method: 'PUT', headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
         productId: product._id,
         wishlistId: wishlist._id})
     }).then(response => data.add(product, wishlist))
  }

  deleteFromWishlist = (product, wishlist) => {
    fetch('http://localhost:3001/wishlist/del', {
       method: 'DELETE', headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
         productId: product._id,
         wishlistId: wishlist._id})
     }).then(response => data.remove(product, wishlist))
  }
}

export default Http;
