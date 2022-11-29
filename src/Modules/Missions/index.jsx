import React from 'react';
// import { Router, Route } from 'react-router-dom';
import CreateMission from "./CreateMission"

function Missions (){
    return (
        <div className="p-4">
            <div className="container">
                <div className="container-fluid">
                    <div className="jumbotron">
                        <h1 className="text-center">Create missions</h1>
                        <p className="text-center">Choose from your pictures to create a mission:</p>
                    </div>
                    <CreateMission />
                </div>
            </div>
        </div>

    )
}

export default Missions;