import React, { useState } from "react";
import Mapbox, { NavigationControl, Marker } from "react-map-gl";
import { Link } from "react-router-dom";

let colors = [
  "7CFEF0",
  "6BFFB8",
  "2A6041",
  "2CEAA3",
  "783F8E",
  "61E786",
  "F6AE2D",
];

function MapGl({ artists }) {
  let [selectedArtist, setArtist] = useState(null);
  let [selectedNode, setNode] = useState(null);
  let [color, setColor] = useState(null);

  const [viewport, setViewport] = useState({
    longitude: 5,
    latitude: 34,
    zoom: 2,
  });

  let handleClick = (e, artist) => {
    e.preventDefault();
    setArtist(artist);
    let info = document.querySelector(".info");
    info.classList.add("info-show");
  };

  let handleAudioClick = (e) => {
    e.preventDefault();
    console.log(selectedNode);
    console.log("click on audio");
    let box = document.querySelector(".marker");
    box.style.animation = "glow 1s infinite";
  };

  let removeAnimation = () => {
    let box = document.querySelector(".marker");
    box.style.animation = "none";
  };

  return (
    <div>
      <Mapbox
        width="100vw"
        height="100vh"
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle={`mapbox://styles/poghosyan/ckjivhi6m01bt1alj1komk2c0?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`}
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            margin: "3rem 2rem",
          }}
        >
          <NavigationControl />
        </div>
        {artists.map((artist) => {
          let { longitude, latitude } = artist.location;
          //getImage(url, avatar);
          let random = Math.floor(Math.random() * colors.length);
          let randomColor = colors[random];

          return (
            <Marker
              className={`marker color-${randomColor}`}
              latitude={latitude}
              longitude={longitude}
            >
              <div
                className="child-marker"
                style={{
                  backgroundImage: `url(${artist.avatar})`,
                }}
                onClick={(e) => {
                  handleClick(e, artist);
                  setColor(randomColor);
                }}
              ></div>
            </Marker>
          );
        })}
      </Mapbox>

      <div className="info">
        {selectedArtist && (
          // <Popup
          //   className="box"
          //   latitude={selectedArtist.location.latitude}
          //   longitude={selectedArtist.location.longitude}
          //   onClose={() => {
          //     setArtist(null);
          //     removeAnimation();
          //   }}
          // >    {/* </Popup> */}
          //
          <div className="info-wrapper">
            <i
              className="fa fa-times-circle"
              onClick={(e) => {
                let info = document.querySelector(".info");
                info.classList.remove("info-show");
                setArtist(null);
              }}
            ></i>

            <div
              className="image-container"
              style={{ backgroundImage: `url(${selectedArtist.avatar})` }}
            ></div>

            <div className="details">
              <h4>{selectedArtist.name}</h4>

              <div className="audio-container">
                {" "}
                <p>{selectedArtist.music[0].name}</p>
                <audio controls="true">
                  <source src={selectedArtist.music[0].url} type="audio/mpeg" />
                </audio>
              </div>

              <div className="popup-extra">
                <Link to={`/artist/${selectedArtist.id}`}>
                  Visit Artists Page
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MapGl;
