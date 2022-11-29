import React from 'react';
import MyMissionStatus from './missionStatus';

function MissionStatus (){
    return (
        <div className="p-4">
            <div className="container">
                <div className="container-fluid">
                    <div className="jumbotron">
                        <h1 className="text-center">Mission Status</h1>
                        <p className="text-center">Keep track of your missions.</p>
                    </div>
                </div>
                <MyMissionStatus />
            </div>
        </div>
    );
}

export default MissionStatus;