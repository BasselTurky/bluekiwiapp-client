import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";

export default function AddToFavSVG(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 1110 1110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_80557_797)">
        <Path
          d="M742.423 314.513L652.289 143.678C611.017 65.4521 498.983 65.4519 457.711 143.678L367.577 314.513C363.236 322.741 355.324 328.489 346.158 330.075L155.831 363.006C68.6801 378.086 34.0598 484.636 95.7034 548.061L230.325 686.575C236.808 693.245 239.83 702.546 238.506 711.754L211.011 902.942C198.421 990.488 289.058 1056.34 368.428 1017.31L541.763 932.083C550.11 927.978 559.89 927.978 568.237 932.083L741.572 1017.31C820.942 1056.34 911.579 990.488 898.989 902.942L871.494 711.754C870.17 702.546 873.192 693.245 879.675 686.575L1014.3 548.061C1075.94 484.636 1041.32 378.086 954.169 363.006L763.842 330.075C754.676 328.489 746.764 322.741 742.423 314.513Z"
          stroke={props.fill}
          strokeWidth={80}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_80557_797">
          <Rect width={1110} height={1110} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
