import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useMusicAccess from "../Home/hooks/useMusicAccess";
import Loading from "../Home/Loading/Loading";

const Music = () => {
  const { id } = useParams();
  const [musicData, setMusicData] = useState(null);
  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5004/api/v1/order/music/${id}/`
        );
        const data = await response.json();
        setMusicData(data);
      } catch (error) {
        console.error("Error fetching music data:", error);
      }
    };

    fetchMusicData();
  }, [id]);

  const { loading, error, hasAccess, signedIn } = useMusicAccess();
  const navigate = useNavigate();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!signedIn) {
    navigate("/login");
    return null;
  }

  if (!hasAccess) {
    navigate("/SubscribePage");
    return null;
  }

  return (
    <div>
      <h2>Music Details</h2>
      {musicData ? (
        <div>
          <h3>{musicData.title}</h3>
          <p>Artist: {musicData.artist}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Music;
