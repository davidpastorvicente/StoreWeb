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
    fetch('http://localhost:3001/wishlist/add', {
       method: 'PUT', headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
         productId: _id,
         wishlistId: "5f3970d699980309e885862e"})
     }).then(res=>res.json()).then(res => console.log(res))
  }

  deleteWishlist = _id => {
    fetch('http://localhost:3001/wishlist/del', {
       method: 'DELETE', headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
         productId: _id,
         wishlistId: "5f3970d699980309e885862e"})
     }).then(res=>res.json()).then(res => console.log(res))
  }
}

export default Http;
