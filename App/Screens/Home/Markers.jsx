import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Marker } from "react-native-maps";
import { SelectMarkerContext } from "../../Context/SelectedMarkerContext";

const Markers = ({ place, index }) => {
    const [selectedMarker, setSelectedMarker] = useContext(SelectMarkerContext);

  return (
    place && (
      <Marker
        coordinate={{
          latitude: place.location?.latitude,
          longitude: place.location?.longitude,
        }}
        title="Marker Title"
        description="Marker Description"
        onPress={() => setSelectedMarker(index)}
      ></Marker>
    )
  );
};

export default Markers;

const styles = StyleSheet.create({});
