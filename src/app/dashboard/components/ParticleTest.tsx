"use client";

import React from "react";

export default function ParticleTest() {
  const [file, setFile] = React.useState<File>();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const currentFile = event.target.files[0];
      setFile(currentFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    // Get the signed URL from your API
    const response = await fetch("/api/particle/storage");
    const { url } = await response.json();

    // Use the signed URL to upload the file
    const uploadResponse = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (uploadResponse.ok) {
      console.log("File uploaded successfully.");
    } else {
      console.error("File upload failed.");
    }
  };

  return (
    <div className=" flex flex-col">
      {/* <button onClick={createNewFile}>Create new project</button> */}
      <label htmlFor="upload-file">Choose file to upload</label>
      <input type="file" name="upload-file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload file</button>
    </div>
  );
}
