import React from 'react';
import { useState, useEffect } from 'react';
// import { Redirect } from 'react-router-dom';
import Axios from 'axios';

function MissionList(props) {
    const [missionImg, setMissionImg] = useState({});

    useEffect(() => {
        const path = "http://localhost:3000/missionlist";
        LoadMissionList(path, setMissionImg);
        
    }, [])

    function LoadMissionList(path, setMissionImg) {
        Axios.get(path, {

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
                            , creator_username: response.data.result[i].username};
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
    }
    
    // function handleClick(key) {

    // }

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

                                        <h5 className="card-title">Creator: {missionImg[key].creator_username}</h5>
                                        <div className="card-body">
                                        <a href={"/label/" + key}
                                            // onClick={
                                            // () => {
                                            //     props.history.push({pathname: '/label/' + key, state: missionImg[key]});
                                            // }
                                            // }
                                        className="btn btn-dark"
                                        // onClick={handleClick(key)}
                                        >Start labeling</a>
                                        <button className="btn btn-light" onClick={  
                                            () => {      
                                                Axios.post("http://localhost:3000/updatemissionlist", {
                                                missionID: key, takerID: localStorage.getItem("token")
                                            }).catch(function(error) {
                                                alert("Error: " + error);
                                            })}
                                        }>Take it</button>
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
        {/* <div className="card">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <a href="#" className="btn btn-primary">Go somewhere</a>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>
        <div className="card">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <a href="#" className="btn btn-primary">Go somewhere</a>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>
        <div className="card">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>
        <div className="card">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div> */}
        </div>
    );
}

export default MissionList;