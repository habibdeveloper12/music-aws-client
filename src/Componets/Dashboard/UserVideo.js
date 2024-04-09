import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlayCircle } from 'react-icons/fa';

const UserVideo = ({ user }) => {
  const [videos, setVideos] = useState([]);
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [videoId, setVideoId] = useState('');
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Fetch all videos from the server when the component mounts
    async function fetchVideos() {
      try {
        const response = await axios.get('http://localhost:5004/api/v1/order/getallvideo');
        console.log(response.data);
        response.data.forEach(video => {
          console.log('Thumbnail File:', video.thumbnailFile);
          // console.log('YouTube Link:', video.youtubeLink);
          // console.log('Created At:', video.createdAt);
          // console.log('ID:', video._id);
        });
        setVideos(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    if (user) {
      const userEmail = user.email;
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:5004/api/v1/user/singleByEmail/${userEmail}`);
          if (response.data.success) {
            setProfile(response.data.user);
            console.log(response.data);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };

      fetchUserProfile();
    }

    fetchVideos();
  }, [user]);


  const toggleVideoPopup = (youtubeLink) => {
    if (typeof youtubeLink === 'string') {
      const videoIdMatch = youtubeLink.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);

      if (videoIdMatch && videoIdMatch.length > 1) {
        const videoId = videoIdMatch[1];
        setVideoId(videoId);
        setShowVideoPopup(!showVideoPopup);
        document.body.style.overflow = showVideoPopup ? 'auto' : 'hidden';
      } else {
        console.error('Invalid YouTube link');
      }
    } else {
      console.error('Invalid YouTube link');
    }
  };

  const handleClosePopupb = () => {
    setShowVideoPopup(false);
  };
  return (
    <div className='col'>
      <h3 className='py-2 mt-3 bg-secondary text-white rounded' style={{ fontFamily: 'Roboto', fontSize: '24px' }}>VIDEO KARAOKE</h3>
      <div className='abum-list-container'>
        <ul className='album-list'>
          {videos.map((video, index) => (
           <li key={index} className='album-item'>
           {video.thumbnailFile && (
             <img src={video.thumbnailFile} className='album-image' alt='Album Thumbnail' />
           )}
              <div className='album-details'>
                <h4 className='album-title' style={{ fontFamily: 'Roboto', fontSize: '24px' }}>
                  {video.title}
                  <span className='play-icon mx-3' onClick={() => toggleVideoPopup(video.youtubeLink)}><FaPlayCircle /></span>
                </h4>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {showVideoPopup && (
        <div className="popup-container">
          <div className="popup">
          <span className="close" onClick={handleClosePopupb}>
                &times;
              </span>
              {videoId && (
                <iframe
                  width="800"
                  height="405"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="Demo Video"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              )}
            
          </div>
        </div>
      )}
    </div>
  );
};

export default UserVideo;
