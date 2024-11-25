//<uses-permission android:name="com.google.android.gms.permission.AD_ID"/>
import "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import HomeView from "./HomeView";

export default React.memo(function Home({ navigation }) {
  console.log("Home");
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <HomeView navigation={navigation} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileIcon: {
    borderRadius: 50,
    elevation: 5,
  },
  score: {
    width: 80,
    height: 30,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderWidth: 2,
    borderColor: "#36485f",

    borderRadius: 10,

    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 10,
  },
  scoreText: {
    fontFamily: "Righteous_400Regular",
    fontSize: 16,
    color: "#36485f",
  },

  kiwiCoin: {},
  plusIcon: {},
  watchButton: {
    marginTop: 10,
    flexDirection: "row",
    width: 160,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#8fbdff",
    paddingHorizontal: 5,
    elevation: 5,
    zIndex: 5,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
