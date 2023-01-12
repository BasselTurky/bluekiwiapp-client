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
import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";

import { setCoins, addCoin, consumeCoins } from "../../../Features/coins";
import { setLoadedAd } from "../../../Features/loadedAd";
import { setTipsMenu } from "../../../Features/tipsMenu";

import { Button as PaperButton } from "react-native-paper";
import Toast from "react-native-toast-message";
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
import MaskCircle from "../components/MaskCircle";
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
  const insets = useSafeAreaInsets();
  // const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.value);
  const tipsMenu = useSelector((state) => state.tipsMenu.value);
  const [isDisabled, setIsDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  // const xlast = tipsMenu ? -(width * 0.8) : 0;
  // const ylast = height * 0.28;

  // const animatedMenu = React.useRef(
  //   new Animated.ValueXY({ x: xInt, y: yInt })
  // ).current;

  const animateMenuX = React.useRef(new Animated.Value(xInt)).current;

  function toggleMenu() {}
  Animated.timing(animateMenuX, {
    // toValue: { x: 0, y: yInt },
    toValue: tipsMenu ? xInt : 0,
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
  } = useRewardedAd(TestIds.REWARDED, {
    // keywords: ["trading", "software", "online trading"],
  });

  // "ca-app-pub-4213110958189376/7153602373"
  const errorToast = (message) => {
    Toast.show({
      type: "error",
      text1: message,
      text2: "Error",
      visibilityTime: 3000,
    });
  };

  async function gainReward() {
    try {
      let response = await fetch(`${global.server_address}/api/save-coin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          device_id: userData.device_id,
        }),
      });

      let data = await response.json();

      if (data.type === "error") {
        errorToast(data.message);
      } else if (data.type === "wrong-device") {
        deleteValueFor("token");
        dispatch(setAuth(false));
      } else if (data.type === "success") {
        dispatch(addCoin());
      } else {
        console.log(data);
        errorToast("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
      errorToast("Something went wrong!");
    }
  }

  useEffect(() => {
    // start loading the ad
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed) {
      load();
    }
  }, [isClosed, load]);

  useEffect(() => {
    if (isOpened) {
      setTimer(Date.now());
    }
  }, [isOpened]);

  useEffect(() => {
    if (isClosed) {
      let total = Date.now() - timer;
      console.log(total);
      if (total >= 15000) {
        gainReward();
        console.log("Rewarded");
      }
    }
  }, [isClosed, timer]);

  return (
    <SafeAreaProvider>
      <ImageBackground
        // source={require("../../../assets/HomeBackground.png")}
        source={require("../../../assets/ads-view-img2.png")}
        resizeMode="cover"
        style={styles.container}
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
                height: height * 0.54,
                backgroundColor: "rgba(0,0,0,0.4)",
                left: 0,
                borderBottomRightRadius: 20,
                borderTopRightRadius: 20,
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
              Coins can be used to download wallpapers or to unlock a new
              feature.
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
              disabled={isLoaded ? false : true}
              onPress={() => {
                show();
                // timing = Date.now();
                // console.log("started at ", timing);
              }}
            >
              {isLoaded ? (
                <Text
                  style={{
                    marginHorizontal: 10,
                    fontSize: 18,

                    color: "white",
                    fontFamily: "Righteous_400Regular",
                  }}
                >
                  Watch now
                </Text>
              ) : (
                <ActivityIndicator size={"large"} color={"#7caac2"} />
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
                  toggleMenu();
                } else {
                  dispatch(setTipsMenu(true));
                  setIsDisabled(true);
                  toggleMenu();
                  // closeMenu();
                }
              }}
              activeOpacity={0.7}
            >
              {!tipsMenu ? (
                <DashIcon fill={"#fff"} width={18} height={18} />
              ) : (
                <ExclamationIcon fill={"#fff"} width={18} height={18} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <Toast
          topOffset={20}
          onPress={() => {
            Toast.hide();
          }}
        />
      </ImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffcb76",
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
    width: 160,
    height: 60,
    // width: 112,
    // height: 112,
    // borderRadius: 160,
    // borderWidth: 2,
    borderRadius: 10,
    // borderColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.3)",
    // backgroundColor: "#8fbdff",
    paddingHorizontal: 5,
    elevation: 5,
    zIndex: 5,
  },
  tips: {
    fontSize: height * 0.04 < 24 ? 16 : 18,
    color: "white",
    fontFamily: "Righteous_400Regular",
    paddingHorizontal: 15,
    paddingTop: height * 0.03,
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
//           errorToast(data.message);
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
