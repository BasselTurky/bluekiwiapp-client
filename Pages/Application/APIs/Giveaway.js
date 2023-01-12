import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";

import * as SecureStore from "expo-secure-store";
import GoBackSVG from "../../../Components/GoBackSVG";

import { Button as PaperButton } from "react-native-paper";

export default function Giveaway({ navigation }) {
  return (
    <ImageBackground
      source={require("../../../assets/HomeBackground.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <Text style={styles.header}>Givaway Pool</Text>
      <TouchableOpacity
        style={styles.goBack}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <GoBackSVG fill={"#fff"} width={24} height={24} />
      </TouchableOpacity>
      <Text>Hello</Text>
      <Button title="hello" />
      {/* {dogImage ? (
    <ImageBackground
      source={{ uri: dogImage }}
      resizeMode="cover"
      style={styles.content}
      borderRadius={10}
    ></ImageBackground>
  ) : null} */}

      {/* <PaperButton
    onPress={fetchDogImage}
    style={styles.buttonStyle}
    contentStyle={styles.buttonContent}
    labelStyle={styles.buttonLabel}
    // color="green"
    mode="contained"
    uppercase={false}
  >
    <Text style={{ fontSize: 14, fontFamily: "Righteous_400Regular" }}>
      Generate
    </Text>
  </PaperButton> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffcb76",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  header: {
    fontSize: 24,
    fontFamily: "Righteous_400Regular",
    color: "#fff",
    paddingBottom: 10,
    marginBottom: 80,
    borderBottomColor: "#199187",
    borderBottomWidth: 1,
    // fontWeight: "bold",
    position: "absolute",
    zIndex: 2,
    top: 45,
    left: 65,
  },
  goBack: {
    zIndex: 2,
    position: "absolute",
    top: 45,
    left: 15,
    padding: 5,
    // backgroundColor: "grey",
  },
  content: {
    flex: 1,
    position: "absolute",
    top: 120,
    bottom: 120,
    right: 0,
    left: 0,
    // backgroundColor: "pink",
    marginHorizontal: 20,
    // borderRadius: 10,
    zIndex: 2,
    elevation: 5,

    // marginTop: 120,
  },
  buttonStyle: {
    position: "absolute",
    width: 140,
    height: 35,
    backgroundColor: "#59cbbd",
    elevation: 3,
    bottom: 65,
  },
  buttonContent: {
    padding: 0,
    margin: 0,
    height: "100%",
    width: "100%",
  },
  buttonLabel: {
    padding: 0,
    margin: 0,
  },
});
