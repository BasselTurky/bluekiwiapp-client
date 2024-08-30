import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FrontView from "./NavigationViews/FrontView/FrontView";
import GiveawayXView from "./NavigationViews/GiveawayXView/GiveawayXView";
import GiveawayZView from "./NavigationViews/GiveawayZView/GiveawayZView";

const Stack = createNativeStackNavigator();
export default function GiveawaysView() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FrontView"
        component={FrontView}
        options={{
          headerShown: false,
          animation: "fade",
        }}
      />

      <Stack.Screen
        name="GiveawayXView"
        component={GiveawayXView}
        options={{
          headerShown: false,
          animation: "fade",
        }}
      />

      <Stack.Screen
        name="GiveawayZView"
        component={GiveawayZView}
        options={{
          headerShown: false,
          animation: "fade",
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
