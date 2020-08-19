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
}

export default Http;
