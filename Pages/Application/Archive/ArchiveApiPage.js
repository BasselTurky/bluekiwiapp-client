import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ArchiveApi from "./ArchiveApi";
import ArchiveMonth from "./MonthView/ArchiveMonth";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function ArchiveApiPage() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Stack.Screen
        name="ArchiveApi"
        options={{
          animation: "fade",
          headerShown: false,
        }}
      >
        {(props) => <ArchiveApi {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="ArchiveMonth"
        options={{
          animation: "fade",
          headerShown: false,
        }}
      >
        {(props) => <ArchiveMonth {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
