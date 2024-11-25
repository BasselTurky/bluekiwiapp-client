import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function CustomText(props) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: "MontserratRegular" }]}
    />
  );
}

const styles = StyleSheet.create({});
