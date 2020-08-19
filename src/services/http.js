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

  getWishlist = () => {
    var promise = new Promise((resolve, reject) => {
      fetch('http://localhost:3001/wishlist')
      .then(response => resolve(response.json()))
    });
    return promise;
  }

  putWishlist = product => {
    fetch('http://localhost:3001/wishlist/add', {
       method: 'PUT', headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
         productId: product._id,
         wishlistId: "5f3970d699980309e885862e"})
     }).then(response => data.add(product))
  }

  deleteWishlist = product => {
    fetch('http://localhost:3001/wishlist/del', {
       method: 'DELETE', headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
         productId: product._id,
         wishlistId: "5f3970d699980309e885862e"})
     }).then(response => data.remove(product))
  }
}

export default Http;
