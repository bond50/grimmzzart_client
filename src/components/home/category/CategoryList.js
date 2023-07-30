import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {getCategories} from '../../../services/categories';
import classes from './Categories.module.css'
import Card from "../../Container/Card";
import Container from "../../Container/Container";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCategories()
            .then((response) => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

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
