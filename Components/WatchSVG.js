import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";

const SvgComponent = (props) => (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_9_2770)">
      <Path
        d="M30 14.9999C30 23.2841 23.2842 29.9999 15 29.9999C6.71578 29.9999 0 23.2841 0 14.9999C0 6.71566 6.71578 -0.00012207 15 -0.00012207C23.2842 -0.00012207 30 6.71566 30 14.9999Z"
        fill="#99CC33"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.2146 13.5176L10.0598 23.8022L14.5049 29.9875C14.6696 29.9929 14.834 30 15 30C21.4145 30 26.886 25.9726 29.0303 20.3093L24.2146 13.5176Z"
        fill="black"
        fillOpacity={0.196078}
      />
      <Path
        d="M11.6643 24.7046C11.3431 24.7046 11.0219 24.6218 10.7333 24.4552C10.1571 24.1229 9.80237 23.5075 9.80237 22.8428V6.79588C9.80237 6.13022 10.1571 5.51579 10.7333 5.18343C11.3096 4.85015 12.019 4.85015 12.5952 5.18343L23.7667 13.2065C24.343 13.5388 24.6976 14.1542 24.6976 14.8189C24.6976 15.4845 24.343 16.0989 23.7667 16.4313L12.5952 24.4552C12.3066 24.6218 11.9855 24.7046 11.6643 24.7046"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_9_2770">
        <Rect width={30} height={30} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default SvgComponent;
