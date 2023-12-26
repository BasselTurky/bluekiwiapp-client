// import "react-native-gesture-handler";
// import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
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
// import { Card, Button, Image } from "react-native-elements";
// import HeaderBar from "./HeaderBar";

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

export default function GalleryView({
  scrollY,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  onScrollEndDrag,

  container_height,
}) {
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
  ]; // Your data for each card
  useEffect(() => {
    console.log("created");
  }, []);
  return (
    <View
      style={{
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        // paddingTop: insets.top,
      }}
    >
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        data={data}
        keyExtractor={(item, index) => item.id}
        // renderItem={({ item }) => <RenderItem item={item} navigation={navigation} />}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingTop: 100,
          marginTop: 8,
        }}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollEndDrag={onScrollEndDrag}
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        // onScroll={Animated.event(
        //   [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        //   {
      />
      {/* <Animated.View
        style={[
          styles.view,
          { top: 0, transform: [{ translateY: headerTranslate }] },
        ]}
      >
        <HeaderBar />
      </Animated.View> */}
    </View>
  );
}

const styles = StyleSheet.create({});
