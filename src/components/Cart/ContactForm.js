import React, { Component } from 'react'
import {v4} from 'uuid'

class ContactForm extends Component {
  state = {
    user: {
      uid: v4(),
      name: '',
      email: '',
      phone: '',
      address: ''
    }
  }

  adduser = _ => {
    const { user } = this.state
    const { cartEuroTotal, cartDollarTotal} = this.props.value;
    console.log(cartEuroTotal, cartDollarTotal)
    
    fetch(`https://full-stack-pizza-app-server.herokuapp.com/userDetails/add?uid=${user.uid}&name=${user.name}&email=${user.email}&phone=${user.phone}&address=${user.address}`)
    .then(this.getusers)
    .catch(err => console.error(err))
    alert("submitted")
  }

  render() {
    const { user } = this.state
    return (
      <div className="App">
        <h3>User Details</h3>
        <div>
          Username: <input value={user.name} onChange= {e => this.setState({ user: {...user, name:e.target.value}})} /><br />
          Email: <input value={user.email} onChange= {e => this.setState({ user: {...user, email:e.target.value}})} /><br />
          Phone: <input value={user.phone} onChange= {e => this.setState({ user: {...user, phone:e.target.value}})} /><br />
          Delivery Address: <input value={user.address} onChange= {e => this.setState({ user: {...user, address:e.target.value}})} /><br />

          <button onClick={this.adduser}>submit</button>
        </div>
      </div>
    )
  }
}

export default ContactForm
