import React, {useEffect} from 'react';
import classes from './aside.module.css'
import {useSelector} from "react-redux";

import {useCurrentPath} from "../../../hooks/useCurrentPath";
import {useLocation, useParams} from 'react-router-dom';
import OtherSideContent from "./other/OtherSideContent";
import UserSideContent from "./user/UserSideContent";
import Categories from "./categories/Categories";
import Sub from "./sub/Sub";
import {includedPaths} from "../../../common/includedPaths";
import SidebarLogo from "./Logo/SidebarLogo";


const Aside = ({open, handleScroll, scrolled, general}) => {
    const location = useLocation();
    const params = useParams();
    const path = useCurrentPath(location, params);


    const {user: currentUser} = useSelector((state) => state.auth);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll])

    let attachedClasses = [classes.Sidebar];

    // if (scrolled) {
    //     attachedClasses.push(classes.Scrolled)
    //
    // }

    if (includedPaths.includes(path)) {
        attachedClasses = [classes.Sidebar, classes.Hide]
    }


    return (
        <aside className={attachedClasses.join(' ')}>
            <SidebarLogo/>
            <ul className={classes.SidebarList}>
                {currentUser && <UserSideContent/>}
                <>
                    <OtherSideContent/>
                    <Categories/>
                    <Sub/>


                </>

            </ul>

        </aside>
    );
};

export default Aside;