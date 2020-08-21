import Notification from './notification'

let notif = new Notification();
let instance = null;

class Data {
  constructor() {
    if(!instance) instance = this;
    return instance;
  }

  add = (item, wishlist) => {
    var list = wishlist.products;
    list.push(item);
    notif.post(wishlist._id, wishlist);
  };

  isAdded = (item, wishlist) => {
    var list = wishlist.products;
    for(var x=0; x<list.length; x++)
      if(list[x]._id === item._id)
        return true;
    return false;
  };

  remove = (item, wishlist) => {
    var list = wishlist.products;
    for(var x=0; x<list.length; x++)
      if(list[x]._id === item._id) {
        list.splice(x, 1);
        notif.post(wishlist._id, wishlist);
        break;
      }
  };
}

export default Data;
