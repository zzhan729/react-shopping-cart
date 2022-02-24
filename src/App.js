import React from "react";
import { Provider } from "react-redux";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";
import store from "./store";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
      size: "",
      sort: ""
    };
  }


  creatOrder = (order) => {
    alert("Need to save order for " + order.name)
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
  }

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter(x => x._id !== product._id),
    })
    localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));


  }



  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/"> React Shopping cart</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter></Filter>
                <Products addToCart={this.addToCart}></Products>
              </div>
              <div className="sidebar">
                <Cart
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                  creatOrder={this.creatOrder}
                >
                </Cart>
              </div>
            </div>
          </main>
          <footer>
            All right is reserved.
          </footer>
        </div>
      </Provider>
    );

  }

}

export default App;
