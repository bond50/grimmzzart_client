import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ProductCard2 from '../../components/cards/Product/ProductCard2';
import {getSub} from '../../services/sub.service';
import Wrapper from '../../hoc/Wrapper';
import SmallLoader from "../../common/Loader/SmallLoader";

const SubHome = () => {
    const {slug} = useParams();
    const [sub, setSub] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Initially set to true

    useEffect(() => {
        setLoading(true); // Start loading

        getSub(slug)
            .then((r) => {
                setSub(r.data.sub);
                setProducts(r.data.products);
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setLoading(false); // Regardless of success or error, loading is done
            });
    }, [slug]);

    return (
        <Wrapper title={sub.name}>
            {loading ? (
                <SmallLoader/>
            ) : (
                <div className="row">
                    {products.map((product, index) => (
                        <div className="col-lg-3 col-md-6 mb-3" key={product._id}>
                            <ProductCard2
                                product={product}
                                id={`${product._id}--${index}`}
                                hideQty
                                hideCat
                                hideDesc
                                hideRating
                            />
                        </div>
                    ))}
                </div>
            )}
        </Wrapper>
    );
};

export default SubHome;
