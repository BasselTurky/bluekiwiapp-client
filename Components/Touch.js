import * as React from "react";
import Svg, { Rect } from "react-native-svg";

export default function Touch(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 460 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect x={23} width={70} height={460} rx={35} fill={props.fill} />
      <Rect x={195} width={70} height={460} rx={35} fill={props.fill} />
      <Rect x={367} width={70} height={460} rx={35} fill={props.fill} />
    </Svg>
  );
}
