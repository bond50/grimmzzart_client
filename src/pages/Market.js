import {useSelector, useDispatch} from "react-redux";
import ProductCard from "../components/cards/Product/ProductCard2";
import React, {useEffect, useState} from "react";
import {fetchProductsByFilter, getProductsByCount, minMax} from "../services/product.service";
import General from "../components/wrappers/General";
import Slider from "../components/range/Slider";
import {setText} from "../redux/slices/search";
import Accordion2 from "../components/accordion/Accordion";
import {getCategories} from "../services/categories";
import {getSubs} from "../services/sub.service";
import {MDBCheckbox} from "mdb-react-ui-kit";
import Star from "../components/star/Star";
import _ from 'lodash';

const Market = ({open}) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const {search} = useSelector((state) => ({...state}));
    const [price, setPrice] = useState([0, 0])
    const [ok, setOkay] = useState(false)
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0)
    const [categories, setCategories] = useState([])
    const [subs, setSubs] = useState([])
    const [sub, setSub] = useState('')
    const [categoryIds, setCategoryIds] = useState([])
    const [shipping, setShipping] = useState('')
    const [star, setStar] = useState('')
    const [toggleState, setToggleState] = useState({
        activeObj: null, objects: [
            {id: 5, number: 5},
            {id: 4, number: 4},
            {id: 3, number: 3},
            {id: 2, number: 2},
            {id: 1, number: 1},
        ]
    })
    const dispatch = useDispatch()

    //load max and min prices from db
    useEffect(() => {
        minMax().then(r => {
            setPrice([r.data.lowestPriced, r.data.highestPriced])
            setMax(r.data.highestPriced);
            setMin(r.data.lowestPriced)
        })
    }, [])


     useEffect(() => {
        if ((categoryIds.length <= 0)) {
            loadAllProducts()

        }
    }, [categoryIds.length])


    //Load all products, cats and subs on page load
    function loadAllProducts() {
        setLoading(true)
        getProductsByCount(20).then(r => {
            setProducts(r.data)
            setLoading(false)
        }).catch(e => {
            setLoading(false)
        })

    }

    function loadCategories() {
        getCategories()
            .then(r => {
                setCategories(r.data)

            })
            .catch(e => {
                console.log(e)
            })
    }

    function loadSubs() {
        getSubs()
            .then(r => {
                setSubs(r.data)

            })
            .catch(e => {
                console.log(e)
            })
    }


    useEffect(() => {
        loadAllProducts()
        loadCategories()
        loadSubs()
    }, [])

    const fetch = (filterData) => {
        fetchProductsByFilter(filterData).then(r => {
            setProducts(r.data)
        }).catch(e => {
            console.log(e)
        })
    }

    const fetchProductsDebounced = _.debounce(fetch, 300);


    const {text} = search

    useEffect(() => {
        fetchProductsDebounced({query: text});
        // Cleanup function to cancel the debounce
        return () => {
            fetchProductsDebounced.cancel();
        };
    }, [text]);

    const resetFilters = (keep, keepValue) => {
        let resetState = {
            text: '',
            price: [min, max],
            categoryIds: [],
            star: '',
            toggleState: {...toggleState, activeObj: null},
            sub: '',
            shipping: ''
        };

        if (keep) {
            resetState[keep] = keepValue;
        }

        dispatch(setText(resetState.text));
        setPrice(resetState.price);
        setCategoryIds(resetState.categoryIds);
        setStar(resetState.star);
        setToggleState(resetState.toggleState);
        setSub(resetState.sub);
        setShipping(resetState.shipping);
    };

    const handleSlider = (val) => {
        resetFilters('price', val);
        setPrice(val);
        fetch({price: val});
    };
    // load products based on categories


    const handleCheck = e => {
        const justClicked = e.target.value;
        const updatedCategoryIds = categoryIds.includes(justClicked)
            ? categoryIds.filter(id => id !== justClicked)
            : [...categoryIds, justClicked];

        resetFilters('categoryIds', updatedCategoryIds);
        setCategoryIds(updatedCategoryIds);
        fetch({category: updatedCategoryIds})
    };


    function showCats() {
        return categories && categories.map(c => {

            let checked = false
            if (categoryIds.includes(c._id)) {
                checked = true
            }
            return <MDBCheckbox
                key={c._id}
                name='category'
                className='mycb'
                value={c._id}
                id={c._id}
                checked={checked}
                onChange={handleCheck}
                label={c.name}/>

        })

    }

