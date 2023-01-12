import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function PrevSVG(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 110 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M27.0754 62.6439C22.9749 58.5434 22.9749 51.8952 27.0754 47.7947L68.7947 6.07538C72.8952 1.97487 79.5434 1.97487 83.6439 6.07538C87.7444 10.1759 87.7444 16.8241 83.6439 20.9246L41.9246 62.6439C37.8241 66.7444 31.1759 66.7444 27.0754 62.6439Z"
        fill={props.fill}
      />
      <Path
        d="M27.0757 47.9332C31.1763 43.8327 37.8245 43.8327 41.925 47.9332L83.6443 89.6525C87.7448 93.753 87.7448 100.401 83.6443 104.502C79.5438 108.602 72.8955 108.602 68.795 104.502L27.0757 62.7825C22.9752 58.682 22.9752 52.0337 27.0757 47.9332Z"
        fill={props.fill}
      />
    </Svg>
  );
}
