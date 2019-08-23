import React from 'react';
import './App.css';
import Upload from "./Upload.js";
import Authentication from "./Authentication.js";
import Amplify from 'aws-amplify';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

function App() {

  let url = window.location.href;
  let index = url.lastIndexOf("/");
  let path = url.substring(index+1);
  //let d = document.getElementById(path);
  //d.className = "active";
  console.log(path);

  return (
        <div className="wrapper">
            <nav id="sidebar">
    
                <ul className="list-unstyled components">
                    <li>
                        <a href="Authentication" id="Authentication">Authentication</a>
                    </li>
                    <li>
                        <a href="Upload" id="Upload">Upload</a>
                    </li>   
                </ul>
    
            </nav>
    
            <div id="content">
                {
                    path === "Authentication" 
                    ? <Authentication />
                    : <div /> 
                }
                {
                    path === "Upload" 
                    ? <Upload />
                    : <div />
                }

            </div>
        </div>
  );
}

// className="active"

export default App;
