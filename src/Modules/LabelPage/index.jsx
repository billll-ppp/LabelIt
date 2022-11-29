// import React from 'react';

// import Labeler from "./image-labeling-react";

// export default function LabelPage(props) {
//     return (
//         <Labeler imageURL={props.imageURL}/>
//     )
// }

import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import ReactImageAnnotate from "react-image-annotate";

import exportFromJSON from 'export-from-json'

const LabelPage = () => {
    const [images, setImages] = useState( 
    /** your images (array) will comes come here */ 
    [
    {
        src: "https://placekitten.com/408/287",
        name: "Image 1",
        regions: []
    },
    {
        src: "https://placekitten.com/408/288",
        name: "Image 2",
        regions: []
    }
    ]
        // () => 
        // {const path = "http://localhost:3000/singlemission";
        // const prefix_validURL = "http://localhost:3000/uploads/";
        // Axios.get(path, {params: {missionID: missionID}})
        // .then((response) => {
        //     console.log(response.data.result);
        //     if(response.data.result){
        //         var list = [];
        //         for (const imageURL of response.data.result){
        //             // console.log(imageURL);
        //             list.push({
        //                 src: prefix_validURL + imageURL,
        //                 name: "Image",
        //                 regions: []
        //             })
        //         }
        //         console.log(list);
        //         return list;
        //     }
        // })}
    )
    const [selectedImage, setSelectedImage] = useState(0)

    useEffect(() => {
        console.log(window.location.pathname);
        var missionID = window.location.pathname.replace("/label/", "");
        // var list = [];
        // localStorage.getItem("missionImg").map((image, index) => {
        //     list.push({
        //             src: image,
        //             name: "Image " + index,
        //             regions: [] 
        //         });
            
        // })
        
        // setImages
        const path = "http://localhost:3000/singlemission";
        const prefix_validURL = "http://localhost:3000/uploads/";
        Axios.get(path, {params: {missionID: missionID}})
        .then((response) => {
            console.log(response.data.result);
            if(response.data.result){
                var list = [];
                for (const obj of response.data.result){
                    // console.log(imageURL);
                    list.push({
                        src: prefix_validURL + obj.imageURL,
                        name: "Image",
                        regions: [],
                        id: obj.i2mID
                    })
                }
                console.log(list);
                setImages(list);
            }
        })
        .catch((error) => {
            alert("Error: " + error);
        })
    }, [])

    const handleNext = ()=>{
        if ( selectedImage === images.length-1)
            return 
        setSelectedImage(selectedImage + 1)
    }
    const handlePrev = ()=>{
        if (selectedImage === 0) 
            return 
        setSelectedImage(selectedImage - 1)    
    }
    

    const handleExit= (data)=>{
    // you can do anything with this data you can console.log(data) and see what it contains 
    // I personally use data.images to get the image array and its data like annotation points or x and y 
    // coordinates of points 
        console.log(data);
        //convert to COCO
        var coco = {"info": null, "licenses": null, "categories": null, "images": null, "annotations": null}
        coco["info"] = {"year": 2021}
        coco["licenses"] = [{}]
        coco["categories"] = [];
        coco["images"] = [];
        coco["annotations"] = [];
        for (var i in data.images){
            // console.log(i)
            coco["categories"].push({"id": data.images[i].id});
            coco["images"].push(data.images[i].src);
            coco["annotations"].push(data.images[i].regions);
        }
        if (window.confirm('You are exporting data in default COCO format. \n   Click on No to opt for the PASCAL VOC format.')){
                            //export
                            let filename = "export.json";
                            let contentType = "application/json;charset=utf-8;";
                            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(coco)))], { type: contentType });
                            navigator.msSaveOrOpenBlob(blob, filename);
                            } else {
                            var a = document.createElement('a');
                            a.download = filename;
                            a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(coco));
                            a.target = '_blank';
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            }
                        } else {
                            const data4voc = [coco];
                            const fileName = 'download'
                            let fields =  [
                                            "info",
                                            "licenses",
                                            "categories",
                                            "images",
                                            "annotations"
                                            ];  //fieldsAsObjects or fieldsAsStrings, empty list means "use all"
                            const exportType = 'xml';
                            exportFromJSON({data: data4voc, fileName, fields, exportType})

                        }
        //tell database this mission is labeled
        var missionID = window.location.pathname.replace("/label/", "");
        Axios.post("http://localhost:3000/afterlabel", {
            missionID: missionID
        })
        .catch(function(error) {
            alert("Error: " + error);
        })

              
    }

   return (
  <ReactImageAnnotate
    // labelImages
    regionClsList={["Kitten", "Chick"]}
    regionTagList={["Face", "Tail", "Paw"]}
    // images={[
    //   {
    //     src: "https://placekitten.com/408/287",
    //     name: "Image 1",
    //     regions: []
    //   },
    //     {
    //     src: "https://placekitten.com/408/288",
    //     name: "Image 2",
    //     regions: []
    //   }
    // ]}
    labelImages
    selectedImage={selectedImage}
    onNextImage={handleNext}
    onPrevImage={handlePrev}
    key={images}
    images={images}  
    onExit={handleExit}
  />
)};

export default LabelPage;