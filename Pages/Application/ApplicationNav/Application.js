import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useSocket } from "../../SocketContext/SocketContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { z } from "../../../utils/scaling";
import Home from "../Home/Home";
import ProfilePage from "../Profile/ProfilePage";
import AdsView from "../AdsView/AdsView";
import MainView from "../Giveaway/MainView";
import MainViewHeader from "../Giveaway/components/header/MainViewHeader";
import KeepAwake from "react-native-keep-awake";

import ImageApiPage from "../Gallery/ImageApiPage";
import GalleryContainer from "../Gallery/GalleryContainer";
import WallpaperApi from "../Wallpapers/WallpaperApi";
import ArchiveApiPage from "../Archive/ArchiveApiPage";

import SocketComponent from "./SocketComponent";

import Giveaways from "../Giveaways/Giveaways";

import { downloadImage } from "../../../utils/downloadImage";
import Toast, { BaseToast } from "react-native-toast-message";
import { ToastProvider, useToast } from "react-native-toast-notifications";

import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { setAuth } from "../../../Features/auth";
import { setUserData } from "../../../Features/userData";
import { setCoins } from "../../../Features/coins";
import { addCoin } from "../../../Features/coins";
// import { setLastGiveawayX } from "../../../Features/lastGiveawayX";
// import { setLastGiveawayZ } from "../../../Features/lastGiveawayZ";
import { setGiveawayX } from "../../../Features/giveawayX";
import { setGiveawayZ } from "../../../Features/giveawayZ";
import { addUserToGiveawayListX } from "../../../Features/giveawayX";
import { addUserToGiveawayListZ } from "../../../Features/giveawayZ";
import { setActiveGiveawayX } from "../Giveaway/Redux States/activeGiveawayX";
import { setActiveGiveawayZ } from "../Giveaway/Redux States/activeGiveawayZ";

import { setHistory } from "../../../Features/giveawayHistory";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

// import { enableMapSet } from "immer";
// enableMapSet();
const Stack = createNativeStackNavigator();

// async function deleteValueFor(key) {
//   await SecureStore.deleteItemAsync(key);
// }
async function saveData() {
  await SecureStore.setItemAsync("myKey", "myValue");
}

