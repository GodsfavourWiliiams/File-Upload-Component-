import React, { useState, useRef } from 'react';
import { FaTrash, FaUpload } from 'react-icons/fa';

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 10000000;
const KILO_BYTES_PER_BYTE = 1000;

const convertNestedObjectToArray = (nestedObj) =>
        Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({
    label,
    updateFilesCb,
     maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
    ...otherProps}) => {

    const fileInputField = useRef(null);
    const [files, setFiles] = useState({});

    const handleUploadBtnClick = () => {
        fileInputField.current.click();
      };
    
      const handleNewFileUpload = (e) => {
        const {files: newFiles} = e.target;
        if (newFiles.length) {
            let updatedFiles = addNewFiles(newFiles);
            setFiles(updatedFiles);
            callUpdateFilesCb(updatedFiles);
        }
      }
      
      const callUpdateFilesCb = (files) => {
        const filesAsArray = convertNestedObjectToArray(files);
        updateFilesCb(filesAsArray);
      };

        const addNewFiles = (newFiles) => {
            for (let file of newFiles) {
                if (file.size > maxFileSizeInBytes) {
                    alert("file too big")
                }
              if (file.size < maxFileSizeInBytes) {
                if (!otherProps.multiple) {
                  return { file };
                }
                files[file.name] = file;
              }
            }
            return { ...files };
          };

          const removeFile = (fileName) => {
            delete files[fileName];
            setFiles({ ...files });
            callUpdateFilesCb({ ...files });
          };
        
  return (
      <>
        <section className='FileUploadContainer'>
            <label htmlFor="inputLabel" className='InputLabel'>{label}</label>
            <p className=''>Max File Size 10000kb</p>
            <p className='DragDropText'>Drag and drop your files anywhere or</p>
            <button className='UploadFileBtn' onClick={handleUploadBtnClick}>
            <FaUpload />
            <span> Upload {otherProps.multiple ? "files" : "a file"}</span>
            </button>
            <input 
            type="file" 
            ref={fileInputField}    
            title=''
            value='' 
            className='FormField'
            onChange={handleNewFileUpload}
            {...otherProps}
            />
        </section>
        <div className="article">
            <span className='header'>To Upload</span>
            <div className="section">
                {Object.keys(files).map((fileName, index) => {
                    let file = files[fileName];
                    let isimagefile = file.type.split("/")[0] === "image";
                    return(
                        <section className='PreviewContainer' key={fileName}>
                            <div className="imageFile">
                                {
                                    isimagefile && (
                                        <img 
                                        src={URL.createObjectURL(file)} 
                                        alt={`file preview ${index}`} 
                                        className="imagePreview" 
                                        />
                                    )
                                }
                                <div isimagefile={isimagefile} className="FileMetaData">
                                    <span className="">
                                        {file.name}
                                    </span>
                                    <aside>
                                        <span>{convertBytesToKB(file.size)} Kb</span>
                                        <FaTrash className='RemoveFileIcon' onClick={() => removeFile(fileName)}/>
                                    </aside>
                                </div>
                            </div>
                        </section>
                    )
                })}
            </div>
        </div>
    </>
  )
}

export default FileUpload;