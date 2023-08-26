import React, {useEffect, useState} from 'react';
import {clearMessage} from "../../redux/slices/message";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, Navigate, useNavigate} from "react-router-dom";
import {MDBBtn, MDBSpinner} from "mdb-react-ui-kit";
import {login} from "../../redux/slices/auth";
import Swal from 'sweetalert2'
import {loginFormInitialValues} from "../../common/initialValues/loginForm";
import useForm from "../../hooks/useForm";
import Form from "../../components/Form";
import withReactContent from "sweetalert2-react-content";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const {isLoggedIn, user} = useSelector((state) => state.auth);
    const location = useLocation();
    const [success, setSuccess] = useState(false)
    const [errored, setErrored] = useState(false)
    const [showForm, setShowForm] = useState(true)

    const [formIsValid, setFormIsValid] = useState(false);
    const [form, setForm] = useState(loginFormInitialValues.loginForm);
    const handleChange = useForm(setForm, setFormIsValid);

    const dispatch = useDispatch();
    let navigate = useNavigate();
    const MySwal = withReactContent(Swal)


    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);


    useEffect(() => {
        let intended = location.state
        if (intended) {
            return
        } else {
            if (user && user.token) {
                navigate("/user/orders");
            }
        }


    }, [user, location, navigate])

    const roleBasedRedirect = (res) => {
        MySwal.fire({
            text: 'Operation completed successfully',
            icon: 'success',
            didOpen: () => {
                setSuccess(true)
            },

        }).then(result => {
            let intended = location.state
            if (intended) {
                navigate(intended.from);
            } else {
                if (user) {
                    navigate("/user/orders");
                }
            }

            dispatch(clearMessage())
        }).catch(error => {
            dispatch(clearMessage())
        });
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            setSuccess(false);
            setErrored(false);
            const formData = {};
            for (let formElementIdentifier in form) {
                formData[formElementIdentifier] = form[formElementIdentifier].value;

            }

            const res = await dispatch(login(formData)).unwrap();
            if (res.error) {
                await MySwal.fire({
                    text: res.error,
                    icon: "error",
                });
                setLoading(false);
                setShowForm(true);
            } else {
                setErrored(false);
                roleBasedRedirect(res.user);
            }
        } catch (error) {
            console.error(error);
            setErrored(true);
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };


    const signupForm = () => {
        return (

            <form className='row g-3' onSubmit={handleSubmit}>
                <Form
                    form={form}
                    handleChange={handleChange}
                >
                    <div className='col-12'>
                        <MDBBtn
                            type='submit'
                            className='btn btn-primary  w-100'
                            disabled={loading || !formIsValid}>
                            {loading ? <>
                                <MDBSpinner size='sm' role='status' tag='span' className='me-2'/>
                                Loading...
                            </> : 'Login'}
                        </MDBBtn>
                    </div>
                    <div className="col-12">
                        <p className="small mb-0">Don't have account?
                            <Link to="/auth/register"> {' '} Create an account </Link>
                        </p>
                    </div>
                    <div className="col-12">
                        <p className="small mb-0">Forgot password?
                            <Link to="/auth/password/forgot"> {' '} Reset it here </Link>
                        </p>
                    </div>

                </Form>

            </form>

        );
    };

    if (isLoggedIn) {
        if (location.state) {
            return <Navigate replace to={location.state.from}/>
        } else {
            return <Navigate replace to="/user/orders"/>
        }

    } else {

        return (
            <>
                {showForm && <>
                    <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                        <p className="text-center ">Enter your email & password to login</p>
                    </div>
                    {signupForm()}
                </>}
            </>
        );
    }

}
export default Login;

