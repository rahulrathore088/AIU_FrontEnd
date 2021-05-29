import logo from './logo.svg';
import React , {useState, useEffect, useCallback} from "react";
import './App.css';
import axios from "axios";
import {useDropzone} from 'react-dropzone';

const UserProfile = () => {

const [userProfiles, setUserprofiles] = useState([]);

  const fetchUserProfile = () => {
    axios.get("http://localhost:8080/api/v1/user-profile").then(
      res => {
        console.log(res);
        setUserprofiles(res.data);
      });
  }
  useEffect (() => {
    fetchUserProfile();
  },[]);
  return userProfiles.map((userProfile , index) => {

    return (
     <div key={index}>
       <br/><br/>
       <h1>{userProfile.userName}</h1>
       <p>{userProfile.userProfileId}</p>
       <DropZone {...userProfile}/><br/>
      </div>
      )
  })
} ;

function DropZone({ userProfileId }) {
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    console.log(file);
     console.log(userProfileId);
    const formData = new FormData();
      formData.append("file", file);
      axios.post(`http://localhost:8080/api/v1/user-profile/${userProfileId}/image/upload`,
      formData,
      {
        headers : {
          "Content-Type" : "multipart/form-data"
        }
      }).then(() => {
        console.log("file uploaded successfully.")
      }).catch(err => {
        console.log(err);
      });
  },[])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
  <div {...getRootProps()}>
    <input {...getInputProps()}/>
    {
      isDragActive ?
      <p>Drop the image here ...</p> :
      <p>Drag 'n' drop profile image, or click to select profile image</p>
    }
  </div>
  )
}

function App() {
  return (
    <div className="App">
      <UserProfile />
    </div>
  );
}

export default App;
