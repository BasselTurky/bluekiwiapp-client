import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import React from "react";

import GoBackSVG from "../../../../Components/GoBackSVG";
// import ScrollTouch from "../../../../Components/ScrollTouch";
import Touch from "../../../../Components/Touch";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import ErrorView from "../../../Error/ErrorView";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Carousel from "react-native-snap-carousel";

import WallpaperCard from "../../Wallpapers/components/WallpaperCard";

import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useAnimatedReaction,
  scrollTo,
  useAnimatedRef,
} from "react-native-reanimated";

import { z } from "../../../../utils/scaling";
import { useSelector, useDispatch } from "react-redux";
import PlusIconSVG from "../../../../Components/PlusIconSVG";
import CoinsStack from "../../../../Components/CoinsStack";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const viewHeight = height * 0.7;
const item_height = height * 0.7;

const scrollWidth = 50;
const scrollHeight = 50;

export default function ArchiveMonth({ navigation, data, month, route }) {
  const insets = useSafeAreaInsets();

  const coins = useSelector((state) => state.coins.value);

  const [ratio, setRatio] = React.useState(null);

  const monthCarouselRef = useAnimatedRef();
  const translateX = useSharedValue(0);

  const adjustedTranslateX = useDerivedValue(() => {
    // const adjusted = Math.min(Math.max(translateX.value, 0), width - 100);

    const adjusted = Math.min(
      Math.max(translateX.value, 0),
      width - scrollWidth
    );
    // if (favoCarouselRef.current && ratio) {
    //   favoCarouselRef.current._scrollTo(adjusted * ratio);
    // }
    scrollTo(monthCarouselRef, adjusted * ratio, 0, false);

    return Math.min(Math.max(translateX.value, 0), width - scrollWidth);
  });

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = adjustedTranslateX.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
    },
    onEnd: (event) => {},
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: adjustedTranslateX.value,
        },
      ],
    };
  });

  function remainingdDigits(number) {
    var length = (Math.log(number) * Math.LOG10E + 1) | 0;

    let remaining = 3 - length;

    let result = "";
    for (let i = 0; i < remaining; i++) {
      result = result.concat("0");
    }

    return result;
  }

  try {
    return (
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}
      >
        <ImageBackground
          //   source={require("../../../assets/pixel4.jpg")}
          source={require("../../../../assets/blackLayer.png")}
          resizeMode="cover"
          style={[
            {
              flex: 1,
              alignItems: "center",
              // justifyContent: "center",
              paddingTop:
                height * 0.04 < 24
                  ? insets.top + height * 0.005
                  : insets.top + height * 0.015,
              // paddingTop: insets.top,
              paddingBottom: insets.bottom,
              backgroundColor: "#C88781",
            },
            // styles.container,
          ]}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 17,
              // backgroundColor: "pink",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                // zIndex: 2,
                // position: "absolute",
                // top: 30,
                // left: 17,
                width: 40,
                height: 40,
                backgroundColor: "rgba(0,0,0,0.3)",
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <GoBackSVG fill={"#fff"} width={15} height={15} />
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                // backgroundColor: "green",
              }}
            >
              <TouchableOpacity
                style={{
                  // position: "absolute",
                  // right: 126,
                  marginRight: 70,
                }}
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate("AdsView");
                }}
              >
                <PlusIconSVG height={30} width={30} />
              </TouchableOpacity>

              <View
                style={[
                  styles.score,
                  {
                    position: "absolute",
                    right: 26,
                  },
                ]}
              >
                <Text style={styles.scoreText}>
                  {remainingdDigits(coins)}
                  {coins}
                </Text>
              </View>

              <View
                style={
                  {
                    // position: "absolute",
                    // right: 17,
                  }
                }
              >
                <CoinsStack height={z(50)} width={z(50)} />
              </View>
            </View>
          </View>
          {/* <Text> {route.params.month}</Text> */}
          {/* <Button
            title="show"
            onPress={() => {
              console.log(route.params.images);
            }}
          /> */}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              //   backgroundColor: "pink",
              width: "100%",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: viewHeight,
                width: width,
              }}
            >
              <Carousel
                ref={monthCarouselRef}
                data={route.params.images}
                itemWidth={item_height * (30 / 49)}
                itemHeight={item_height}
                sliderWidth={width}
                sliderHeight={viewHeight}
                enableMomentum={true}
                onContentSizeChange={(w, h) => {
                  try {
                    let r = (w - width) / (width - scrollWidth); // 100 > scroll width
                    setRatio(r);
                  } catch (error) {
                    console.log(error);
                  }
                }}
                onScroll={(event) => {
                  try {
                    if (ratio) {
                      translateX.value =
                        event.nativeEvent.contentOffset.x / ratio;
                    }
                  } catch (error) {
                    console.log(error);
                  }
                }}
                inactiveSlideOpacity={1}
                inactiveSlideScale={1}
                containerCustomStyle={{
                  width: width,
                  borderRadius: 50,
                }}
                contentContainerCustomStyle={{
                  alignItems: "center",
                  borderColor: "green",
                }}
                slideStyle={{
                  justifyContent: "center",
                  height: item_height,
                  width: item_height * (30 / 49),
                  //   marginHorizontal: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 10 * (49 / 30),
                }}
                renderItem={({ item, index }) => {
                  return (
                    <WallpaperCard
                      key={index}
                      index={index}
                      item={item}
                      required_coins={10}
                      type={"archive"}
                      year={route.params.year}
                      month={route.params.month} // 01 , 02 ... 12
                      wallpaper_id_={item.wallpaper_id}
                    />
                  );
                }}
              />
            </View>
            {route.params.images.length ? (
              <View
                style={{
                  // width: width - 100,
                  //   backgroundColor: "yellow",
                  width: "100%",
                  // alignSelf: "flex-end",
                  //   borderBottomWidth: StyleSheet.hairlineWidth,
                  //   borderBottomColor: "#40404033",
                  borderRadius: 20,
                  marginTop: 10,
                  // borderStyle: "dotted",
                  // zIndex: 2,
                  // elevation: 1,
                }}
              >
                <PanGestureHandler onGestureEvent={panGestureEvent}>
                  <Animated.View
                    // onLayout={(event) => {
                    //   console.log(event.nativeEvent.layout.x);
                    // }}
                    style={[
                      {
                        width: scrollWidth,
                        height: scrollHeight,
                        backgroundColor: "#af9199",
                        // backgroundColor: "#C88781",
                        borderRadius: 50,
                        elevation: 8,
                        overflow: "hidden",
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: StyleSheet.hairlineWidth,
                        borderColor: "#fff",
                      },
                      rStyle,
                    ]}
                  >
                    {/* <Image
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    source={require("../../../assets/icon.png")}
                  /> */}
                    <Touch width={20} height={20} fill={"#fff"} />
                    {/* <ScrollTouch width={38} height={38} fill={"#fff"} /> */}
                  </Animated.View>
                </PanGestureHandler>
              </View>
            ) : null}
          </View>
        </ImageBackground>
      </GestureHandlerRootView>
    );
  } catch (error) {
    console.log("ErrorID: E046: ", error);
    return <ErrorView Error={"ErrorID: E046"} />;
  }
}

const styles = StyleSheet.create({
  score: {
    width: 80,
    height: 30,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderWidth: 2,
    borderColor: "#36485f",

    borderRadius: 10,

    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 10,
    // elevation: 5,
    // position: "absolute",
    // top: 61,
    // right: 36,
    // borderColor: "#ffd69e",
  },
  scoreText: {
    fontFamily: "Righteous_400Regular",
    fontSize: 16,
    color: "#36485f",
    // position: "absolute",
    // top: -6,
    // left: 10,
  },
});
