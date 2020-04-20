import React from "react";
import { Link } from "react-router-dom";

function CartTotals({ value }) {
  const {
    cartSubTotal,
    deliveryCost,
    cartEuroTotal,
    cartDollarTotal,
    clearCart,
  } = value;

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-20 mt-2 ml-sm-5 ml-md-auto col-sm-10 text-right">
            <Link to="/">
              <button
                className="btn btn-outline-danger text-uppercase mb-3 px-5"
                onClick={() => clearCart()}
              >
                clear cart
              </button>
            </Link>
            <h5>
              <span>Subtotal :</span>
              <strong>€ {cartSubTotal}</strong>
            </h5>
            <h5>
              <span>Shipment:</span>
              <strong> € {deliveryCost}</strong>
            </h5>
            <h5>
              <span>Total :</span>
              <strong>€ {cartEuroTotal}</strong>
            </h5>
            <h5>
              <span>Total :</span>
              <strong>$ {cartDollarTotal}</strong>
            </h5>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CartTotals;
