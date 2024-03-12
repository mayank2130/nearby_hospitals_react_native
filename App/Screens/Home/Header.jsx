import { View, Text } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import GlobalApi from "../../Utils/GlobalApi";

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
          key: GlobalApi.API_KEY,
          language: "en",
        }}
      />
    </View>
  );
}
