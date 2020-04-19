import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { Link } from "react-router-dom"

class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          var id, img, info, price, title, inCart;
          value.detailProduct.map((item) => {
            (id = item.id),
              (title = item.title),
              (img = item.img),
              (info = item.info),
              (price = item.price),
              (inCart = item.inCart);
          });
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
                        console.log(("you clicked the button"));
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
