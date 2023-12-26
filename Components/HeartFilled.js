import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";

export default function HeartFilled(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 800 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_81026_62)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M460.821 62.6015C493.829 45.7355 529.481 37.1846 566.781 37.1846C695.378 37.1846 800 141.806 800 270.404C800 361.486 751.898 458.224 657.028 557.932C577.814 641.183 480.835 710.582 413.428 754.138L400 762.816L386.572 754.138C319.165 710.58 222.186 641.183 142.974 557.932C48.1039 458.224 0 361.486 0 270.404C0 141.806 104.622 37.1846 233.217 37.1846C270.519 37.1846 306.169 45.7355 339.179 62.6015C361.648 74.0802 382.288 89.3314 400 107.426C417.711 89.3314 438.352 74.0802 460.821 62.6015Z"
          fill={props.fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_81026_62">
          <Rect width={800} height={800} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
