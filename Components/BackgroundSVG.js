import * as React from "react";
import Svg, { Rect, Defs, LinearGradient, Stop } from "react-native-svg";

const BackgroundSVG = (props) => (
  <Svg
    width={1284}
    height={2778}
    viewBox="0 0 1284 2778"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={1284} height={2778} fill="url(#paint0_linear_80409_876)" />
    <Defs>
      <LinearGradient
        id="paint0_linear_80409_876"
        x1={642}
        y1={0}
        x2={642}
        y2={2778}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.273218} stopColor="#45A991" />
        <Stop offset={0.99892} stopColor="#A0FF73" stopOpacity={0.490837} />
        <Stop offset={1} stopColor="#D9D9D9" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default BackgroundSVG;
