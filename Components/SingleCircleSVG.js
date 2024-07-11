import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";
export default function SingleCircleSVG(props) {
  //{props.fill}
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 525 525"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M525 262.5C525 407.475 407.475 525 262.5 525C117.525 525 0 407.475 0 262.5C0 117.525 117.525 0 262.5 0C407.475 0 525 117.525 525 262.5ZM511 262.5C511 399.743 399.743 511 262.5 511C125.257 511 14 399.743 14 262.5C14 125.257 125.257 14 262.5 14C399.743 14 511 125.257 511 262.5ZM363 262.5C363 318.005 318.005 363 262.5 363C206.995 363 162 318.005 162 262.5C162 206.995 206.995 162 262.5 162C318.005 162 363 206.995 363 262.5ZM335 262.5C335 302.541 302.541 335 262.5 335C222.459 335 190 302.541 190 262.5C190 222.459 222.459 190 262.5 190C302.541 190 335 222.459 335 262.5Z"
        fill={props.fill}
      />
    </Svg>
  );
}

const styles = StyleSheet.create({});