// based on rating
    const handleStarClick = (i, num) => {
        resetFilters('star', num);
        setToggleState({...toggleState, activeObj: toggleState.objects[i]});
        setStar(num);
        fetch({stars: num});
    };

    const showStars = () => (
        <>
            {toggleState.objects.map((el, i) => {
                return <Star
                    key={i}
                    checked={toggleState.objects[i] === toggleState.activeObj}
                    starClick={() => handleStarClick(i, el.number)}
                    numberOfStar={el.number}/>
            })}
        </>
    )
    // based on subs

    const handleSubClick = (id) => {
        resetFilters('sub', id);
        setSub(id);
        fetch({sub: id});
    };

    function showSubs() {
        return subs.map(s => {
            return <div
                className="badge rounded-pill badge-primary m-1 p-2"
                key={s._id}
                onClick={() => handleSubClick(s._id)}
                style={{cursor: 'pointer'}}>{s.name}
            </div>

        })
    }

    //shipping
    const handleShippingChange = (e) => {
        resetFilters('shipping', e.target.value);
        setShipping(e.target.value);
        fetch({shipping: e.target.value})
    };

    function showShipping() {
        return <div className='  d-flex  align-items-center'>
            <div style={{marginRight: '20px'}}>
                <MDBCheckbox
                    name='yes'
                    className=''
                    value='Yes'
                    onChange={handleShippingChange}
                    id='Yes'
                    checked={shipping === 'Yes'}
                    label='Yes'/>
            </div>
            <div>
                <MDBCheckbox
                    name='No'
                    value='No'
                    checked={shipping === 'No'}
                    onChange={handleShippingChange}
                    id='No'
                    label='No'/>
            </div>

        </div>
    }


    function showCardBody() {

        return <>
            <Accordion2
                title='Price (Ksh)'
                eventKey='0'>
                <div className='px-3'>
                    {max && min && <Slider handleChange={handleSlider} value={price} min={min} max={max}/>}
                </div>
            </Accordion2>
            <Accordion2 title='Categories' eventKey='1'>
                <div className='px-3'>
                    {showCats()}
                </div>
            </Accordion2>
            <Accordion2 title='Rating' eventKey='2'>
                <div className='px-3'>
                    {showStars()}
                </div>
            </Accordion2>
            {subs.length > 0 && <Accordion2 title='Sub Categories' eventKey='3'>
                <div className='px-3'>
                    {showSubs()}
                </div>
            </Accordion2>}
            <Accordion2 title='Shipping' eventKey='4'>
                <div className='px-3'>
                    {showShipping()}
                </div>
            </Accordion2>


        </>
    }


    return (
        <General title='Our Store'
                 showCard={true}
                 cardHeaderContent='Search and Filter'
                 cardBody={showCardBody()}>
            <div className="card">
                <div className="card-header">
                    <h5 className='card-title'>
                        {products.length === 1 && `${products.length} product found`}
                        {products.length <= 0 && `No product found`}
                        {products.length > 1 && `${products.length} products found`}

                    </h5>
                </div>
                <div className="row g-3">
                    {
                        products.map(product => <div className='col-lg-4 col-md-6 mb-3 px-3' key={product._id}>
                                <ProductCard
                                    product={product}
                                    market={true}
                                />
                            </div>
                        )
                    }
                </div>
            </div>
        </General>

    );
};

export default Market;