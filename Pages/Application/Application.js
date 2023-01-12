import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useRef } from "react";

import Home from "./Home";
import Profile from "./Profile";
import ProfilePage from "./ProfilePage";
import DogAPI from "./APIs/DogAPI";
import CatAPI from "./APIs/CatAPI";
import ImageAPI from "./APIs/ImageAPI";
import Giveaway from "./APIs/Giveaway";
import CitiesAPI from "./APIs/CitiesAPI";
import AdsView from "./AdsView/AdsView";
import WallpaperApi from "./APIs/WallpaperApi";
import AnimatedApi from "./APIs/AnimatedApi";
import NoteApi from "./APIs/NoteApi";

import ImageApiPage from "./ImageApiPage";

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
            animation: "fade",
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
            animation: "default",
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

        <Stack.Screen
          name="Giveaway"
          component={Giveaway}
          options={{
            // animation: "slide_from_left",
            navigationBarColor: "rgba(0,0,0,0)",
            animation: "default",
            headerShown: false,
          }}
        ></Stack.Screen>

        <Stack.Screen
          name="CitiesAPI"
          component={CitiesAPI}
          options={{
            // animation: "slide_from_left",
            navigationBarColor: "rgba(0,0,0,0)",
            animation: "default",
            headerShown: false,
          }}
        ></Stack.Screen>

        <Stack.Screen
          name="WallpaperApi"
          component={WallpaperApi}
          options={{
            // animation: "slide_from_left",
            navigationBarColor: "rgba(0,0,0,0)",
            animation: "default",
            headerShown: false,
          }}
        ></Stack.Screen>

        <Stack.Screen
          name="AnimatedApi"
          component={AnimatedApi}
          options={{
            // animation: "slide_from_left",
            navigationBarColor: "rgba(0,0,0,0)",
            animation: "default",
            headerShown: false,
          }}
        ></Stack.Screen>

        <Stack.Screen
          name="NoteApi"
          component={NoteApi}
          options={{
            // animation: "slide_from_left",
            navigationBarColor: "rgba(0,0,0,0)",
            animation: "default",
            headerShown: false,
          }}
        ></Stack.Screen>

        <Stack.Screen
          name="AdsView"
          component={AdsView}
          options={{
            animation: "slide_from_bottom",
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
