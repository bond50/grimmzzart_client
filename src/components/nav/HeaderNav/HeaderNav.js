import React from 'react';
import classes from './Nav.module.css'
import NavItem from "./NavItem/NavItem";
import Dropdown from "../dropdown";
import {helpMenuItems} from "../dropdown/Help/Help";
import {accountMenuItems as originalAccountMenuItems} from "../dropdown/Account/Account";
import {useSelector} from "react-redux";


const HeaderNav = ({
                       navItems,
                       logOut
                   }) => {


    const accountMenuItems = originalAccountMenuItems.map((item) => {
        if (item.action === 'LOGOUT_PLACEHOLDER') {
            return {...item, action: logOut};
        }
        return item;
    });


    const {cart, auth} = useSelector((state) => ({...state}));
    return (
        <nav className={`${classes.HeaderNav} ms-auto`}>
            <ul className={`${classes.NavigationItems} `}>
                {navItems.map((item, index) => (
                    <NavItem key={index} {...item} />
                ))}

                {auth.user && auth.user.token ? <Dropdown
                    showHeader={true}
                    user={auth.user}
                    menuItems={accountMenuItems}
                    icon="mdi:account-outline"
                    title="Account"
                    logOut={logOut}
                /> : <NavItem
                    to={'/auth/login'}
                    iconName={'mdi:login'}
                    label={'Login'}
                />
                }

                <NavItem
                    to={'/cart'}
                    cartLength={cart.length}
                    iconName={'mdi:cart-outline'}
                    label={'Cart'}
                    hasBadge={true}/>

            </ul>
        </nav>

    );
};

export default HeaderNav;