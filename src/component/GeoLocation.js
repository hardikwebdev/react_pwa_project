import React from "react";
import { useGeolocated } from "react-geolocated";

const GeoLocation = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  return !isGeolocationAvailable ? (
    <div>Your browser does not support Geolocation</div>
  ) : !isGeolocationEnabled ? (
    <div>Geolocation is not enabled</div>
  ) : coords ? (
    <div className="container">
      <div className="geo_location">
        <div className="mt-5">
            <p>latitude :{coords.latitude}</p>
            <p>longitude :{coords.longitude}</p>
        </div>

        <div className="">
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d58752.11727123058!2d${coords.longitude}!3d${coords.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1712123544660&center=${coords.latitude},${coords.longitude}`}
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  ) : (
    <div>Getting the location data&hellip; </div>
  );
};

export default GeoLocation;


