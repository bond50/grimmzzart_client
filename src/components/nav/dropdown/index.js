import React from 'react';
import {Icon} from '@iconify/react';
import classes from './Dropdown.module.css';
import useToggle from '../../../hooks/useToggle';
import {Link} from 'react-router-dom';

const Dropdown = ({menuItems, icon, className, title, showHeader, user}) => {
    const [open, toggleClosed] = useToggle();

    return (
        <li
            className={`nav-item ${classes.NavItem} dropdown ${className}`}
            onClick={toggleClosed}>
            <div className={`nav-link ${classes.NavIcon}  d-flex align-items-center `}>
                <Icon icon={icon}/>
                <span className="d-none d-md-block dropdown-toggle ps-2">{title}</span>
            </div>
            <ul
                className={`dropdown-menu dropdown-menu-end ${classes.DropdownMenuArrow} ${classes.DropdownMenu} ${
                    open ? `${classes.DropdownActive}` : ''
                }`}
            >
                {showHeader && (
                    <>
                        <li className={`dropdown-header ${classes.DropdownHeader}`}>
                            <h6>{`${user.firstName} ${user.surname}`}</h6>
                            {user.role && user.role.code && user.role.code === 1000 && <span>Superuser</span>}
                        </li>
                        <li>
                            <hr className={`dropdown-divider ${classes.DropdownDivider}`}/>
                        </li>
                    </>
                )}
                {menuItems.map((item, index) => (
                    <React.Fragment key={index}>

                        {(item.condition === undefined ||
                            item.condition === !!user) && (
                            <>
                                <li>
                                    {item.action ? (
                                        <div
                                            className={`dropdown-item ${classes.DropdownItem} d-flex align-items-center`}
                                            onClick={item.action}
                                        >
                                            <Icon icon={item.icon} className={classes.Icon}/>
                                            <span>{item.label}</span>
                                        </div>
                                    ) : (
                                        <Link
                                            className={`dropdown-item ${classes.DropdownItem} d-flex align-items-center`}
                                            to={item.link}
                                        >
                                            <Icon icon={item.icon} className={classes.Icon}/>
                                            <span>{item.label}</span>
                                        </Link>
                                    )}
                                </li>
                                {index !== menuItems.length - 1 && (
                                    <li>
                                        <hr className={`dropdown-divider ${classes.DropdownDivider}`}/>
                                    </li>
                                )}
                            </>
                        )}
                    </React.Fragment>
                ))}

            </ul>
        </li>
    );
};

export default Dropdown;
