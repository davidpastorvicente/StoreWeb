import 'whatwg-fetch';

class Http {
  getProducts = () => {
    var promise = new Promise((resolve, reject) => {
      fetch('http://localhost:3001/product')
      .then(response => {
        console.log(response.json());
      })
    });
    return promise;
  }
}

export default Http;
