import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import HeadDashboard from "../../components/HeadDashboard";
import { LiaGreaterThanSolid } from "react-icons/lia";

import mapboxgl from "mapbox-gl";
import "../../Map.css";
import { Button, Modal, Box, TextField } from "@mui/material";
import exifr from "exifr";
import { MenuItem } from "@mui/material";

const Upload = () => {
  const [open, setOpen] = useState(false);
  const [placeName, setPlaceName] = useState("");
  const [coordinates, setCoordinates] = useState(null);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    try {
      const gpsData = await exifr.gps(selectedFile);
      if (!gpsData) {
        alert("No GPS metadata found in the image.");
        return;
      }
      const { latitude, longitude } = gpsData;
      if (latitude !== undefined && longitude !== undefined) {
        setCoordinates([latitude, longitude]);
      } else {
        alert("Latitude or longitude is undefined.");
      }
    } catch (error) {
      console.error("Error extracting GPS data:", error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  mapboxgl.accessToken =
    "pk.eyJ1Ijoia3BraW5nOTAwIiwiYSI6ImNsdXY3b3FtZzAwb2YyanFybXZuZHRoYzQifQ.r95-9HMw8jZMsVNw58f54Q";
  const [navClick, setNavClick] = useState(false);
  const [side, setSide] = useState(false);
  const [geoJson, setGeoJson] = useState();
  const [selectedPlace, setSelectedPlace] = useState("");
  const [selectedArea, setSelectedArea] = useState([85.9169226, 21.502322]);
  const [zommArea, setZoomArea] = useState(8);

  const jsonData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          title: "Keonjhar Town",
        },
        geometry: {
          type: "Point",
          coordinates: [85.5841, 21.6344],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Bhubaneswar",
        },
        geometry: {
          type: "Point",
          coordinates: [85.8986024, 20.306082],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Ghatagaon (Maa Tarini Temple)",
        },
        geometry: {
          type: "Point",
          coordinates: [85.9186, 21.4713],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Barbil",
        },
        geometry: {
          type: "Point",
          coordinates: [85.3799, 22.1181],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Joda",
        },
        geometry: {
          type: "Point",
          coordinates: [85.7819, 21.9477],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Anandapur",
        },
        geometry: {
          type: "Point",
          coordinates: [85.1559, 21.1568],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Banspal",
        },
        geometry: {
          type: "Point",
          coordinates: [85.7692, 21.1596],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Hatadihi",
        },
        geometry: {
          type: "Point",
          coordinates: [85.9755, 21.9746],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Champua",
        },
        geometry: {
          type: "Point",
          coordinates: [85.6366, 22.0835],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Jhumpura",
        },
        geometry: {
          type: "Point",
          coordinates: [85.6844, 22.0653],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Patna",
        },
        geometry: {
          type: "Point",
          coordinates: [85.6162, 21.8659],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Saharpada",
        },
        geometry: {
          type: "Point",
          coordinates: [85.5947, 21.6568],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Ghasipura",
        },
        geometry: {
          type: "Point",
          coordinates: [85.5617, 21.8685],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Telkoi",
        },
        geometry: {
          type: "Point",
          coordinates: [85.9591, 21.0314],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Harichandanpur",
        },
        geometry: {
          type: "Point",
          coordinates: [85.8125, 21.4262],
        },
      },
    ],
  };

  const handleChange = (event) => {
    const selectedCoordinates = event.target.value;
    const parts = selectedCoordinates.split("/");
    const coordinates = parts[0].split(",");
    const latitude = parseFloat(coordinates[0]);
    const longitude = parseFloat(coordinates[1]);
    const zoom = parseInt(parts[2]);
    const area = [latitude, longitude];

    setSelectedArea(area);
    setZoomArea(zoom);

    setSelectedPlace(event.target.value);
  };

  const handleUpload = async () => {
    setGeoJson({
      features: [
        {
          type: "Feature",
          properties: {
            title: placeName,
          },
          geometry: {
            coordinates: [longitude, latitude],
            type: "Point",
          },
        },
      ],
      type: "FeatureCollection",
    });

    setOpen(false);
  };

  const mapContainerRef = useRef(null);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  useEffect(() => {
    if (coordinates) {
      setLongitude(coordinates[1]);
      setLatitude(coordinates[0]);
    }
  }, [coordinates]);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: selectedArea,
      zoom: zommArea,
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
                "icon-size": 1, // Adjust icon size if needed
                "icon-allow-overlap": true, // Allow icons to overlap
                "marker-color": "#ff0000", // Set marker color to red
              },
              paint: {
                "icon-color": "#ff0000", // Change marker color here
              },
            });
          }
        );
      });
    }

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => map.remove();
  }, [longitude, latitude, geoJson, selectedArea]);
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
            <button
              className="sidebarStyle"
              variant="contained"
              onClick={handleOpen}
            >
              Upload Image for Marking
            </button>
            <div className="map-container" ref={mapContainerRef} />
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="image-modal-title"
        aria-describedby="image-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "none",
            boxShadow: 24,
            p: 4,
          }}
        >
          <TextField
            fullWidth
            select
            label="Select a Place"
            value={selectedPlace}
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
            variant="outlined"
            sx={{ mt: 2 }}
          >
            {jsonData.features.map((place) => (
              <MenuItem
                key={place.properties.title}
                value={`${place.geometry.coordinates}/${
                  place.properties.title
                }/${12}`}
              >
                {place.properties.title}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            type="file"
            label="Upload Image"
            InputLabelProps={{ shrink: true }}
            onChange={handleFileChange}
            sx={{ mt: 2, display: "block" }}
          />
          <TextField
            label="Place Name"
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
            sx={{ mt: 2, display: "block", w: 100 }}
          />
          <Button
            style={{ background: "tomato" }}
            onClick={handleUpload}
            variant="contained"
            sx={{ mt: 2 }}
          >
            Upload
          </Button>

          <Button onClick={handleClose} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Upload;
