import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { setAvailable } from "../../../Features/available";
import { setWinner } from "../../../Features/winner";

export default function NonWinnerUI() {
  const dispatch = useDispatch();
  const available = useSelector((state) => state.available.value);
  const winner = useSelector((state) => state.winner.value);
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: "rgba(124,181,208,0.5)",
        alignItems: "center",
      }}
    >
      <Button
        title="winner-true"
        onPress={() => {
          dispatch(setWinner(5));
        }}
      />
      <Text>NonWinnerUI</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
