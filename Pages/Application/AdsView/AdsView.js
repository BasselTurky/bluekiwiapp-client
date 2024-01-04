import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  Dimensions,
  Image,
  ActivityIndicator,
  Animated,
  Easing,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { z, zx } from "../../../utils/scaling";
import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../SocketContext/SocketContext";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { setCoins, addCoin, consumeCoins } from "../../../Features/coins";
import { setLoadedAd } from "../../../Features/loadedAd";
import { setTipsMenu } from "../../../Features/tipsMenu";

import { Button as PaperButton } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useToast } from "react-native-toast-notifications";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  RewardedAd,
  InterstitialAd,
  AdEventType,
  RewardedInterstitialAd,
  RewardedAdEventType,
  useRewardedAd,
} from "react-native-google-mobile-ads";

import GoBackSVG from "../../../Components/GoBackSVG";
import AdAlert from "../../../Components/AdAlertSVG";
import KiwiCoinSVG from "../../../Components/KiwiCoinSVG";
import WatchSVG from "../../../Components/WatchSVG";

import ExclamationIcon from "../../../Components/ExclamationIcon";
import DashIcon from "../../../Components/DashIcon";

const rewarded = RewardedAd.createForAdRequest(
  // TestIds.REWARDED_INTERSTITIAL,
  "ca-app-pub-4213110958189376/7153602373",
  {
    // requestNonPersonalizedAdsOnly: true,
    keywords: ["trading", "software", "online trading"],
  }
);

// var timing;

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

// const xInt = -(width * 0.9);
const xInt = -(width * 0.9);
const yInt = height * 0.28;

