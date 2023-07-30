import React, {useEffect, useCallback, useState} from 'react';
import Top from '../top/Top';
import classes from './Header.module.css';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import {Icon} from '@iconify/react';
import Dropdown from '../dropdown';
import {useDispatch, useSelector} from 'react-redux';
import Search from '../Search/Search';
import {accountMenuItems as originalAccountMenuItems} from '../dropdown/Account/Account';
import {logout} from '../../../redux/slices/auth';
import NavItem from '../HeaderNav/NavItem/NavItem';
import {helpMenuItems} from "../dropdown/Help/Help";
import Banner from "../top/banner/Banner";
import Logo from "../Logo/Logo";
import HeaderNav from "../HeaderNav/HeaderNav";
import Container from "../../Container/Container";
import Bottom from "../Bottom/Bottom";

import {includedPaths} from "../../../common/includedPaths";
import {useCurrentPath} from "../../../hooks/useCurrentPath";

const Header = ({clicked, scrolled, handleScroll}) => {
    const {isLoggedIn} = useSelector((state) => state.auth);
    const [searchToggle, setSearchToggle] = useState(false);
     const location = useLocation();
    const params = useParams();
    const path = useCurrentPath(location, params);
    let navbarClasses = [classes.Header];
    if (scrolled) {
        navbarClasses.push('fixed-top');
    }
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logOut = useCallback(() => {
        dispatch(logout());
        navigate('/');
        window.location.reload()
    }, [dispatch, navigate]);



    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    function searchBarToggle() {
        setSearchToggle((prevState) => !prevState);
    }

    const navItems = [
        {
            iconName: 'mdi:magnify',
            isSearchBarToggle: true,
            onClick: searchBarToggle,
        },

        {
            to: '/market',
            iconName: 'mdi:store',
            label: 'Our store'
        },


    ];

    return (
        <>
            {includedPaths.includes(path) && <Top/>}
            <header className={`${navbarClasses.join(' ')}`}>
                <div className='container-xxl'>
                    <div className="d-flex justify-content-between align-content-center">
                        <Logo clicked={clicked}/>
                        <Search/>
                        <HeaderNav
                            navItems={navItems}
                            logOut={logOut}/>
                    </div>
                </div>
            </header>
            {includedPaths.includes(path) && <Bottom/>}
        </>
    );
};

export default Header;
