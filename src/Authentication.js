import React, { useState } from 'react';

import { Storage } from 'aws-amplify';
import { Predictions  } from 'aws-amplify';
var dataURLtoBlob = require('blueimp-canvas-to-blob')

const style = {
  position: "absolute",
  top: "0",
  right: "0",
  width: "350px"
};

function EntityIdentification() {
    const [response, setResponse] = useState("Click Take photo for testing ")
    const [src, setSrc] = useState("");
  
    function identifyFromFile(event) {
      setResponse('searching...');
      
      //const { target: { files } } = event;
     // const [file,] = files || [];
        const file = event;
      if (!file) {
        return;
      }
      console.log("entered predictions");
      Predictions.identify({
        entities: {
          source: {
            file,
          },
          /**For using the Identify Entities advanced features, enable collection:true and comment out celebrityDetection
           * Then after you upload a face with PredictionsUpload you'll be able to run this again
           * and it will tell you if the photo you're testing is in that Collection or not and display it*/
          collection: true
          //celebrityDetection: true
        }
      }).then(result => {
        console.log("result");
        console.log(result);
        const entities = result.entities;
        let imageId = ""
        let names = ""
        entities.forEach(({ boundingBox, metadata: { name = "", externalImageId = "" } }) => {
          /*const {
            width, // ratio of overall image width
            height, // ratio of overall image height
            left, // left coordinate as a ratio of overall image width
            top // top coordinate as a ratio of overall image heigth
          } = boundingBox;*/
          imageId = externalImageId;
          console.log("imageId");
          console.log(imageId);
          if (name) {
            names += name + " .";
          }
          console.log("name");
          console.log({ name });
        })
        if (imageId) {
          Storage.get("", {
            customPrefix: {
              public: imageId
            },
            level: "public",
          }).then(setSrc); // this should be better but it works
        }
        
        console.log("entities");
        console.log({ entities });
        setResponse(names);
        if(!imageId) {
            setResponse('Not Autherized !!!!');
            setSrc("");
        }
      })
        .catch(err => {
          console.log(err);
          setResponse("Error Occured in entities");
          setSrc("");
        })
    }

    document.addEventListener('build', function (e) {
        console.log("Cought event")
        let canvas = document.getElementById('canvas');
        let data = canvas.toDataURL('image/png');
       //console.log(data)
        //data =  window.dataURLtoBlob && window.dataURLtoBlob(data);
        //console.log(window.dataURLtoBlob)
        data = dataURLtoBlob(data);
        console.log(data);
        identifyFromFile(data);
    }, false);
      
  
    return (
      <div className="Text">
        <div>
          <h3>Entity identification</h3>
          <div className="camera">
            <video id="video">Video stream not available.</video>
            <button id="startbutton">Take photo</button> 
        </div>
        <canvas id="canvas">
        </canvas>

          <p>{response}</p>
          { src && <img style= {style} src={src} alt="no"></img>}
        </div>
      </div>
    );
  }


function Authentication() {

    return(
        <div>
            Identify Entities
            <EntityIdentification />
        </div>
    );
}

export default Authentication;

//         <input type="file" onChange={identifyFromFile}></input>