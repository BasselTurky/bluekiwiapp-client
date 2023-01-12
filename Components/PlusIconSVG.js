import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

export default function PlusIconSVG(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 90 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M81.2531 28.0952C71.9169 8.07359 48.1177 -0.588612 28.0961 8.74761C8.07446 18.0838 -0.587744 41.8831 8.74848 61.9047C18.0847 81.9263 41.8839 90.5885 61.9055 81.2522"
        stroke="#fff"
        // stroke="#319CFF"
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M81.2522 61.9049C90.5885 41.8833 81.9263 18.0841 61.9047 8.74787C41.8831 -0.588355 18.0838 8.07385 8.74761 28.0955C-0.588612 48.1171 10.4222 73.0114 28.0952 81.2525"
        stroke="#fff"
        // stroke="#319CFF"
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Rect
        x={40}
        y={25}
        width={10}
        height={40}
        rx={5}
        fill="#fff"
        //   fill="#7CC0FF"
      />
      <Rect
        x={25}
        y={50}
        width={10}
        height={40}
        rx={5}
        transform="rotate(-90 25 50)"
        fill="#fff"
        // fill="#7CC0FF"
      />
    </Svg>
  );
}
