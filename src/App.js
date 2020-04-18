import React, { Component } from 'react'
import {v4} from 'uuid'
import './App.css'

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
    fetch('http://localhost:5000/users')
    .then((response) => {
      return response.json();
    })
    .then(response => this.setState({ users: response.data}))
  }

  adduser = _ => {
    const { user } = this.state
    fetch(`http://localhost:5000/users/add?uid=${user.uid}&firstname=${user.firstname}&secondname=${user.secondname}`)
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
      <div className="App">
        <h3>Pizza Application</h3>
        {users.map(this.renderuser)}
        <div>
          <input value={user.firstname} onChange= {e => this.setState({ user: {...user, firstname:e.target.value}})} />
          <input value={user.secondname} onChange= {e => this.setState({ user: {...user, secondname:e.target.value}})} />
          <button onClick={this.adduser}>Add user</button>
        </div>
      </div>
    )
  }
}

export default App
