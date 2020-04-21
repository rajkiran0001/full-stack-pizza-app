import React from "react";

function CartColumns() {
  return (
    <div>
      <div className="container text-center d-none d-lg-block">
        <div className="row">
          <div className="col-10 mx-auto col-lg-2">
            <div>Pizzas</div>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <div>Name of pizza</div>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <div>Price</div>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <div>Quantity</div>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <div>Remove</div>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <div>Total</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartColumns;
