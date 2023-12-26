import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { TabView, SceneMap } from "react-native-tab-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import GalleryView from "./gellery_components/GalleryView";
import Favorite from "./gellery_components/Favorite";
import HeaderBar from "./gellery_components/HeaderBar";

import { z, zx } from "../../../utils/scaling";

export default function GalleryMain({
  container_height,
  scrollY,
  offsetAnim,
  _clampedScrollValue,
  _offsetValue,
  _scrollValue,
  //   clampedScroll
  headerTranslate,
  headerOpacity,
  navigationIndex,
  setNavigationIndex,
}) {
  //   const [navigationIndex, setNavigationIndex] = useState(0);
  const routes = [
    { key: "first", title: "Gallery" },
    { key: "second", title: "Favorite" },
  ];
  const headerRef = useRef(null);
  // Header animation:
  const insets = useSafeAreaInsets();
  //   const container_height = z(100); // header height

  //   const scrollY = useRef(new Animated.Value(0)).current;
  //   const offsetAnim = useRef(new Animated.Value(0)).current;
  const [focused, setFocused] = useState("home");
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
  //     container_height
  //   );

  //   var _clampedScrollRef = useRef(0);
  //   var _offsetRef = useRef(0);
  //   var _scrollRef = useRef(0);
  //   var _clampedScrollValue = 0;
  //   var _offsetValue = 0;
  //   var _scrollValue = 0;

  //   useEffect(() => {
  //     if (navigationIndex === 0) {
  //       scrollY.setValue(0);
  //       //   console.log("here");
  //     }
  //   }, [navigationIndex]);

  useEffect(() => {
    // if (navigationIndex === 0) {
    console.log("listen");
    scrollY.addListener(({ value }) => {
      // console.log("scrollY vlaue: ", value);
      const diff = value - _scrollValue;
      // console.log("diff between scrollY value and _scrollValue ", diff);
      _scrollValue = value;
      _clampedScrollValue = Math.min(
        Math.max(_clampedScrollValue + diff, 0),
        container_height
      );
      // console.log(_clampedScrollValue);
    });
    offsetAnim.addListener(({ value }) => {
      // console.log("vallue: ", value);
      // console.log("scrollValue: ", _scrollValue);
      _offsetValue = value;
    });
    // }
  }, [navigationIndex]);

  var scrollEndTimer = null;
  var scrollEndTimerHeader = null;

  const onMomentumScrollBegin = () => {
    clearTimeout(scrollEndTimer);
  };
  const onSwipeStart = () => {
    clearTimeout(scrollEndTimer);
    console.log("spacer----------------------------------------");
    console.log("_scrollValue: ", _scrollValue);
    console.log("container_height: ", container_height);
    console.log("_clampedScrollValue: ", _clampedScrollValue);
    console.log("_offsetValue: ", _offsetValue);

    // clearTimeout(scrollEndTimerHeader);
  };
  const onMomentumScrollEnd = () => {
    // console.log("started");
    const toValue =
      _scrollValue > container_height &&
      _clampedScrollValue > container_height / 2
        ? _offsetValue + container_height
        : _offsetValue - container_height;

    Animated.timing(offsetAnim, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
    // console.log("spacer----------------------------------------");
    // console.log("_scrollValue: ", _scrollValue);
    // console.log("container_height: ", container_height);
    // console.log("_clampedScrollValue: ", _clampedScrollValue);
    // console.log("_offsetValue: ", _offsetValue);
    // console.log("toValue:  ", toValue);
  };

  const openHeader = async () => {
    console.log("started2");
    // offsetAnim.setValue(0);
    // offsetAnim.setValue(0);
    // console.log("offsetValue:: ", _offsetValue);
    Animated.timing(offsetAnim, {
      toValue: container_height,
      duration: 500,
      useNativeDriver: true,
    }).start();
    // console.log("offsetAnim:: ", offsetAnim);
  };

  const headerOpenTimer = () => {
    // scrollEndTimerHeader =
    if (navigationIndex === 1) {
      setTimeout(openHeader, 250);
    }
  };

  const onScrollEndDrag = () => {
    // if (navigationIndex === 0) {
    scrollEndTimer = setTimeout(onMomentumScrollEnd, 250);
    // }
  };

  //   const headerTranslate = clampedScroll.interpolate({
  //     inputRange: [0, container_height],
  //     outputRange: [0, -container_height],
  //     extrapolate: "clamp",
  //   });
  //   const headerOpacity = clampedScroll.interpolate({
  //     inputRange: [0, container_height - z(20), container_height],
  //     outputRange: [1, 0.05, 0],
  //     extrapolate: "clamp",
  //   });

  // Tab view

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.measure((x, y, width, height, pageX, pageY) => {
        console.log("Layout:", { x, y, width, height, pageX, pageY });
      });
    }
  }, [headerRef]);
  headerTranslate.addListener((value) => {
    console.log("headerTranslate.addListener", value);
  });
  //   useEffect(() => {
  //     console.log("HeaderT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ", headerTranslate.);
  //   }, [headerTranslate]);

  const FirstRoute = () => (
    <GalleryView
      scrollY={scrollY}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onMomentumScrollEnd={onMomentumScrollEnd}
      onScrollEndDrag={onScrollEndDrag}
      //   headerTranslate={headerTranslate}
      //   opacity={opacity}
      container_height={container_height}
    />
  );
  const SecondRoute = () => (
    <Favorite
      scrollY={scrollY}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onMomentumScrollEnd={onMomentumScrollEnd}
      onScrollEndDrag={onScrollEndDrag}
      //   headerTranslate={headerTranslate}
      //   opacity={opacity}
      container_height={container_height}
    />
  );

  const renderScene = SceneMap({
    // change with real Views that contain Flatlist and Favorite,
    // the Flatlist is linked with Header component
    first: FirstRoute,
    second: SecondRoute,
  });

  function handleIndexChange(index) {
    setNavigationIndex(index);
  }

  const renderTabBar = (props) => {
    //This is the Header
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      //   <HeaderBar
      //     props={props}
      //     headerOpacity={opacity}
      //     headerTranslate={headerTranslate}
      //     container_height={container_height}
      //     setNavigationIndex={setNavigationIndex}
      //   />

      <Animated.View
        ref={headerRef}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: container_height,
          top: 0,
          transform: [{ translateY: headerTranslate }],
          opacity: headerOpacity,
          flexDirection: "row",
          paddingTop: insets.top,
          zIndex: 5,
          backgroundColor: "#fff",
        }}
      >
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });

          return (
            <TouchableOpacity
              key={i}
              style={styles.tabItem}
              onPress={() => {
                setNavigationIndex(i);
              }}
            >
              <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
    );
  };

  return (
    <TabView
      navigationState={{
        index: navigationIndex,
        routes: routes,
      }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={handleIndexChange}
      swipeEnabled={false}
      //   onSwipeStart={onSwipeStart}
      //   onSwipeEnd={headerOpenTimer}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: z(16),
  },
});
