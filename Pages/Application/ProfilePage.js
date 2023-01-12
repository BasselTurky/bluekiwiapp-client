import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Profile from "./Profile";
import ChangePassword from "./ChangePassword";
import ChangePaypal from "./ChangePaypal";

import { NavigationContainer, DarkTheme } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function ProfilePage() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          navigationBarColor: "rgba(0,0,0,0)",
          // animation: "slide_from_bottom",
          animation: "none",
          headerShown: false,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          // animation: "slide_from_right",
          navigationBarColor: "rgba(0,0,0,0)",
          animation: "none",
          headerShown: false,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="ChangePaypal"
        component={ChangePaypal}
        options={{
          // animation: "slide_from_right",
          navigationBarColor: "rgba(0,0,0,0)",
          animation: "none",
          headerShown: false,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
