import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button as PaperButton } from "react-native-paper";
import { FontAwesome6, AntDesign, FontAwesome } from "@expo/vector-icons";
export default function OpenButton({ navigation, route, isUserParticipant }) {
  return (
    <PaperButton
      icon={({ size, color }) =>
        isUserParticipant ? null : (
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
    letterSpacing: 1,
    color: "white",
  },
});
