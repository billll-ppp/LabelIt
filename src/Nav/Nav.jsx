import React from 'react';
import { NavLink } from 'react-router-dom';

// import { Role } from '@/_helpers';
// import { accountService } from '@/_services';

function Nav() {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                
                <div className="navbar-nav">
                    <NavLink to="/home" className="nav-item nav-link">Home</NavLink>
                    {/* <NavLink to="/profile" className="nav-item nav-link">Profile</NavLink> */}
                    <NavLink to="/myimages" className="nav-item nav-link">My Images</NavLink>
                    <NavLink to="/upload" className="nav-item nav-link">Upload</NavLink>
                    <NavLink to="/createmissions" className="nav-item nav-link">Create Missions</NavLink>
                    <NavLink to="/takemissions" className="nav-item nav-link">Take Missions</NavLink>
                    <NavLink to="/missionstatus" className="nav-item nav-link">Mission Status</NavLink>
                    <NavLink to="/login" onClick={() => {
                        localStorage.removeItem('token');
                        alert("Goodbye.");
                        }} className="nav-item nav-link">
                        Logout
                    </NavLink>
                    {// TODO: better UX for logout
                    }
                    {/* {user.role === Role.Admin &&
                        <NavLink to="/admin" className="nav-item nav-link">Admin</NavLink>
                    } */}
                    {/* <a onClick={accountService.logout} className="nav-item nav-link">Logout</a> */}
                
                </div>
            </nav>

            {/* <Route path="/admin" component={AdminNav} /> */}
        </div>
    );
}

// function AdminNav({ match }) {
//     const { path } = match;

//     return (
//         <nav className="admin-nav navbar navbar-expand navbar-light">
//             <div className="navbar-nav">
//                 <NavLink to={`${path}/users`} className="nav-item nav-link">Users</NavLink>
//             </div>
//         </nav>
//     );
// }

export { Nav }; 