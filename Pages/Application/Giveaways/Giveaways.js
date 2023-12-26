import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import GoBackSVG from "../../../Components/GoBackSVG";
import PlusIconSVG from "../../../Components/PlusIconSVG";
import CoinsStack from "../../../Components/CoinsStack";

import ErrorView from "../../Error/ErrorView";

import * as SecureStore from "expo-secure-store";
import { setAuth } from "../../../Features/auth";
import { setAvailable } from "../../../Features/available";
import { setWinner } from "../../../Features/winner";

import WinnerUI from "./WinnerUI";
import NonWinnerUI from "./NonWinnerUI";

import { z } from "../../../utils/scaling";
import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

async function deleteValueFor(key) {
  await SecureStore.deleteItemAsync(key);
}

export default function Giveaways({ navigation }) {
  // let currentToken = await SecureStore.getItemAsync("token");
  const dispatch = useDispatch();

  const insets = useSafeAreaInsets();

  const coins = useSelector((state) => state.coins.value);
  const available = useSelector((state) => state.available.value);
  const winner = useSelector((state) => state.winner.value);

  const errorToast = (message) => {
    Toast.show({
      type: "error",
      text1: message,
      text2: "Error",
      visibilityTime: 3000,
    });
  };

  function remainingdDigits(number) {
    var length = (Math.log(number) * Math.LOG10E + 1) | 0;

    let remaining = 3 - length;

    let result = "";
    for (let i = 0; i < remaining; i++) {
      result = result.concat("0");
    }

    return result;
  }

  async function checkIfWinner() {
    try {
      let currentToken = await SecureStore.getItemAsync("token");

      let response = await fetch(`${global.server_address}/api/check-winner`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: currentToken }),
      });

      let data = await response.json();
    } catch (error) {}
  }

  async function refresh() {
    try {
      let currentToken = await SecureStore.getItemAsync("token");

      let response = await fetch(`${global.server_address}/api/check-winner`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: currentToken }),
      });

      let data = await response.json();

      console.log("data re ", data);
    } catch (error) {
      console.log(error);
    }

    // post token
    // update redux
  }

  React.useEffect(() => {
    refresh();
  }, []);

  try {
    return (
      <SafeAreaProvider>
        {/* <Image
          // source={{ uri }}
          source={require("../../../assets/001.jpg")}
          blurRadius={2}
          style={[
            {
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            },
            StyleSheet.absoluteFill,
          ]}
        /> */}
        <View
          // source={require("../../../assets/whiteLayer.png")}
          // resizeMode="cover"
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
              // backgroundColor: "#C88781",
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

          {winner ? (
            <WinnerUI refresh={refresh} />
          ) : (
            <NonWinnerUI refresh={refresh} />
          )}

          {/* <View
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
        </View> */}
        </View>
      </SafeAreaProvider>
    );
  } catch (error) {
    console.log("ErrorID: E059: ", error);
    return <ErrorView Error={"ErrorID: E059"} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffcb76",
    // alignItems: "center",
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

// import {
//   StyleSheet,
//   Text,
//   View,
//   Button,
//   TouchableWithoutFeedback,
//   Keyboard,
//   TextInput,
//   TouchableOpacity,
//   ImageBackground,
//   Dimensions,
//   PermissionsAndroid,
// } from "react-native";
// import React, { useState, useEffect } from "react";
// import RNFetchBlob from "rn-fetch-blob";

// import * as SecureStore from "expo-secure-store";
// import GoBackSVG from "../../../Components/GoBackSVG";

// import { Button as PaperButton } from "react-native-paper";

// import {
//   GestureHandlerRootView,
//   PanGestureHandler,
// } from "react-native-gesture-handler";
// import Animated, {
//   useAnimatedGestureHandler,
//   Easing,
//   useSharedValue,
//   useAnimatedStyle,
//   useDerivedValue,
// } from "react-native-reanimated";

// const width = Dimensions.get("window").width;
// const height = Dimensions.get("window").height;

// async function checkPermissions() {
//   const granted = await PermissionsAndroid.request(
//     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
//   );

//   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//     downloadImage();
//     console.log("granted");
//   } else {
//     alert("Permissions Denied");
//   }
// }

// function downloadImage() {
//   try {
//     let image_URL =
//       // "https://drive.google.com/uc?id=1swNMMHZhVkAnUnazhCmhKuGf0A_KphyQ";
//       "https://pixabay.com/images/download/flower-7705484_1920.jpg?attachment";
//     // https://pixabay.com/images/download/flower-7705484_1920.jpg

//     const { config, fs } = RNFetchBlob;
//     let PictureDir = fs.dirs.PictureDir;
//     config({
//       addAndroidDownloads: {
//         useDownloadManager: true,
//         notification: true,
//         description: "Image",
//         path: PictureDir + "/wallpaper_" + Date.now() + ".jpg",
//       },
//     }).fetch("GET", image_URL);
//   } catch (error) {
//     console.log(error);
//   }
// }

// const translateX = useSharedValue(0);

// const adjustedTranslateX = useDerivedValue(() => {
//   return Math.min(Math.max(translateX.value, 0), width - 100);
// });

// const panGestureEvent = useAnimatedGestureHandler({
//   onStart: (event, context) => {
//     context.translateX = adjustedTranslateX.value;
//   },
//   onActive: (event, context) => {
//     translateX.value = event.translationX + context.translateX;
//     console.log(event.translationX);
//   },
//   onEnd: (event) => {},
// });

// const rStyle = useAnimatedStyle(() => {
//   return {
//     transform: [
//       {
//         translateX: adjustedTranslateX.value,
//       },
//     ],
//   };
// });

{
  /* <ImageBackground
source={require("../../../assets/HomeBackground.png")}
resizeMode="cover"
style={styles.container}
>
<Text style={styles.header}>Givaway Pool</Text>
<TouchableOpacity
  style={styles.goBack}
  onPress={() => {
    navigation.goBack();
  }}
>
  <GoBackSVG fill={"#fff"} width={24} height={24} />
</TouchableOpacity>

<Text>Hello</Text>
<Button
  title="download"
  onPress={() => {
    checkPermissions();
  }}
/>
</ImageBackground> */
}
