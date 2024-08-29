import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { z, zx } from "../../../utils/scaling";
import { Button as PaperButton } from "react-native-paper";
import { FontAwesome6, AntDesign, FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
export default function OpenButton({ navigation, route, giveawayId }) {
  const giveawayHistory = useSelector((state) => state.giveawayHistory.value);
  return (
    <PaperButton
      icon={({ size, color }) =>
        giveawayHistory[giveawayId] ? null : (
          <FontAwesome name="circle" size={12} color="red" />
        )
      }
      labelStyle={styles.btnText}
      contentStyle={{
        flexDirection: "row-reverse",
      }}
      mode="elevated"
      buttonColor="#84c4ff"
      onPress={() => navigation.navigate(route)}
    >
      Open
    </PaperButton>
  );
}

const styles = StyleSheet.create({
  btnText: {
    fontFamily: "MontserratLight",
    // color: "#404040",
    letterSpacing: 1,
    color: "white",
  },
});
