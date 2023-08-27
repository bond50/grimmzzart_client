import React, {useEffect, useState} from 'react';
import {getCategory} from "../../services/categories";
import {useParams} from "react-router-dom";
import ProductCard from "../../components/cards/Product/ProductCard";
import Wrapper from "../../hoc/Wrapper";
import ProductCard2 from "../../components/cards/Product/ProductCard2";


const CategoryHome = () => {
    const {slug} = useParams()
    const [category, setCategory] = useState({})
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        getCategory(slug).then(r => {
            setCategory(r.data.category)
            setProducts(r.data.products)
            setLoading(false)
        }).catch(e => {
            console.log(e)
            setLoading(false)
        })
    }, [slug])

    return (
        <Wrapper title={category.name}>
            <div className="row">
                {products.map((product, index) => (
                    <div className="col-lg-3 col-md-6 mb-3" key={product._id}>
                        <ProductCard2
                            product={product}
                            id={`${product._id}--${index}`}
                            hideQty hideCat hideDesc hideRating/>
                    </div>
                ))}
            </div>

        </Wrapper>
    );
};

export default CategoryHome;