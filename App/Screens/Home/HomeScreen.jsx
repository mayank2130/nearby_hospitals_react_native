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
  const [selectedMarker, setSelectedMarker] = useState([]);
  const [placeList, setPlaceList] = useState([]);

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

    GlobalApi.NewNearByPlace(data)
      .then((response) => {
        console.log("Axios Response:", response);
        setPlaceList(response?.places);
      })
      .catch((error) => {
        console.error("Error fetching nearby places:", error);
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
          {placeList && <AppMapView placeList={placeList} />}
          <View style={styles.listContainer}>
            {placeList && <ListView placeList={placeList} />}
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
    top: 520,
  },
});
