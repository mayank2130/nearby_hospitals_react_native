import { View, Text, StyleSheet, StatusBar } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppMapView from "./AppMapView";
import Header from "./Header";
import { UserLocationContext } from "../../Context/UserLocationContext";
import GlobalApi from "../../Utils/GlobalApi";
import ListView from "./ListView";
import { SelectMarkerContext } from "../../Context/SelectedMarkerContext";

export default function HomeScreen() {
  const { location, setLocation } = useContext(UserLocationContext);
  const [list, setList] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState([]);

  useEffect(() => {
    location && getNearByPlace();
  }, [location]);

  const getNearByPlace = () => {
    const data = {
      includedTypes: ["hospital"],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: location?.latitude,
            longitude: location?.longitude,
          },
          radius: 5000.0,
        },
      },
    };

    GlobalApi.NewNearByPlace(data).then((response) => {
      console.log(response.data);
      setList(response.data?.places);
    });
  };
  return (
    <>
      <SelectMarkerContext.Provider
        value={{ selectedMarker, setSelectedMarker }}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Header
              searchedLocation={(location) =>
                setLocation({
                  latitude: location.lat,
                  longitude: location.lng,
                })
              }
            />
          </View>
          {/*  list will be empty cause of google api key not yet available  */}
          {list && <AppMapView list={list} />}
          <View style={styles.listContainer}>
            {/*  list will be empty cause of google api key not yet available  */}
            {list && <ListView list={list} />}
          </View>
        </View>
      </SelectMarkerContext.Provider>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    zIndex: 10,
    padding: 10,
    width: "100%",
    paddingHorizontal: 20,
  },
  container: {
    marginTop: 20,
  },
  listContainer: {
    position: "absolute",
    bottom: 0,
  },
});
