import Notification, {NOTIF_WCHANGE} from './notification'

let ns = new Notification();
let instance = null;
var wishlist = [];

class Data {
  constructor() {
    if(!instance) instance = this;
    return instance;
  }

  add = item => {
    wishlist.push(item);
    ns.post(NOTIF_WCHANGE, wishlist);
  };

  remove = item => {
    for(var x=0; x<wishlist.length; x++)
      if(wishlist[x]._id === item._id) {
        wishlist.splice(x, 1);
        ns.post(NOTIF_WCHANGE, wishlist);
        break;
      }
  };
}

export default Data;
