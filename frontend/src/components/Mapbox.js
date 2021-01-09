// import React, { useRef, useEffect, useState } from "react";
// import ReactDOM from "react-dom";
// import mapboxgl from "mapbox-gl";
// import { MAPBOX_TOKEN } from "../config/config.json";
// import Marker from "../components/Marker";
// mapboxgl.accessToken = MAPBOX_TOKEN;
// let map;
// class Mapbox extends React.Component {
//   constructor(props) {
//     super(props);
//     this.props = props;
//     this.state = {
//       lng: 5,
//       lat: 34,
//       zoom: 2,
//       loading: true,
//     };
//   }

//   componentDidMount() {
//     map = new mapboxgl.Map({
//       container: this.mapContainer,
//       style: "mapbox://styles/poghosyan/ckjivhi6m01bt1alj1komk2c0", // stylesheet location
//       center: [this.state.lng, this.state.lat],
//       zoom: this.state.zoom,
//       attributionControl: false,
//     });

//     map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

//     map.on("move", () => {
//       this.setState({
//         lng: map.getCenter().lng.toFixed(4),
//         lat: map.getCenter().lat.toFixed(4),
//         zoom: map.getZoom().toFixed(2),
//       });
//     });
//   }

//   // generateMarkers(map, artists) {
//   //   artists.features.map((artist) => {
//   //     let coordinates = artist.geometry.coordinates;

//   //     //let colors = marker.data.genre.map(genre => genre === "rock" ? "red" : genre === 'r&b' ? "blue" : genre === 'rap' ? "green" : "yellow")
//   //     var el = document.createElement("div");
//   //     el.className = "marker";

//   //     // el.style.background =
//   //     //   colors.length > 1
//   //     //     ? `linear-gradient(to right,${colors.join(",")})`
//   //     //     : `${colors[0]}`;

//   //     let childDiv = document.createElement("div");
//   //     childDiv.className = "child-marker";
//   //     childDiv.style.backgroundImage = `url(${artist.data.avatar})`;

//   //     el.appendChild(childDiv);

//   //     new mapboxgl.Marker(el).setLngLat(coordinates).addTo(map);
//   //   });
//   // }

//   render() {
//     // const { artists } = this.props;
//     // if (artists) {
//     //   this.generateMarkers(map, artists);
//     // } else {
//     //   return;
//     // }

//     return (
//       <div>
//         <div className="sidebarStyle">
//           <div>
//             Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{" "}
//             {this.state.zoom}
//           </div>
//         </div>
//         <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
//       </div>
//     );
//   }
// }

// export default Mapbox;
