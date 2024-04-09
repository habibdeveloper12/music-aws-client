import React, { useState } from 'react';
import axios from 'axios'; 
import Swal from 'sweetalert2';

function AddVideo() {
  // State variables to store video data
  const [title, setTitle] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState(null);

  // Function to extract YouTube video ID from the input link
  const extractVideoId = (link) => {
    const videoIdMatch = link.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return videoIdMatch ? videoIdMatch[1] : null;
  };

// // Function to convert file to Base64 string
// const getBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
// };

const handleSubmit = async (e) => {
  e.preventDefault();
  const videoId = extractVideoId(youtubeLink);
  
  if (videoId) {
    try {

      if (!thumbnailFile) {
        Swal.fire({
          title: 'Warning!',
          text: 'Please select a thumbnail file.',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        // alert('Please select a thumbnail file.');
        return;
      }

      try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('youtubeLink', youtubeLink);
        formData.append('thumbnailFile', thumbnailFile);
        console.log(formData.get('title'));
        console.log(formData.get('thumbnailFile'));
        console.log(formData.get('youtubeLink'));

        const response = await axios.post('http://localhost:5004/addvideo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.data.success) {
          Swal.fire({
            title: 'Success!',
            text: 'Video added successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        }

        // Reset form fields after submission
        setTitle('');
        setYoutubeLink('');
        setThumbnailFile(null);
      } catch (error) {
        console.error('Error:', error.response); // Log Axios error response
        alert('Error adding video. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding video. Please try again.');
    }
  } else {
    alert('Invalid YouTube link. Please provide a valid YouTube video link.');
  }
};

  return (
    <div className="card w-75 mt-3">
      <div className="add-video">
        <h2 style={{ fontFamily: 'Roboto', fontSize: '34px' }}>Add Video</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Video Title:</label>
            <input
              type="text"
              value={title}
              placeholder='Enter Your Video Title'
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>YouTube Link:</label>
            <input
              type="url"
              value={youtubeLink}
              placeholder='Enter Valid Video Url'
              onChange={(e) => setYoutubeLink(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Video Thumbnail:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnailFile(e.target.files[0])}
              required
            />
          </div>
          <button className='buttonn' type="submit">Add Video</button>
        </form>
      </div>
    </div>
  );
}

export default AddVideo;
