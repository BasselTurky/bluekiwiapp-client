import { StyleSheet, Text, View, ImageBackground } from "react-native";
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
import { setAuth } from "../../../Features/auth";
import { resetTokens } from "../../../utils/resetTokens";

const Stack = createNativeStackNavigator();

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
      source={require("../../../assets/001.jpg")}
      // blurRadius={2}
      resizeMode="cover"
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
      }}
    >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            contentStyle: {
              backgroundColor: "transparent",
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeView}
            options={{
              // animation: "slide_from_bottom",
              navigationBarColor: "rgba(0,0,0,0)",
              animation: "fade",
              headerShown: false,
            }}
          ></Stack.Screen>
          <Stack.Screen
            name="ArchiveApiPage"
            component={ArchiveApiPage}
            options={{
              navigationBarColor: "rgba(0,0,0,0)",
              animation: "fade",
              headerShown: false,
            }}
          ></Stack.Screen>

          <Stack.Screen
            name="WallpaperApi"
            component={WallpaperApi}
            options={{
              navigationBarColor: "rgba(0,0,0,0)",
              animation: "fade",
              headerShown: false,
            }}
          ></Stack.Screen>

          <Stack.Screen
            name="Giveaways"
            component={MainView}
            options={{
              navigationBarColor: "rgba(0,0,0,0)",
              animation: "fade",
              headerShown: false,
            }}
          ></Stack.Screen>

          <Stack.Screen
            name="AdsView"
            component={AdsView}
            options={{
              animation: "fade",
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
