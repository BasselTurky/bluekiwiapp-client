import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { setAvailable } from "../../Features/available";
import { setWinner } from "../../Features/winner";

export default function WinnerUI() {
  const dispatch = useDispatch();
  const available = useSelector((state) => state.available.value);
  const winner = useSelector((state) => state.winner.value);
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: "rgba(124,208,159,0.5)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>WinnerUI</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
