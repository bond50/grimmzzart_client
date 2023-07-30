import React, {Fragment} from 'react';
import {Icon} from "@iconify/react";
import {Link, useNavigate} from "react-router-dom";
import ProductCardInCheckout from "../cards/ProductInCheckout/ProductCardInCheckout";
import {useSelector} from "react-redux";
import classes from "./Cart.module.css";

const CartComponent = ({getTotal, saveOrderToDb}) => {
    const navigate = useNavigate()
    const {cart, auth, coupon} = useSelector((state) => ({...state}))
    const {user} = auth



    function showCartItems() {
        return <table className="table table-sm table-borderless">
            <thead>
            <tr>
                <th scope="col" className='card-text'>Image</th>
                <th scope="col" className='card-text'>Title</th>
                <th scope="col" className='card-text'>Price</th>
                <th scope="col" className='card-text'>Count</th>
                <th scope="col" className='card-text'>Shipping</th>
                <th scope="col" className='card-text'>Remove</th>
            </tr>
            </thead>
            <tbody>
            {cart.map((p, i) => {
                return <ProductCardInCheckout product={p} key={i}/>
            })}

            </tbody>
        </table>
    }

    return (
        <div className="row">
            {cart.length === 0 ? <h2>Your Cart is Empty</h2> : (<Fragment>
                <div className="col-md-8">
                    <div className={`card ${classes.card}`}>
                        <div className="card-header">
                            <h3>Shopping cart</h3>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-between pb-4">
                                {cart.length === 1 ? <span className={classes['text-muted']}>You have {cart.length} item in your cart</span> :
                                    <span
                                        className={classes['text-muted']}>You have {cart.length} items in your cart</span>}
                            </div>


                            {!cart.length ?
                                '' :
                                showCartItems()
                            }
                            <div className="card-footer">
                                <div className="d-flex justify-content-between pb-4">
                                    {cart.length === 1 ? <span>You have {cart.length} item in your cart</span> :
                                        <span>You have {cart.length} items in your cart</span>}

                                    <div className="d-flex flex-row align-items-center">
                                        <span className="text-black-50">Total</span>
                                        <div className="price mx-2">
                                            <span className="mx-1">Ksh : {getTotal()}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-md-4">
                    <div className={`card ${classes.card}`}>
                        <div className={`card-header ${classes['card-header']}`}>
                            <h4 className='card-title'>Order summery</h4>
                        </div>
                        <div className="card-body">

                            {cart.map((c, i) => {
                                return <div key={i}>
                                    <div className='card-text my-3'>
                                        <span>{c.title} </span>
                                        <span> x </span>
                                        <span>{c.count} </span>
                                        <span>= </span>
                                        <span>Ksh <strong> {c.price * c.count}</strong></span>
                                    </div>
                                </div>
                            })}


                        </div>
                        <div className="card-footer">
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='card-title'><strong>Total Ksh {getTotal()}</strong></div>
                                {user ? <button
                                                className='btn btn-sm btn-primary mt-2'
                                                onClick={saveOrderToDb}
                                                disabled={!cart.length}>
                                                Proceed to checkout
                                            </button> :
                                    < button className='btn btn-sm btn-primary '>
                                        <Link to="/auth/login"
                                              state={{from: '/cart'}}><span
                                            className='text-white'>Login to checkout</span></Link>
                                    </button>

                                }
                            </div>
                        </div>
                    </div>

                </div>
            </Fragment>)}

        </div>
    );
};

export default CartComponent;