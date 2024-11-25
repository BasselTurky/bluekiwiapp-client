import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

export default function MainBackgroundSVG(props) {
  return (
    <Svg
      id="visual"
      viewBox="0 0 540 960"
      width={props.width}
      height={props.height}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <Rect x={0} y={0} width={540} height={960} fill="#74c1c5" />
      <Path d="M0 617L540 196L540 961L0 961Z" fill="#74c1c5" />
      <Path d="M0 368L540 178L540 961L0 961Z" fill="#70bbbf" />
      <Path d="M0 663L540 520L540 961L0 961Z" fill="#6bb5b8" />
      <Path d="M0 471L540 731L540 961L0 961Z" fill="#67afb2" />
      <Path d="M0 559L540 625L540 961L0 961Z" fill="#63a9ac" />
      <Path d="M0 776L540 613L540 961L0 961Z" fill="#5fa3a6" />
      <Path d="M0 766L540 939L540 961L0 961Z" fill="#5b9da0" />
    </Svg>
  );
}
