import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import GiveawaysView from "./SubPages/GiveawayTypes/GiveawaysView";
import HistoryView from "./SubPages/History/HistoryView";
import MainViewHeader from "./components/header/MainViewHeader";

import { useNavigationState } from "@react-navigation/native";
const Stack = createMaterialTopTabNavigator();
export default function MainView() {
  const currentIndex = useNavigationState((state) => state.index);
  return (
    <Stack.Navigator
      tabBar={(props) => (
        <MainViewHeader props={props} {...props} currentIndex={currentIndex} />
      )}
      screenOptions={{
        contentStyle: {
          backgroundColor: "transparent",
        },
        // swipeEnabled: false,
        // tabBarStyle: { display: "none" },
      }}
    >
      <Stack.Screen
        name="GiveawaysView"
        component={GiveawaysView}
        options={{
          navigationBarColor: "rgba(0,0,0,0)",
          animation: "fade",
          headerShown: false,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="HistoryView"
        component={HistoryView}
        options={{
          navigationBarColor: "rgba(0,0,0,0)",
          animation: "fade",
          headerShown: false,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
