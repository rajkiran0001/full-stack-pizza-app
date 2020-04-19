import React, { Component } from "react";
import { v4 } from "uuid";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    detailProduct: {},
    products: [],
    users: [],
    cart: [],
    cartDollarTotal: 0,
    cartEuroTotal: 0,
    cartSubTotal: 0,
    deliveryCost: 0,
    user: {
      uid: v4(),
      firstname: "",
      secondname: "",
    },
  };

  componentDidMount() {
    this.getusers();
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

  getDetailProduct = (_) => {
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

  getusers = () => {
    fetch("https://full-stack-pizza-app-server.herokuapp.com/users")
      .then((response) => {
        return response.json();
      })
      .then((response) => this.setState({ users: response.data }));
  };

  getProducts = () => {
    fetch("https://full-stack-pizza-app-server.herokuapp.com/products")
      .then((response) => {
        return response.json();
      })
      .then((response) => this.setState({ products: response.data }));
  };

  increment = (id) => {
    console.log("increment");
  };
  decrement = (id) => {
    console.log("decrement");
  };
  removeCart = (id) => {
    console.log("remove cart");
  };
  clearCart = () => {
    this.setState(() => {
      return { cart: [] };
    },() => {
        this.getProducts()
        this.addTotals()
    });
  };

  adduser = (_) => {
    const { user } = this.state;
    fetch(
      `https://full-stack-pizza-app-server.herokuapp.com/users/add?uid=${user.uid}&firstname=${user.firstname}&secondname=${user.secondname}`
    )
      .then(this.getusers)
      .catch((err) => console.error(err));
  };

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
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
          removeCart: this.removeCart,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
