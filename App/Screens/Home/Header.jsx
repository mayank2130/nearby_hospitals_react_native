import { View, Text } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function Header({ searchedLocation }) {
  return (
    <View>
      <GooglePlacesAutocomplete
        placeholder="Search"
        enablePoweredByContainer={false}
        fetchDetails={true}
        onPress={(data, details = null) => {
          searchedLocation(details?.geometry?.location);
        }}
        query={{
          key: "AIzaSyBVKa4xAyXkD0s96quLqKEehfk5-HEs7O0",
          language: "en",
        }}
      />
    </View>
  );
}
