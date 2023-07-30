import React from 'react';
import {useSelector,} from "react-redux";

import {userCart} from "../services/user.service";
import {Icon} from '@iconify/react';
import Wrapper from "../hoc/Wrapper";
import {useNavigate} from "react-router-dom";
import CartComponent from "../components/Cart/Cart";

const Cart = () => {
    const {cart, auth} = useSelector((state) => ({...state}))

    const navigate = useNavigate()
    let token
    if (auth.isLoggedIn) {
        token = auth.user.token
    }


    function getTotal() {
        return cart.reduce((prev, next) => prev + (next.count * next.price), 0)
    }

    const saveOrderToDb = () => {
        userCart(cart, token)
            .then(r => {
                if (r.data.ok) {
                    navigate('/checkout', {
                        state: {
                            from: 'cart'
                        }
                    })
                }
            })
            .catch(e => {
                console.log(e)
            })


    };


    return (
        <Wrapper title='Your Cart'>
            <CartComponent
                saveOrderToDb={saveOrderToDb}
                getTotal={getTotal}/>
        </Wrapper>

    );
};

export default Cart;