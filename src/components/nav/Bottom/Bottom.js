import React, {useEffect, useState} from 'react';
import {NavLink, Link} from "react-router-dom";
import classes from './Bottom.module.css';
import useToggle from "../../../hooks/useToggle";
import {Icon} from '@iconify/react';
import {useSelector} from "react-redux";


const Bottom = () => {
    const [open, toggleClosed] = useToggle();

   const {data, loading, error} = useSelector((state) => state.brandsCategoriesSubs);
    const {categories} = data;



    return (
        <header className={classes.Header}>
            <div className="container">
                <div className="d-flex align-items-center gap-30">
                    <div className="dropdown">
                        <div
                            className={`dropdown-toggle border-0 gap-15 d-flex align-items-center ${classes.Button}`}
                            onClick={toggleClosed}
                        >
                            <Icon icon="carbon:categories" fontSize={20}/>
                            <span className="me-5 d-inline-block">Categories</span>
                        </div>

                        <ul className={`dropdown-menu ${classes.DropdownMenu} ${open ? `${classes.DropdownMenuToggle}` : ''}`}
                            aria-labelledby="dropdownMenuButton1">


                            {loading ? (
                                <li>Loading...</li>
                            ) : (
                                categories.map((category, index) => (
                                    <li key={index}>
                                        <Link className={`${classes.Item} dropdown-item`}
                                              to={`/categories/${category.slug}`}>
                                            {category.name}
                                        </Link>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                    <div className={classes.Links}>
                        <div className="d-flex align-items-center gap-15">
                            <NavLink to="/" className={classes.Link}>Home</NavLink>
                            <NavLink to="/shop" className={classes.Link}>Shop</NavLink>
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
