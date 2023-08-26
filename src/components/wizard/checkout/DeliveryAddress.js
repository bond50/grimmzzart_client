import React, {useRef, useEffect, useState, useCallback} from 'react';
import {Icon} from '@iconify/react';
import './DeliveryAddress.css'
import {MDBInput} from "mdb-react-ui-kit";
import {useLocation, useNavigate} from "react-router-dom";

import {updateUserAddress} from "../../../redux/slices/auth";
import {useDispatch, useSelector} from "react-redux";
import {extractAddress, loadAsyncScript} from "./loadAsync";

const mapApiJs = 'https://maps.googleapis.com/maps/api/js';
const geocodeJson = 'https://maps.googleapis.com/maps/api/geocode/json';


const DeliveryAddress = () => {
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const searchInput = useRef(null);
    const [address, setAddress] = useState({});
    const [selectedAddress, setSelectedAddress] = useState();
    const {auth, coupon: couponUsed, message, totalAfterDiscount} = useSelector((state) => ({...state}));
    const token = auth.isLoggedIn && auth.user.token && auth.user.token
    const [deliveryInformation, setDeliveryInformation] = useState({
        firstName: auth.user.firstName,
        surname: auth.user.surname,
        phoneNumber: auth.user.phoneNumber,
        postalAddress: '',
        zipCode: '',
        city: '',
        state: '',
        region: '',
        formattedAddress: '',
        place: '',
        country: '',
        lat: '',
        lng: '',
        googlePlaceId: '',
        name: '',
    });

    useEffect(() => {
        if (Object.keys(address).length > 0) {
            setDeliveryInformation((prevInfo) => ({
                ...prevInfo,
                city: address.city || prevInfo.city,
                zipCode: address.zipCode || prevInfo.zipCode,
                country: address.country || prevInfo.country,
                lat: address.lat || prevInfo.lat,
                lng: address.lng || prevInfo.lng,
                googlePlaceId: address.googlePlaceId || prevInfo.googlePlaceId,
                state: address.state || prevInfo.state,
                name: address.name || prevInfo.name,
                region: address.region || prevInfo.region,
                formattedAddress: address.formattedAddress || prevInfo.formattedAddress,
            }));
        }
    }, [address]);


    const {
        firstName,
        surname,
        phoneNumber,
        postalAddress,
        formattedAddress,
        zipCode,
        state,
        city, name,
    } = deliveryInformation

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(deliveryInformation)
        // Send deliveryInformation to the backend
        // Call an API function to send the data to the server
        // Example: dispatch(updateUserAddress(deliveryInformation));
    };

    const initMapScript = useCallback(() => {
        // if script already loaded
        if (window.google) {
            return Promise.resolve();
        }
        const src = `${mapApiJs}?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&libraries=places&callback=Function.prototype`;
        return loadAsyncScript(src);
    }, [])

    // do something on address change
    const onChangeAddress = useCallback((autocomplete) => {
        setLoading(true)
        const place = autocomplete.getPlace();
        setDeliveryInformation({...deliveryInformation, place})
        const _address = extractAddress(place);
        setAddress(_address);
        const info = {address: _address, token, place}
        info.address.name = searchInput.current && searchInput.current.value && searchInput.current.value

        // dispatch(updateUserAddress(info))
        //     .unwrap()
        //     .then((res) => {
        //         setLoading(false)
        //         setShow(false);
        //     })
        //     .catch(() => {
        //         setLoading(false)
        //         setShow(false);
        //     });


    }, [deliveryInformation, token])

    // init autocomplete
    const initAutocomplete = useCallback(() => {
        if (!searchInput.current) return;
        const autocomplete = new window.google.maps.places.Autocomplete(
            searchInput.current,
            {
                componentRestrictions: {'country': ['ke']},
                types: ["establishment"]
            });
        autocomplete.setFields(["address_component", 'formatted_address', 'place_id', 'name', "geometry"]);
        autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));


    }, [onChangeAddress])

    // load map script after mounted
    useEffect(() => {
        initMapScript().then(() => initAutocomplete())
    }, [initAutocomplete, initMapScript, show]);


    const reverseGeocode = ({latitude: lat, longitude: lng}) => {
        setLoading(true)
        const url1 = `${geocodeJson}?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
        searchInput.current.value = "Getting your location...";
        fetch(url1)
            .then(response => response.json())
            .then(location => {
                const place = location.results[0];
                setDeliveryInformation({...deliveryInformation, place})
                const _address = extractAddress(place);
                setAddress(_address);
                searchInput.current.value = _address.plain();
                const info = {address: _address, token, place}
                info.address.name = searchInput.current.value


                // dispatch(updateUserAddress(info))
                //     .unwrap()
                //     .then((res) => {
                //         setLoading(false)
                //         setShow(false);
                //
                //     })
                //     .catch(() => {
                //         setLoading(false)
                //         setShow(false);
                //     });

            }).catch(e => {

            searchInput.current.value = 'Failed to locate you'
        })
    }


    const findMyLocation = () => {
        setLoading(true);
        searchInput.current.value = "Obtaining geocodes...";

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    reverseGeocode(position.coords);
                },
                error => {
                    if (error.code === error.PERMISSION_DENIED) {
                        searchInput.current.value = "Failed to locate you. Check location permission.";
                    } else {
                        searchInput.current.value = 'We are unable to locate you'
                    }
                    setLoading(false);
                }
            );
        } else {
            searchInput.current.value = "Geolocation is not supported by your browser.";
            setLoading(false);
        }
    };
    const handleInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setDeliveryInformation((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };


    return (
        <div className="address-form">

            {Object.keys(address).length === 0 && <div className="search mb-3">
                <MDBInput
                    ref={searchInput}
                    type="text"
                    placeholder=''
                    label='Search your delivery address'
                    className='form-control myInput '/>
                <button
                    onClick={findMyLocation} type='button'><Icon icon="mdi:crosshairs-gps"/>
                </button>
            </div>}

            {Object.keys(address).length > 0 && auth.user && <form className='card-text' onSubmit={handleSubmit}>
                <div>
                    <div className="personal_info mb-5">
                        <div className="mb-3">
                            <label>Personal information</label>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <MDBInput
                                    className="mb-4"
                                    type="text"
                                    required
                                    label="First Name"
                                    name="firstName"
                                    value={firstName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <MDBInput
                                    className="mb-4"
                                    type="text"
                                    label="Surname"
                                    required
                                    name="surname"
                                    value={surname}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <MDBInput
                                    className="mb-4"
                                    type="text"
                                    label="Phone number"
                                    name="phoneNumber"
                                    required
                                    value={phoneNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>


                    <div className="address-info">
                        <div className='mb-3'>
                            <label>Address information</label>
                        </div>

                        <div className="row">
                            <div className="col-md-4">
                                <MDBInput
                                    className="mb-4"
                                    type="text"
                                    required
                                    label="Postal Address"
                                    name="postalAddress"
                                    value={postalAddress}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-4">
                                <MDBInput
                                    className="mb-4"
                                    type="text"
                                    label="Postal code"
                                    name="zipCode"
                                    value={zipCode}
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-4">
                                <MDBInput
                                    className="mb-4"
                                    type="text"
                                    label="City"
                                    name="city"
                                    required
                                    value={city}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <MDBInput
                                    className="mb-4"
                                    type="text"
                                    label="State/Region"
                                    name="state"
                                    required
                                    value={state}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <MDBInput
                                    className='mb-4'
                                    type='text'
                                    label='Additional information'
                                    name="addtionalInfor"
                                    value={`${name ? name : formattedAddress}`}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <button type='submit'>
                    Submit
                </button>

            </form>}

        </div>


    );
};

export default DeliveryAddress;