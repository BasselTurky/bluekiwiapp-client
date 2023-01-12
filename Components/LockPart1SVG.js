import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function LockPart1SVG(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 230 230"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 44C12 32.9543 20.9543 24 32 24H198C209.046 24 218 32.9543 218 44V151C218 181.376 193.376 206 163 206H67C36.6243 206 12 181.376 12 151V44ZM99.066 108.586C94.7106 104.401 92 98.5172 92 92C92 79.2975 102.297 69 115 69C127.703 69 138 79.2975 138 92C138 98.5963 135.223 104.544 130.775 108.738L139.156 161H91L99.066 108.586Z"
        fill={props.fill}
      />
    </Svg>
  );
}
