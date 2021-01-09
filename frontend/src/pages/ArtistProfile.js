import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/profile.css";

function ArtistProfile({ match }) {
  let user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="profile">
      <div className="profile-image">
        <img src={user.avatar} alt="user avatar" />
      </div>
      <Link to="/chatRegister">Chat with me </Link>
    </div>
  );
}

export default ArtistProfile;
