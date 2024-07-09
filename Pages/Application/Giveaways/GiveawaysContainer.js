import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainView from "./MainView";
import ViewX from "./ViewX";
import ViewZ from "./ViewZ";

const Stack = createNativeStackNavigator();

export default function GiveawaysContainer() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainView"
        component={MainView}
        options={{
          headerShown: false,
          animation: "fade",
        }}
      />

      <Stack.Screen
        name="ViewX"
        component={ViewX}
        options={{
          headerShown: false,
          animation: "fade",
        }}
      />

      <Stack.Screen
        name="ViewZ"
        component={ViewZ}
        options={{
          headerShown: false,
          animation: "fade",
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
