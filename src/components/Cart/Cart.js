import React, { Component } from "react";
import CartColumns from "./CartColumns";
import { ProductConsumer } from "../../context";
import CartList from "./CartList";
import CartTotals from "./CartTotals";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const { cart } = value;
          console.log(value);

          if (cart.length > 0) {
            return (
              <React.Fragment>
                <CartColumns />
                <CartList value={value} />
                <CartTotals value={value} />
              </React.Fragment>
            );
          } else {
            return <p>Empty Cart</p>;
          }
        }}
      </ProductConsumer>
    );
  }
}

export default Cart;
