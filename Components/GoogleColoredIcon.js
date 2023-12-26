import { View, Text } from "react-native";
import React from "react";
import Svg, { Mask, Path, G } from "react-native-svg";

export default function GoogleColoredIcon(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Mask
        id="mask0_81016_21"
        style={{
          maskType: "luminance",
        }}
        maskUnits="userSpaceOnUse"
        x={2}
        y={2}
        width={43}
        height={44}
      >
        <Path
          d="M44.5 20H24V28.5H35.8C34.7 33.9 30.1 37 24 37C16.8 37 11 31.2 11 24C11 16.8 16.8 11 24 11C27.1 11 29.9 12.1 32.1 13.9L38.5 7.5C34.6 4.1 29.6 2 24 2C11.8 2 2 11.8 2 24C2 36.2 11.8 46 24 46C35 46 45 38 45 24C45 22.7 44.8 21.3 44.5 20Z"
          fill="white"
        />
      </Mask>
      <G mask="url(#mask0_81016_21)">
        <Path d="M0 37V11L17 24L0 37Z" fill="#FBBC05" />
      </G>
      <Mask
        id="mask1_81016_21"
        style={{
          maskType: "luminance",
        }}
        maskUnits="userSpaceOnUse"
        x={2}
        y={2}
        width={43}
        height={44}
      >
        <Path
          d="M44.5 20H24V28.5H35.8C34.7 33.9 30.1 37 24 37C16.8 37 11 31.2 11 24C11 16.8 16.8 11 24 11C27.1 11 29.9 12.1 32.1 13.9L38.5 7.5C34.6 4.1 29.6 2 24 2C11.8 2 2 11.8 2 24C2 36.2 11.8 46 24 46C35 46 45 38 45 24C45 22.7 44.8 21.3 44.5 20Z"
          fill="white"
        />
      </Mask>
      <G mask="url(#mask1_81016_21)">
        <Path d="M0 11L17 24L24 17.9L48 14V0H0V11Z" fill="#EA4335" />
      </G>
      <Mask
        id="mask2_81016_21"
        style={{
          maskType: "luminance",
        }}
        maskUnits="userSpaceOnUse"
        x={2}
        y={2}
        width={43}
        height={44}
      >
        <Path
          d="M44.5 20H24V28.5H35.8C34.7 33.9 30.1 37 24 37C16.8 37 11 31.2 11 24C11 16.8 16.8 11 24 11C27.1 11 29.9 12.1 32.1 13.9L38.5 7.5C34.6 4.1 29.6 2 24 2C11.8 2 2 11.8 2 24C2 36.2 11.8 46 24 46C35 46 45 38 45 24C45 22.7 44.8 21.3 44.5 20Z"
          fill="white"
        />
      </Mask>
      <G mask="url(#mask2_81016_21)">
        <Path d="M0 37L30 14L37.9 15L48 0V48H0V37Z" fill="#34A853" />
      </G>
      <Mask
        id="mask3_81016_21"
        style={{
          maskType: "luminance",
        }}
        maskUnits="userSpaceOnUse"
        x={2}
        y={2}
        width={43}
        height={44}
      >
        <Path
          d="M44.5 20H24V28.5H35.8C34.7 33.9 30.1 37 24 37C16.8 37 11 31.2 11 24C11 16.8 16.8 11 24 11C27.1 11 29.9 12.1 32.1 13.9L38.5 7.5C34.6 4.1 29.6 2 24 2C11.8 2 2 11.8 2 24C2 36.2 11.8 46 24 46C35 46 45 38 45 24C45 22.7 44.8 21.3 44.5 20Z"
          fill="white"
        />
      </Mask>
      <G mask="url(#mask3_81016_21)">
        <Path d="M48 48L17 24L13 21L48 11V48Z" fill="#4285F4" />
      </G>
    </Svg>
  );
}
