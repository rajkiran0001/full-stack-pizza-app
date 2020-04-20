import React, { Component } from "react";
import { Input, Alert } from "reactstrap";
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

class ContactForm extends Component {
  state = {
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
      fetch(
        `https://full-stack-pizza-app-server.herokuapp.com/add?uid=${user.uid}&name=${user.name}&address=${user.address}&euro=${cartEuroTotal}&dollar=${cartDollarTotal}&`
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
          <Alert isOpen={this.state.visible} toggle={this.toggle}>
            {this.state.success}
          </Alert>
        </div>
      </div>
    );
  }
}

export default ContactForm;
