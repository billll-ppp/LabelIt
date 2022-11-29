//ES6
import React, { Component } from 'react'
// import { useState } from 'react'
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'
// import {LoadImage} from "../MyImages/showMyImages"
import Axios from 'axios';
//  import images from local
// import imageList from "../../../public/uploads/*.png"
// import img1 from '../../../public/uploads/IMAGE-1637568815690.png'
// import img2 from './images/kitten/201.jpg'
// import img3 from './images/kitten/202.jpg'
// import img4 from './images/kitten/203.jpg' 
// const imageList = [img1];

// const fetchUrls = () => {
//     const [image, setimage] = useState([]);
//     LoadImage(setimage);
//     return image;
// }

// var imageList = () => {fetchUrls()};

let urls = [];

class CreateMission extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageList: [],
      image: null
    }
    this.onPick = this.onPick.bind(this)
  }
 
  componentDidMount() {
    Axios.get("http://localhost:3000/myimages/", { 
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
                // setSrc(urls);
                this.setState({imageList: urls})
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

  onPick(image) {
    this.setState({image})
  }
 
  render() {
    return (
      <div>
        <ImagePicker 
          images={this.state.imageList.map((image, i) => ({src: image, value: i}))}
          onPick={this.onPick}
          multiple={true}
        />
        <button type="button" className="btn btn-dark" onClick={() => {
          console.log(this.state.image);
          // var missionID
          Axios.post("http://localhost:3000/mission/", 
          {image: this.state.image, creator_userID: localStorage.getItem('token')},
          ).then((response) => {
            if (response.status == 200){
              alert("Mission created!");
            }
          }).catch((error) => {
            alert("Error: " + error);
          })
          }}>OK</button>
      </div>
    )
  }
}
 
export default CreateMission
