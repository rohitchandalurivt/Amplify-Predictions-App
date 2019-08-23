import React from 'react';
import { Storage } from 'aws-amplify';

function PredictionsUpload() {
    /* This is Identify Entities Advanced feature
     * This will upload user images to the appropriate bucket prefix
     * and a Lambda trigger will automatically perform indexing
     */
    function upload(event) {
      const { target: { files } } = event;
      const [file,] = files || [];
      Storage.put(file.name, file, {
        level: 'protected', 
        customPrefix: {
          protected: 'protected/predictions/index-faces/',
        }
      });
    }
  
    return (
      <div className="Text">
        <div>
          <h3>Upload to predictions s3</h3>
          <input type="file" onChange={upload}></input>
        </div>
      </div>
    );
  }

function Upload() {

    return(
        <div>
            Identify Entities (Advanced)
            <PredictionsUpload />
        </div>
    );
}

export default Upload;