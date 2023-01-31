import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useRef } from "react";

import Home from "../Home/Home";
import ProfilePage from "../Profile/ProfilePage";
import AdsView from "../AdsView/AdsView";

import ImageApiPage from "../Gallery/ImageApiPage";
import WallpaperApi from "../Wallpapers/WallpaperApi";
import ArchiveApiPage from "../Archive/ArchiveApiPage";
// import Giveaway from "../APIs/Giveaway";

import NoteApi from "../MyNote/NoteApi";

// import AdAlert from "../../Components/AdAlertSVG";
// import WatchSVG from "../../Components/WatchSVG";
// import KiwiCoinSVG from "../../Components/KiwiCoinSVG";

import { NavigationContainer, DarkTheme } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function Application() {
  let viewRef = React.useRef(null);
  const [pageUrl, setPageUrl] = React.useState("https://pixabay.com");
  const [isWebviewLoaded, setIsWebviewLoaded] = useState(false);
  const [isViewLogin, setIsViewLogin] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          // component={Home}
          options={{
            // animation: "slide_from_bottom",
            navigationBarColor: "rgba(0,0,0,0)",
            animation: "fade",
            headerShown: false,
          }}
        >
          {(props) => (
            <Home
              {...props}
              viewRef={viewRef}
              pageUrl={pageUrl}
              setPageUrl={setPageUrl}
              isWebviewLoaded={isWebviewLoaded}
              setIsWebviewLoaded={setIsWebviewLoaded}
              isViewLogin={isViewLogin}
              setIsViewLogin={setIsViewLogin}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="ProfilePage"
          component={ProfilePage}
          options={{
            // animation: "slide_from_bottom",
            navigationBarColor: "rgba(0,0,0,0)",
            animation: "none",
            headerShown: false,
          }}
        ></Stack.Screen>

        {/* <Stack.Screen
          name="DogAPI"
          component={DogAPI}
          options={{
            // animation: "slide_from_left",

            animation: "default",
            headerShown: false,
          }}
        ></Stack.Screen>

        <Stack.Screen
          name="CatAPI"
          component={CatAPI}
          options={{
            // animation: "slide_from_left",

            animation: "default",
            headerShown: false,
          }}
        ></Stack.Screen> */}

        <Stack.Screen
          name="ImageApiPage"
          // component={ImageApiPage}
          options={{
            // animation: "slide_from_left",
            navigationBarColor: "rgba(0,0,0,0)",
            animation: "none",
            headerShown: false,
          }}
        >
          {(props) => (
            <ImageApiPage
              {...props}
              viewRef={viewRef}
              pageUrl={pageUrl}
              setPageUrl={setPageUrl}
              isWebviewLoaded={isWebviewLoaded}
              setIsWebviewLoaded={setIsWebviewLoaded}
              isViewLogin={isViewLogin}
              setIsViewLogin={setIsViewLogin}
            />
          )}
        </Stack.Screen>

        {/* <Stack.Screen
          name="Giveaway"
          component={Giveaway}
          options={{
            // animation: "slide_from_left",
            navigationBarColor: "rgba(0,0,0,0)",
            animation: "none",
            headerShown: false,
          }}
        ></Stack.Screen> */}

        <Stack.Screen
          name="ArchiveApiPage"
          component={ArchiveApiPage}
          options={{
            // animation: "slide_from_left",
            navigationBarColor: "rgba(0,0,0,0)",
            animation: "none",
            headerShown: false,
          }}
        ></Stack.Screen>

        <Stack.Screen
          name="WallpaperApi"
          component={WallpaperApi}
          options={{
            // animation: "slide_from_left",
            navigationBarColor: "rgba(0,0,0,0)",
            animation: "none",
            headerShown: false,
          }}
        ></Stack.Screen>

        <Stack.Screen
          name="NoteApi"
          component={NoteApi}
          options={{
            // animation: "slide_from_left",
            navigationBarColor: "rgba(0,0,0,0)",
            animation: "none",
            headerShown: false,
          }}
        ></Stack.Screen>

        <Stack.Screen
          name="AdsView"
          component={AdsView}
          options={{
            animation: "none",
            // animation: "slide_from_bottom",
            navigationBarColor: "rgba(0,0,0,0)",
            // animation: "fade",
            headerShown: false,
          }}
        >
          {/* {(props) => (
            <AdsView
              {...props}
              AdAlert={AdAlert}
              WatchSVG={WatchSVG}
              KiwiCoinSVG={KiwiCoinSVG}
            />
          )} */}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
