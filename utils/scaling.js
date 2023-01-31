import { Dimensions } from "react-native";

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export function s(size) {
  return (shortDimension / guidelineBaseWidth) * size;
}

export function z(size) {
  return (shortDimension / 411.4) * size;
}

export function zx(size) {
  return (longDimension / 748.85) * size;
}
// export const s = scale;
