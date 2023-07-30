import React from 'react';
import classes from "../aside.module.css";
import SideLink from "../link/SideLink";

const Categories = () => {
    return (
        <>
            <li className={classes.NavHeading}>{`categories`} </li>
            <SideLink href='/user/orders' icon='eos-icons:product-classes-outlined' title='Category 1'/>
            <SideLink href='/user/pending-reviews' icon='eos-icons:products-outlined' title='Category 2'/>
            <SideLink href='/user/vouchers' icon='icon-park-outline:difference-set' title='Category 3'/>
            <SideLink href='/user/wishlist' icon='icon-park-outline:add-subset' title='Category 4'/>
        </>
    );
};

export default Categories;