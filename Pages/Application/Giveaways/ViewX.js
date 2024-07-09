import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import ActiveGiveawayView from "./ActiveGiveawayView";

export default function ViewX({ navigation }) {
  const giveawayX = useSelector((state) => state.giveawayX.value);

  return (
    <ActiveGiveawayView navigation={navigation} giveawayInfo={giveawayX} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
