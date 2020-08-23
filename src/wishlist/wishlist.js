import React, {Component} from 'react';
import './wishlist.css';
import Http from '../services/http'
import Notification, {MOD} from '../services/notification';
import Miniproduct from '../miniproduct/miniproduct';

let http = new Http();
let notif = new Notification();

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {listProducts: this.props.wishlist.products, click: false, newTitle: this.props.wishlist.title};

    this.createWishlist = this.createWishlist.bind(this);
    this.modifyWishlist = this.modifyWishlist.bind(this);
    this.deleteWishlist = this.deleteWishlist.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setTitle = this.setTitle.bind(this);

    notif.post(this.props.wishlist._id, this.props.wishlist);
  }

  componentDidMount() {
    notif.add(this.props.wishlist._id, this, this.modifyWishlist);
  }

  componentWillUnmount() {
    notif.remove(this.props.wishlist._id, this);
  }

  createWishlist = () => {
    const list = this.state.listProducts.map(product =>
      <Miniproduct product={product} key={product._id} wishlist={this.props.wishlist}/>);
    return (list);
  }

  modifyWishlist = newWishlist => {
    this.setState({listProducts: newWishlist.products});
  }

  deleteWishlist(event) {
    http.deleteWishlist(this.props.wishlist);
    event.preventDefault();
  }

  handleClick(event, click) {
    this.setState({click: click});
    event.preventDefault();
  }

  handleName(event) {
    this.setState({newTitle: event.target.value});
  }

  handleSubmit(event) {
    notif.add(MOD, this, this.setTitle);
    http.putWishlist(this.props.wishlist, this.state.newTitle);
    event.preventDefault();
  }

  setTitle = name => {
    this.setState({newTitle: name, click: false});
    notif.remove(MOD, this);
  }

  render() {
    return(
      <div className="card wishlist">
        <div className="card-header">
          <h3 className="card-head float-left d-inline">Wishlist</h3>
          <i className="fas fa-minus-square text-danger float-right" onClick={this.deleteWishlist}></i>
          <i className="fas fa-pen-square text-primary float-right mr-2" onClick={e => this.handleClick(e, true)}></i>
        </div>
        <div className="card-block">
          <h4 className={this.state.click ? "card-title d-none" : "card-title d-block"}>{this.state.newTitle}</h4>
          <div className={this.state.click ? "d-block" : "d-none"}>
            <form className="form-inline editWish">
              <label className="sr-only" htmlFor="name">Nombre</label>
              <input type="text" className="form-control mr-2" id="name" onChange={this.handleName} value={this.state.newTitle}/>
              <button className="btn btn-primary mr-2" onClick={this.handleSubmit}><i className="fas fa-check"></i></button>
              <button className="btn btn-danger" onClick={e => this.handleClick(e, false)}><i className="fas fa-times"></i></button>
            </form>
          </div>
          <ul className="list-group">
           {this.createWishlist()}
          </ul>
        </div>
      </div>
    );
  }
}

export default Wishlist;
