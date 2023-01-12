import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

export default function LockPart2SVG(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 230 230"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect x={172} y={98} width={26} height={104} fill={props.fill} />
      <Path
        d="M32 98H58V125C58 127.761 55.7614 130 53 130H37C34.2386 130 32 127.761 32 125V98Z"
        fill={props.fill}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M115 15C160.84 15 198 52.1602 198 98H172C172 66.5195 146.48 41 115 41C83.5195 41 58 66.5195 58 98H32C32 52.1602 69.1602 15 115 15Z"
        fill={props.fill}
      />
    </Svg>
  );
}
