// import holy from "../../public/uploads/IMAGE-1637397911297.jpg"
import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';

let urls = [];

export default function ShowMyImages ()  {
    const [src, setSrc] = useState([]);

    useEffect(() => {
        const path = "http://localhost:3000/myimages/";
        // let cancelled = false;
        LoadImage(path, setSrc);
        
    }, []);


    return (
        <div className="container-fluid">
            <div className="jumbotron">
                <h1 className="text-center">My images</h1>
                <p className="text-center">This is your repository of images.</p>
            </div>
            <div className="row">
                {src.map((img, index) => {
                    return (
                        <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
                        <figure>
                            <img src={img} className="img-thumbnail grayscale"/>
                            <figcaption>Example caption</figcaption>
                        </figure>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function LoadImage(path, setSrc){
    Axios.get(path, { 
            params: {userID : localStorage.getItem('token')}
        }).then((response) => {
            console.log(response.data);
            if(response.data.res){
                urls = [];
                for(var x=0; x<response.data.res.length; x++){
                    var url = response.data.res[x].data_url;
                    // url = url.replace(/\\/g, "/")
                    // url = url.replace("public", "");
                    url = "http://localhost:3000/uploads/" + url;
            
                    urls.push(url);
                }
                console.log(urls);
                // if(cancelled) return;
                setSrc(urls);
                // return response.data;
            }
            // else if(response.data.err){
            //     console.error(response.data.err);
            // }
            // else{
            //     alert(response.data.message);
            // }
        }).catch((err) => {
            console.error(err);
        });
}

export {LoadImage};