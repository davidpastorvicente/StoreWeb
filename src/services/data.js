import Notification from './notification'

let notif = new Notification();
let instance = null;

class Data {
  constructor() {
    if(!instance) instance = this;
    return instance;
  }

  add = (item, wishlist) => {
    wishlist.products.push(item);
    notif.post(wishlist._id, wishlist);
  }

  isAdded = (item, wishlist) => {
    for(var x=0; x<wishlist.products.length; x++)
      if(wishlist.products[x]._id === item._id) return true;
    return false;
  }

  remove = (item, wishlist) => {
    for(var x=0; x<wishlist.products.length; x++)
      if(wishlist.products[x]._id === item._id) {
        wishlist.products.splice(x, 1);
        notif.post(wishlist._id, wishlist);
        break;
      }
  }
}

export default Data;
