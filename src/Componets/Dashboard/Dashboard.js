import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link, Outlet, useParams } from "react-router-dom";
import Navbar from "../Home/Navbar";
import { GiHamburgerMenu } from "react-icons/gi";
import Loading from "../Home/Loading/Loading";

const userRole = {
  user: "user",
  admin: "admin",
};

const Dashboard = () => {
  const [role, setRole] = useState(userRole.user);
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    if (user) {
      
      const userEmail = user.email;
      const fetchUser= async () => {
        try {
          const response = await axios.get(`http://localhost:5004/api/v1/user/singleByEmail/${userEmail}`);
          if (response.data.success) {
            setRole(response.data.user.role);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [user]);

  if (loading) return <Loading />;

  return (
    <div className="mt-5 pt-5 bglight h-100">
      <div className="d-flex" id="wrapper">
        {/* Sidebar */}
        <div className="bg-white" id="sidebar-wrapper">
          <Navbar />

          <div className="list-group list-group-flush my-3">
            {role === userRole.user && (
              <>

                <Link
                  to="reinvest"
                  className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i className="fas  fa-project-diagram me-2"></i><button className="btn btn-outlate">MY Subscription</button>
    
                </Link>
                <Link
                  to="usermusic"
                  className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i className="fas  fa-project-diagram me-2"></i><button className="btn btn-outlate">All Premium Music</button>
    
                </Link>
                <Link
                  to="uservideo"
                  className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i className="fas  fa-project-diagram me-2"></i><button className="btn btn-outlate">All Premium Video</button>
    
                </Link>
                <Link
                  to="myProfile "
                  className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i className="fas  fa-project-diagram me-2"></i><button className="btn btn-outlate">My Profile</button>
    
                </Link>
              </>
            )}

            {role === userRole.admin && (
              <>
                <Link
                  to="addmusic"
                  className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i className="fas fa-shopping-cart me-2"></i>Add Music
                </Link>
                <Link
                  to="addvideo"
                  className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i className="fas fa-shopping-cart me-2"></i>Add Video
                </Link>
                
                <Link
                  to=""
                  className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i className="fas fa-shopping-cart me-2"></i>All Payment List
                </Link>
                <Link
                  to=""
                  className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i className="fas fa-shopping-cart me-2"></i>All Subscription User
                </Link>
                <Link
                  to="myProfile"
                  class="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i class="fas fa-chart-line me-2"></i>My Profile
                </Link>
              </>
            )}

            <span
              href="#"
              className="list-group-item list-group-item-action bg-transparent text-danger fw-bold"
            >
              <i className="fas fa-power-off me-2"></i>Logout
            </span>
          </div>
        </div>
        <div id="page-content-wrapper">
          <div className="container-fluid px-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
