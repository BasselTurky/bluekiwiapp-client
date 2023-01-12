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
  Image,
  Animated,
  Easing,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";

import GoBackSVG from "../../../Components/GoBackSVG";
import FavoriteIconSVG from "../../../Components/FavoriteIconSVG";
import ExclamationIcon from "../../../Components/ExclamationIcon";
import DashIcon from "../../../Components/DashIcon";

import { setDailyWallpapers } from "../../../Features/dailyWallpapers";
import Carousel from "react-native-snap-carousel";
import { Button as PaperButton } from "react-native-paper";
import { setTipsMenuWallpaper } from "../../../Features/tipsMenuWallpaper";
import { setColorsArray } from "../../../Features/colorsArray";

import WallpaperCard from "../components/WallpaperCard";

import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import ImageColors from "react-native-image-colors";

const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const viewHeight = height * 0.7;
const item_height = height * 0.7;

const xInt = -(width * 0.9);
const yInt = height * 0.28;

export default function WallpaperApi({ navigation }) {
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();
  const dailyWallpapers = useSelector((state) => state.dailyWallpapers.value);
  const colorsArray = useSelector((state) => state.colorsArray.value);

  const tipsMenuWallpaper = useSelector(
    (state) => state.tipsMenuWallpaper.value
  );
  const [isDisabled, setIsDisabled] = useState(false);

  const [color, setColor] = React.useState("grey");
  const [iniColor, setIniColor] = React.useState(
    colorsArray.length ? colorsArray[0] : "#C88781"
  );
  const [iniIndex, setIniIndex] = React.useState(0);
  const [nextColor, setNextColor] = React.useState({ color: "grey", index: 1 });
  const [val, setVal] = React.useState(0);

  const animateMenuX = React.useRef(new Animated.Value(xInt)).current;

  function toggleMenu() {}
  Animated.timing(animateMenuX, {
    // toValue: { x: 0, y: yInt },
    toValue: tipsMenuWallpaper ? xInt : 0,
    duration: 1000,
    useNativeDriver: false,
    easing: Easing.out(Easing.sin),
  }).start(({ finished }) => {
    if (finished) {
      setIsDisabled(false);
    }
  });

  const animatedColor = new Animated.Value(0);

  const colorRange = animatedColor.interpolate({
    inputRange: [0, 1],
    outputRange: [iniColor, nextColor.color],
  });

  function animate(index) {
    // colorRange.interpolate(animatedColor, [0, 1], ["blue", "yellow"]);

    Animated.timing(animatedColor, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        setIniColor(colorsArray[index]);
        // animatedColor.setValue(0);

        // console.log("finished");
      }
    });
  }
  useEffect(() => {
    animate(nextColor.index);
  }, [nextColor]);

  useEffect(() => {
    animatedColor.setValue(0);
  }, [iniColor]);

  async function fetchWallpapers() {
    let currentToken = await SecureStore.getItemAsync("token");
    const response = await fetch(
      `${global.server_address}/api/get-daily-wallpapers`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: currentToken,
        }),
      }
    );

    const data = await response.json();
    if (data.type === "success") {
      // type of - data.date: string
      // type of - data.result: array of objects > object is image row in database
      // image object has:  wallpapers_id, date, img_link, average_color, product_link, downloads
      const images_array = data.result;
      const extracted_colores = [];
      for (let i = 0; i < images_array.length; i++) {
        extracted_colores.push(images_array[i].average_color);
      }
      dispatch(setColorsArray(extracted_colores));
      dispatch(
        setDailyWallpapers({
          date: data.date,
          value: data.result,
        })
      );
    }
  }

  async function getDailyWallpapers() {
    let response = await fetch(`https://worldtimeapi.org/api/timezone/Etc/UTC`);
    let data = await response.json();
    let utc_time = data.utc_datetime;

    let shortened_date = utc_time.substring(0, 10);
    let date = new Date(shortened_date).getTime();

    // check if date is not null
    if (!dailyWallpapers.date) {
      // call api
      fetchWallpapers();
    } else if (date > new Date(dailyWallpapers.date).getTime()) {
      // call api

      fetchWallpapers();
    } else {
      // do nuthing
      console.log("doing nothing");
      // console.log(dailyWallpapers);
    }
  }

  useEffect(() => {
    getDailyWallpapers();
  }, [dailyWallpapers]);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}
      >
        <AnimatedImageBackground
          source={require("../../../assets/whiteLayer.png")}
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
              // paddingTop: insets.top + 10,
              paddingBottom: insets.bottom,
              backgroundColor: colorRange,
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

            <TouchableOpacity
              style={{
                // zIndex: 2,
                // position: "absolute",
                // top: 30,
                // right: 17,
                // marginRight: 17,
                width: 40,
                height: 40,
                backgroundColor: "rgba(0,0,0,0.3)",
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
              disabled={isDisabled}
              onPress={() => {
                if (tipsMenuWallpaper) {
                  dispatch(setTipsMenuWallpaper(false));
                  setIsDisabled(true);
                  toggleMenu();
                } else {
                  dispatch(setTipsMenuWallpaper(true));
                  setIsDisabled(true);
                  toggleMenu();
                  // closeMenu();
                }
              }}
              activeOpacity={0.7}
            >
              {!tipsMenuWallpaper ? (
                <DashIcon fill={"#fff"} width={18} height={18} />
              ) : (
                <ExclamationIcon fill={"#fff"} width={18} height={18} />
              )}
            </TouchableOpacity>
          </View>

          <Animated.View
            style={[
              {
                position: "absolute",
                width: width * 0.8,
                // height: height * 0.54,
                backgroundColor: "rgba(0,0,0,0.6)",
                left: 0,
                top: 0.5 * height - 0.5 * (height * 0.54),
                borderBottomRightRadius: 20,
                borderTopRightRadius: 20,
                zIndex: 2,
                transform: [
                  {
                    translateX: animateMenuX,
                  },
                ],
                paddingBottom: 10,
              },
              // animatedMenu.getLayout(),
            ]}
          >
            <Text style={styles.tips}>
              Wallpapers change daily, with 5 new wallpapers every day.
            </Text>
            <Text style={styles.tips}>
              From the twenty-eighth day until the end of the month, the
              wallpapers with the highest download numbers will be displayed.
            </Text>
            <Text style={styles.tips}>
              At the end of each month, all the wallpapers that were viewed in
              that month will be added to the permanent section and will require
              a higher amount of coins to download.
            </Text>
            {/* <Text style={styles.tips}>Coins are bind to the account</Text> */}
          </Animated.View>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
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
                // ref={carouselRef}
                data={dailyWallpapers.value}
                itemWidth={item_height * (30 / 49)}
                itemHeight={item_height}
                sliderWidth={width}
                sliderHeight={viewHeight}
                enableMomentum={true}
                onSnapToItem={(index) => {
                  setNextColor({ color: colorsArray[index], index: index });
                }}
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
                }}
                renderItem={({ item, index }) => {
                  return (
                    <WallpaperCard item={item} />
                    // <View
                    //   style={{
                    //     backgroundColor: "black",
                    //     height: "100%",
                    //     width: "100%",
                    //     borderRadius: 30,
                    //     overflow: "hidden",
                    //   }}
                    // >
                    //   <Image
                    //     style={{
                    //       width: "100%",
                    //       height: "100%",
                    //       // borderRadius: 20,
                    //     }}
                    //     resizeMode="contain"
                    //     source={{
                    //       uri: item.img_link,
                    //     }}
                    //   />
                    // </View>
                  );
                }}
              />
            </View>
          </View>

          <Button
            title="hello"
            onPress={() => {
              console.log(colorsArray);
            }}
          />
        </AnimatedImageBackground>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#C88781",
    // alignItems: "center",
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
    backgroundColor: "#C88781",
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
  tips: {
    fontSize: height * 0.04 < 24 ? 16 : 18,
    color: "white",
    fontFamily: "Righteous_400Regular",
    paddingHorizontal: 15,
    paddingTop: height * 0.03,
  },
});

