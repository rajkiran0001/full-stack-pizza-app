import React, { Component } from "react";
import CartColumns from "./CartColumns";
import { ProductConsumer } from "../../context";
import CartList from "./CartList";
import CartTotals from "./CartTotals";
import ContactForm from "./ContactForm";

class Cart extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const { cart } = value;
          if (cart.length > 0) {
            return (
              <React.Fragment>
                <CartColumns />
                <CartList value={value} />
                <div className="container">
                  <div style={{ float: "left" }}>
                    <ContactForm value={value} />
                  </div>
                  <div style={{ float: "right" }}>
                    <CartTotals value={value} />
                  </div>
                </div>
              </React.Fragment>
            );
          } else {
            return (
              <div className="container">
                <div className="row">
                  <div className="col-10 mx-auto text-center text-title text-uppercase pt-5">
                    <h1 className="display-3"></h1>
                    <h1>Empty cart</h1>
                  </div>
                </div>
              </div>
            );
          }
        }}
      </ProductConsumer>
    );
  }
}

export default Cart;
