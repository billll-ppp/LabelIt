import React from 'react'
// eslint-disable-next-line no-undef
import Axios from 'axios';
// const cors = require("cors");

class ReactUploadImage extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onFormSubmit(e){
        e.preventDefault();
        Images2Server(this.state.file);
    }
    onChange(e) {
        console.log(e.target.files);
        this.setState({file: // Array.from
            (e.target.files)});
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <div className="row-centered">
                <input multiple type="file" name="myImage" onChange= {this.onChange} accept="image/png, image/gif, image/jpeg, image/jpg" />
                    
                <button type="submit" className="btn btn-dark">Upload</button>
                </div>
            </form>     
        )
    }
}

const Images2Server = (files) => {
    const formData = new FormData();
    for(var x = 0; x<files.length; x++) {
        formData.append('myImage', files[x]);
    }
    formData.append('userID', localStorage.getItem("token"));
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    Axios.post("http://localhost:3000/upload",formData,config)
        .then((res) => {
            console.log(res);
            // alert("The file is successfully uploaded");
            if(res.status == 200){
                alert("Uploaded successfully.")
            }
            // else if(res.err){
            //     alert("Error uploading")
            // }
        }).catch((err) => {
            alert(err);
    });
}

export default ReactUploadImage;
export {Images2Server};