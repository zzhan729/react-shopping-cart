import React, { Component } from 'react'
import formateCurrency from '../util';
import Fade from '@stahl.luke/react-reveal';

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            address: "",
            showCheckout: false
        }
    }

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    creatOrder = (e) => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems
        }

        this.props.creatOrder(order)
    }

    render() {
        const { cartItems } = this.props;
        return (
            <div>
                {cartItems.length === 0 ?
                    (<div className='cart cart-header'>Cart Is Empty</div>) :
                    (<div className='cart cart-header'>You have {cartItems.length} items in the cart {" "}</div>)
                }

                <div className='cart'>
                    <Fade left cascade>
                        <ul className='cart-items'>
                            {cartItems.map((item) => (
                                <li key={item._id}>
                                    <div>
                                        <img src={item.image} alt={item.title}></img>
                                    </div>
                                    <div>
                                        <div>{item.title}</div>
                                        <div className='right'>
                                            {formateCurrency(item.price)} x {item.count} {" "}
                                            <button onClick={() => this.props.removeFromCart(item)}>Remove</button>
                                        </div>
                                    </div>
                                </li>
                            )
                            )}
                        </ul>
                    </Fade>
                </div>
                {cartItems.length !== 0 && (
                    <div>
                        <div className='cart'>
                            <div className='total'>
                                <div>
                                    Total:{" "}
                                    {formateCurrency(
                                        cartItems.reduce((a, c) =>
                                            a + c.price * c.count, 0)
                                    )}
                                </div>
                                <button className='button primary'
                                    onClick={() => { this.setState({ showCheckout: true }) }}>
                                    Process
                                </button>
                            </div>
                        </div>
                        {this.state.showCheckout && (
                            <div className='cart'>
                            <Fade right cascade>
                                <form onSubmit={this.creatOrder}>
                                    <ul className='form-container'>
                                        <li>
                                            <label>Email</label>
                                            <input name="email" type="email" required onChange={this.handleInput}></input>
                                        </li>
                                        <li>
                                            <label>Name</label>
                                            <input name="name" type="text" required onChange={this.handleInput}></input>
                                        </li>
                                        <li>
                                            <label>Address</label>
                                            <input name="address" type="address" required onChange={this.handleInput}></input>
                                        </li>
                                        <li>
                                            <button type='submit' className='button primary' >Checkout</button>
                                        </li>
                                    </ul>
                                </form>
                            </Fade>    
                            </div>
                        )}
                    </div>
                )}
            </div>

        )
    }
}
