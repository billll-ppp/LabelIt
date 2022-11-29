import React from 'react';
// import VidToImages from './vidToImages.jsx';
import ShowMyImages from './showMyImages.jsx';

function MyImages () {
    return (
        <div className="p-4">
            <div className="container">
                {/* <VidToImages /> */}
                <ShowMyImages props={localStorage.getItem('token')} />
              {/* <div className="input-group my-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
                </div>
                <div className="custom-file">
                  <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
                  <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                </div>
              </div> */}
            </div>
        </div>

            // <section className="section-preview">
      
            //   <div className="input-group my-3">
            //     <div className="input-group-prepend">
            //       <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
            //     </div>
            //     <div className="custom-file">
            //       <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
            //       <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
            //     </div>
            //   </div>
      
            // </section>
    );
}

export default MyImages;