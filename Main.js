import { StyleSheet, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import * as NavigationBar from "expo-navigation-bar";

import { SocketProvider } from "./Pages/SocketContext/SocketContext";
import { ToastProvider } from "react-native-toast-notifications";
import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import Application from "./Pages/Application/ApplicationNav/Application";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Signin from "./Pages/Signin/Signin";
import { setAuth } from "./Features/auth";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { z } from "./utils/scaling";

// import * as NavigationBar from "expo-navigation-bar";
// NavigationBar.setBackgroundColorAsync("transparent");
// NavigationBar.setPositionAsync("absolute");

// NavigationBar.setBackgroundColorAsync("transparent");

const Stack = createStackNavigator();

// Function to delete a value from secure storage
async function deleteFromSecureStore(key) {
  await SecureStore.deleteItemAsync(key);
}

export default function Main() {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const auth = useSelector((state) => state.auth.value);

  let [fontsLoaded, error] = useFonts({
    Playfair: require("./assets/fonts/PlayfairDisplay-Regular.ttf"),
    PlayfairBold: require("./assets/fonts/PlayfairDisplay-SemiBold.ttf"),
    PlayfairItalic: require("./assets/fonts/PlayfairDisplay-MediumItalic.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    MontserratLight: require("./assets/fonts/Montserrat-Light.ttf"),
    MontserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
    MontserratMedium: require("./assets/fonts/Montserrat-Medium.ttf"),
    MontserratSemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
    CroissantOne: require("./assets/fonts/CroissantOne-Regular.ttf"),
    BodoniModa72ptRegular: require("./assets/fonts/BodoniModa_72pt-Regular.ttf"),
    BodoniModa72ptBold: require("./assets/fonts/BodoniModa_72pt-Bold.ttf"),
    BodoniModa48ptBold: require("./assets/fonts/BodoniModa_48pt-Bold.ttf"),
    BodoniModa28ptRegular: require("./assets/fonts/BodoniModa_28pt-Regular.ttf"),
    BodoniModa28ptBold: require("./assets/fonts/BodoniModa_28pt-Bold.ttf"),
    BodoniModa18ptRegular: require("./assets/fonts/BodoniModa_18pt-Regular.ttf"),
    BodoniModa18ptBold: require("./assets/fonts/BodoniModa_18pt-Bold.ttf"),
  });

  async function checkRefreshToken() {
    const refreshToken = await SecureStore.getItemAsync("refreshToken");

    if (!refreshToken) {
      resetAuth();
    }

    const response = await fetch(`${global.server_address}/auth/refreshToken`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken,
      }),
    });

    const data = await response.json();
    if (response.ok && data.accessToken) {
      const accessToken = data.accessToken;

      await SecureStore.setItemAsync("accessToken", accessToken);
      console.log("new Access Token: ", accessToken);

      dispatch(setAuth(true));
    } else {
      dispatch(setAuth(false));
      resetAuth();
    }
  }

  React.useEffect(() => {
    if (fontsLoaded) {
      // checkForToken();
      checkRefreshToken();
    }
  }, [fontsLoaded]);

  // Function to reset authentication state
  async function resetAuth() {
    console.log("reset Auth");

    dispatch(setAuth(false)); // Set authentication state to false
    await deleteFromSecureStore("accessToken"); // Delete token from secure storage
    await deleteFromSecureStore("refreshToken"); // Delete token from secure storage
    await SplashScreen.hideAsync(); // Hide splash screen
  }

  if (auth) {
    return (
      <ToastProvider
        offsetTop={insets.top + z(20)}
        animationType="slide-in"
        placement="top"
        duration={3000}
      >
        <SocketProvider>
          <Application />
        </SocketProvider>
      </ToastProvider>
    );
  } else {
    return (
      <ToastProvider
        offsetTop={insets.top + z(20)}
        animationType="slide-in"
        placement="top"
        duration={3000}
      >
        <View
          style={{
            flex: 1,
            zIndex: 10,
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
            }}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
              }}
              source={require("./assets/layered-peaks-haikei (1).png")}
              onLoad={() => console.log("Image loaded successfully!")}
              onError={(e) =>
                console.log("Error loading image:", e.nativeEvent.error)
              }
            />
          </View>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                // contentStyle: {
                //   backgroundColor: "transparent",
                // },
                cardStyle: {
                  backgroundColor: "transparent",
                },
                cardOverlayEnabled: true,
              }}
            >
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  animation: "none",
                  navigationBarColor: "rgba(0,0,0,0)",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Signin"
                component={Signin}
                options={{
                  animation: "none",
                  navigationBarColor: "rgba(0,0,0,0)",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{
                  animation: "none",
                  navigationBarColor: "rgba(0,0,0,0)",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{
                  animation: "none",
                  navigationBarColor: "rgba(0,0,0,0)",
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </ToastProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  loading: {
    flex: 1,
  },
  backgroundSVG: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
});
