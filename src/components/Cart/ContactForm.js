import React, { Component } from 'react'
import {v4} from 'uuid'

const initialState = {
  uid: v4(),
  name: '',
  email: '',
  phone: '',
  address: '',
  nameError: "",
  emailError: "",
  phoneError: "",
  addressError: ""
};

class ContactForm extends Component {
  state = {
    user: initialState
  }

  validate = () => {
    let nameError = "";
    let emailError = "";
    let phoneError = "";
    let addressError = "";

    // let passwordError = "";

    if (!this.state.user.name) {
      nameError = "name cannot be blank";
    }
    if (!this.state.user.email) {
      emailError = "email cannot be blank";
    }
    if (!this.state.user.phone) {
      phoneError = "date cannot be blank";
    }
    if (!this.state.user.address) {
      addressError = "course cannot be blank";
    }

    if (emailError || nameError || phoneError || addressError) {
      this.setState({
        emailError,
        nameError,
        phoneError,
        addressError,
      });
      return false;
    }
    return true;
  };


  adduser = _ => {
    const { user } = this.state
    const { cartEuroTotal, cartDollarTotal} = this.props.value;
    console.log(cartEuroTotal, cartDollarTotal)
    const isValid = this.validate()
    console.log(isValid);

    if (isValid) {
    fetch(`https://dashboard.heroku.com/apps/full-stack-pizza-app-server/userDetails/add?uid=${user.uid}&name=${user.name}&email=${user.email}&phone=${user.phone}&address=${user.address}&euro=${cartEuroTotal}&dollar=${cartDollarTotal}`)
    .then(this.getusers)
    .catch(err => console.error(err))
    this.setState(initialState);
    alert("submitted")
  }else{
    console.log("error");
    
    
  }
}

  render() {
    const { user } = this.state
    return (
      <div className="App">
        <h3>User Details</h3>
        <div>
          Username: <input value={user.name} onChange= {e => this.setState({ user: {...user, name:e.target.value}})} /><br />
          <div style={{ fontSize: 12, color: "red" }}>
          {this.state.nameError}
        </div>
          Email: <input value={user.email} onChange= {e => this.setState({ user: {...user, email:e.target.value}})} /><br />
          <div style={{ fontSize: 12, color: "red" }}>
          {this.state.emailError}
        </div>
          Phone: <input value={user.phone} onChange= {e => this.setState({ user: {...user, phone:e.target.value}})} /><br />
          <div style={{ fontSize: 12, color: "red" }}>
          {this.state.phoneError}
        </div>
          Delivery Address: <input value={user.address} onChange= {e => this.setState({ user: {...user, address:e.target.value}})} /><br />
          <div style={{ fontSize: 12, color: "red" }}>
          {this.state.addressError}
        </div>

          <button onClick={this.adduser}>submit</button>
        </div>
      </div>
    )
  }
}

export default ContactForm
