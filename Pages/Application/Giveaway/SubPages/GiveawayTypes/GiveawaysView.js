import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import FrontView from "./NavigationViews/FrontView/FrontView";
import ActiveGiveawayView from "./NavigationViews/ActiveGiveaway/ActiveGiveawayView";
const Stack = createStackNavigator();
export default function GiveawaysView() {
  const screens = [
    {
      name: "FrontView",
      component: FrontView,
      options: {
        headerShown: false,
        animation: "fade",
      },
    },
    {
      name: "Single",
      component: ActiveGiveawayView,
      options: {
        headerShown: false,
        animation: "fade",
      },
      props: {
        giveawayType: "giveawayX",
        activeGiveawayString: "activeGiveawayX",
        participants: "participantsGiveawayX",
      },
    },
    {
      name: "Multiple",
      component: ActiveGiveawayView,
      options: {
        headerShown: false,
        animation: "fade",
      },
      props: {
        giveawayType: "giveawayZ",
        activeGiveawayString: "activeGiveawayZ",
        participants: "participantsGiveawayZ",
      },
    },
  ];
  return (
    <Stack.Navigator>
      {screens.map((screen, index) => (
        <Stack.Screen
          key={index}
          name={screen.name}
          options={screen.options}
          children={(props) => (
            <screen.component
              {...props}
              {...(screen.props || {})} // Spread screen.props if it exists, otherwise spread an empty object
            />
          )}
        />
      ))}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
