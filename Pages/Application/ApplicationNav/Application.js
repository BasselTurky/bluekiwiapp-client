import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "../Home/Home";
import HomeView from "../Home/HomeView";
import AdsView from "../AdsView/AdsView";
import MainView from "../Giveaway/MainView";
import KeepAwake from "react-native-keep-awake";
import WallpaperApi from "../Wallpapers/WallpaperApi";
import ArchiveApiPage from "../Archive/ArchiveApiPage";
import SocketComponent from "./SocketComponent";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { setAuth } from "../../../Features/auth";
import { resetTokens } from "../../../utils/resetTokens";

const Stack = createStackNavigator();

export default function Application() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect");

    async function setUpAccessToken() {
      try {
        const refreshToken = await SecureStore.getItemAsync("refreshToken");

        if (!refreshToken) {
          console.log("here1x");

          resetTokens();
          dispatch(setAuth(false));

          return;
        }
        console.log(refreshToken);

        const response = await fetch(
          `${global.server_address}/auth/refreshToken`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refreshToken,
            }),
          }
        );

        const data = await response.json();
        if (response.ok && data.accessToken) {
          const accessToken = data.accessToken;

          await SecureStore.setItemAsync("accessToken", accessToken);
        } else {
          console.log("here2x");
          resetTokens();
          dispatch(setAuth(false));
        }
      } catch (error) {
        console.log("here3x");
        console.log(error);
        resetTokens();
        dispatch(setAuth(false));
      }
    }

    setUpAccessToken();

    const intervalId = setInterval(() => {
      setUpAccessToken();
    }, 720000); // 12 min
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <ImageBackground
      source={require("../../../assets/6.jpg")}
      // blurRadius={2}
      resizeMode="cover"
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // backgroundColor: "#rgba(255,243,232,0.30)",
        }}
      >
        <Image
          source={require("../../../assets/wavesLayer2.png")}
          style={{
            width: Dimensions.get("screen").width, // Full width of the screen
            height: Dimensions.get("screen").height, // Full height of the screen
          }}
          resizeMode="stretch"
        />
      </View>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            // contentStyle: {
            //   backgroundColor: "transparent",
            // },
            cardStyle: {
              backgroundColor: "transparent",
            },
            cardOverlayEnabled: true,
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeView}
            options={{
              // animation: "slide_from_bottom",
              navigationBarColor: "rgba(0,0,0,0)",
              animation: "none",
              headerShown: false,
            }}
          ></Stack.Screen>
          {/* <Stack.Screen
            name="ArchiveApiPage"
            component={ArchiveApiPage}
            options={{
              navigationBarColor: "rgba(0,0,0,0)",
              animation: "none",
              headerShown: false,
            }}
          ></Stack.Screen> */}

          <Stack.Screen
            name="WallpaperApi"
            component={WallpaperApi}
            options={{
              navigationBarColor: "rgba(0,0,0,0)",
              animation: "slide_from_bottom",
              headerShown: false,
            }}
          ></Stack.Screen>

          <Stack.Screen
            name="Giveaways"
            component={MainView}
            options={{
              navigationBarColor: "rgba(0,0,0,0)",
              animation: "slide_from_bottom",
              headerShown: false,
            }}
          ></Stack.Screen>

          <Stack.Screen
            name="AdsView"
            component={AdsView}
            options={{
              animation: "none",
              navigationBarColor: "rgba(0,0,0,0)",
              headerShown: false,
            }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      <SocketComponent />
      <KeepAwake />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
