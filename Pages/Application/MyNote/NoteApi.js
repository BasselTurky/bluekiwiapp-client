import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import GoBackSVG from "../../../Components/GoBackSVG";
import { BlurView, VibrancyView } from "@react-native-community/blur";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const uri = "https://ak.picdn.net/shutterstock/videos/1060308725/thumb/1.jpg";

export default function NoteApi({ navigation }) {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}
      >
        <Image
          // source={{ uri }}
          source={require("../../../assets/pixel4.jpg")}
          // blurRadius={2}
          style={[
            {
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            },
            StyleSheet.absoluteFill,
          ]}
        />
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
          </View>
          {/* <Text style={{ color: "white" }}>Hello</Text> */}

          <View
            style={{
              // position: "absolute",
              // top: height * 0.73,
              width: 100,
              height: 100,
              borderRadius: 100,
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <BlurView
              // blurAmount={1}
              // blurRadius={1}
              // blurType={"dark"}
              style={
                {
                  // justifyContent: "center",
                  // alignItems: "center",
                }
              }
            >
              <Text style={{ color: "white" }}>Hello</Text>
            </BlurView> */}
          </View>
        </View>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
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
