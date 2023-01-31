import { View, Text } from "react-native";
import React from "react";

export default function ErrorView({ Error }) {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: "#36485f",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 30,
          color: "white",
        }}
      >
        {Error}
      </Text>
    </View>
  );
}
