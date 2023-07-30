import classes from "./Msg.module.css"
import React from "react";
import {toast} from "react-toastify";


export const Msg = ({handleClick}) => {
    return (
        <div className={classes.Msg}>
            <span>Added to cart </span>
            <button
                onClick={handleClick}
                className='btn btn-outline-light'>Open cart
            </button>
        </div>
    );
}

