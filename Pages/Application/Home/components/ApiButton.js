import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { z } from "../../../../utils/scaling";
import { setAuth } from "../../../../Features/auth";
import * as SecureStore from "expo-secure-store";

async function deleteValueFor(key) {
  await SecureStore.deleteItemAsync(key);
}

import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

import LockPart1SVG from "../../../../Components/LockPart1SVG";
import LockPart2SVG from "../../../../Components/LockPart2SVG";

import { setUserApis, updateUserApis } from "../../../../Features/userApis";
import { setCoins, addCoin, consumeCoins } from "../../../../Features/coins";

import { BlurView, VibrancyView } from "@react-native-community/blur";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function ApiButton({
  navigation,
  api,
  apiText,
  navigationPage,
  requiredCoins,
  children,

  // viewRef,
  // pageUrl,
  // setPageUrl,
  isWebviewLoaded,
  isViewLogin,
}) {
  // e.g.
  // api = "image_api"
  // apiText = "Search and download images"
  // navigationPage = ImageApiPage
  // requiredCoins = 10
  const [unlockLayer, setUnlockLayer] = useState(false);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.value);
  const userApis = useSelector((state) => state.userApis.value);
  const coins = useSelector((state) => state.coins.value);

  const errorToast = (message) => {
    Toast.show({
      type: "error",
      text1: message,
      text2: "Error",
      visibilityTime: 3000,
    });
  };

  const animatedLock = React.useRef(
    new Animated.ValueXY({ x: 17, y: 12 })
  ).current;

  const startAnimation = (animatedRef, xValue, yValue, api) => {
    Animated.timing(animatedRef, {
      toValue: { x: xValue, y: yValue },
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.out(Easing.sin),
    }).start(({ finished }) => {
      if (finished) {
        setTimeout(() => {
          dispatch(updateUserApis({ api: api, booleanValue: 1 }));

          Toast.show({
            type: "success",
            text1: "New feature unlocked",
            // text2: "Registeration Complete",
            visibilityTime: 3000,
          });
        }, 500);
      }
    });
  };

  async function unlockApi(animatedRef, xValue, yValue, api, required_coins) {
    try {
      setUnlockLayer(false);

      let currentToken = await SecureStore.getItemAsync("token");

      let response = await fetch(`${global.server_address}/api/update-apis`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api: api,
          token: currentToken,
          required_coins,
        }),
      });

      let data = await response.json();
      console.log(data);

      if (data.type === "not_enough") {
        errorToast(data.message);
      } else if (data.type === "wrong-device") {
        deleteValueFor("token");
        dispatch(setAuth(false));
      } else if (data.type === "success") {
        console.log("here");

        startAnimation(animatedRef, xValue, yValue, api);
        dispatch(consumeCoins(required_coins));
      } else if (data.type === "error") {
        // ErrorID: E025
        errorToast(data.message);
      } else {
        errorToast("ErrorID: E024");
      }
    } catch (error) {
      console.log("ErrorID: E023: ", error);
      errorToast("ErrorID: E023");
    }

    // send post with email, token|device id
    // check available coins
    // if less than 10 > toast error
    // if more > take 10 and update api in db

    // start animation
    // after animation ends
    // update state
  }

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          // backgroundColor: "#fff",
          padding: z(5),
          borderRadius: z(110),
          width: z(110),
          height: z(110),
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
          elevation: 5,
          overflow: "hidden",
        }}
        onPress={() => {
          if (api === "image_api") {
            if (isViewLogin && isWebviewLoaded) {
              navigation.navigate(navigationPage);
            }
          } else {
            navigation.navigate(navigationPage);
          }
        }}
      >
        <BlurView
          style={[StyleSheet.absoluteFill]}
          blurAmount={40}
          blurRadius={2}
          blurType={"light"}
          overlayColor={"rgba(0,0,0,0.1)"}
        />
        <View
          style={{
            zIndex: 4,
            // alignItems: "center",
            // justifyContent: "center",
          }}
        >
          {children}
        </View>
      </TouchableOpacity>
      <Text
        style={{
          paddingVertical: 2,
          textAlign: "center",
          width: z(100),
          color: "white",
          fontSize: z(18),
          // backgroundColor: "pink",
          // fontFamily: "ChelaOne_400Regular",
          // fontFamily: "Graduate_400Regular",

          // fontFamily: "PinyonScript_400Regular",
          fontFamily: "GrandHotel_400Regular",
          // fontFamily: "PlayfairBold",
        }}
      >
        {apiText}
      </Text>
      {/* {userApis[api] == false ? (
        <TouchableWithoutFeedback
          onPress={() => {
            setUnlockLayer(true);
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(57,57,57,0.8)",
              // padding: 5,
              borderRadius: 10,
              // width: 70,
              // height: 70,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 3,
              // elevation: 5,
            }}
          >
            <View
              style={{
                position: "absolute",
                // backgroundColor: "pink",
                top: 26,
              }}
            >
              <LockPart1SVG width={36} height={36} fill="black" />
            </View>
            <Animated.View
              style={[
                {
                  position: "absolute",
                  // backgroundColor: "pink",
                  top: 12,
                  // 2 to 12
                },
                animatedLock.getLayout(),
              ]}
            >
              <LockPart2SVG width={36} height={36} fill="black" />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      ) : null} */}

      {unlockLayer ? (
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "pink",
            borderRadius: 10,
            zIndex: 4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 10, paddingVertical: 5 }}>
            Use {requiredCoins} Coins to Unlock
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: "green",
                marginHorizontal: 4,
              }}
              onPress={() => {
                // setUnlockLayer(false);

                // send post with email, token|device id
                // check available coins
                // if less than 10 > toast error
                // if more > take 10 and update api in db

                // startAnimation(animatedLock, 17, 2);

                // start animation
                // after animation ends
                // update state
                unlockApi(animatedLock, 17, 2, api, requiredCoins);
                // console.log(userApis);
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: "red",
                marginHorizontal: 4,
              }}
              onPress={() => {
                setUnlockLayer(false);
              }}
            ></TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({});
