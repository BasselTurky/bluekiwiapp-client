import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function CheckIcon(props) {
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
        d="M81.2531 28.0952C71.9169 8.07356 48.1177 -0.588643 28.0961 8.74758C8.07446 18.0838 -0.587744 41.883 8.74848 61.9046C18.0847 81.9262 41.8839 90.5884 61.9055 81.2522"
        stroke="#fff"
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M81.2522 61.9049C90.5885 41.8833 81.9263 18.0841 61.9047 8.74787C41.8831 -0.588355 18.0838 8.07385 8.74761 28.0955C-0.588612 48.1171 10.4222 73.0114 28.0952 81.2525"
        stroke="#fff"
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M64.0519 31.9582C65.316 33.2358 65.316 35.3072 64.0519 36.5846L44.0862 56.7643C41.1367 59.7452 36.3544 59.7452 33.4051 56.7643L24.948 48.2166C23.684 46.939 23.684 44.8675 24.948 43.5899C26.2121 42.3123 28.2616 42.3123 29.5256 43.5899L37.9828 52.1376C38.404 52.5633 39.0872 52.5633 39.5084 52.1376L59.4746 31.9582C60.7387 30.6806 62.7878 30.6806 64.0519 31.9582Z"
        fill="#fff"
        // fill={props.fill}
      />
    </Svg>
  );
}
