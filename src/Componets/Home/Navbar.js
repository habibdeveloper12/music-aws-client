import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleSearch = () => {
    // Implement your search logic here based on the searchQuery
    console.log(`Performing search for: ${searchQuery}`);
    
    // Navigate to the details page with the tracking number
    navigate(`/details/${searchQuery}`);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Redirect to the homepage after signing out
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
<div className="">
<nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top py-2">
      <div className="container navcolor">
        {/* Logo */}
        <div className="navbar-brand">
          <Link to="/">
            <img src="../logo.png" alt="Logo" style={{ width: "120%", height: "auto" }} />
          </Link>
        </div>
        
        {/* Navbar toggle button */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Collapsible navbar links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Search bar */}
          <form className="d-flex ms-auto my-2 my-lg-0">
            <input
              className="form-control mr-sm-2 w-100"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={handleSearch}>Search</button>
          </form>
          
          {/* Navbar links */}
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-semibold" to="/dashboard"><button className="btn text-white">Dashboard</button></Link>
                </li>
                <li className="nav-item" onClick={handleSignOut}>
                  <Link className="nav-link"><span className="fw-semibold"> <button className="btn text-white">Sign Out</button></span></Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="SubscribePage"><button className="btn text-white">Subscribe</button></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="login"><button className="btn text-white">Log in</button></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="register"><button className="btn text-white">Register</button></Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
</div>
  );
};

export default Navbar;
