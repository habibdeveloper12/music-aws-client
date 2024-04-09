import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import axios from "axios";

const useMusicAccess = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [signedIn, setSignedIn] = useState(true); // New state for signed-in status
  const [user] = useAuthState(auth);
  console.log(user?.email);
  useEffect(() => {
    const checkMusicAccess = async () => {
      try {
        // Fetch music access status from the backend
    if (user) {
        const response = await axios(
          `http://localhost:5004/api/v1/order/music?email=${user?.email}`
        );
        console.log(response);
        if (response.data) {
          // Music access granted
          setHasAccess(true);
        } else {
          // Music access denied
          setError("Error checking music access");
        }  
    }else{
      setLoading(true)
    }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      setSignedIn(true);
    }

    checkMusicAccess();
  }, [user]);

  return { loading, error, hasAccess, signedIn };
};

export default useMusicAccess;
