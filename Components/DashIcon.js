import * as React from "react";
import Svg, { Rect } from "react-native-svg";

export default function DashIcon(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 1050 1050"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        x={25}
        y={425}
        width={1000}
        height={200}
        rx={80}
        fill={props.fill}
      />
    </Svg>
  );
}
