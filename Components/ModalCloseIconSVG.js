import * as React from "react";
import Svg, {
  G,
  Path,
  Defs,
  Pattern,
  Use,
  Image,
  ClipPath,
  Rect,
  Circle,
  RadialGradient,
  Stop,
} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const SvgComponent = (props) => (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 37 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect
      y={31.8198}
      width={45}
      height={6}
      rx={3}
      transform="rotate(-45 0 31.8198)"
      fill={props.fill}
    />
    <Rect
      x={31.8198}
      y={36.0624}
      width={45}
      height={6}
      rx={3}
      transform="rotate(-135 31.8198 36.0624)"
      fill={props.fill}
    />
  </Svg>
);

export default SvgComponent;