export default function Application() {
  // console.log("app");
  useEffect(() => {
    saveData();

    return () => {};
  }, []);

  // const toast = useToast();
  // const dispatch = useDispatch();
  // const socket = useSocket();
  // const insets = useSafeAreaInsets();

  // const homeFlatlistRef = useRef(null);

  // const viewRef = React.useRef(null);
  // const mainWebviewUrlRef = useRef("https://pixabay.com");
  // change pageUrl to redux
  // const [pageUrl, setPageUrl] = React.useState("https://pixabay.com");

  // const [isWebviewLoaded, setIsWebviewLoaded] = useState(false);
  // const [isViewLogin, setIsViewLogin] = useState(false);

  // const [isSocketConnected, setIsSocketConnected] = useState(false);

  // const [toastData, setToastData] = useState(null);
  // const auth = useSelector((state) => state.auth.value);

  // make redux state : after success socket connection
  // set state to true

  // function showToast(type, message) {
  //   toast.show(message, {
  //     type: type,
  //     duration: 3000,
  //     animationType: "slide-in",
  //     placement: "top",
  //   });
  // }

  // useEffect(() => {
  //   if (toastData) {
  //     toast.show(toastData.message, {
  //       type: toastData.type,
  //       duration: 3000,
  //     });
  //   }
  // }, [toastData]);

  // const getGoogleUser = async () => {
  //   try {
  //     const currentUser = await GoogleSignin.getCurrentUser();
  //     console.log(currentUser);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("connect", async () => {
  //       console.log("socket connected");
  //       addUser();
  //       // setIsSocketConnected(true);
  //     });
  //     socket.on("connect_error", (error) => {
  //       console.error("Connection failed:", error.message);
  //       // Perform error handling or retry logic here
  //     });

  //     socket.on("disconnect", async () => {
  //       // force logout the user
  //       // deleteValueFor("token");
  //       // console.log("token deleted");
  //       // await GoogleSignin.signOut();
  //       // console.log("google signed out");
  //       // dispatch(setAuth(false));
  //       // delete token
  //       // toast.show("Lost connection with the server", {
  //       //   type: "normal",
  //       // });
  //     });

  //     socket.on("force-disconnect", async () => {
  //       // force logout the user
  //       deleteValueFor("token");
  //       // console.log("token deleted");
  //       await GoogleSignin.signOut();
  //       // console.log("google signed out");
  //       dispatch(setAuth(false));
  //       // delete token
  //     });

  //     socket.on("toasts", (toast_object) => {
  //       toast.show(toast_object.message, {
  //         type: toast_object.type,
  //         duration: 3000,
  //       });
  //       // set false
  //     });

  //     socket.on("userInfo", async (userInfo) => {
  //       // console.log(" user");
  //       let userDataObj = {
  //         name: userInfo.name,
  //         email: userInfo.email,
  //         uid: userInfo.uid,
  //         coins: userInfo.coins,
  //         // uid: userInfo.uid,
  //       };
  //       dispatch(setUserData(userDataObj));
  //       dispatch(setCoins(userDataObj.coins));
  //       console.log("user added");
  //       await SplashScreen.hideAsync();
  //     });

  //     socket.on("giveaway-history", (giveaway_history_array) => {
  //       // convert array to object
  //       // console.log(giveaway_history_array);

  //       const giveaway_history_object = {};

  //       giveaway_history_array.forEach((giveaway_object) => {
  //         giveaway_history_object[giveaway_object.giveawayId] = giveaway_object;
  //       });

  //       // store history in redux
  //       dispatch(setHistory(giveaway_history_object));
  //       // dispatch(setHistory(giveaway_history_array));
  //     });
  //     // socket.on("add-giveaway-to-history", () => {});

  //     socket.on("giveawayInfo", (giveawayX, giveawayZ) => {
  //       // set state false
  //       dispatch(setGiveawayX(giveawayX)); // {id:giveawayid, type:'z', participants: [{id:ignore, uid: userid, date: join date},{}]}
  //       dispatch(setGiveawayZ(giveawayZ));
  //     });

  //     socket.on(
  //       "participant-joined",
  //       (participantInfo, giveawayId, giveawayType) => {
  //         console.log(participantInfo);
  //         console.log(giveawayType);

  //         if (giveawayType === "x") {
  //           dispatch(addUserToGiveawayListX(participantInfo));
  //         } else if (giveawayType === "z") {
  //           dispatch(addUserToGiveawayListZ(participantInfo));
  //         }
  //         console.log("here2");
  //       }
  //     );

  //     socket.on("active-giveaway-x", (giveawayX) => {
  //       // save in redux state
  //       dispatch(setActiveGiveawayX(giveawayX));
  //     });
  //     socket.on("active-giveaway-z", (giveawayZ) => {
  //       // save in another redux state
  //       dispatch(setActiveGiveawayZ(giveawayZ));
  //     });

  //     socket.on(
  //       "start-download",
  //       (updated_coins, type, item, year, month, wallpaper_id_) => {
  //         downloadImage(
  //           updated_coins,
  //           type,
  //           item,
  //           year,
  //           month,
  //           wallpaper_id_,
  //           dispatch,
  //           showToast
  //           // setToastData
  //         );
  //       }
  //     );

  //     socket.on("coin-saved", (new_coin_amount) => {
  //       dispatch(addCoin(new_coin_amount));
  //     });

  //     return () => {
  //       socket.off("connect"); // Unsubscribe from the "connect" event
  //       socket.removeAllListeners();
  //       socket.close();
  //       // setIsSocketConnected(false);
  //     };
  //   }
  // }, [socket]);

  // async function addUser() {
  //   console.log("addUser");
  //   // console.log(isSocketConnected);
  //   socket.emit("add-user");
  //   socket.emit("get-giveaways-info"); // TODO edit
  //   socket.emit("get-user-giveaway-history");
  // }

  // async function fetchActiveGiveaway(type) {}

  // useEffect(() => {
  //   addUser();
  // }, [isSocketConnected]);

  // console.log("application");
  return (
    // <ToastProvider
    //   offsetTop={insets.top + z(20)}
    //   animationType="slide-in"
    //   placement="top"
    //   duration={3000}
    // >
    <ImageBackground
      source={require("../../../assets/001.jpg")}
      // source={require("../../../assets/splashx2.png")}
      blurRadius={2}
      resizeMode="cover"
      style={{
        flex: 1,
        // backgroundColor: "blue",
        backgroundColor: "#fff",
        // opacity: 1,
      }}
    >
      {/* {isSocketConnected ? ( */}
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            contentStyle: {
              backgroundColor: "transparent",
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              // animation: "slide_from_bottom",
              navigationBarColor: "rgba(0,0,0,0)",
              animation: "fade",
              headerShown: false,
            }}
          >
            {/* {(props) => (
              <Home
                {...props}
                // viewRef={viewRef}
                // mainWebviewUrlRef={mainWebviewUrlRef}
                // pageUrl={pageUrl}
                // setPageUrl={setPageUrl}
                // isWebviewLoaded={isWebviewLoaded}
                // setIsWebviewLoaded={setIsWebviewLoaded}
                // isViewLogin={isViewLogin}
                // setIsViewLogin={setIsViewLogin}
              />
            )} */}
          </Stack.Screen>

          {/* <Stack.Screen
              name="ProfilePage"
              component={ProfilePage}
              options={{
                // animation: "slide_from_bottom",
                navigationBarColor: "rgba(0,0,0,0)",
                animation: "none",
                headerShown: false,
              }}
            ></Stack.Screen> */}

          {/* <Stack.Screen
          name="DogAPI"
          component={DogAPI}
          options={{
            // animation: "slide_from_left",

            animation: "default",
            headerShown: false,
          }}
        ></Stack.Screen>

        <Stack.Screen
          name="CatAPI"
          component={CatAPI}
          options={{
            // animation: "slide_from_left",

            animation: "default",
            headerShown: false,
          }}
        ></Stack.Screen> */}

          {/* <Stack.Screen
              name="GalleryContainer"
              // component={ImageApiPage}
              options={{
                // animation: "slide_from_right",
                navigationBarColor: "rgba(0,0,0,0)",
                animation: "fade",
                headerShown: false,
              }}
            >
              {(props) => (
                <GalleryContainer
                  {...props}
                  mainWebviewUrlRef={mainWebviewUrlRef}
                  viewRef={viewRef}
                  // pageUrl={pageUrl}
                  // setPageUrl={setPageUrl}
                  // isWebviewLoaded={isWebviewLoaded}
                  // setIsWebviewLoaded={setIsWebviewLoaded}
                  // isViewLogin={isViewLogin}
                  homeFlatlistRef={homeFlatlistRef}
                  // setIsViewLogin={setIsViewLogin}
                />
              )}
            </Stack.Screen> */}

          {/* <Stack.Screen
          name="Giveaway"
          component={Giveaway}
          options={{
            // animation: "slide_from_left",
            navigationBarColor: "rgba(0,0,0,0)",
            animation: "none",
            headerShown: false,
          }}
        ></Stack.Screen> */}

          <Stack.Screen
            name="ArchiveApiPage"
            component={ArchiveApiPage}
            options={{
              // animation: "slide_from_left",
              navigationBarColor: "rgba(0,0,0,0)",
              animation: "fade",
              headerShown: false,
            }}
          ></Stack.Screen>

          <Stack.Screen
            name="WallpaperApi"
            component={WallpaperApi}
            options={{
              // animation: "slide_from_left",
              navigationBarColor: "rgba(0,0,0,0)",
              animation: "fade",
              headerShown: false,
            }}
          ></Stack.Screen>

          <Stack.Screen
            name="Giveaways"
            // component={() => {
            //   return (
            //     <View
            //       style={{
            //         height: "100%",
            //         backgroundColor: "green",
            //       }}
            //     >
            //       <Text>
            //         Hellossssssssssssssssssssssss
            //         ssssssssssssssssssssssssssssssssssssssss
            //         sssssssssssssssssssssssssssssssssssss
            //         sssssssssssssssssssssssssssssssssssss
            //       </Text>
            //     </View>
            //   );
            // }}
            component={MainView}
            options={{
              // animation: "slide_from_right",
              navigationBarColor: "rgba(0,0,0,0)",
              animation: "fade",
              // headerTitle: ,
              // header: (props) => <MainViewHeader {...props} />,
              headerShown: false,
            }}
          ></Stack.Screen>

          <Stack.Screen
            name="AdsView"
            component={AdsView}
            options={{
              animation: "fade",
              // animation: "slide_from_bottom",
              navigationBarColor: "rgba(0,0,0,0)",
              // animation: "fade",
              headerShown: false,
            }}
          >
            {/* {(props) => (
            <AdsView
              {...props}
              AdAlert={AdAlert}
              WatchSVG={WatchSVG}
              KiwiCoinSVG={KiwiCoinSVG}
            />
          )} */}
          </Stack.Screen>
        </Stack.Navigator>

        {/* <Toast
            topOffset={20}
            // config={toastConfig}

            onPress={() => {
              Toast.hide();
            }}
          /> */}
      </NavigationContainer>
      {/* ) : null} */}
      <SocketComponent />
      <KeepAwake />
    </ImageBackground>
    // </ToastProvider>
  );
}

const styles = StyleSheet.create({});
