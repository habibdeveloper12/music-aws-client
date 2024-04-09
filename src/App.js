import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Componets/Home/Home";
import Login from "./Componets/Auth/Login";
import Register from "./Componets/Auth/Register";
import Navbar from "./Componets/Home/Navbar";
import SubscribePage from "./Componets/Home/Subscribe";
import RequireAuth from "./Componets/Home/hooks/RequireAuth";
import Dashboard from "./Componets/Dashboard/Dashboard";
import MyProfile from "./Componets/Dashboard/MyProfile";
import AddMusic from "./Componets/Dashboard/AddMusic";
import AddVideo from "./Componets/Dashboard/AddVideo";
import UserVideo from "./Componets/Dashboard/UserVideo";
import UserMusic from "./Componets/Dashboard/UserMusic";
import Music from "./Componets/Music";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/SubscribePage" element={<SubscribePage />}></Route>
          <Route path="/music/:id" element={<Music />}></Route>

          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          >
            <Route path="/dashboard/myProfile" element={<MyProfile />} />
            <Route path="/dashboard/addmusic" element={<AddMusic />} />
            <Route path="/dashboard/addvideo" element={<AddVideo />} />
            <Route path="/dashboard/uservideo" element={<UserVideo />} />
            <Route path="/dashboard/usermusic" element={<UserMusic />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
