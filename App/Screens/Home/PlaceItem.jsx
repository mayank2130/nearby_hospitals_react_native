import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import GlobalApi from "../../Utils/GlobalApi";

export default function PlaceItem({ place }) {
  const PLACE_PHOTO_BASE_URL = "https://places.googleapis.com/v1/";

  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        margin: 5,
        borderRadius: 10,
        width: Dimensions.get("screen").width * 0.9,
      }}
    >
      <Image
        source={
          place?.photo
            ? {
                uri:
                  PLACE_PHOTO_BASE_URL +
                  place.photos[0]?.name +
                  "/media?.png=" +
                  GlobalApi.API_KEY +
                  "&maxHeightPx=800&maxWidthPx=1200",
              }
            : require("../../../assets/hospital.png")
        }
        style={{ width: "100%", borderRadius: 10, height: 160 }}
      />
      <View style={{ padding: 15 }}>
        <Text style={{ fontSize: 18 }}>{place.displayName?.text}</Text>
        <Text>{place?.shortFormattedAddress?.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
