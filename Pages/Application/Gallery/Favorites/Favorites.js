import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  FlatList,
  Image,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { z } from "../../../../utils/scaling";
import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import Carousel from "react-native-snap-carousel";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureChangeEventPayload,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  runOnJS,
  Easing,
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useAnimatedReaction,
  scrollTo,
  useAnimatedRef,
} from "react-native-reanimated";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import GoBackSVG from "../../../../Components/GoBackSVG";

import ErrorView from "../../../Error/ErrorView";

import ImageFavComponent from "./components/ImageFavComponent";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const item_width = width * 0.9;
const viewHeight = item_width * (13 / 16) + z(60);
// const viewHeight = height * 0.5;
const item_height = height * 0.4;

const scrollWidth = 50;
const scrollHeight = 50;

import { Button as PaperButton } from "react-native-paper";
export default function Favorites({
  navigation,
  viewRef,
  pageUrl,
  setPageUrl,
  isWebviewLoaded,
  setIsWebviewLoaded,
  isViewLogin,
  setIsViewLogin,
}) {
  const insets = useSafeAreaInsets();
  const winWidth = Dimensions.get("window").width;
  const winHeight = Dimensions.get("window").height;

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.value);
  const favArray = useSelector((state) => state.favArray.value);

  const favCarouselRef = React.useRef(null);

  const [flatlistWidth, setFlatlistWidth] = React.useState();
  const [ratio, setRatio] = React.useState(null);
  const [offset, setOffset] = React.useState(0);
  const [widthState, setWidthState] = React.useState(width);

  const errorToast = (message) => {
    Toast.show({
      type: "error",
      text1: message,
      text2: "Error",
      visibilityTime: 3000,
    });
  };

  function download(url) {
    try {
      // extract image code
      console.log(url);
      let start = url.lastIndexOf("/");
      let end = url.indexOf("__");
      let code = url.substring(start + 1, end);
      // create download url

      let download_url = `https://pixabay.com/images/download/${code}_1920.jpg?attachment`;
      console.log("url: ", download_url);
      console.log(isWebviewLoaded, isViewLogin);
      // load webview with download link
      if (isWebviewLoaded && isViewLogin) {
        setPageUrl(download_url);
        console.log("success");
      }
      console.log("download done");
    } catch (error) {
      errorToast("ErrorID: E056: ", error);
    }
  }

  const favoCarouselRef = useAnimatedRef();
  const translateX = useSharedValue(0);

  // useAnimatedReaction(
  //   () => {
  //     return translateX.value;
  //   },
  //   (result, previous) => {
  //     if (result !== previous) {
  //       // console.log("result: ", result);
  //       const adjusted = Math.min(Math.max(result, 0), width - 100);
  //       scrollTo(favoCarouselRef, adjusted * ratio, 0, true);
  //       // if (favCarouselRef && ratio) {
  //       //   favCarouselRef.current._scrollTo(adjusted * ratio);
  //       // }
  //     }
  //   },
  //   [favoCarouselRef, ratio]
  // );

  const adjustedTranslateX = useDerivedValue(() => {
    // const adjusted = Math.min(Math.max(translateX.value, 0), width - 100);

    const adjusted = Math.min(
      Math.max(translateX.value, 0),
      width - scrollWidth
    );
    // if (favoCarouselRef.current && ratio) {
    //   favoCarouselRef.current._scrollTo(adjusted * ratio);
    // }
    scrollTo(favoCarouselRef, adjusted * ratio, 0, false);

    return Math.min(Math.max(translateX.value, 0), width - scrollWidth);
  });

  // const offset_handler = (event, context) => {
  //   try {
  //     if (event.translationX && context.translateX) {
  //       translateX.value = event.translationX + context.translateX;
  //     }

  //     if (favCarouselRef.current) {
  //       let offset = adjustedTranslateX.value;
  //       favCarouselRef.current._scrollTo(offset * ratio);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      // try {
      //   if (Object.isExtensible(context)) {
      context.translateX = adjustedTranslateX.value;
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    },
    onActive: (event, context) => {
      // runOnJS(offset_handler(event, context));
      // if (Object.isExtensible(translateX) && Object.isExtensible(context)) {
      translateX.value = event.translationX + context.translateX;
      // setOffset(adjustedTranslateX.value);
      // }
      // if (favCarouselRef.current) {
      //   let offset = adjustedTranslateX.value;
      // if (ratio && favCarouselRef.current) {
      // let offset = adjustedTranslateX.value;
      // favCarouselRef.current._scrollTo(100 * ratio);
      // }
      // }
      // console.log(adjustedTranslateX.value); //----------------------------- this is it
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

  try {
    return (
      <SafeAreaProvider>
        <GestureHandlerRootView
          style={{
            flex: 1,
          }}
        >
          <ImageBackground
            source={require("../../../../assets/pixel4.jpg")}
            // source={require("../../../assets/splashx2.png")}
            blurRadius={2}
            resizeMode="cover"
            style={{
              flex: 1,
              backgroundColor: "#ffcb76",
              alignItems: "center",
              paddingTop:
                height * 0.04 < 24
                  ? insets.top + height * 0.005
                  : insets.top + height * 0.015,
              // paddingTop: insets.top + 10,
              paddingBottom: insets.bottom,
            }}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: z(17),
              }}
            >
              <TouchableOpacity
                style={{
                  // zIndex: 2,
                  // position: "absolute",
                  // top: insets.top+,
                  // left: 17,
                  width: z(40),
                  height: z(40),
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
            </View>

            <Text
              style={{
                fontSize: z(26),
                fontFamily: "Righteous_400Regular",
                // color: "rgba(25,145,135,0.3)",
                // color: "rgba(0,0,0,0.3)",
                color: "#909090",
                marginTop: height * 0.01,
                marginBottom: height * 0.03,
                // paddingBottom: 8,
                // padding:10
                // borderBottomColor: "#199187",
                // borderBottomColor: "rgba(0,0,0,0.3)",
                // borderBottomColor: "#199187",
                // borderBottomWidth: 2,
              }}
            >
              Favorites
            </Text>
            <Text
              style={{
                alignSelf: "flex-end",
                paddingRight: 40,
                paddingBottom: height * 0.02,
                fontFamily: "Righteous_400Regular",
                color: "#909090",
              }}
            >
              {favArray[userData.email].length} / 100
            </Text>

            {favArray[userData.email].length ? (
              <View
                style={{
                  // backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  height: viewHeight,
                  width: width,
                  overflow: "hidden",
                }}
              >
                <Carousel
                  ref={favoCarouselRef}
                  onSnapToItem={(index) => {
                    console.log(index);
                  }}
                  onContentSizeChange={(w, h) => {
                    try {
                      // setFlatlistWidth(w);
                      // console.log(w, " ", h);
                      let r = (w - width) / (width - scrollWidth); // 100 > scroll width
                      setRatio(r);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  onScroll={(event) => {
                    // console.log(event.nativeEvent);

                    // if (width === widthState) {
                    //   setWidthState(width - 1);
                    // } else {
                    //   setWidthState(width);
                    // }
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
                  // showsHorizontalScrollIndicator={true}
                  // persistentScrollbar={true}
                  // removeClippedSubviews={true}
                  // inverted={true}
                  initialNumToRender={4}
                  layout={"default"}
                  // layoutCardOffset={40}
                  maxToRenderPerBatch={5}
                  enableSnap={true}
                  // firstItem={0}
                  // firstItem={favArray[userData.email].length - 1}
                  // vertical={true}
                  data={favArray[userData.email]}
                  itemWidth={item_width}
                  // itemHeight={height * 0.325}
                  itemHeight={item_width * (13 / 16)}
                  sliderWidth={width}
                  // sliderHeight={item_width * (13 / 16)}
                  enableMomentum={true}
                  // loop={true}
                  containerCustomStyle={
                    {
                      // backgroundColor: "pink",
                      // alignItems: "center",
                      // marginVertical: 40,
                      // width: width,
                      // padding: 10,
                      // borderWidth: 3,
                      // height: height * 0.5,
                      // borderRadius: 50,
                    }
                  }
                  contentContainerCustomStyle={{
                    // backgroundColor: "lightyellow",
                    // height: height * 0.5,
                    alignItems: "center",
                    // width: item_width,
                    // padding: 20,
                    // borderWidth: 3,
                    borderColor: "green",
                    // borderRadius: 50,
                  }}
                  slideStyle={{
                    // backgroundColor: "grey",
                    // width: item_width,
                    height: item_width * (13 / 16),
                    // borderRadius: 50,
                    // marginHorizontal: 10,
                    // padding: 10,
                    // borderWidth: 3,

                    borderColor: "blue",

                    // alignItems: "center",
                    justifyContent: "center",
                    // height:
                    // width: item_height * (16 / 13),
                  }}
                  // pagingEnabled={true}
                  // useScrollView={true}
                  renderItem={({ item, index }) => {
                    return (
                      <ImageFavComponent
                        favCarouselRef={favoCarouselRef}
                        index={index}
                        imageUrl={item}
                        download={download}
                        // color={"black"}
                      />
                      // <PureFavImage
                      //   favArray={favArray}
                      //   userData={userData}
                      //   dispatch={dispatch}
                      //   download={download}
                      //   favCarouselRef={favCarouselRef}
                      //   index={index}
                      //   imageUrl={item}
                      //   removeFromFav={removeFromFav}
                      // />
                    );
                  }}
                />
              </View>
            ) : (
              <View>
                <Text
                  style={{
                    marginTop: 50,
                    fontSize: z(18),
                    fontFamily: "Righteous_400Regular",
                    color: "#404040",
                  }}
                >
                  No favorites available.
                </Text>
              </View>
            )}
            {favArray[userData.email].length ? (
              <View
                style={{
                  // width: width - 100,
                  // backgroundColor: "yellow",
                  width: "100%",
                  // alignSelf: "flex-end",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: "#40404033",
                  borderRadius: 20,
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
                        backgroundColor: "skyblue",
                        borderRadius: 18,
                        elevation: 8,
                        overflow: "hidden",
                      },
                      rStyle,
                    ]}
                  >
                    <Image
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      source={require("../../../../assets/icon.png")}
                    />
                  </Animated.View>
                </PanGestureHandler>
              </View>
            ) : null}

            <Toast
              topOffset={insets.top + 5}
              // config={toastConfig}
              onPress={() => {
                Toast.hide();
              }}
            />
          </ImageBackground>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    );
  } catch (error) {
    console.log("ErrorID: E055: ", error);
    return <ErrorView Error={"ErrorID: E055"} />;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffcb76",
    alignItems: "center",
    // justifyContent: "center",
    // width: "100%",
  },
  header: {
    fontSize: 24,
    fontFamily: "Righteous_400Regular",
    color: "#fff",
    paddingBottom: 10,
    marginBottom: 80,
    borderBottomColor: "#199187",
    borderBottomWidth: 1,
    // fontWeight: "bold",
    position: "absolute",
    zIndex: 2,
    top: 45,
    left: 65,
  },
  goBack: {
    zIndex: 2,
    position: "absolute",
    top: 45,
    left: 15,
    padding: 5,
    // backgroundColor: "grey",
  },
  content: {
    flex: 1,
    position: "absolute",
    top: 120,
    bottom: 120,
    right: 0,
    left: 0,
    // backgroundColor: "pink",
    marginHorizontal: 20,
    // borderRadius: 10,
    zIndex: 2,
    elevation: 5,

    // marginTop: 120,
  },
  buttonStyle: {
    position: "absolute",
    width: 140,
    height: 35,
    backgroundColor: "#59cbbd",
    elevation: 3,
    bottom: 65,
  },
  buttonContent: {
    padding: 0,
    margin: 0,
    height: "100%",
    width: "100%",
  },
  buttonLabel: {
    padding: 0,
    margin: 0,
  },
});
