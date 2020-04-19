import React from "react";

function CartItem({ item, value }) {
  const { id, title, img, price, count } = item;
  const { increment, decrement } = value;
  return (
    <div className="row m-2">
      <div className="col-10 mx-auto col-lg-2">
        <img
          src={img}
          style={{ width: "5rem", height: "5rem" }}
          className="img-fluid alt="
          product
        />
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">product:</span>
        {title}
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">price: </span>
        € {price}
      </div>
      <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
        <div className="">
          <span onClick={() => decrement(id)}>-</span>
          <span>{count}</span>
          <span onClick={() => increment(id)}>+</span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
