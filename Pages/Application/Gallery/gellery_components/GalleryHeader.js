import {
  StyleSheet,
  Text,
  View,
  Animated,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../../../../Features/active";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "../../../../utils/scaling";
export default function GalleryHeader({
  container_height,
  headerTranslate,
  opacity,
}) {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  //   const active = useSelector((state) => state.active.value);
  return (
    <Animated.View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        height: container_height,
        top: 0,
        transform: [{ translateY: headerTranslate }],
        opacity: opacity,
      }}
    >
      <View
        style={{
          height: 100,
          // elevation: 8,
          width: "100%",
          backgroundColor: "#f54",
          paddingTop: insets.top,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => {
            dispatch(setActive("gallery"));
          }}
        >
          <Text>Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => {
            dispatch(setActive("favorite"));
          }}
        >
          <Text>Favorite</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: z(16),
  },
});
