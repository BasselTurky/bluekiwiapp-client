import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../SocketContext/SocketContext";
import { z } from "../../../utils/scaling";
import GoBackSVG from "../../../Components/GoBackSVG";
import { setPermanentWallpapers } from "../../../Features/permanentWallpapers";
import { useToast } from "react-native-toast-notifications";
import YearButton from "./components/YearButton";
import ErrorView from "../../Error/ErrorView";
import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function ArchiveApi({ navigation }) {
  const socket = useSocket();
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const dispatch = useDispatch();
  const permanentWallpapers = useSelector(
    (state) => state.permanentWallpapers.value
  );

  function fetchWallpapers() {
    socket.emit("get-all-wallpapers");
  }

  useEffect(() => {
    socket.on("all-wallpapers", (data) => {
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
    });
  }, []);

  async function getAllWallpapers() {
    try {
      const today = new Date().toISOString().split("T")[0];
      if (!permanentWallpapers.date) {
        fetchWallpapers();
      } else if (new Date(today) > new Date(permanentWallpapers.date)) {
        // if today's date > stored date "last fetch"
        fetchWallpapers();
      } else {
        // do nuthing
        console.log("doing nothing");
      }
    } catch (error) {
      console.log("ErrorID: E053: ", error);
      toast.show("ErrorID: E053", { type: "error" });
    }
  }

  useEffect(() => {
    getAllWallpapers();
  }, []);

  const monthsArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  function renderYears() {
    if (permanentWallpapers) {
      let years = Object.keys(permanentWallpapers.value);

      return years.map((year, index) => {
        return (
          <YearButton
            key={index}
            navigation={navigation}
            permanentWallpapers={permanentWallpapers}
            year={year}
            monthsArray={monthsArray}
          />
        );
      });
    }
  }

  try {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={[
            {
              flex: 1,
              alignItems: "center",
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
            },
          ]}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 17,
            }}
          >
            <TouchableOpacity
              style={{
                width: z(40),
                height: z(40),
                backgroundColor: "rgba(0,0,0,0.3)",
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <GoBackSVG fill={"#fff"} width={15} height={15} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column-reverse",
            }}
          >
            {renderYears()}
          </View>
        </View>
      </View>
    );
  } catch (error) {
    console.log("ErrorID: E054: ", error);
    return <ErrorView Error={"ErrorID: E054"} />;
  }
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
  },
  content: {
    flex: 1,
    position: "absolute",
    top: 120,
    bottom: 120,
    right: 0,
    left: 0,
    marginHorizontal: 20,
    zIndex: 2,
    elevation: 5,
  },
  buttonStyle: {
    backgroundColor: "#af9199",
    elevation: 10,
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 100,
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
    marginVertical: 0,
    marginHorizontal: 0,
  },
});
