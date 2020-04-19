import React from 'react';

function CartColumns() {
    return (
        <div>
             <div className="container  d-lg-block">
        <div className="row">
          <div className="col-10 mx-auto col-lg-2">
            <div>Pizzas</div>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <div>name of pizza</div>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <div>price</div>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <div>quantity</div>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <div>remove</div>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <div>totol</div>
          </div>
        </div>
      </div>
        </div>
    )
}

export default CartColumns;

