import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Svg, Defs, Rect, Mask, Circle } from "react-native-svg";

export default function MaskCircle({ r, y }) {
  return (
    <Svg height="100%" width="100%">
      <Defs>
        <Mask id="mask" x="0" y="0" height="100%" width="100%">
          <Rect height="100%" width="100%" fill="#fff" />
          <Circle r={r} cx="50%" cy={y} fill="black" />
        </Mask>
      </Defs>
      <Rect
        height="100%"
        width="100%"
        fill="rgba(255, 255, 255, 0.2)"
        mask="url(#mask)"
        fill-opacity="0"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({});
