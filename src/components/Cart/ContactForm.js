import React, { Component } from "react";
import { Input } from "reactstrap";
import { ButtonContainer } from "../Button";
import { v4 } from "uuid";

const initialState = {
  uid: v4(),
  name: "",
  address: "",
  nameError: "",
  addressError: "",
  visible: false,
};

const OrderHistory = ({ value }) => {
  return (
    <div>
      <div className="alert alert-success">
        <strong>order complete!</strong>
      </div>
      <h1>Order History</h1>
      {value.cart.map(function (item, i) {
        return (
          <div key={i}>
            <div>
              <img
                src={item.img}
                style={{ width: "5rem", height: "5rem" }}
                className="img-fluid" alt="product"
              />
            </div>
            <div>
              <strong>Title:</strong>
              {item.title}
            </div>
            <div>
              <strong>Total: </strong>€ {item.total}
            </div>
          </div>
        );
      })}
      <div>
        <strong>Shipment:</strong>
        {value.deliveryCost}
      </div>
      <div>
        <h2>Final Amount: € {value.cartEuroTotal}</h2>
      </div>
    </div>
  );
};

class ContactForm extends Component {
  state = {
    showOrderHistory: false,
    user: initialState,
  };

  validate = () => {
    let nameError = "";
    let addressError = "";

    if (!this.state.user.name) {
      nameError = "name cannot be blank";
    }

    if (!this.state.user.address) {
      addressError = "address cannot be blank";
    }

    if (nameError || addressError) {
      this.setState({
        nameError,
        addressError,
      });
      return false;
    }
    return true;
  };
  toggle = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  adduser = (_) => {
    const { user } = this.state;
    const { cartEuroTotal, cartDollarTotal } = this.props.value;
    const isValid = this.validate();

    if (isValid) {
      this.setState(() => {
        return { showOrderHistory: true };
      });

      fetch(
        `https://full-stack-pizza-app-server.herokuapp.com/userDetails/add?uid=${user.uid}&name=${user.name}&address=${user.address}&euro=${cartEuroTotal}&dollar=${cartDollarTotal}&`
      )
        .then(() => this.setState({ success: "order complete", visible: true }))

        .catch((err) => console.error(err));
      this.setState(initialState);
    } else {
      console.log("error");
    }
  };

  render() {
    const { user } = this.state;
    var showOrderHistory = this.state.showOrderHistory;
    const result = this.props.value;
    return (
      <div className="App">
        <h3>User Details</h3>
        <div>
          Username:{" "}
          <Input
            value={user.name}
            onChange={(e) =>
              this.setState({ user: { ...user, name: e.target.value } })
            }
          />
          <div style={{ fontSize: 12, color: "red" }}>
            {this.state.nameError}
          </div>
          Delivery Address:{" "}
          <Input
            value={user.address}
            onChange={(e) =>
              this.setState({ user: { ...user, address: e.target.value } })
            }
          />
          <div style={{ fontSize: 12, color: "red" }}>
            {this.state.addressError}
          </div>
          <ButtonContainer onClick={this.adduser}>Order</ButtonContainer>
        </div>{" "}
        {showOrderHistory ? <OrderHistory value={result} /> : null}
      </div>
    );
  }
}

export default ContactForm;
