import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  DrawerLayoutAndroid,
  FlatList,
  Animated,
  Button,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { z } from "../../../../utils/scaling";
import { setActive } from "../../../../Features/active";

const renderItem = ({ item }) => (
  // <Card containerStyle={{ flex: 1, height: 400 }}>
  <View style={{ flex: 1, height: 400 }}>
    <View
      style={{ height: "75%", width: "100%", backgroundColor: item.color }}
    ></View>
    <Button
      title="Download"
      onPress={() => {
        console.log("download: ", item.id);
      }}
    />
    <Button
      title="Add to Favorites"
      onPress={() => {
        console.log("add to fav: ", item.id);
      }}
    />
  </View>
);

export default function GalleryContainer({
  container_height,
  scrollY,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  onScrollEndDrag,
  active,
}) {
  const dispatch = useDispatch();

  const data = [
    { id: 1, color: "pink" },
    { id: 2, color: "yellow" },
    { id: 3, color: "green" },
    { id: 4, color: "grey" },
    { id: 5, color: "red" },
    { id: 12, color: "pink" },
    { id: 22, color: "yellow" },
    { id: 32, color: "green" },
    { id: 42, color: "grey" },
    { id: 52, color: "red" },
  ];
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {active === "gallery" ? (
        <Animated.FlatList
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          data={data}
          keyExtractor={(item, index) => item.title + index.toString()}
          // renderItem={({ item }) => <RenderItem item={item} navigation={navigation} />}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingTop: container_height,
            marginTop: 8,
          }}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          scrollEventThrottle={1}
        />
      ) : (
        <Animated.FlatList
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          data={data}
          keyExtractor={(item, index) => item.title + index.toString()}
          // renderItem={({ item }) => <RenderItem item={item} navigation={navigation} />}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingTop: container_height,
            marginTop: 8,
          }}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          scrollEventThrottle={1}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: z(16),
  },
});
