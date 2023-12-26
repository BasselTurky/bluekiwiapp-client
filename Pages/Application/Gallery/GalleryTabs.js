import { StyleSheet, Text, View } from "react-native";
import React from "react";
import GalleryHome from "./components/GalleryHome";
import Favorite from "./components/Favorite";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { useSelector, useDispatch } from "react-redux";

const Tab = createMaterialTopTabNavigator();

export default function GalleryTabs({
  download,
  containerHeight,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  onScrollEndDrag,
  handleScroll,
}) {
  const searchResult = useSelector((state) => state.searchResult.value);
  const userData = useSelector((state) => state.userData.value);
  const favArray = useSelector((state) => state.favArray.value);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Gallery"
        // options={{
        //   swipeEnabled: false,
        // }}
      >
        {(props) => (
          <GalleryHome
            {...props}
            download={download}
            searchResult={searchResult}
            containerHeight={containerHeight}
            onMomentumScrollBegin={onMomentumScrollBegin}
            onMomentumScrollEnd={onMomentumScrollEnd}
            onScrollEndDrag={onScrollEndDrag}
            handleScroll={handleScroll}
          />
        )}
      </Tab.Screen>

      {/* <Tab.Screen
        name="Gallery"
        component={GalleryHome}
        initialParams={{
          download: download,
          containerHeight: containerHeight,
          onMomentumScrollBegin: onMomentumScrollBegin,
          onMomentumScrollEnd: onMomentumScrollEnd,
          onScrollEndDrag: onScrollEndDrag,
          handleScroll: handleScroll,
        }}
      /> */}

      <Tab.Screen
        name="Favorite"
        // options={{
        //   swipeEnabled: false,
        // }}
      >
        {(props) => (
          <Favorite
            {...props}
            download={download}
            userData={userData}
            favArray={favArray}
            containerHeight={containerHeight}
            onMomentumScrollBegin={onMomentumScrollBegin}
            onMomentumScrollEnd={onMomentumScrollEnd}
            onScrollEndDrag={onScrollEndDrag}
            handleScroll={handleScroll}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
