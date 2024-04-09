import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddMusic() {
  const [title, setTitle] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [musicFile, setMusicFile] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!thumbnailFile || !musicFile) {
        Swal.fire({
          title: "Warning!",
          text: "Please select both a thumbnail and a music file.",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("thumbnailFile", thumbnailFile);
      formData.append("musicFile", musicFile);
      console.log(formData.get("title"));
      console.log(formData.get("thumbnailFile"));
      console.log(formData.get("musicFile"));
      console.log(formData);
      // Send POST request to your backend server
      const response = await axios.post(
        "http://localhost:5004/addMusic",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        title: "Success!",
        text: "Music added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Reset form fields after successful submission
      setTitle("");
      setThumbnailFile(null);
      setMusicFile(null);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add music. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="card w-75 mt-3">
      <div className="add-music">
        <h2 style={{ fontFamily: "Roboto", fontSize: "34px" }}>Add Music</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Music Title:</label>
            <input
              type="text"
              value={title}
              placeholder="Enter Your Music Title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Music Thumbnail:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnailFile(e.target.files[0])}
              required
            />
          </div>
          <div className="form-group">
            <label>Music File:</label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setMusicFile(e.target.files[0])}
              required
            />
          </div>
          <button className="buttonn" type="submit">
            Add Music
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMusic;
