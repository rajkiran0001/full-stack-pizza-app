import React, { Component } from "react";
import CartColumns from "./CartColumns";
import { ProductConsumer } from "../../context";
import CartList from "./CartList";
import CartTotals from "./CartTotals";
import ContactForm from "./ContactForm"

class Cart extends Component {
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
                <div className="container">
                  <div style={{ float:'left'}}>
                <ContactForm value={value}/>
                  </div>
                  <div style={{ float:'right'}}>
                <CartTotals value={value} />
                  </div>
                </div>
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
