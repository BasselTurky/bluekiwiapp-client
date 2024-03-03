import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../SocketContext/SocketContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { z, zx } from "../../../utils/scaling";
import { useToast } from "react-native-toast-notifications";
import GoBackSVG from "../../../Components/GoBackSVG";

import { setDailyWallpapers } from "../../../Features/dailyWallpapers";
import Carousel from "react-native-snap-carousel";
import { setColorsArray } from "../../../Features/colorsArray";

import WallpaperCard from "./components/WallpaperCard";

import ErrorView from "../../Error/ErrorView";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import PlusIconSVG from "../../../Components/PlusIconSVG";
import CoinsStack from "../../../Components/CoinsStack";
import SingleKiwiCoin from "../../../Components/SingleKiwiCoin";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const viewHeight = height * 0.7;
const item_height = height * 0.7;

const xInt = -(width * 0.9);
const yInt = height * 0.28;

export default function WallpaperApi({ navigation }) {
  const socket = useSocket();
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const dispatch = useDispatch();
  const dailyWallpapers = useSelector((state) => state.dailyWallpapers.value);
  const colorsArray = useSelector((state) => state.colorsArray.value);
  const coins = useSelector((state) => state.coins.value);

  const tipsMenuWallpaper = useSelector(
    (state) => state.tipsMenuWallpaper.value
  );
  const [isDisabled, setIsDisabled] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const [iniColor, setIniColor] = React.useState(
    colorsArray.length ? colorsArray[0] : "#C88781"
  );
  const [nextColor, setNextColor] = React.useState({ color: "grey", index: 1 });
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
    Animated.timing(animatedColor, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        setIniColor(colorsArray[index]);
      }
    });
  }
  useEffect(() => {
    try {
      animate(nextColor.index);
    } catch (error) {
      console.log("ErrorID: E036: ", error);
      toast.show("ErrorID: E036", { type: "error" });
    }
  }, [nextColor]);

  useEffect(() => {
    animatedColor.setValue(0);
  }, [iniColor]);

  function fetchWallpapers() {
    socket.emit("get-daily-wallpapers");
  }

  useEffect(() => {
    socket.on("daily-wallpapers", (data) => {
      const images_array = data.result;
      console.log(
        "🚀 ~ file: WallpaperApi.js:116 ~ socket.on ~ images_array:",
        images_array
      );
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
    });

    return () => {};
  }, []);

  async function getDailyWallpapers() {
    try {
      // const currentUtcTime = new Date().toUTCString();
      // const currentDate = new Date();
      // console.log(
      //   "🚀 ~ file: WallpaperApi.js:135 ~ getDailyWallpapers ~ currentUtcTime:",
      //   currentUtcTime
      // );
      // let response = await fetch(
      //   `https://worldtimeapi.org/api/timezone/Etc/UTC`
      // );
      // let data = await response.json();
      // console.log(
      //   "🚀 ~ file: WallpaperApi.js:138 ~ getDailyWallpapers ~ data:",
      //   data
      // );
      // let utc_time = data.utc_datetime;
      // let utc_time = data.utc_datetime;

      // let shortened_date = utc_time.substring(0, 10);
      const today = new Date().toISOString().split("T")[0];
      // let date = new Date(today).getTime();
      // console.log(
      //   "🚀 ~ file: WallpaperApi.js:142 ~ getDailyWallpapers ~ date:",
      //   date
      // );

      // check if date is not null
      if (!dailyWallpapers.date) {
        // call api
        console.log("date null");
        fetchWallpapers();
      } else if (new Date(today) > new Date(dailyWallpapers.date)) {
        // call api
        console.log("date not null");
        fetchWallpapers();
      } else {
        // do nuthing
        console.log("doing nothing");
        // console.log(dailyWallpapers);
      }
    } catch (error) {
      console.log("ErrorID: E040: ", error);
      toast.show("ErrorID: E040", { type: "error" });
    }
  }

  useEffect(() => {
    getDailyWallpapers();
  }, [dailyWallpapers]);

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
        <AnimatedImageBackground
          source={require("../../../assets/blackLayer.png")}
          resizeMode="cover"
          style={[
            {
              flex: 1,
              alignItems: "center",
              paddingTop:
                height * 0.04 < 24
                  ? insets.top + height * 0.005
                  : insets.top + height * 0.015,
              paddingBottom: insets.bottom,
              backgroundColor: colorRange,
            },
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
                width: zx(40),
                height: zx(40),
                backgroundColor: "rgba(0,0,0,0.1)",
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              {/* <GoBackSVG fill={"#fff"} width={zx(15)} height={zx(15)} /> */}
              <Entypo name="chevron-left" size={30} color="black" />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                // backgroundColor: "blue",
              }}
            >
              <TouchableOpacity
                style={{
                  marginRight: z(10),
                }}
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate("AdsView");
                }}
              >
                <PlusIconSVG height={30} width={30} />
              </TouchableOpacity>

              <View
                style={{
                  // flex: 4,
                  flexDirection: "row",
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,0.1)",
                  justifyContent: "center",
                  alignItems: "center",
                  height: zx(40),
                  borderRadius: z(6),
                  paddingHorizontal: z(10),
                  width: z(140),
                  marginRight: z(18),
                  paddingRightmarginRight: z(20),
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    right: z(-20),
                  }}
                >
                  <SingleKiwiCoin height={z(46)} width={z(46)} />
                </View>

                <Text
                  style={{
                    fontSize: z(18),
                    color: "#fff",
                    // fontFamily: "RobotoRegular",
                    fontWeight: "bold",
                    textAlign: "center",
                    letterSpacing: z(2),
                  }}
                >
                  {coins.toString().padStart(4, "0")}
                </Text>
              </View>
            </View>

            {/* <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
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

              <View>
                <CoinsStack height={z(50)} width={z(50)} />
              </View>
            </View> */}
          </View>

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
                    <WallpaperCard
                      key={index}
                      index={index}
                      item={item}
                      type={"daily"}
                      required_coins={1}
                    />
                  );
                }}
              />
            </View>
          </View>
        </AnimatedImageBackground>
      </GestureHandlerRootView>
    );
  } catch (error) {
    console.log("ErrorID: E041: ", error);
    return <ErrorView Error={"ErrorID: E041"} />;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#C88781",
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
    fontSize: z(18),
    color: "white",
    fontFamily: "Righteous_400Regular",
    paddingHorizontal: z(15),
    paddingTop: z(22),
  },

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
