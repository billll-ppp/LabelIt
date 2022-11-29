import React from 'react';
// import ImageUploading from 'react-images-uploading';
// import Axios from 'axios';
import ReactUploadImage from './ReactUploadImage.jsx'
import VidToImages from './vidToImages.jsx'

function ImageUpload (){
  return (
    <div className="p-4">
      <div className="container">
        <div className="container-fluid">
          <div className="jumbotron">
              <h1 className="text-center">Upload</h1>
              <p className="text-center">Upload images and videos to your repository.</p>
          </div>
            <div className="card text-center" >
                <h2 className="card-title">Images</h2>
                <div className="card-body">
                  <ReactUploadImage />
                </div>
            </div>
            <div className="card text-center" >
                <h2 className="card-title">Videos</h2>
                <div className="card-body">
                  <VidToImages />
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ImageUpload;