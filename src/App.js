import { React, useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData } from "./api/index";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [childClicked, setChildClicked] = useState(null);
  const [places, setPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState({
    lat: 43.8269,
    lng: -79.22033,
  });

  const [bounds, setBounds] = useState({});
  console.log({ childClicked });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCoordinates({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);

      getPlacesData(bounds.ne, bounds.sw).then((data) => {
        setPlaces(data);
        setIsLoading(false);
      });
    }

    console.log(places);
  }, [coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={places}
            childClicked={childClicked}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
