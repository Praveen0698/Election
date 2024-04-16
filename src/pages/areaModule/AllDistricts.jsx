import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import HeadDashboard from "../../components/HeadDashboard";
import { LiaGreaterThanSolid } from "react-icons/lia";

import mapboxgl from "mapbox-gl";
import "../../Map.css";

const Alldistricts = () => {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoia3BraW5nOTAwIiwiYSI6ImNsdXY3b3FtZzAwb2YyanFybXZuZHRoYzQifQ.r95-9HMw8jZMsVNw58f54Q";
  const [navClick, setNavClick] = useState(false);
  const [side, setSide] = useState(false);

  const geoJson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [85.5841, 21.6344], // Longitude and latitude of Keonjhar Town
        },
        properties: {
          title: "Keonjhar Town",
          // Add other properties as needed
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Ghatagaon (Maa Tarini Temple)",
          // Add other properties as needed
        },
        geometry: {
          type: "Point",
          coordinates: [85.9186, 21.4713], // Longitude and latitude of Ghatagaon
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Barbil",
          // Add other properties as needed
        },
        geometry: {
          type: "Point",
          coordinates: [85.3799, 22.1181], // Longitude and latitude of Barbil
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Joda",
          // Add other properties as needed
        },
        geometry: {
          type: "Point",
          coordinates: [85.7819, 21.9477], // Longitude and latitude of Joda
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Anandapur",
          // Add other properties as needed
        },
        geometry: {
          type: "Point",
          coordinates: [85.1559, 21.1568], // Longitude and latitude of Anandapur
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Banspal",
          // Add other properties as needed
        },
        geometry: {
          type: "Point",
          coordinates: [85.7692, 21.1596], // Longitude and latitude of Banspal
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Hatadihi",
          // Add other properties as needed
        },
        geometry: {
          type: "Point",
          coordinates: [85.9755, 21.9746], // Longitude and latitude of Hatadihi
        },
      },
      // Additional places
      {
        type: "Feature",
        properties: {
          title: "Champua",
          // Add other properties as needed
        },
        geometry: {
          type: "Point",
          coordinates: [85.6366, 22.0835], // Longitude and latitude of Champua
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Jhumpura",
          // Add other properties as needed
        },
        geometry: {
          type: "Point",
          coordinates: [85.6844, 22.0653], // Longitude and latitude of Jhumpura
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Patna",
          // Add other properties as needed
        },
        geometry: {
          type: "Point",
          coordinates: [85.6162, 21.8659], // Longitude and latitude of Patna
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Saharpada",
          // Add other properties as needed
        },
        geometry: {
          type: "Point",
          coordinates: [85.5947, 21.6568], // Longitude and latitude of Saharpada
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Ghasipura",
          // Add other properties as needed
        },
        geometry: {
          type: "Point",
          coordinates: [85.5617, 21.8685], // Longitude and latitude of Ghasipura
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Telkoi",
          // Add other properties as needed
        },
        geometry: {
          type: "Point",
          coordinates: [85.9591, 21.0314], // Longitude and latitude of Telkoi
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Harichandanpur",
          // Add other properties as needed
        },
        geometry: {
          type: "Point",
          coordinates: [85.8125, 21.4262], // Longitude and latitude of Harichandanpur
        },
      },
    ],
  };

  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [85.9169226, 21.502322],
      zoom: 7.5,
    });

    if (geoJson) {
      map.on("load", function () {
        map.loadImage(
          "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
          function (error, image) {
            if (error) throw error;
            map.addImage("custom-marker", image);

            map.addSource("points", {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: geoJson.features,
              },
            });

            map.addLayer({
              id: "points",
              type: "symbol",
              source: "points",
              layout: {
                "icon-image": "custom-marker",
                "text-field": ["get", "title"],
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-offset": [0, 1.25],
                "text-anchor": "top",
              },
            });
          }
        );
      });
    }

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => map.remove();
  }, []);
  return (
    <div>
      <HeadDashboard
        navClick={navClick}
        setNavClick={setNavClick}
        side={side}
        setSide={setSide}
      />
      <div className="dashboard-page">
        <Sidebar navClick={navClick} side={side} />
        <div className="dashboard">
          <div className="paper-head-div">
            <p style={{ margin: "0" }}>All Districts</p>
            <div>
              <span>Area </span> <LiaGreaterThanSolid />{" "}
              <span style={{ color: "#f26522" }}>All Districts</span>
            </div>
          </div>
          <div
            className="paper-head-div"
            style={{ position: "relative", height: "75vh", overflow: "hidden" }}
          >
            <div className="map-container" ref={mapContainerRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alldistricts;