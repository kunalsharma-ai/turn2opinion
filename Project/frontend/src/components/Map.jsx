"use client";
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useTelemetry } from "@/Context";

const containerStyle = {
  width: "100%",
  height: "500px",
};

// const center = {
//   lat: 22.9734, // Center of India
//   lng: 78.6569,
// };

export default function Map({ setCoordinates }) {
  const [markers, setMarkers] = React.useState([]);
  const [center, setCenter] = React.useState({
    lat: 22.9734, // Center of India
    lng: 78.6569,
    isDefault: true,
  });
  const telemetry = useTelemetry();
  React.useEffect(() => {
    telemetry.gps().then((resp) => {
      setCenter({
        lat: resp.latitude,
        lng: resp.longitude,
      });

      setMarkers([
        {
          lat: resp.latitude,
          lng: resp.longitude,
          label: "my Current Location",
        },
      ]);
    });
  }, [telemetry]);

  React.useEffect(() => {
    if (markers.length > 0) {
      if (center.isDefault)
        setCenter({
          lat: markers[0].lat,
          lng: markers[0].lng,
        });
      setCoordinates({
        lat: markers[0].lat,
        lng: markers[0].lng,
      });
    }
  }, [markers]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCNbWx_rMz7HI8YFR0cXI-cRUZ0yBfi_3E">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={markers.length > 0 ? 16 : 4}
        onClick={(e) => {
          setMarkers([
            {
              label: "selectedLocation",
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            },
          ]);
        }}
      >
        {markers.map((point, index) => (
          <Marker key={index} position={point} title={point.label} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
