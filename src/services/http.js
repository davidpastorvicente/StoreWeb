import 'whatwg-fetch';

let instance = null;

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

  putWishlist = _id => {
    fetch('http://localhost:3001/wishlist/add', {method: 'PUT',
                                             headers: {'Content-Type': 'application/json'},
                                             body: JSON.stringify({
                                               productId: _id,
                                               wishlistId: "5f38489685a61f22dc5460c2"})}
         ).then(response => console.log(response));
  }
}

export default Http;
