import React, { useState } from "react";
import './App.css';
import FileUpload from './component/FileUpload';

function App() {
  const [newUserInfo, setNewUserInfo] = useState({ profileImages: []});

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const updateUploadedFiles = (files) => 
  setNewUserInfo({...newUserInfo, profileImages: files});

  return (
    <div className="container">
      <form className="" onSubmit={handleSubmit}>
        <FileUpload
          accept=".jpg, .png, .jpeg"
          label="Profile Image(s)"
          multiple
          updateFilesCb={updateUploadedFiles}
        />
        <button className="createBtn">Create New User</button>
      </form>
    </div>
  );
}

export default App;
