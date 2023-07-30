import React from 'react';
import classes from '../aside.module.css'
import SideLink from "../link/SideLink";


const OtherSideContent = () => {

    return (
        <>
            <li className={classes.NavHeading}>{`others`} </li>
            <SideLink href='/user/orders' icon='eos-icons:product-classes-outlined' title='Home'/>
            <SideLink href='/user/orders' icon='eos-icons:product-classes-outlined' title='Help center'/>
            <SideLink href='/user/pending-reviews' icon='eos-icons:products-outlined' title='Contact us'/>
            <SideLink href='/user/pending-reviews' icon='eos-icons:products-outlined' title='Store'/>
            <SideLink href='/user/vouchers' icon='icon-park-outline:difference-set' title='Blog'/>

        </>
    );
};

export default OtherSideContent;