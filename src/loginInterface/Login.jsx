import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import Axios from 'axios';
// import {useState} from 'react';
// import { accountManager, AccountManager } from './helper/user.service.js'
// import storage from './helper/LoginStatus';
// import Register from "./Register";
// import { accountService, alertService } from '@/_services';


async function loginUser(credentials) {
    return fetch('http://localhost:3000/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}

function Login ({setToken}/*{ history, location }*/) {

    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });

    function onSubmit ({ email, password }, {setSubmitting}) 
    {
        Axios.post('http://localhost:3000/login', 
        {email: email, password: password}).then(async (Response) => {
            console.log(Response);
            if(Response.data.message){
                alert('Message: ' + Response.data.message);
                setSubmitting(false);
            }
            else {
                alert('Message: ' + Response.data.token + ' logged in.');
                const token = await loginUser({
                    email, password
                });
                setToken(token);
                localStorage.setItem("token", JSON.stringify(Response.data.token));
            }
            // this.props.history.push('/home');
        })
        // alertService.clear();
        // accountService.login(email, password)
        //     .then(() => {
        //         const { from } = location.state || { from: { pathname: "/" } };
        //         history.push(from);
        //     })
        //     .catch(error => {
        //         setSubmitting(false);
        //         alertService.error(error);
        //     });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <h3 className="card-header">Login</h3>
                    <div className="card-body">
                        <div className="form-group">
                            <label>Email</label>
                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-row">
                            <div className="form-group col">
                                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Login
                                </button>
                                <Link to="/login/register" className="btn btn-link">Register</Link>
                            </div>
                            {/* <div className="form-group col text-right">
                                <Link to="forgot-password" className="btn btn-link pr-0">Forgot Password?</Link>
                            </div> */}
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export {Login};