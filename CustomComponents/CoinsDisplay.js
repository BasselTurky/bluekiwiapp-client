import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SingleKiwiCoin from "../Components/SingleKiwiCoin";
import { useSelector } from "react-redux";
import { z, zx } from "../utils/scaling";

export default function CoinsDisplay({ coinPosition }) {
  const coins = useSelector((state) => state.coins.value);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {coinPosition === "left" ? (
        <View
          style={{
            marginRight: -20,
            zIndex: 2,
          }}
        >
          <SingleKiwiCoin height={z(46)} width={z(46)} />
        </View>
      ) : null}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.1)",
          justifyContent: "center",
          alignItems: "center",
          height: zx(40),
          borderRadius: z(6),
          width: z(130),
        }}
      >
        <Text
          style={{
            fontSize: z(18),
            color: "#5c5c5c",
            textAlign: "center",
            letterSpacing: z(2),
            fontFamily: "MontserratSemiBold",
            color: "#735e4d",
          }}
        >
          {coins}
        </Text>
      </View>
      {coinPosition === "right" ? (
        <View
          style={{
            marginLeft: -20,
            zIndex: 2,
          }}
        >
          <SingleKiwiCoin height={z(46)} width={z(46)} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({});
