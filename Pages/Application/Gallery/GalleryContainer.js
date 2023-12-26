import { StyleSheet, Text, View, Animated } from "react-native";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
// import GalleryWebView from "./GalleryWebView";
import GalleryViews from "./GalleryViews";
import { z } from "../../../utils/scaling";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { setIsLoading } from "../../../Features/isLoading";

// import { setGalleryLastScrollPosition } from "../../../Features/galleryLastScrollPosition";

export default function GalleryContainer({
  //   isWebviewLoaded,
  //   isViewLogin,
  mainWebviewUrlRef,
  viewRef,
  // pageUrl, // change to redux
  // setPageUrl, // change to redux
  // isWebviewLoaded,
  //   setIsWebviewLoaded,
  // isViewLogin,
  homeFlatlistRef,
  //   setIsViewLogin,
}) {
  const insets = useSafeAreaInsets();
  // Animation
  //   console.log("container");
  const containerHeight = insets.top + z(116);
  const footerHeight = z(120);
  const dispatch = useDispatch();
  const scrollY = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;
  //   const active = useSelector((state) => state.active.value);
  const handleScroll = useCallback(
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
      useNativeDriver: true,
    })
  );

  //   useEffect(() => {
  //     dispatch(setGalleryLastScrollPosition(scrollY));
  //   }, [scrollY, dispatch]);

  //   const clampedScroll = Animated.diffClamp(
  //     Animated.add(
  //       scrollY.interpolate({
  //         inputRange: [0, 1],
  //         outputRange: [0, 1],
  //         extrapolateLeft: "clamp",
  //       }),
  //       offsetAnim
  //     ),
  //     0,
  //     containerHeight
  //   );
  const clampedScroll = useMemo(
    () =>
      Animated.diffClamp(
        Animated.add(
          scrollY.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: "clamp",
          }),
          offsetAnim
        ),
        0,
        containerHeight
      ),
    [scrollY, offsetAnim, containerHeight]
  );

  var _clampedScrollValue = 0;
  var _offsetValue = 0;
  var _scrollValue = 0;

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      //   console.log(value);
      const diff = value - _scrollValue;
      _scrollValue = value;
      _clampedScrollValue = Math.min(
        Math.max(_clampedScrollValue + diff, 0),
        containerHeight
      );
    });
    offsetAnim.addListener(({ value }) => {
      //   console.log(value);
      _offsetValue = value;
    });

    // return () => {
    //   scrollY.removeAllListeners();
    //   offsetAnim.removeAllListeners();
    // };
  }, []);

  var scrollEndTimer = null;

  const onMomentumScrollBegin = () => {
    // console.log("begin");
    clearTimeout(scrollEndTimer);
  };

  const onMomentumScrollEnd = () => {
    // console.log("end");
    const toValue =
      _scrollValue > containerHeight &&
      _clampedScrollValue > containerHeight / 2
        ? _offsetValue + containerHeight
        : _offsetValue - containerHeight;

    Animated.timing(offsetAnim, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const onScrollEndDrag = () => {
    scrollEndTimer = setTimeout(onMomentumScrollEnd, 250);
  };

  const headerTranslate = clampedScroll.interpolate({
    inputRange: [0, containerHeight],
    outputRange: [0, -containerHeight],
    extrapolate: "clamp",
  });

  const opacity = clampedScroll.interpolate({
    inputRange: [0, containerHeight - 20, containerHeight],
    outputRange: [1, 0.05, 0],
    extrapolate: "clamp",
  });

  const bottomTabTranslate = clampedScroll.interpolate({
    inputRange: [0, footerHeight],
    outputRange: [0, footerHeight * 2],
    extrapolate: "clamp",
  });
  //   const headerTranslate = useMemo(
  //     () =>
  //       clampedScroll.interpolate({
  //         inputRange: [0, containerHeight],
  //         outputRange: [0, -containerHeight],
  //         extrapolate: "clamp",
  //       }),
  //     [clampedScroll, containerHeight]
  //   );

  //   const opacity = useMemo(
  //     () =>
  //       clampedScroll.interpolate({
  //         inputRange: [0, containerHeight - 20, containerHeight],
  //         outputRange: [1, 0.05, 0],
  //         extrapolate: "clamp",
  //       }),
  //     [clampedScroll, containerHeight]
  //   );

  //   const bottomTabTranslate = useMemo(
  //     () =>
  //       clampedScroll.interpolate({
  //         inputRange: [0, containerHeight],
  //         outputRange: [0, containerHeight * 2],
  //         extrapolate: "clamp",
  //       }),
  //     [clampedScroll, containerHeight]
  //   );

  // Gallery WebView
  console.log("container");

  return (
    //     <GalleryWebView
    //       isWebviewLoaded={isWebviewLoaded}
    //       isViewLogin={isViewLogin}
    //       containerHeight={containerHeight}
    //       onMomentumScrollBegin={onMomentumScrollBegin}
    //       onMomentumScrollEnd={onMomentumScrollEnd}
    //       onScrollEndDrag={onScrollEndDrag}
    //       handleScroll={handleScroll}
    //       headerTranslate={headerTranslate}
    //       bottomTabTranslate={bottomTabTranslate}
    //     />
    <GalleryViews
      //   isWebviewLoaded={isWebviewLoaded}
      //   isViewLogin={isViewLogin}
      containerHeight={containerHeight}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onMomentumScrollEnd={onMomentumScrollEnd}
      onScrollEndDrag={onScrollEndDrag}
      handleScroll={handleScroll}
      headerTranslate={headerTranslate}
      bottomTabTranslate={bottomTabTranslate}
      homeFlatlistRef={homeFlatlistRef}
      scrollY={scrollY}
      mainWebviewUrlRef={mainWebviewUrlRef}
      viewRef={viewRef}
    />
  );
}
const styles = StyleSheet.create({});
