import React from 'react';
import {setText, setTouched} from "../../../redux/slices/search";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useHistory, useLocation} from "react-router-dom";
import {Icon} from '@iconify/react';
import classes from './Search.module.css'


const Search = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {search} = useSelector((state) => state);
    const {text} = search
    const location = useLocation();

    function handleChange(e) {
        e.preventDefault()
        dispatch(setText(e.target.value))

    }

    function handleSubmit(e) {
        e.preventDefault()
        navigate(`/market?${text}`)

    }


    return (

        <div className={`${classes.SearchBar} d-flex align-items-center`}>
            <form className={classes.SearchForm} onSubmit={handleSubmit}>
                <input
                    onChange={handleChange}
                    type="text"
                    className={classes.Input}
                    autoFocus={location.pathname === '/market'}
                    value={text}
                    placeholder="Search"
                    title="Enter search keyword"/>
                <button type="submit" title="Search" className={classes.Button}>
                    <Icon
                        icon="bi:search"
                        onClick={handleSubmit}
                        className={classes.Icon}
                        fontSize={20}/>
                </button>
            </form>
        </div>
    );
};

export default Search;