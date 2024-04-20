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
        },
        geometry: {
          type: "Point",
          coordinates: [85.377147, 22.113337],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Joda",
        },
        geometry: {
          type: "Point",
          coordinates: [85.4432931, 22.0182552],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Anandapur",
        },
        geometry: {
          type: "Point",
          coordinates: [86.1231992, 21.2193378],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Banspal",
        },
        geometry: {
          type: "Point",
          coordinates: [85.3740698, 21.3941515],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Hatadihi",
        },
        geometry: {
          type: "Point",
          coordinates: [86.2653805, 21.2206495],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Champua",
        },
        geometry: {
          type: "Point",
          coordinates: [85.6644773, 22.0651779],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Jhumpura",
        },
        geometry: {
          type: "Point",
          coordinates: [85.5706536, 21.8285855],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Patna",
        },
        geometry: {
          type: "Point",
          coordinates: [85.5367878, 21.7516017],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Saharpada",
        },
        geometry: {
          type: "Point",
          coordinates: [85.9457757, 21.7378716],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Ghasipura",
        },
        geometry: {
          type: "Point",
          coordinates: [86.1134576, 21.2121442],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Telkoi",
        },
        geometry: {
          type: "Point",
          coordinates: [85.3938317, 21.3576152],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Harichandanpur",
        },
        geometry: {
          type: "Point",
          coordinates: [85.7917535, 21.3401886],
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
