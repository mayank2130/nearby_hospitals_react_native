import { View, Text, FlatList, Dimensions } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import PlaceItem from "./PlaceItem";
import { SelectMarkerContext } from "../../Context/SelectedMarkerContext";

export default function ListView({ placeList }) {
  const flatListRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useContext(SelectMarkerContext);

  if (placeList.length === 0) {
    return <Text>No places found</Text>;
  }

  useEffect(() => {
    selectedMarker && scrollToIndex(selectedMarker);
  }, [selectedMarker]);

  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ animated: true, index });
  };

  const getItemLayout = (_, index) => ({
    length: Dimensions.get("window").width,
    offset: Dimensions.get("window").width * index,
    index,
  });

  return (
    <View>
      <FlatList
        data={placeList}
        ref={flatListRef}
        getItemLayout={getItemLayout}
        pagingEnabled
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index}>
            <PlaceItem place={item} />
          </View>
        )}
      />
    </View>
  );
}
