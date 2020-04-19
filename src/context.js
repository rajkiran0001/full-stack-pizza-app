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

  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
};

  handleDetail = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
        var array =[]
        array = product;
        console.log(array);
        
        return { detailProduct: array };
    });
  };

  addToCart = id => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(
        () => {
            return { products: tempProducts, cart: [...this.state.cart,product]}
        },
        () => {
            console.log(this.state);
            
        }
    )
}

  getDetailProduct = (_) => {
    fetch("https://full-stack-pizza-app-server.herokuapp.com/detailProduct")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
      var array = response.data
      var result = array.find(obj => {
        return obj
      })
      console.log(result);
      this.setState({ detailProduct: result })});
  };

  getusers = (_) => {
    let tempProducts = [];
    fetch("https://full-stack-pizza-app-server.herokuapp.com/users")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        response.data.forEach((item) => {
          const singleItem = { ...item };
          tempProducts = [...tempProducts, singleItem];
        });
        this.setState(() => {
          return { products: tempProducts };
        });
      });
  };

  getProducts = (_) => {
    fetch("https://full-stack-pizza-app-server.herokuapp.com/products")
      .then((response) => {
        return response.json();
      })
      .then((response) => this.setState({ products: response.data }));
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
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
