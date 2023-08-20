import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Outlet, useLocation, useParams} from 'react-router-dom';
import Aside from '../components/nav/aside/Aside';
import Backdrop from '../components/nav/aside/Backdrop/Backdrop';
import Footer from '../components/footer/Footer';
import Header from '../components/nav/header/Header';
import useToggle from '../hooks/useToggle';
import classes from './Layout.module.css';



const Layout = () => {
    const [open, toggleClosed] = useToggle();
    const [scrolled, setScrolled] = useState(false);
    let attachedClass;
    if (!open) {
        attachedClass = classes.NotOpened;
    } else {
        attachedClass = classes.NotOpened;
    }

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 1) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };


    // useEffect(() => {
    //     if (isLoggedIn && !allowedPaths.includes(path)) {
    //         toggleClosed(true);
    //     }
    //
    // }, [isLoggedIn, path, toggleClosed]);

    return (
        <>
            <Header
                clicked={toggleClosed}
                scrolled={scrolled}
                handleScroll={handleScroll}/>

            <main className={attachedClass}>
                <Outlet context={{open}}/>
            </main>
            <Backdrop show={open} clicked={toggleClosed}/>
            <Footer/>
        </>
    );
};

export default Layout;
