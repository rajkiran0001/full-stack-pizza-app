import React, { Component } from "react";
import { v4 } from "uuid";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    detailProduct: {},
    products: [],
    cart: [],
    cartDollarTotal: 0,
    cartEuroTotal: 0,
    cartSubTotal: 0,
    deliveryCost: 0,

  };

  componentDidMount() {
    this.getProducts();
    this.getDetailProduct();
  }

  getItem = (id) => {
    const product = this.state.products.find((item) => item.id === id);
    return product;
  };

  handleDetail = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };

  addToCart = (id) => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(
      () => {
        return { products: tempProducts, cart: [...this.state.cart, product] };
      },
      () => {
        this.addTotals();
      }
    );
  };

  getDetailProduct = () => {
    fetch("https://full-stack-pizza-app-server.herokuapp.com/detailProduct")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        var array = response.data;
        var result = array.find((obj) => {
          return obj;
        });
        console.log(result);
        this.setState({ detailProduct: result });
      });
  };


  getProducts = () => {
    fetch("https://full-stack-pizza-app-server.herokuapp.com/products")
      .then((response) => {
        return response.json();
      })
      .then((response) => this.setState({ products: response.data }));
  };

  increment = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;
    this.setState(
      () => {
        return { cart: [...tempCart] };
      },
      () => {
        this.addTotals();
      }
    );
  };
  decrement = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(
        () => {
          return { cart: [...tempCart] };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };
  removeItem = (id) => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter((item) => item.id !== id);
    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;
    this.setState(
      () => {
        return {
          cart: [...tempCart],
          products: [...tempProducts],
        };
      },
      () => {
        this.addTotals();
      }
    );
  };

  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.getProducts();
        this.addTotals();
      }
    );
  };

  adduser = (_) => {
    const { user } = this.state;
    fetch(
      `https://full-stack-pizza-app-server.herokuapp.com/users/add?uid=${user.uid}&firstname=${user.firstname}&secondname=${user.secondname}`
    )
      .then(this.getusers)
      .catch((err) => console.error(err));
  };


  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map((item) => (subTotal += item.total));
    const deliveryCost = 2;
    const dollarRate = 1;
    const euroRate = 2;
    const totalInDollar = subTotal + deliveryCost + dollarRate;
    const totalInEuro = subTotal + deliveryCost + euroRate;
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        deliveryCost: deliveryCost,
        cartDollarTotal: totalInDollar,
        cartEuroTotal: totalInEuro,
      };
    });
  };
  render() {
    const { users, user, products, detailProduct } = this.state;
    console.log(products);
    console.log(detailProduct);
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          increment: this.increment,
          decrement: this.decrement,
          clearCart: this.clearCart,
          removeItem: this.removeItem,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
