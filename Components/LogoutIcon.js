import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";

export default function LogoutIcon(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 640 640"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_80719_51)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 180C3 86.1116 79.1116 10 173 10H303C396.888 10 473 86.1116 473 180V180C473 191.046 464.046 200 453 200H442C429.85 200 420 190.15 420 178V178C420 111.726 366.274 58 300 58H176C109.726 58 56 111.726 56 178V461C56 527.274 109.726 581 176 581H300C366.274 581 420 527.274 420 461V461C420 448.85 429.85 439 442 439H452C463.598 439 473 448.402 473 460V460C473 553.888 396.888 630 303 630H173C79.1116 630 3 553.888 3 460V180Z"
          fill={props.fill}
        />
        <Path
          d="M511.6 260.722L542.5 291.622L283.1 291.622C267.6 291.622 255 304.222 255 319.722C255 335.222 267.6 347.822 283.1 347.822C298.6 347.822 542.5 347.822 542.5 347.822L511.6 378.722C502.1 388.222 499.7 403.422 507.2 414.622C517.4 429.922 538.3 431.422 550.6 419.122L633.4 336.322C642.6 327.122 642.6 312.222 633.4 303.022L550.6 220.222C538.3 207.922 517.4 209.422 507.2 224.722C499.6 236.022 502 251.222 511.6 260.722Z"
          fill={props.fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_80719_51">
          <Rect width={640} height={640} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
