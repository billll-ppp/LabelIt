import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import Axios from 'axios';

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

function Register ({setToken}/*{ history, location }*/) {
    const initialValues = {
        username: '',
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });

    function onSubmit({ username, email, password }, { setSubmitting }) {

        Axios.post('http://localhost:3000/login/register/', 
        {username: username, email: email, password: password}).then(async (Response) => {
            console.log(Response);
            if(Response.data.err){
                alert('Message: ' + Response.data.err.sqlMessage);
                setSubmitting(false);
            }
            else {
                alert('Message: Registeration successful.');
                const token = await loginUser({
                    email, password
                });
                setToken(token);
                localStorage.setItem("token", JSON.stringify(Response.data.token));
            }
        })
        // alertService.clear();
        // accountService.Register(email, password)
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
                    <h3 className="card-header">Register</h3>
                    <div className="card-body">
                        <div className="form-group">
                            <label>Username</label>
                            <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                        </div>
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
                                    Register
                                </button>
                                <Link to="/login" className="btn btn-link">Back</Link>
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

Register.propTypes = {
    setToken: PropTypes.func.isRequired
}

export {Register};