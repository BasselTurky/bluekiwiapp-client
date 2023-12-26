import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { z } from "../../../../../utils/scaling";
export default function FavHeader() {
  const userData = useSelector((state) => state.userData.value);
  const favArray = useSelector((state) => state.favArray.value)[userData.email];
  return (
    <View
      style={{
        height: z(40),
        width: z(120),
        backgroundColor: "#fff",
        // zIndex: 4,
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: z(10),
      }}
    >
      <Text
        style={{
          fontSize: z(16),
          color: "#b3b3b3",
          letterSpacing: z(2),
        }}
      >
        {Object.keys(favArray).length} / 100
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
