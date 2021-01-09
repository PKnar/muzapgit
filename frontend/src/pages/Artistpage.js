import React, { useEffect, useState } from "react";
import axios from "axios";

const Artistpage = ({ match }) => {
  console.log(match);
  let [artist, setArtist] = useState({});

  useEffect(() => {
    let getArtist = async () => {
      let res = await axios.get(`/api/artists/${match.params.id}`);
      console.log(res);
      setArtist(res.data);
    };
    getArtist();
  }, [match.params.id]);
  console.log(artist);

  return (
    <div className="artistPage">
      <div
        className="artist-page-cover"
        style={{ backgroundImage: `url(${artist.avatar})` }}
      ></div>
      <div className="artist-page-details"></div>
    </div>
  );
};

export default Artistpage;
