// import resolveAssetSource from "resolveAssetSource";
import React, { useCallback, useState, useMemo, useRef } from "react";
import { Image, View } from "react-native";

export default function FullWidthImage(props) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const onLayout = useCallback(
    (event) => {
      const containerWidth = event.nativeEvent.layout.width;

      if (props.ratio) {
        setWidth(containerWidth);
        setHeight(containerWidth * props.ratio);
      }
      //   else if (typeof props.source === "number") {
      //     const source = resolveAssetSource(props.source);

      //     setWidth(containerWidth);
      //     setHeight((containerWidth * source.height) / source.width);
      //   }
      else if (typeof props.source === "object") {
        Image.getSize(props.source.uri, (w, h) => {
          setWidth(containerWidth);
          setHeight((containerWidth * h) / w);
        });
      }
    },
    [props.ratio, props.source]
  );

  //   const widthRef = useRef(0);
  //   const heightRef = useRef(0);

  //   const onLayout = useCallback(
  //     (event) => {
  //       const containerWidth = event.nativeEvent.layout.width;

  //       if (props.ratio) {
  //         widthRef.current = containerWidth;
  //         heightRef.current = containerWidth * props.ratio;
  //       } else if (typeof props.source === "object") {
  //         Image.getSize(props.source.uri, (w, h) => {
  //           widthRef.current = containerWidth;
  //           heightRef.current = (containerWidth * h) / w;
  //         });
  //       }
  //     },
  //     [props.ratio, props.source]
  //   );

  //     const onLayout = useMemo(
  //     () =>
  //       useCallback((event) => {
  //         const containerWidth = event.nativeEvent.layout.width;

  //         if (props.ratio) {
  //           setWidth(containerWidth);
  //           setHeight(containerWidth * props.ratio);
  //         } else if (typeof props.source === "object") {
  //           Image.getSize(props.source.uri, (w, h) => {
  //             setWidth(containerWidth);
  //             setHeight((containerWidth * h) / w);
  //           });
  //         }
  //       }, [props.ratio, props.source]),
  //     [props.ratio, props.source]
  //   );
  const memoizedImageStyle = useMemo(
    () => ({ width, height }),
    [width, height]
  );

  return (
    <View onLayout={onLayout}>
      {/* <Image source={props.source} style={{ width, height }} /> */}
      {/* <Image
        source={props.source}
        style={{ width: widthRef.current, height: heightRef.current }}
      /> */}
      <Image source={props.source} style={memoizedImageStyle} />
    </View>
  );
}
