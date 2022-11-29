import React from 'react';
import { useState, useEffect } from 'react';
// import { Redirect } from 'react-router-dom';
import Axios from 'axios';

function MyMissionStatus(props) {
    const [missionImg, setMissionImg] = useState({});

    useEffect(() => {
        const path = "http://localhost:3000/missionstatus";
        LoadMissionList(path, setMissionImg);
        
    }, [])

    function LoadMissionList(path, setMissionImg) {
        Axios.get(path, {
            params: {userID : localStorage.getItem('token')}
        }).then((response) => {
            console.log(response.data);
            if(response.data.result){
                var map = {};
                var current_missionID = 0;
                // var creator_username = undefined;
                const prefix_validURL = "http://localhost:3000/uploads/";
                for(let i = 0; i < response.data.result.length; i++) {
                    if ( current_missionID !== response.data.result[i].missionID){
                        //mission not yet in record: create new list to store images
                        current_missionID = response.data.result[i].missionID;
                        map[current_missionID] = {images: [prefix_validURL + response.data.result[i].imageURL]
                            , missionStatus: response.data.result[i].mission_status
                            , takerName: response.data.result[i].taker_name};
                    }
                    else {
                        //mission already in record: append to list
                        map[current_missionID].images.push(prefix_validURL + response.data.result[i].imageURL);
                    }
                }
                console.log(map);
                setMissionImg(map);
            }
        })
        .catch(function(err) {
            alert("Error: " + err);
        })
    }
    

    return (
        <div className="row row-cols-3 row-cols-md-4 g-4">
            {
                Object.keys(missionImg).map((key, index) => {
                    console.log(key);
                    // return missionImg[key].map((img, index) => {
                    //     console.log(img);
                        return (
                                // eslint-disable-next-line react/jsx-key
                                <div className="col">
                                    <div className="card">
                                        <img src={missionImg[key].images[0]} className="card-img-top" alt="..." key={index}/>

                                        <h5 className="card-title">Status: {missionImg[key].missionStatus=='Y'?"Labeled":"Unmodified"}</h5>
                                        <div className="card-body">
                                            <p className="card-text">{
                                                missionImg[key].takerName ? 
                                                    "Taker: " + missionImg[key].takerName :
                                                    "No taker"}
                                            </p>
                                        <a href={"/label/" + key}
                                        className="btn btn-dark">Start labeling</a>
                                        {/* <Link to={'/label/' + key} imageURL={missionImg} /> */}
                                        {/* <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
                                        </div>
                                    </div>
                                </div>
                        )
                    // })
                })
            }
        </div>
    );
}

export default MyMissionStatus;