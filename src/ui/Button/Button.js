import React from 'react';
import classes from './Button.module.css'
import {Icon} from "@iconify/react";

const Button = ({clicked, iconClassName, className, icon, children}) => {
    return (
        <button
            className={`btn ${classes.Btn} ${className}`}
            onClick={clicked}>
            {icon && <Icon
                icon={icon}
                className={`${classes.BtnIcon} ${iconClassName}`}
                fontSize={20}
                cursor='pointer'
            />}
            <span>{children}</span>
        </button>
    );
};

export default Button;
