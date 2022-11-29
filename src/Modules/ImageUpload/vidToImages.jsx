import React from 'react';  
import { useState, useEffect } from 'react'; 
import './MyImages.css';
import {Images2Server} from './ReactUploadImage.jsx'
// import Axios from 'axios';

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const ffmpeg = createFFmpeg({ log: true });

function VidToImages() {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState(localStorage.getItem('videoList'));
  const [Pic, setPic] = useState();

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  }

  useEffect(() => {
      if(!ffmpeg.isLoaded()){
        load();
      }
      else{
        setReady(true);
      }
  }, [])

  const convertToPic = async () => {
    // Write the file to memory 
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));

    // Run the FFMpeg command
    // await ffmpeg.run('-i', 'test.mp4', '-t', '2.5', '-ss', '2.0', '-f', 'gif', 'out.gif');
    const name = 'test';
    // let counter = 0;
    // const counter2str = () => {
    //   counter = counter + 1;
    //   return counter.toLocaleString();
    // }
    var step = 10;
    await ffmpeg.run('-i', 'test.mp4', '-vf', 'fps=1/' + step, name + '%d.png');
    
    var vid = document.getElementById("video");
    // alert(vid.duration);
    const final = Math.floor(vid.duration/step); //last frame

    // Read the result
    var urls = [];
    var fileArr = [];
    // const dT = new DataTransfer();
    for (let index = 1; index <= final; index++) {
      const data = ffmpeg.FS('readFile', name + index.toLocaleString() + '.png');
      // Create a URL
      let url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/png' }));
      urls.push(url);
      // files.push(name + index.toLocaleString() + '.png')
      console.log(url);

      toDataURL(url)
      .then(dataUrl => {
        console.log('Here is Base64 Url', dataUrl)
        var fileData = dataURLtoFile(dataUrl, "image" + index + ".png");
        console.log("Here is JavaScript File Object",fileData)
        fileArr.push(fileData);
        console.log(fileArr);
        // dT.items.add(fileData);
        if(index === final)Images2Server(fileArr);
      })
    }
    // console.log(fileArr); ?Why is it not working
    setPic(urls);
    // inp.files = dT.files;
  }

  // ***Here is the code for converting "image source" (url) to "Base64".***

//  let url = 'https://cdn.shopify.com/s/files/1/0234/8017/2591/products/young-man-in-bright-fashion_925x_f7029e2b-80f0-4a40-a87b-834b9a283c39.jpg'
  const toDataURL = url => fetch(url)
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
     }))


// ***Here is code for converting "Base64" to javascript "File Object".***

  function dataURLtoFile(dataurl, filename) {
     var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
     bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
     while(n--){
     u8arr[n] = bstr.charCodeAt(n);
     }
   return new File([u8arr], filename, {type:mime});
  }

  return ready ? (
    
    <div className="VidToImages">
      { video && <video
        controls
        id="video"
        width="250"
        src={URL.createObjectURL(video)}>

      </video>}
      
      {/* <input type="file" id="inp" onChange={(e) => {
        Images2Server(e.target.files);
      }
    }/> */}
      <div className="row-centered">
        <input type="file" onChange={(e) => setVideo(e.target.files?.item(0))} />

        {/* <h3>Result</h3> */}

        <button onClick={convertToPic} className="btn btn-dark">Convert&Upload</button>
      </div>

      {Pic && Pic.map((img, index) => {
                return (<img key={index} src={img} alt="unloaded" width="250" />)
            })}

    </div>
  )
    :
    (
      <p>Loading...</p>
    );
}
// function VidToImages(){
//   return (
//     <div className="input-group mb-3">
//     <div className="input-group-prepend">
//       <span className="input-group-text">Upload</span>
//     </div>
//     <div className="custom-file">
//       <input type="file" className="custom-file-input" id="inputGroupFile01" />
//       <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
//     </div>
//   </div>
//   );
// }


export default VidToImages;