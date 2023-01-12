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
import { useDispatch, useSelector } from "react-redux";

import * as SecureStore from "expo-secure-store";
import GoBackSVG from "../../../Components/GoBackSVG";

import { setPermanentWallpapers } from "../../../Features/permanentWallpapers";

import { Button as PaperButton } from "react-native-paper";

export default function CitiesAPI({ navigation }) {
  const dispatch = useDispatch();
  const dailyWallpapers = useSelector((state) => state.dailyWallpapers.value);
  const permanentWallpapers = useSelector(
    (state) => state.permanentWallpapers.value
  );

  async function fetchWallpapers() {
    let currentToken = await SecureStore.getItemAsync("token");
    const response = await fetch(
      `${global.server_address}/api/get-all-wallpapers`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: currentToken,
        }),
      }
    );

    const data = await response.json();
    if (data.type === "success") {
      let total = {};

      for (let i = 0; i < data.result.length; i++) {
        let row = data.result[i];
        let year = row.date.substring(0, 4);
        let month = row.date.substring(5, 7);
        let day = row.date.substring(8, 10);

        if (!total[year]) {
          total[year] = {};
        }

        if (!total[year][month]) {
          total[year][month] = [];
        }

        total[year][month].push(row);
      }

      dispatch(
        setPermanentWallpapers({
          date: data.date,
          value: total,
        })
      );
    }
  }

  async function getAllWallpapers() {
    let response = await fetch(`https://worldtimeapi.org/api/timezone/Etc/UTC`);
    let data = await response.json();

    let utc_time = data.utc_datetime;
    // convert utc_time to 10 index string
    let shortened_date = utc_time.substring(0, 8) + "01";
    let date = new Date(shortened_date).getTime();

    if (!permanentWallpapers.date) {
      // first time
      fetchWallpapers();
    } else if (date > new Date(permanentWallpapers.date).getTime()) {
      // if today's date > stored date "last fetch"
      fetchWallpapers();
    } else {
      // do nuthing
      console.log("doing nothing");
    }
  }

  useEffect(() => {
    getAllWallpapers();
  }, [permanentWallpapers]);

  return (
    <ImageBackground
      source={require("../../../assets/HomeBackground.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <Text style={styles.header}>Cities Guide</Text>

      <TouchableOpacity
        style={styles.goBack}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <GoBackSVG fill={"#fff"} width={24} height={24} />
      </TouchableOpacity>
      <Button
        title="press"
        onPress={async () => {
          console.log(permanentWallpapers);

          // var date = new Date("2022-01-01T18:18:22.228415+00:00");
          // console.log(date);
          // var now_utc = Date.UTC(
          //   date.getUTCFullYear(),
          //   date.getUTCMonth(),
          //   date.getUTCDate(),

          //   date.getUTCHours(),
          //   date.getUTCMinutes(),
          //   date.getUTCSeconds()
          // );
          // console.log(now_utc);
          // // console.log(now_utc);
          // var date_string = new Date(now_utc).setUTCHours(0, 0, 0, 0);
          // var new_s = new Date(date_string).toISOString();
          // console.log(new_s);

          // {
          //   var date = new Date("2022-01-01");
          //   console.log(date);
          //   var now_utc = Date.UTC(
          //     date.getUTCFullYear(),
          //     date.getUTCMonth(),
          //     date.getUTCDate(),
          //     date.getUTCHours(),
          //     date.getUTCMinutes(),
          //     date.getUTCSeconds()
          //   );
          //   console.log(now_utc);
          //   // console.log(now_utc);
          //   var date_string = new Date(now_utc).toISOString();
          //   console.log(date_string);
          // }

          // console.log(new Date("2011-09-24"));
        }}
      />
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
    zIndex: 91,
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
