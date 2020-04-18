import React, { Component } from 'react'
import {ProductConsumer} from "../context"
import Product from "./Product"
class ProductList extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <div className="row">
                    <ProductConsumer>
                        {value => {
                            return value.products.map( product =>{
                                return <Product key={product.id} product={product}/>
                            })
                        }}
                    </ProductConsumer>
                    </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ProductList