{
  /* <View
            style={{
              // backgroundColor: "rgba(0,0,0,0.1)",
              alignItems: "center",
              justifyContent: "center",
              height: viewHeight,
              width: width,
              // overflow: "hidden",
              // borderRadius: 80,
              // borderBottomLeftRadius: 80,
              // borderBottomRightRadius: 80,
              // elevation: 5,
              // borderWidth: StyleSheet.hairlineWidth,
              // borderColor: "rgba(0,0,0,0.5)",
            }}
          >
            <Carousel
              // ref={carouselRef}
              // vertical={true}
              data={dailyWallpapers.value}
              itemWidth={item_height * (30 / 49)}
              // itemHeight={height * 0.325}
              itemHeight={item_height}
              sliderWidth={width}
              sliderHeight={viewHeight}
              enableMomentum={true}
              onSnapToItem={(index) => {
                // setCurrentSlide(index);
                // console.log(iniColor);
                // console.log(index);
                // console.log(nextColor);
                // setNextColor(colorsArray[index]);
                // console.log(nextColor);
                setNextColor({ color: colorsArray[index], index: index });
                // animate(iniIndex, index);

                // console.log(iniColor);
              }}
              // loop={true}
              containerCustomStyle={{
                // backgroundColor: "pink",
                // alignItems: "center",
                // marginVertical: 40,
                width: width,
                // padding: 10,
                // borderWidth: 3,

                // height: height * 0.5,
                borderRadius: 50,
              }}
              contentContainerCustomStyle={{
                // backgroundColor: "lightyellow",
                // height: height * 0.5,
                alignItems: "center",
                // width: width * 0.4,
                // padding: 20,
                // borderWidth: 3,
                borderColor: "green",
                // borderRadius: 50,
              }}
              slideStyle={{
                // backgroundColor: "grey",
                // width: width * 0.5,
                // height: height * 0.5,
                // borderRadius: 50,

                // padding: 10,
                // borderWidth: 3,

                borderColor: "blue",

                // alignItems: "center",
                justifyContent: "center",
                height: item_height,
                width: item_height * (30 / 49),
                // overflow: "hidden",
              }}
              // pagingEnabled={true}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      backgroundColor: "black",
                      height: "100%",
                      width: "100%",
                      borderRadius: 30,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      style={{
                        width: "100%",
                        height: "100%",
                        // borderRadius: 20,
                      }}
                      resizeMode="contain"
                      // resizeMethod={"resize"}
                      source={{
                        uri: item.img_link,
                      }}
                    />
                  </View>
                );
              }}
            />
          </View> */
}
