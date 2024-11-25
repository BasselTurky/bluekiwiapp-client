//<uses-permission android:name="com.google.android.gms.permission.AD_ID"/>
import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Keyboard,
  Button,
} from "react-native";
import { z } from "../../../utils/scaling";
import React, { useState, useEffect } from "react";
import ErrorView from "../../Error/ErrorView";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DrawerLayout } from "react-native-gesture-handler";
import DrawerView from "./components/DrawerView";

import { useDispatch, useSelector } from "react-redux";

import { useToast } from "react-native-toast-notifications";
import MyNoteIcon from "../../../Components/MyNoteIcon";

import ApiButton from "./components/ApiButton";
const height = Dimensions.get("window").height;

export default React.memo(function HomeView({ navigation }) {
  console.log("HomeView");
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const drawerRef = React.useRef();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.value);

  try {
    return (
      <DrawerLayout
        ref={drawerRef}
        onDrawerStateChanged={(state) => {
          if (state === "Dragging") {
            Keyboard.dismiss();
          } else if (state === "Settling") {
            Keyboard.dismiss();
          }
        }}
        onDrawerSlide={(position) => {
          if (position === 0) {
            Keyboard.dismiss();
          }
        }}
        overlayColor="transparent"
        drawerWidth={z(320)}
        drawerPosition="left"
        drawerType="front"
        keyboardDismissMode="on-drag"
        renderNavigationView={() => {
          return <DrawerView />;
        }}
      >
        <View style={styles.container}>
          <View
            style={{
              width: "100%",
              position: "absolute",
              top:
                height * 0.04 < 24
                  ? insets.top + height * 0.02
                  : insets.top + height * 0.04,
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                elevation: 5,
                borderRadius: 50,
                marginRight: 17,
                width: 40,
                height: 40,
                borderRadius: 50,
                backgroundColor: "#83c4ff",

                overflow: "hidden",
              }}
              onPress={() => {
                drawerRef.current.openDrawer();
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 22,
                  }}
                >
                  {userData ? userData.firstname.charAt(0).toUpperCase() : "B"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.row]}>
            <ApiButton
              navigation={navigation}
              api={"wallpaper_api"}
              apiText={"Wallpapers"}
              navigationPage={"WallpaperApi"}
              requiredCoins={0}
            >
              <Image
                source={require("../../../assets/frame26.png")}
                resizeMode="contain"
                style={{
                  width: "90%",
                }}
              />
            </ApiButton>

            <Button
              title="ADS"
              onPress={() => {
                navigation.navigate("AdsView");
              }}
            />
          </View>

          <View
            style={[
              {
                marginTop: 20,
              },
              styles.row,
            ]}
          >
            <ApiButton
              navigation={navigation}
              api={"archive_api"}
              apiText={"Archive"}
              navigationPage={"ArchiveApiPage"}
              requiredCoins={5}
            >
              <Image
                source={require("../../../assets/Archive2.png")}
                resizeMode="contain"
                style={{
                  width: "70%",
                }}
              />
            </ApiButton>

            <ApiButton
              navigation={navigation}
              api={"giveaways"}
              apiText={"Giveaways"}
              navigationPage={"Giveaways"}
              requiredCoins={5}
            >
              <MyNoteIcon width={z(42)} height={z(42)} fill={"white"} />
            </ApiButton>
          </View>
        </View>
      </DrawerLayout>
    );
  } catch (error) {
    console.log("ErrorID: E022: ", error);
    return <ErrorView Error={"ErrorID: E022"} />;
  }
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
