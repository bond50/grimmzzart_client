import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import ProductCard from "../../components/cards/Product/ProductCard";
import {getSub} from "../../services/sub.service";
import Wrapper from "../../hoc/Wrapper";
import ProductCard2 from "../../components/cards/Product/ProductCard2";


const SubHome = () => {
    const {slug} = useParams()

    const [sub, setSub] = useState({})
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getSub(slug).then(r => {
            console.log(r)
            setSub(r.data.sub)
            setProducts(r.data.products)
            setLoading(false)
        }).catch(e => {
            console.log(e)
            setLoading(false)
        })
    }, [slug])

    return (
        <Wrapper title={sub.name}>
            <div className="row">
                {products.map((product, index) => (
                    <div className="col-lg-2 col-md-6 mb-3" key={product._id}>
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

export default SubHome;