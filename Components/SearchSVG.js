import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";

export default function SearchSVG(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_80557_798)">
        <Path
          d="M493.698 464.187L350.241 320.627C378.522 286.71 395.532 243.365 395.532 196.024C395.532 88.0212 306.896 0.204834 197.869 0.204834C88.8411 0.204834 0 88.1237 0 196.127C0 304.129 88.6361 391.946 197.664 391.946C243.98 391.946 286.607 376.063 320.422 349.523L464.392 493.493C472.794 501.896 485.296 501.896 493.698 493.493C502.101 485.091 502.101 472.589 493.698 464.187ZM42.0125 196.127C42.0125 111.282 111.897 42.3198 197.664 42.3198C283.431 42.3198 353.315 111.282 353.315 196.127C353.315 280.971 283.431 349.933 197.664 349.933C111.897 349.933 42.0125 280.869 42.0125 196.127Z"
          fill={props.fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_80557_798">
          <Rect width={500} height={500} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
