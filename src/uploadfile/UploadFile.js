import { useState } from "react";
import { storage } from "../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const UploadFile = () => {
  // State to store uploaded file
  const [file, setFile] = useState("");

  const [url, setUrl] = useState("");

  // progress
  const [percent, setPercent] = useState(0);

  // Handle file upload event and update state
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  // Download File From the Uploaded URl File
  const handleDownload = () => {
    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = (event) => {
      //Create an `a` tag (since it has an `href` and a `download` attribute)
      //This is Used for the downloading file from the uploading url
      var a = document.createElement("a");
      a.href = window.URL.createObjectURL(xhr.response);
      a.download = "someFileName";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click(); //Simulates a click event
      const blob = xhr.response;
    };
    xhr.open("GET", url);
    xhr.send();
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/files/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUrl(url);
          console.log(url);
        });
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleChange} accept="/image/*" />
      <button onClick={handleUpload}>Upload to Firebase</button>
      <p>{percent} "% done"</p>
      <button onClick={handleDownload}>Download File</button>
    </div>
  );
};

export default UploadFile;
