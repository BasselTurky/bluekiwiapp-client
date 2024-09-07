import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function CloseThinSVG(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 76 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.796042 0.796041C-0.218471 1.81055 -0.218473 3.4554 0.79604 4.46992L33.8613 37.5352L0.796314 70.6001C-0.218199 71.6146 -0.218199 73.2595 0.796314 74.274C1.81083 75.2885 3.45568 75.2885 4.47019 74.274L37.5352 41.209L70.5997 74.2736C71.6142 75.2881 73.2591 75.2881 74.2736 74.2736C75.2881 73.2591 75.2881 71.6142 74.2736 70.5997L41.209 37.5352L74.2739 4.47031C75.2884 3.4558 75.2884 1.81095 74.2739 0.796434C73.2594 -0.21808 71.6145 -0.218082 70.6 0.796432L37.5352 33.8613L4.46992 0.796041C3.45541 -0.218472 1.81056 -0.218472 0.796042 0.796041Z"
        fill={props.fill}
      />
    </Svg>
  );
}
