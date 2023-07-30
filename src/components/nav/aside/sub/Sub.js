import React from 'react';
import classes from "../aside.module.css";
import SideLink from "../link/SideLink";

const Sub = () => {
    return (
        <>
            <li className={classes.NavHeading}>{`sub categories`} </li>
            <SideLink href='/user/orders' icon='eos-icons:product-classes-outlined' title='Sub Category 1'/>
            <SideLink href='/user/pending-reviews' icon='eos-icons:products-outlined' title='Sub Category 2'/>
            <SideLink href='/user/vouchers' icon='icon-park-outline:difference-set' title='Sub Category 3'/>
            <SideLink href='/user/wishlist' icon='icon-park-outline:add-subset' title='Sub Category 4'/>
        </>
    );
};

export default Sub;