import React from 'react';
import MissionList from './MissionList.jsx'

function TakeMissions (){
    return (
        <div className="p-4">
            <div className="container">
                <div className="jumbotron">
                    <h1 className="text-center">Take missions</h1>
                    <p className="text-center">Choose from below to start labeling!</p>
                </div>
                <MissionList />
            </div>
        </div>
    );
}

export default TakeMissions;