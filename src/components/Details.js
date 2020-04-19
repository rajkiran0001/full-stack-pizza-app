import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { Link } from "react-router-dom"

class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value) => {
            const { id, img, info, price, title, inCart } = value.detailProduct;
            console.log(value.detailProduct);
            
            console.log(id)
          return (
            <div className="container py-5">
              <div className="row">
                <div className="col-10 mx-auto my-5">
                </div>
              </div>
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                  <img src={img} className="img-fluid" alt="product" />
                </div>
                <div className="col-10 mx-auto col-md-6 my-3">
                  <h2>Pizza : {title}</h2>
                  <h4>
                    <strong>
                      price : <span>$</span> {price}
                    </strong>
                  </h4>
                  <p className=" mt-3 mb-0">
                    {" "}
                    some info about pizza:
                  </p>
                  <p>{info}</p>
                  <div>
                    <Link to="/">
                      <button>back to products</button>
                    </Link>
                    <button
                      disabled={inCart ? true : false}
                      onClick={() => {
                        value.addToCart(id)
                      }}
                    >
                      {inCart ? "inCart" : "add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}

export default Details;
