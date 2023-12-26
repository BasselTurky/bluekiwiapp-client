import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import ImageAPI from "./ImageAPI";
import Favorites from "./Favorites/Favorites";
import GalleryMain from "./GalleryMain";
import GalleryTabs from "./gellery_components/GalleryTabs";
import { z } from "../../../utils/scaling";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";

import GalleryContainer from "./GalleryContainer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function ImageApiPage({
  viewRef,
  // pageUrl, // change to redux
  // setPageUrl, // change to redux
  isWebviewLoaded,
  setIsWebviewLoaded,
  isViewLogin,
  setIsViewLogin,
}) {
  // const [navigationIndex, setNavigationIndex] = useState(0);
  // const container_height = z(100);
  // const scrollY = useRef(new Animated.Value(0)).current;
  // const offsetAnim = useRef(new Animated.Value(0)).current;
  // var _clampedScrollValue = 0;
  // var _offsetValue = 0;
  // var _scrollValue = 0;

  // const clampedScroll = Animated.diffClamp(
  //   Animated.add(
  //     scrollY.interpolate({
  //       inputRange: [0, 1],
  //       outputRange: [0, 1],
  //       extrapolateLeft: "clamp",
  //     }),
  //     offsetAnim
  //   ),
  //   0,
  //   container_height
  // );

  // const headerTranslate = clampedScroll.interpolate({
  //   inputRange: [0, container_height],
  //   outputRange: [0, -container_height],
  //   extrapolate: "clamp",
  // });
  // const headerOpacity = clampedScroll.interpolate({
  //   inputRange: [0, container_height - z(20), container_height],
  //   outputRange: [1, 0.05, 0],
  //   extrapolate: "clamp",
  // });

  // useEffect(() => {
  //   // if (navigationIndex === 0) {
  //   console.log("listen");
  //   scrollY.addListener(({ value }) => {
  //     // console.log("scrollY vlaue: ", value);
  //     const diff = value - _scrollValue;
  //     // console.log("diff between scrollY value and _scrollValue ", diff);
  //     _scrollValue = value;
  //     _clampedScrollValue = Math.min(
  //       Math.max(_clampedScrollValue + diff, 0),
  //       container_height
  //     );
  //     // console.log(_clampedScrollValue);
  //   });
  //   offsetAnim.addListener(({ value }) => {
  //     // console.log("vallue: ", value);
  //     // console.log("scrollValue: ", _scrollValue);
  //     _offsetValue = value;
  //   });
  //   // }
  // }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Stack.Screen
        name="GalleryContainer"
        options={{
          animation: "fade",
          headerShown: false,
        }}
      >
        {(props) => (
          <GalleryContainer
            {...props}
            isWebviewLoaded={isWebviewLoaded}
            isViewLogin={isViewLogin}
          />
          // <GalleryMain
          //   {...props}
          //   container_height={container_height}
          //   scrollY={scrollY}
          //   offsetAnim={offsetAnim}
          //   _clampedScrollValue={_clampedScrollValue}
          //   _offsetValue={_offsetValue}
          //   _scrollValue={_scrollValue}
          //   // clampedScroll={clampedScroll}
          //   headerTranslate={headerTranslate}
          //   headerOpacity={headerOpacity}
          //   navigationIndex={navigationIndex}
          //   setNavigationIndex={setNavigationIndex}
          // />
        )}
      </Stack.Screen>
      {/* <Stack.Screen
        name="ImageAPI"
        options={{
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
      </Stack.Screen> */}
      {/* <Stack.Screen
        name="Favorites"
        options={{
          animation: "default",
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
      </Stack.Screen> */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