export default function AdsView({ navigation }) {
  const socket = useSocket();
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.value);
  const auth = useSelector((state) => state.auth.value);
  const tipsMenu = useSelector((state) => state.tipsMenu.value);
  const [isDisabled, setIsDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showLoading, setShowLoading] = useState(false);

  // const xlast = tipsMenu ? -(width * 0.8) : 0;
  // const ylast = height * 0.28;

  // const animatedMenu = React.useRef(
  //   new Animated.ValueXY({ x: xInt, y: yInt })
  // ).current;

  const animateMenuX = React.useRef(new Animated.Value(xInt)).current;

  function toggleMenu() {}
  Animated.timing(animateMenuX, {
    // toValue: { x: 0, y: yInt },
    toValue: tipsMenu ? 0 : xInt,
    duration: 1000,
    useNativeDriver: false,
    easing: Easing.out(Easing.sin),
  }).start(({ finished }) => {
    if (finished) {
      setIsDisabled(false);
    }
  });
  // function closeMenu() {
  //   Animated.timing(animatedMenu, {
  //     toValue: { x: -(width * 0.9), y: yInt },
  //     duration: 1000,
  //     useNativeDriver: false,
  //     easing: Easing.out(Easing.sin),
  //   }).start(({ finished }) => {
  //     if (finished) {
  //       setIsDisabled(false);
  //       console.log("done");
  //     }
  //   });
  // }
  const [adRequested, setAdRequested] = useState(false);
  const {
    isLoaded,
    isOpened,
    isClosed,
    isShowing,
    error,
    reward,
    isEarnedReward,
    load,
    show,
    revenue,
  } = useRewardedAd("ca-app-pub-4213110958189376/7153602373", {
    keywords: [
      "trading",
      "software",
      "online trading",
      "fashion",
      "clothing",
      "game",
    ],
    requestNonPersonalizedAdsOnly: true,
  });
  // TestIds.REWARDED
  // "ca-app-pub-4213110958189376/7153602373"

  const requestRewardedAd = useCallback(() => {
    load();
    setAdRequested(true);
  }, [load]);

  async function gainReward() {
    socket.emit("save-coin", revenue);
    // if (auth === "default") {
    //   let currentToken = await SecureStore.getItemAsync("token");
    //   socket.emit(
    //     "save-coin",
    //     { type: "default", token: currentToken },
    //     revenue
    //   );
    // } else if (auth === "google") {
    //   const isSignedIn = await GoogleSignin.isSignedIn();
    //   if (isSignedIn) {
    //     const currentUser = await GoogleSignin.getCurrentUser();
    //     socket.emit(
    //       "save-coin",
    //       {
    //         type: "google",
    //         email: currentUser.user.email,
    //       },
    //       revenue
    //     );
    //   }
    // }
  }

  async function gainReward_() {
    try {
      let currentToken = await SecureStore.getItemAsync("token");
      let response = await fetch(`${global.server_address}/api/save-coin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: currentToken,
        }),
      });

      let data = await response.json();

      if (data.type === "error") {
        // ErrorID: E034
        toast.show(data.message, { type: "error" });
      } else if (data.type === "wrong-device") {
        deleteValueFor("token");
        dispatch(setAuth(false));
      } else if (data.type === "success") {
        dispatch(addCoin());
      } else {
        toast.show("ErrorID: E033", { type: "error" });
      }
    } catch (error) {
      console.log("ErrorID: E032: ", error);
      toast.show("ErrorID: E032", { type: "error" });
    }
  }

  useEffect(() => {
    if (error) {
      if (error.code === "adRequestFailed") {
        console.log("Ad request failed. Please check your network connection.");
      } else if (error.code === "noFill") {
        console.log(
          "No ad fill. No ad inventory available for the requested ad unit."
        );
      } else if (error.code === "internalError") {
        console.log("Internal error. Something went wrong on the ad server.");
      } else {
        console.log("Unknown error:", error.message);
      }

      console.log(error);
      toast.show("No ads available.");
      setAdRequested(false);
    }
  }, [error]);

  useEffect(() => {
    try {
      if (isLoaded) {
        show();
      }
    } catch (error) {
      console.log("ErrorID: E035: ", error);
      toast.show("ErrorID: E035", { type: "error" });
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isOpened) {
      setTimer(Date.now());
      setAdRequested(false);
    }
  }, [isOpened]);

  useEffect(() => {
    if (isClosed) {
      // setShowLoading(false);
      let total = Date.now() - timer;
      console.log(total);
      if (total >= 15000) {
        gainReward();
        console.log("Rewarded");
        if (revenue) {
          console.log(typeof revenue.value);
          console.log(
            revenue.currency,
            " :: ",
            revenue.value,
            " :: ",
            revenue.precision
          );
        }
      }
    }
  }, [isClosed, timer]);

  return (
    <View
      // source={require("../../../assets/001.jpg")}
      // source={require("../../../assets/ads-view-img2.png")}
      // resizeMode="cover"
      style={styles.container}
      // blurRadius={2}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.View
          style={[
            {
              position: "absolute",
              width: width * 0.8,
              // height: zx(400),
              paddingBottom: z(22),
              backgroundColor: "rgba(0,0,0,0.4)",
              left: 0,
              borderBottomRightRadius: z(20),
              borderTopRightRadius: z(20),
              transform: [
                {
                  translateX: animateMenuX,
                },
              ],
            },
            // animatedMenu.getLayout(),
          ]}
        >
          <Text style={styles.tips}>
            Watching ads till the end will grant you x2 coins.
          </Text>
          <Text style={styles.tips}>
            Reward will not be granted if the ad is skipped, even if 'Reward
            granted' notification showed up.
          </Text>
          <Text style={styles.tips}>
            Coins can be used to download wallpapers or to unlock a new feature.
          </Text>
          <Text style={styles.tips}>Coins are bind to the account</Text>
        </Animated.View>
      </View>

      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <View style={{ position: "absolute", bottom: 100 }}>
          <TouchableOpacity
            style={styles.watchButton}
            activeOpacity={0.7}
            // disabled={isLoaded ? false : true}
            onPress={
              // () => {
              // load();
              // setShowLoading(true);
              requestRewardedAd

              // show();

              // timing = Date.now();
              // console.log("started at ", timing);
              // }
            }
          >
            {adRequested ? (
              <ActivityIndicator size={"large"} color={"#7caac2"} />
            ) : (
              <Text
                style={{
                  marginHorizontal: z(10),
                  fontSize: z(18),

                  color: "white",
                  fontFamily: "Righteous_400Regular",
                }}
              >
                Watch now
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View
          style={{
            // backgroundColor: "pink",
            width: "100%",
            // height: 40,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={{
              // zIndex: 2,
              // position: "absolute",
              // top: 30,
              // left: 17,
              marginLeft: 17,
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
            activeOpacity={0.7}
          >
            <GoBackSVG fill={"#fff"} width={15} height={15} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              // zIndex: 2,
              // position: "absolute",
              // top: 30,
              // right: 17,
              marginRight: 17,
              width: 40,
              height: 40,
              backgroundColor: "rgba(0,0,0,0.3)",
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
            disabled={isDisabled}
            onPress={() => {
              if (tipsMenu) {
                dispatch(setTipsMenu(false));
                setIsDisabled(true);
                // toggleMenu();
              } else {
                dispatch(setTipsMenu(true));
                setIsDisabled(true);
                // toggleMenu();
                // closeMenu();
              }
            }}
            activeOpacity={0.7}
          >
            {tipsMenu ? (
              <DashIcon fill={"#fff"} width={18} height={18} />
            ) : (
              <ExclamationIcon fill={"#fff"} width={18} height={18} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#000",
    // backgroundColor: "#669cb7",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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
  watchButton: {
    marginTop: 10,
    flexDirection: "row",
    width: z(160),
    height: z(60),
    // width: 112,
    // height: 112,
    // borderRadius: 160,
    // borderWidth: 2,
    borderRadius: z(10),
    // borderColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.3)",
    // backgroundColor: "#8fbdff",
    paddingHorizontal: z(5),
    elevation: 5,
    zIndex: 5,
  },
  tips: {
    // fontSize: height * 0.04 < 24 ? 16 : 18,
    fontSize: z(18),
    color: "white",
    fontFamily: "Righteous_400Regular",
    paddingHorizontal: 15,
    paddingTop: z(22),
  },
});

// useEffect(() => {
//   const unsubscribeLoaded = rewarded.addAdEventListener(
//     RewardedAdEventType.LOADED,
//     () => {

//       dispatch(setLoadedAd(true));
//       console.log("loaded");
//     }
//   );

//   const unsubscribeEarned = rewarded.addAdEventListener(
//     RewardedAdEventType.EARNED_REWARD,
//     async (reward) => {
//       console.log(reward);

//       try {
//         let response = await fetch(`${global.server_address}/api/save-coin`, {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: userData.email,
//             device_id: userData.device_id,
//           }),
//         });

//         let data = await response.json();

//         if (data.type === "error") {
//           toast.show(data.message,{type:'error'});
//         } else if (data.type === "wrong-device") {
//           deleteValueFor("token");
//           dispatch(setAuth(false));
//         } else if (data.type === "success") {
//           dispatch(addCoin());
//         } else {
//           console.log(data);
//           errorToast("Something went wrong!");
//         }
//       } catch (error) {
//         console.log(error);
//         errorToast("Something went wrong!");
//       }
//     }
//   );

//   const unsubscribeClosed = rewarded.addAdEventListener(
//     AdEventType.CLOSED,
//     () => {
//       let currentTime = Date.now();
//       console.log("ended: ", currentTime - timing);

//       dispatch(setLoadedAd(false));
//       rewarded.load();
//     }
//   );

//   rewarded.load();

//   return () => {
//     unsubscribeLoaded();
//     unsubscribeEarned();
//     unsubscribeClosed();

//   };
// }, [userData]);

{
  /* {isLoaded ? "Watch now" : "Loading.."} */
}
{
  /* <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            backgroundColor: "#435875",
            padding: 4,
            paddingHorizontal: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            justifyContent: "center",
            zIndex: 4,
            borderBottomWidth: 2,
            borderBottomColor: "grey",
          }}
        >
          <Text
            style={{
              // marginHorizontal: 10,
              fontSize: 14,
              // fontWeight: "bold",
              color: "white",

              marginRight: 5,
              //   fontFamily: "ConcertOne_400Regular",
            }}
          >
            Receive:
          </Text>
          <KiwiCoinSVG height={22} width={22} />
        </View> */
}
