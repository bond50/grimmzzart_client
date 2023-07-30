import React, {useState} from 'react';
import {NavLink, Link} from "react-router-dom";
import menu from "../../../images/menu.svg";
import classes from './Bottom.module.css'
import useToggle from "../../../hooks/useToggle";
import { Icon } from '@iconify/react';

const Bottom = () => {
    const [open, toggleClosed] = useToggle();

    return (
        <header className={classes.Header}>
            <div className="container">
                <div className="d-flex align-items-center gap-30">
                    <div className="dropdown">
                        <div
                            className={` dropdown-toggle border-0 gap-15 d-flex align-items-center  ${classes.Button}`}
                            onClick={toggleClosed}
                        >
                            <img src={menu} alt="" />
                            {/*<Icon icon="carbon:categories" />*/}
                            <span className="me-5 d-inline-block ">Categories</span>
                        </div>
                        <ul className={`dropdown-menu ${classes.DropdownMenu} ${open ? `${classes.DropdownMenuToggle}` : ''}`}
                            aria-labelledby="dropdownMenuButton1">
                            <li>
                                <Link className={`${classes.Item} dropdown-item`} to="">
                                    Action
                                </Link>
                            </li>
                            <li>
                                <Link className={`${classes.Item} dropdown-item `} to="">
                                    Another action
                                </Link>
                            </li>
                            <li>
                                <Link className={`${classes.Item} dropdown-item `} to="">
                                    Something else here
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={classes.Links}>
                        <div className="d-flex align-items-center gap-15 ">
                            <NavLink to="/" className={classes.Link}>Home</NavLink>
                            <NavLink to="/market" className={classes.Link}>Store</NavLink>
                            <NavLink to="/blog" className={classes.Link}>Blog</NavLink>
                            <NavLink to="/help" className={classes.Link}>Help</NavLink>
                            <NavLink to="/contact" className={classes.Link}>Contact</NavLink>
                        </div>
                    </div>
                </div>
            </div>

        </header>
    );
};

export default Bottom;