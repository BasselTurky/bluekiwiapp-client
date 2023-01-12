import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Svg, { Rect } from "react-native-svg";

export default function GoBackSVG(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 137 143"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect x={5} y={63} width={132} height={16} rx={8} fill={props.fill} />
      <Rect
        y={70.7107}
        width={100}
        height={16}
        rx={8}
        transform="rotate(-45 0 70.7107)"
        fill={props.fill}
      />
      <Rect
        x={11.3135}
        y={60}
        width={100}
        height={16}
        rx={8}
        transform="rotate(45 11.3135 60)"
        fill={props.fill}
      />
    </Svg>
  );
}

const styles = StyleSheet.create({});
