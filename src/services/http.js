import 'whatwg-fetch';
import Data from './data';
import Notification , {NEW} from './notification';

let instance = null;
let data = new Data();
let notif = new Notification();

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

  postWishlist = name => {
    fetch('http://localhost:3001/wishlist', {
       method: 'POST', headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({title: name})
     }).then(response => response.json()).then(response => notif.post(NEW, response))
  }

  putOnWishlist = (product, wishlist) => {
    fetch('http://localhost:3001/wishlist/add', {
       method: 'PUT', headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({productId: product._id, wishlistId: wishlist._id})
     }).then(response => data.add(product, wishlist))
  }

  deleteFromWishlist = (product, wishlist) => {
    fetch('http://localhost:3001/wishlist/del', {
       method: 'DELETE', headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({productId: product._id, wishlistId: wishlist._id})
     }).then(response => data.remove(product, wishlist))
  }
}

export default Http;
