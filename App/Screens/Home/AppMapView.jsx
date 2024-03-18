import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useContext } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { UserLocationContext } from "../../Context/UserLocationContext";
import Markers from "./Markers";

export default function AppMapView({ placeList }) {
  const { location, setLocation } = useContext(UserLocationContext);

  return (
    location?.latitude && (
      <View style={styles.container}>
        <MapView
          style={{ width: 900, height: 1000 }}
          region={{
            latitude: location?.latitude,
            longitude: location?.longitude,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0421,
          }}
        >
          {location ? (
            <Marker
              coordinate={{
                latitude: location?.latitude,
                longitude: location?.longitude,
              }}
              title="Marker Title"
              description="Marker Description"
            ></Marker>
          ) : null}

          <FlatList
            data={placeList}
            renderItem={({ item }) => <Markers place={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </MapView>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
