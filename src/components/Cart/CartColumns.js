import React from "react";

function CartColumns() {
  return (
    <div>
      <div className="container text-center d-none d-lg-block">
        <div className="row">
          <div className="col-10 mx-auto col-lg-2">
            <div><strong>Pizzas</strong></div>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <div><strong>Name of pizza</strong></div>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <div><strong>Price</strong></div>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <div><strong>Quantity</strong></div>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <div><strong>Remove</strong></div>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <div><strong>Total</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartColumns;
