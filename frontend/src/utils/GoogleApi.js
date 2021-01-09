import React, { useEffect } from "react";
import Geocode from "react-geocode";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyDgHeaAfJKGfm2Dd6ZeCEp4vesrtLGU0gQ");

function GoogleApi() {
  // set response language. Defaults to english.

  useEffect(() => {
    Geocode.setLanguage("en");
    // Enable or disable logs. Its optional.
    Geocode.enableDebug();

    // Get address from latitude & longitude.
    Geocode.fromLatLng("48.8583701", "2.2922926").then(
      (response) => {
        const address = response.results[0].formatted_address;
        console.log(address);
      },
      (error) => {
        console.error(error);
      }
    );

    // Get latitude & longitude from address.
    Geocode.fromAddress("Eiffel Tower").then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
      },
      (error) => {
        console.error(error);
      }
    );
  });

  return <butto>CHECK</butto>;
}

export default GoogleApi;
