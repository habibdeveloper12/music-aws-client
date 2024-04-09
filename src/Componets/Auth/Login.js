import React, { useState } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import Loading from "../Home/Loading/Loading";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user] = useAuthState(auth);
  const [signInWithEmailAndPassword, user2, loading2, error2] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, usergoogle, gloading, error] =
    useSignInWithGoogle(auth);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      // const response = await axios.post('http://localhost:5001/login', {
      //   email,
      //   password,
      // });
      // console.log(response.data);
      signInWithEmailAndPassword(email, password);
    } catch (error) {
      toast.error(error.message);
      console.error("Login failed", error);
    }
  };
  if (loading2) {
    return <Loading />;
  }
  if (error2) {
    console.log(error2);
    toast.error("Login failed", {
      // position: toast.POSITION.TOP_CENTER,
    });
  }
  if (user) {
    toast.success('Successfully logged!', {
      // position: toast.POSITION.TOP_CENTER,
    });
    navigate("/");
  }
  return (
 <div className="navcolorr">
     <div className="form-container algin-center form-container-mobile pt-5 mt-5">
      <h2 style={{ fontFamily: 'Roboto', fontSize: '44px' }}>Enter login data</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group form-group-mobile">
          <label >Enter Email or Username:</label>
          <input
            type="email"
            className="form-input"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label><span className="texta">Password:</span></label>
          <input
            type="password"
            placeholder="Password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btnprimary btnn mt-3">
          Sign In
        </button>
        <div className="form-options">
          <p>
            <input type="checkbox" /> Remember me
          </p>
          <p
            className="reset-password"
            onClick={() => sendPasswordResetEmail(email)}
          >
            Reset Password?
          </p>
        </div>
      </form>
      <div className="social-login">
      </div>
      <p className="signup-link">Don't have an account?<a href="/register">Sign up</a> </p>
    </div>
 </div>
  );
};

export default LoginForm;