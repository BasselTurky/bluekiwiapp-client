import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
} from "react-native";
import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";

const winWidth = Dimensions.get("window").width;

export default React.memo(function FlexImage({ imageObject }) {
  // console.log(imageObject);
  //   const [width, setWidth] = useState(0);
  //   const [height, setHeight] = useState(0);

  //   useEffect(() => {
  //     // console.log("object");

  //     Image.getSize(imageObject.value, (w, h) => {
  //       setWidth(winWidth);
  //       setHeight((winWidth * h) / w);
  //     });
  //   }, []);
  //   console.log("img");

  //   let maxWidth = parseInt(imageObject.width, 10);
  //   let maxHeight = parseInt(imageObject.height, 10);
  //   //   console.log(maxWidth, " -- ", maxHeight);
  //   let width = winWidth;
  //   let height = (winWidth * maxHeight) / maxWidth;
  //   console.log(width, " - ", height);
  return (
    <Image
      style={{
        width: winWidth,
        height:
          (winWidth * parseInt(imageObject.height, 10)) /
          parseInt(imageObject.width, 10),

        // width: winWidth,
        // height: winWidth * 1.5,
      }}
      resizeMode="contain"
      source={{
        uri: imageObject.value,
      }}
    />
  );
});
const styles = StyleSheet.create({});
