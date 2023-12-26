import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  DrawerLayoutAndroid,
  FlatList,
  Animated,
  Button,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { z } from "../../../../utils/scaling";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { setActive } from "../../../../Features/active";
import GalleryContainer from "./GalleryContainer";
import GalleryHeader from "./GalleryHeader";

function interpolateOpacity(scrollValue, containerHeight) {
  const inputRange = [0, containerHeight - z(20), containerHeight];
  const outputRange = [1, 0.05, 0];
  return scrollValue.interpolate({
    inputRange,
    outputRange,
    extrapolate: "clamp",
  });
}

export default function GalleryTabs() {
  const container_height = z(100);
  const dispatch = useDispatch();
  const active = useSelector((state) => state.active.value);
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;

  const [headerState, setHeaderState] = useState({
    headerTranslate: new Animated.Value(0),
    opacity: new Animated.Value(1),
  });

  var _clampedScrollValue = 0;
  var _offsetValue = 0;
  var _scrollValue = 0;

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const diff = value - _scrollValue;
      _scrollValue = value;
      _clampedScrollValue = Math.min(
        Math.max(_clampedScrollValue + diff, 0),
        container_height
      );
    });

    setHeaderState((prev) => ({
      ...prev,
      headerTranslate: new Animated.Value(-_clampedScrollValue),
      // _clampedScrollValue
      opacity: interpolateOpacity(scrollY, container_height),
    }));

    offsetAnim.addListener(({ value }) => {
      _offsetValue = value;
    });

    return () => {
      // Cleanup if needed
      scrollY.removeAllListeners();
      offsetAnim.removeAllListeners();
    };
  }, [active, container_height, offsetAnim, scrollY]);

  var scrollEndTimer = null;

  const onMomentumScrollBegin = () => {
    clearTimeout(scrollEndTimer);
  };
  const onMomentumScrollEnd = () => {
    const toValue =
      _scrollValue > container_height &&
      _clampedScrollValue > container_height / 2
        ? _offsetValue + container_height
        : _offsetValue - container_height;

    Animated.timing(headerState.headerTranslate, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
    // Animated.timing(offsetAnim, {
    //   toValue,
    //   duration: 500,
    //   useNativeDriver: true,
    // }).start();
  };
  const onScrollEndDrag = () => {
    scrollEndTimer = setTimeout(onMomentumScrollEnd, 250);
  };

  //   const headerTranslate = clampedScroll.interpolate({
  //     inputRange: [0, container_height],
  //     outputRange: [0, -container_height],
  //     extrapolate: "clamp",
  //   });
  //   const opacity = clampedScroll.interpolate({
  //     inputRange: [0, container_height - z(20), container_height],
  //     outputRange: [1, 0.05, 0],
  //     extrapolate: "clamp",
  //   });
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <GalleryContainer
        container_height={container_height}
        scrollY={scrollY}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollEndDrag={onScrollEndDrag}
        active={active}
      />
      <GalleryHeader
        container_height={container_height}
        headerTranslate={headerState.headerTranslate}
        opacity={headerState.opacity}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
