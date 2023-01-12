import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

export default function WallpaperCard({ item }) {
  return (
    <View
      style={{
        backgroundColor: "black",
        height: "100%",
        width: "100%",
        borderRadius: 30,
        overflow: "hidden",
      }}
    >
      <Image
        style={{
          width: "100%",
          height: "100%",
          // borderRadius: 20,
        }}
        resizeMode="contain"
        source={{
          uri: item.img_link,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
