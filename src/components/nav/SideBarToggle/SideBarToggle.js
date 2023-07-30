import React from 'react';
import {Icon} from "@iconify/react";
import classes from './SideBarToggle.module.css'
import {useLocation, useParams} from "react-router-dom";
import {useCurrentPath} from "../../../hooks/useCurrentPath";
import {includedPaths} from "../../../common/includedPaths";

const SideBarToggle = ({clicked}) => {
    const location = useLocation();
    const params = useParams();
    const path = useCurrentPath(location, params);

    let styles = [classes.ToggleButton]

    if (includedPaths.includes(path)) {
       styles.push(classes.Hide)
    }

    return (
        <Icon
            icon="bi:list"
            className={styles.join(' ')}
            fontSize={18}
            onClick={clicked}
        />
    );
};

export default SideBarToggle;