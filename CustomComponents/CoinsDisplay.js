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
          // flex: 4,
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.1)",
          justifyContent: "center",
          alignItems: "center",
          height: zx(40),
          borderRadius: z(6),
          // paddingHorizontal: z(10),
          width: z(130),
          // marginLeft: z(18),
          // paddingLeft: z(20),
        }}
      >
        <Text
          style={{
            fontSize: z(18),
            color: "#5c5c5c",
            // fontFamily: "RobotoRegular",
            // fontWeight: "bold",
            textAlign: "center",
            letterSpacing: z(2),
            fontFamily: "MontserratSemiBold",
            color: "#735e4d",
          }}
        >
          {coins}
          {/* {coins.toString().padStart(4, "0")} */}
          {/* 0059 */}
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
