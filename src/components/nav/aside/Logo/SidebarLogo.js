import React from 'react';
// import classes from "../../Logo/Logo.module.css";
import {Link} from "react-router-dom";

const SidebarLogo = () => {
    return (
        <Link to='/' className="d-flex align-items-center">
            <img src="assets/img/logo.png" alt=""/>
            <span className={`d-block d-lg-none`}>{process.env.REACT_APP_APPNAME}</span>
        </Link>
    );
};

export default SidebarLogo;