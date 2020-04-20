import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto text-center text-title text-uppercase pt-5">
            <h1 className="display-3">Everyday Pizza</h1>
            <h1>About</h1>
            <p>
              This is a test application. For any question please send us an
              email{" "}
            </p>
            <a href={"mailto:" + "info@everydaypizza.com"}>
              info@everydaypizza.com
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
