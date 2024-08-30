import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  Button,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import GoBackSVG from "../../../Components/GoBackSVG";
import PlusIconSVG from "../../../Components/PlusIconSVG";
import CoinsStack from "../../../Components/CoinsStack";
import SingleKiwiCoin from "../../../Components/SingleKiwiCoin";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import ErrorView from "../../Error/ErrorView";

import * as SecureStore from "expo-secure-store";
import { setAuth } from "../../../Features/auth";
import { setAvailable } from "../../../Features/available";
import { setWinner } from "../../../Features/winner";

import { TabView, SceneMap } from "react-native-tab-view";

import WinnerUI from "./WinnerUI";
import NonWinnerUI from "./NonWinnerUI";
import GiveawaysHeader from "./GiveawaysHeader";
import ViewX from "./ViewX";
import ViewZ from "./ViewZ";
import GiveawaysContainer from "./GiveawaysContainer";
import HistoryView from "./HistoryView";

import { z, zx } from "../../../utils/scaling";
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
  const layout = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const coins = useSelector((state) => state.coins.value);
  const available = useSelector((state) => state.available.value);
  const winner = useSelector((state) => state.winner.value);
  const giveawayX = useSelector((state) => state.giveawayX.value);
  const giveawayZ = useSelector((state) => state.giveawayZ.value);
  const giveawayHistory = useSelector((state) => state.giveawayHistory.value);

  const FirstRoute = React.useMemo(
    () => () =>
      (
        <GiveawaysContainer />
        // <View style={styles.cont}>
        //   <Text>first view</Text>
        //   <Button
        //     title="Go Back"
        //     onPress={() => {
        //       navigation.goBack();
        //     }}
        //   />
        //   <Button
        //     title="Log X"
        //     onPress={() => {
        //       console.log(giveawayX);
        //     }}
        //   />
        //   <Button
        //     title="Log Z"
        //     onPress={() => {
        //       console.log(giveawayZ);
        //     }}
        //   />
        // </View>
      ),
    []
  );

  const SecondRoute = React.useMemo(() => () => <HistoryView />, []);

  const renderScene = React.useMemo(
    () =>
      SceneMap({
        first: FirstRoute,
        second: SecondRoute,
      }),
    [FirstRoute, SecondRoute]
  );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);

  // try {
  return (
    <View
      style={{
        flex: 1,
        // opacity: 1,
        backgroundColor: "#fff",
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      {/* <Button
        title="back"
        onPress={() => {
          navigation.goBack();
        }}
      /> */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        animationEnabled={true}
        swipeEnabled={true}
        renderTabBar={() => (
          <GiveawaysHeader
            index={index}
            setIndex={setIndex}
            navigation={navigation}
          />
        )}
        // sceneContainerStyle={{ opacity: 1, backgroundColor: "#fff" }}
      />
    </View>
  );
  // } catch (error) {
  //   console.log("ErrorID: E059: ", error);
  //   return <ErrorView Error={"ErrorID: E059"} />;
  // }
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

// {

//   <SafeAreaProvider>

//   <View

//     style={[
//       {
//         flex: 1,
//         alignItems: "center",
//         // justifyContent: "center",
//         paddingTop:
//           height * 0.04 < 24
//             ? insets.top + height * 0.005
//             : insets.top + height * 0.015,
//         // paddingTop: insets.top + 10,
//         paddingBottom: insets.bottom,
//         // backgroundColor: "#C88781",
//       },
//       // styles.container,
//     ]}
//   >
//     <View
//       style={{
//         width: "100%",
//         flexDirection: "row",
//         justifyContent: "space-between",
//         paddingHorizontal: 17,
//         marginBottom: z(10),
//       }}
//     >
//       <TouchableOpacity
//         style={{
//           width: zx(40),
//           height: zx(40),
//           backgroundColor: "rgba(0,0,0,0.1)",
//           borderRadius: 100,
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//         onPress={() => {
//           navigation.goBack();
//         }}
//       >
//         {/* <GoBackSVG fill={"#fff"} width={zx(15)} height={zx(15)} /> */}
//         <Entypo name="chevron-left" size={30} color="black" />
//       </TouchableOpacity>
//       <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           // backgroundColor: "blue",
//         }}
//       >
//         <TouchableOpacity
//           style={{
//             marginRight: z(10),
//           }}
//           activeOpacity={0.7}
//           onPress={() => {
//             navigation.navigate("AdsView");
//           }}
//         >
//           <PlusIconSVG height={30} width={30} />
//         </TouchableOpacity>

//         <View
//           style={{
//             // flex: 4,
//             flexDirection: "row",
//             justifyContent: "center",
//             backgroundColor: "rgba(0,0,0,0.1)",
//             justifyContent: "center",
//             alignItems: "center",
//             height: zx(40),
//             borderRadius: z(6),
//             paddingHorizontal: z(10),
//             width: z(140),
//             marginRight: z(18),
//             paddingRightmarginRight: z(20),
//           }}
//         >
//           <View
//             style={{
//               position: "absolute",
//               right: z(-20),
//             }}
//           >
//             <SingleKiwiCoin height={z(46)} width={z(46)} />
//           </View>

//           <Text
//             style={{
//               fontSize: z(18),
//               color: "#fff",
//               // fontFamily: "RobotoRegular",
//               fontWeight: "bold",
//               textAlign: "center",
//               letterSpacing: z(2),
//             }}
//           >
//             {coins.toString().padStart(4, "0")}
//           </Text>
//         </View>
//       </View>

//     </View>

//     {winner ? (
//       <WinnerUI  />
//     ) : (
//       <NonWinnerUI />
//     )}

//   </View>
// </SafeAreaProvider>
// }
