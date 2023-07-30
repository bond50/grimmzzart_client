import React from 'react';
import classes from '../aside.module.css'
import SideLink from "../link/SideLink";


const UserSideContent = () => {

    return (
        <>
            <li className={classes.NavHeading}>{`my account`} </li>
            <SideLink href='/user/orders' icon='eos-icons:product-classes-outlined' title='Orders'/>
            <SideLink href='/user/pending-reviews' icon='eos-icons:products-outlined' title='Pending reviews'/>
            <SideLink href='/user/pending-reviews' icon='eos-icons:products-outlined' title='Inbox'/>
            <SideLink href='/user/vouchers' icon='icon-park-outline:difference-set' title='Vouchers'/>
            <SideLink href='/user/wishlist' icon='icon-park-outline:add-subset' title='Saved items'/>
            <SideLink href='/user/wishlist' icon='icon-park-outline:add-subset' title='Recently viewed'/>
            <li className={classes.NavHeading}>{`my account`} </li>
            <SideLink href='/user/wishlist' icon='icon-park-outline:add-subset' title='Account management'/>
            <SideLink href='/user/wishlist' icon='icon-park-outline:add-subset' title='Newsletter'/>
            <SideLink href='/user/wishlist' icon='icon-park-outline:add-subset' title='Feedback'/>
            <SideLink href='/user/wishlist' icon='icon-park-outline:add-subset' title='Address book'/>


        </>
    );
};

export default UserSideContent;