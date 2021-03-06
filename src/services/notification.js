export const NEW = "newWishlist";
export const DEL = "deleteWishlist";
export const MOD = "modifyWishlist";

let instance = null;
var observers = {};

class Notification {
  constructor() {
    if(!instance) instance = this;
    return instance;
  }

  post = (name, data) => {
    let obs = observers[name];
    if(obs) for(var x=0; x<obs.length; x++)
      obs[x].callback(data);
  }

  add = (name, observer, callback) => {
    if(!observers[name]) observers[name] = [];
    let obj = {observer: observer, callback: callback};
    observers[name].push(obj);
  }

  remove = (name, observer) => {
    let obs = observers[name];
    if(obs) for(var x=0; x<obs.length; x++)
        if(observer === obs[x].observer) {
          obs.splice(x, 1);
          observers[name] = obs;
          break;
        }
  }
}

export default Notification;
