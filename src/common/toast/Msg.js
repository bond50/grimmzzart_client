import classes from "./Msg.module.css"
import React from "react";



export const Msg = ({handleClick}) => {
    return (
        <div className={classes.Msg}>
            <span>Added to cart </span>
            <button
                onClick={handleClick}
                className='btn btn-outline-info'>Open cart
            </button>
        </div>
    );
}

