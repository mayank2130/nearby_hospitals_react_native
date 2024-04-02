import { View, Text, FlatList, Dimensions } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import PlaceItem from "./PlaceItem";
import { SelectMarkerContext } from "../../Context/SelectedMarkerContext";

export default function ListView({ placeList }) {
  const flatListRef = useRef(null);
  const { selectedMarker, setSelectedMarker } = useContext(SelectMarkerContext);

  useEffect(() => {
    if (placeList.length > 0) {
      scrollToIndex(selectedMarker);
    }
  }, [placeList, selectedMarker]);
  
  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ animated: true, index });
  };
  
  if (placeList.length === 0) {
    return <Text>No places found</Text>;
  }
  
  // The rest of your component code
  
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
