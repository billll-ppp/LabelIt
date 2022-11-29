import React from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch
  // useLocation,
} from "react-router-dom"; //with Switch, only first in order will match
// import { useEffect, useState } from "react";
import { LoginInterface } from "./loginInterface/index.jsx";
// import { Register } from "./loginInterface/register.jsx";
import { PrivateRoute } from "./PrivateRoute/PrivateRoute.jsx";
import { Nav } from "./Nav/Nav.jsx";
import MainPage from "./Modules/MainPage/index.jsx";
import Profile from "./Modules/Profile/index.jsx";
import MyImages from "./Modules/MyImages/index.jsx";
// import ReactUploadImage from "./Modules/ImageUpload/ReactUploadImage";
import ImageUpload from "./Modules/ImageUpload/index.jsx";
import Missions from "./Modules/Missions/index.jsx";
import TakeMissions from "./Modules/TakeMissions/index.jsx";
import MissionStatus from "./Modules/MissionStatus/index.jsx";
import LabelPage from "./Modules/LabelPage/index.jsx";
import history from "./history.js";
// import { StrictMode } from "react";
// import "../styles.less";
// import * as yup from "yup";

function App() {
  // const { pathname } = useLocation();
  // const [user, setUser] = useState();
  // const [token, setToken] = useState({});

  return (
    <Router history={history}>
      <div className="app-container">
        <Nav />
        <Switch>
          <PrivateRoute path="/home" component={MainPage} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/myimages" component={MyImages} />
          <PrivateRoute path="/upload" component={ImageUpload} />
          <PrivateRoute path="/createmissions" component={Missions} />
          <PrivateRoute path="/takemissions" component={TakeMissions} />
          <PrivateRoute path="/missionstatus" component={MissionStatus} />
          <PrivateRoute path="/label" component={LabelPage} />
          {/* <PrivateRoute path="/logout"></PrivateRoute> */}
          <div className="container">
            <div className="row">
              <div className="col-sm-8 offset-sm-2 mt-5">
                <div className="card m-3"></div>
                <Route path="/login" component={LoginInterface} />
              </div>
            </div>
          </div>
          <Route path="*" component={MainPage} />
        </Switch>
      </div>
    </Router>
  );
}

render(<App />, document.getElementById("root"));
