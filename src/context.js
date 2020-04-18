import React, { Component } from 'react'
import {v4} from 'uuid'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        detailProduct: [],
        products: [],
        users: [],
        user: {
          uid: v4(),
          firstname: '',
          secondname: ''
        }
      }
    
      componentDidMount() {
        this.getusers()
        this.getProducts()
        this.getDetailProduct()
      }
    
      handleDetail = ( ) => {
        console.log("handleDetail fn");
        
      }
      addToCart = () => {
        console.log("addToCart fn");
      }
    
      getDetailProduct = _ => {
        fetch('https://full-stack-pizza-app-server.herokuapp.com/detailProduct')
        .then((response) => {
          return response.json();
        })
        .then(response => this.setState({ detailProduct: response.data}))
      }
    
      getusers = _ => {
        fetch('https://full-stack-pizza-app-server.herokuapp.com/users')
        .then((response) => {
          return response.json();
        })
        .then(response => this.setState({ users: response.data}))
      }
    
      getProducts = _ => {
        fetch('https://full-stack-pizza-app-server.herokuapp.com/products')
        .then((response) => {
          return response.json();
        })
        .then(response => this.setState({ products: response.data}))
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
    render() {
    const { users, user, products, detailProduct } = this.state
    console.log(users)
    console.log(products)
    console.log(detailProduct)
        return (
            <ProductContext.Provider value={{...this.state, handleDetail:this.handleDetail, addToCart: this.addToCart}}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };

//...this.state, handleDetail: this.handleDetail, addToCart: this.addToCart 