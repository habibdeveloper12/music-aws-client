import { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import RequireAuth from "./hooks/RequireAuth";
import RequireAuths from "./hooks/RequireAuths";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [mp3Albums, setMp3Albums] = useState([]);
  const [videoId, setVideoId] = useState("");
  const [user] = useAuthState(auth);
  const [profile, setProfile] = useState({});
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [videos, setVideos] = useState([]);
  const [userStatus, setUserStatus] = useState("free");

  useEffect(() => {
    // Fetch all videos from the server when the component mounts
    async function fetchVideos() {
      try {
        const response = await axios.get(
          "http://localhost:5004/api/v1/order/getallvideo"
        );
        console.log(response.data);
        setVideos(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    async function fetchAudio() {
      try {
        const response = await axios.get(
          "http://localhost:5004/api/v1/order/getallaudio"
        );
        console.log(response.data);
        setMp3Albums(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (user) {
      const userEmail = user.email;
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5004/api/v1/user/singleByEmail/${userEmail}`
          );
          if (response.data.success) {
            setProfile(response.data.user);
            console.log(response.data);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
        }
      };

      fetchUserProfile();
    }
    fetchAudio();
    fetchVideos();
  }, [user]);
  const navigate = useNavigate();
  console.log(mp3Albums);
  const handlePlayVideo = (youtubeLink) => {
    if (profile.status === "pendingg") {
      toggleVideoPopup(youtubeLink);
    } else {
      window.location.href = "/SubscribePage";
    }
  };
  const handleSubsVideo = () => {
    window.location.href = "/SubscribePage";
  };

  const toggleVideoPopup = (youtubeLink) => {
    if (typeof youtubeLink === "string") {
      const videoIdMatch = youtubeLink.match(
        /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
      );

      if (videoIdMatch && videoIdMatch.length > 1) {
        const videoId = videoIdMatch[1];
        console.log(videoId);
        setVideoId(videoId);
        setShowVideoPopup(!showVideoPopup);
        document.body.style.overflow = showVideoPopup ? "auto" : "hidden";
      } else {
        console.error("Invalid YouTube link");
      }
    } else {
      console.error("Invalid YouTube link");
    }
  };
  const handleClosePopupb = () => {
    setShowVideoPopup(false);
  };

  return (
    <>
      <div className="home-page ">
        <div className="container  mt-5 pt-5">
          <div className="row shadow-lg bg-body rounded border border-success  ">
            <div className="col-lg-6 col-12 card">
              <h3
                className="py-2 bg-secondary text-white rounded"
                style={{ fontFamily: "Roboto", fontSize: "24px" }}
              >
                MP3 KARAOKE
              </h3>
              <p className="fw-bold">Most Recent</p>
              <div className="album-list-container">
                <ul className="album-list">
                  {mp3Albums?.map((album, index) => (
                    <li
                      key={index}
                      className="album-item"
                      onClick={() => navigate(`/music/${album._id}`)}
                    >
                      <img
                        src={album.imageUrl}
                        alt={album.title}
                        className="album-image"
                      />
                      <div className="album-details">
                        <h4
                          className="album-title"
                          style={{ fontFamily: "Roboto", fontSize: "24px" }}
                        >
                          {album.title}{" "}
                          <span className="ms-5 ps-5 fw-bold shadow-lg">
                            <MdOutlineShoppingCartCheckout className="buy-icon" />
                          </span>
                        </h4>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col card">
              <h3
                className="py-2 bg-secondary text-white rounded"
                style={{ fontFamily: "Roboto", fontSize: "24px" }}
              >
                VIDEO KARAOKE
              </h3>
              <p className="fw-bold">Most Recent</p>

              <div className="album-list-container">
                <ul className="album-list">
                  {videos.map((video, index) => (
                    <li key={index} className="album-item">
                      <img src={video.thumbnailFile} className="album-image" />
                      <div className="album-details">
                        <h4
                          className="album-title"
                          style={{ fontFamily: "Roboto", fontSize: "24px" }}
                        >
                          {video.title.substring(0, 27)}

                          <span
                            className="play-icon mx-3"
                            onClick={() => handlePlayVideo(video.youtubeLink)}
                          >
                            <FaPlayCircle />
                          </span>
                          <span
                            className="ms-5 ps-5 fw-bold shadow-lg"
                            onClick={handleSubsVideo}
                          >
                            <MdOutlineShoppingCartCheckout className="buy-icon" />
                          </span>
                        </h4>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showVideoPopup && (
        <div className="popup-container">
          <div className="popup">
            <span className="close" onClick={handleClosePopupb}>
              &times;
            </span>

            <RequireAuth>
              {videoId && (
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="Demo Video"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              )}
            </RequireAuth>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
