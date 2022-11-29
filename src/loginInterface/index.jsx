import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import {Login} from "./Login.jsx";
import {Register} from "./Register.jsx";
import {Init} from "./Init.jsx";

// import history from "./history";
// let path = "";

function LoginInterface () {

    const [token, setToken] = useState();

    if (!token){
        
        return (              
            <Router>
                <Switch>
                    <Route path="/login/register" >
                        <Register setToken={setToken} />
                    </Route>
                    <Route path="/login">
                        <Login setToken={setToken} />
                    </Route>
                    <Route path="/" component={Init}>
                    </Route>
                </Switch>
            </Router>
        );
    }
    else {
            return (              
            <Router>
                <Switch>
                    <Route path="/login/register" >
                        <Redirect to="/home" />
                    </Route>
                    <Route path="/login">
                        <Redirect to="/home" />
                    </Route>
                    <Route path="/" component={Init}>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export {LoginInterface};