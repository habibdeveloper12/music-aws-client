import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlayCircle } from 'react-icons/fa';

const UserMusic = ({ user }) => {
  const [videos, setVideos] = useState([]);
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [mp3Albums, setmp3Albums] = useState('');
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Fetch all videos from the server when the component mounts
    async function fetchMusic() {
      try {
        const response = await axios.get('http://localhost:5004/api/v1/order/getallmusic');
        console.log(response.data);
        response.data.forEach(mp3Albums => {
          console.log('Thumbnail File:', mp3Albums.thumbnailFile);
        });
        mp3Albums(response.data);
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

    fetchMusic();
  }, [user]);


  const handleClosePopupb = () => {
    setShowVideoPopup(false);
  };
  return (
    <div className='col-lg-6 col-12 card'>
      <h3 className='py-2 bg-secondary text-white rounded' style={{ fontFamily: 'Roboto', fontSize: '24px' }}>MP3 KARAOKE</h3>
      <p className='fw-bold'>Most Recent</p>
      <div className='album-list-container'>
        
        <ul className='album-list'>
          {mp3Albums.map((album, index) => (
            <li key={index} className='album-item'>
              <img src={album.imageUrl} alt={album.title} className='album-image' />
              <div className='album-details'>
                <h4 className='album-title' style={{ fontFamily: 'Roboto', fontSize: '24px' }}>{album.title} <span className='ms-5 ps-5 fw-bold shadow-lg'></span></h4>
               
              </div>
             
            </li>
            
          ))}
        </ul>
       
      </div>
    </div>
  );
};

export default UserMusic;
