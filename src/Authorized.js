import React from 'react';
const AWS = require('aws-sdk');
AWS.config.update({
    region: "us-east-1"
});

function Authorized() {

    let keys = getObjects().then((keys) => {

    });

    console.log(keys);

    return(
        <div>
            Authentication
        </div>
    );
}

async function getObjects() {
    var s3 = new AWS.S3();
    var params = {
        Bucket: "finalbucket-dev", 
        Prefix: "protected/predictions/index-faces/",
        MaxKeys: 10
    };
    
    let list = await s3.listObjects(params).promise();
    //console.log(list.Contents.length);
    let objects = [];
    
    for(let i=0; i< list.Contents.length; i++){
        if(!list.Contents[i].Key.includes("admin")) {
            objects.push(list.Contents[i].Key);
        }
    }

    return objects;
}

export default Authorized;
