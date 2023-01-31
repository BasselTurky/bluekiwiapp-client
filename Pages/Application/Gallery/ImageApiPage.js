import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ImageAPI from "./ImageAPI";
import Favorites from "./Favorites/Favorites";

import { NavigationContainer, DarkTheme } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function ImageApiPage({
  viewRef,
  pageUrl,
  setPageUrl,
  isWebviewLoaded,
  setIsWebviewLoaded,
  isViewLogin,
  setIsViewLogin,
}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ImageAPI"
        // component={ImageAPI}
        options={{
          // animation: "slide_from_left",
          animation: "fade",
          headerShown: false,
        }}
      >
        {(props) => (
          <ImageAPI
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
        name="Favorites"
        // component={Favorites}
        options={{
          // animation: "slide_from_bottom",

          animation: "none",
          headerShown: false,
        }}
      >
        {(props) => (
          <Favorites
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
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
