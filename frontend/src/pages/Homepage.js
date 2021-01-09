import React, { useEffect, useState } from "react";
import axios from "axios";
import MapGl from "../components/MapGl";

const Homepage = () => {
  const url = `/api/artists`;
  let [artists, setArtists] = useState([]);

  useEffect(() => {
    let fetchData = async () => {
      let res = await axios.get(url);
      setArtists(res.data);
    };

    fetchData();
  }, [url]);

  return (
    <div>
      <MapGl artists={artists} />
    </div>
  );
};

export default Homepage;
