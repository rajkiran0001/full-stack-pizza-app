import React, { Component } from 'react'
import {v4} from 'uuid'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Default from './components/Default';
import Details from './components/Details';
import ProductList from './components/ProductList';

class App extends Component {
  state = {
    users: [],
    user: {
      uid: v4(),
      firstname: '',
      secondname: ''
    }
  }

  componentDidMount() {
    this.getusers()
  }

  getusers = _ => {
    fetch('https://full-stack-pizza-app-server.herokuapp.com/users')
    .then((response) => {
      return response.json();
    })
    .then(response => this.setState({ users: response.data}))
  }

  adduser = _ => {
    const { user } = this.state
    fetch(`https://full-stack-pizza-app-server.herokuapp.com/users/add?uid=${user.uid}&firstname=${user.firstname}&secondname=${user.secondname}`)
    .then(this.getusers)
    .catch(err => console.error(err))
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  renderuser = ({ firstname, uid, secondname}) => <div key={uid}>{firstname}{secondname}</div>
  render() {
    const { users, user } = this.state
    console.log(users)
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
        <Route exact path="/" component={ProductList} />
          <Route path="/details" component={Details} />
          <Route path="/cart" component={Cart} />
          <Route component={Default} />
        </Switch>
        {users.map(this.renderuser)}
        <div>
          <input value={user.firstname} onChange= {e => this.setState({ user: {...user, firstname:e.target.value}})} />
          <input value={user.secondname} onChange= {e => this.setState({ user: {...user, secondname:e.target.value}})} />
          <button onClick={this.adduser}>Add user</button>
        </div>
      </React.Fragment>
    )
  }
}

export default App
