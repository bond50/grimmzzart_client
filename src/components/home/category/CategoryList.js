import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import classes from './Categories.module.css'
import Card from "../../Container/Card";
import Container from "../../Container/Container";
import {useSelector} from "react-redux";

const CategoryList = () => {
     const { categories, loading, error } = useSelector((state) => state.categories);

 if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
    const showCats = () => {
        return categories && categories.map((category) => {
            return (
                <div className={`col-lg-3 col-md-6 ${classes.ContentItem}`} key={category._id}>
                    <Link
                        to={`/category/${category.slug}`}
                        className="card-link">
                        <h4 className="card-title">{category.name}</h4>
                    </Link>

                </div>

            );
        });
    };

    return (
       <Container class1='home-wrapper-2'>
            <Card cardHeader={true} title={'Shop by categories'}>
            <div className="container">
                <div className="row no-gutters">
                    {showCats()}
                </div>
            </div>
            </Card>
       </Container>
    );
};

export default CategoryList;
