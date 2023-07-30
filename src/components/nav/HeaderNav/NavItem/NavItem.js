import React from 'react';
import {Link} from 'react-router-dom';
import {Icon} from '@iconify/react';
import classes from './NavItem.module.css'

const NavItem = ({
                     to,
                     iconName,
                     className,
                     label,
                     cartLength,
                     isSearchBarToggle,
                     hasBadge,
                     onClick,
                 }) => {
    return (
        <li className={`${classes.NavItem} nav-item ${className} ${isSearchBarToggle ? 'd-block d-lg-none' : ''}`}>
            {isSearchBarToggle ? (
                <div className={`nav-link ${classes.NavIcon} `} onClick={onClick}>
                    <Icon icon="bi:search"/>
                </div>
            ) : (
                <Link to={to} className={`nav-link ${classes.NavIcon}`} onClick={onClick}>
                    <div className={` d-flex align-items-center`}>
                        <div className={` ${hasBadge ? `${classes.Icon}` : ''}`}>
                            <Icon icon={iconName}/>
                            {hasBadge && cartLength>0 && (
                                <span className={` ${classes.BadgeNumber}`}>{cartLength}</span>
                            )}
                        </div>
                        <div className="label ps-2 d-none d-md-block ">{label}</div>
                    </div>
                </Link>
            )}
        </li>
    );
};

export default NavItem;
