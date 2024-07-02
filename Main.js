import { StyleSheet, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as NavigationBar from "expo-navigation-bar";

import { SocketProvider } from "./Pages/SocketContext/SocketContext";
import { ToastProvider } from "react-native-toast-notifications";
import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";

import Application from "./Pages/Application/ApplicationNav/Application";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";

import { setAuth } from "./Features/auth";

import { Righteous_400Regular } from "@expo-google-fonts/righteous";
import { ConcertOne_400Regular } from "@expo-google-fonts/concert-one";
import { PinyonScript_400Regular } from "@expo-google-fonts/pinyon-script";
import { Graduate_400Regular } from "@expo-google-fonts/graduate";
import { ChelaOne_400Regular } from "@expo-google-fonts/chela-one";

import { GrandHotel_400Regular } from "@expo-google-fonts/grand-hotel";

import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";
import { z } from "./utils/scaling";

NavigationBar.setBackgroundColorAsync("transparent");

const Stack = createNativeStackNavigator();

// Function to save a value to secure storage
async function saveToSecureStore(key, value) {
  await SecureStore.setItemAsync(key, value);
}

// Function to delete a value from secure storage
async function deleteFromSecureStore(key) {
  await SecureStore.deleteItemAsync(key);
}

export default function Main() {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const auth = useSelector((state) => state.auth.value);

  let [fontsLoaded, error] = useFonts({
    Righteous_400Regular,
    ConcertOne_400Regular,
    PinyonScript_400Regular,
    Graduate_400Regular,
    ChelaOne_400Regular,

    GrandHotel_400Regular,
    Playfair: require("./assets/fonts/PlayfairDisplay-Regular.ttf"),
    PlayfairBold: require("./assets/fonts/PlayfairDisplay-SemiBold.ttf"),
    PlayfairItalic: require("./assets/fonts/PlayfairDisplay-MediumItalic.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      checkForToken();
    }
  }, [fontsLoaded]);

  // Main function to check for an authentication token
  async function checkForToken() {
    try {
      // Check if the user is signed in with Google
      if (await GoogleSignin.isSignedIn()) {
        await handleGoogleSignIn();
      } else {
        // If not signed in with Google, check secure storage for a token
        await handleSecureStoreToken();
      }
    } catch (error) {
      // Handle errors and reset authentication state
      resetAuth();
    }
  }

  // Function to handle Google Sign-In
  async function handleGoogleSignIn() {
    try {
      const tokens = await GoogleSignin.getTokens(); // Get tokens from Google Sign-In
      const response = await sendGoogleTokenToServer(tokens.idToken); // Send token to server for verification

      if (response.ok) {
        const data = await response.json(); // Parse response data
        await saveToSecureStore("token", data.token); // Save token to secure storage
        dispatch(setAuth("google")); // Set authentication state to Google
      } else {
        resetAuth(); // Reset authentication if response is not OK
      }
    } catch (error) {
      resetAuth(); // Reset authentication on error
    }
  }

  // Function to send Google token to server
  async function sendGoogleTokenToServer(idToken) {
    return fetch(`${global.server_address}/auth/sign-google-idToken`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });
  }

  // Function to handle token from secure storage
  async function handleSecureStoreToken() {
    const token = await SecureStore.getItemAsync("token"); // Get token from secure storage

    if (!token) {
      resetAuth(); // Reset authentication if no token found
      return;
    }

    const response = await sendTokenToServer(token); // Send token to server for verification
    const jsonData = await response.json(); // Parse response data

    if (jsonData === "error") {
      resetAuth(); // Reset authentication on error response
    } else if (jsonData === "pass") {
      await refreshAuthToken(token); // Refresh authentication token if pass response
    } else {
      resetAuth(); // Reset authentication for any other response
    }
  }

  // Function to send token to server for verification
  async function sendTokenToServer(token) {
    return fetch(`${global.server_address}/auth/check-token`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
  }

  // Function to refresh authentication token
  async function refreshAuthToken(token) {
    const response = await fetch(
      `${global.server_address}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    );

    const data = await response.json(); // Parse response data

    if (data.type === "expired" || data.type === "error") {
      resetAuth(); // Reset authentication if token expired or error
    } else if (data.type === "pass") {
      await saveToSecureStore("token", data.token); // Save new token to secure storage
      dispatch(setAuth("default")); // Set authentication state to default
    } else {
      resetAuth(); // Reset authentication for any other response
    }
  }

  // Function to reset authentication state
  async function resetAuth() {
    dispatch(setAuth(false)); // Set authentication state to false
    await deleteFromSecureStore("token"); // Delete token from secure storage
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
        <ImageBackground
          source={require("./assets/front1.jpg")}
          blurRadius={1}
          resizeMode="cover"
          style={{
            flex: 1,
          }}
        >
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                contentStyle: {
                  backgroundColor: "rgba(131, 196, 255,0.7)",
                  // backgroundColor: "rgba(110,230,196,0.5)",
                },
              }}
            >
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  animation: "slide_from_bottom",
                  navigationBarColor: "rgba(0,0,0,0)",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{
                  animation: "default",
                  navigationBarColor: "rgba(0,0,0,0)",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{
                  animation: "default",
                  navigationBarColor: "rgba(0,0,0,0)",
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ImageBackground>
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
});

// async function checkForToken() {
//   try {
//     // first check if user is signedIn with google:
//     const isSignedIn = await GoogleSignin.isSignedIn();

//     if (isSignedIn) {
//       console.log("Main: check isSingedIn value: ", isSignedIn);
//       try {
//         const tokens = await GoogleSignin.getTokens();
//         console.log(`Main: GoogleSignIn token: ${tokens}`);
//         let response = await fetch(
//           `${global.server_address}/auth/sign-google-idToken`,
//           {
//             method: "POST",
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               idToken: tokens.idToken,
//             }),
//           }
//         );
//         console.log(`Main: Token sent to "/auth/sign-google-idToken"`);
//         if (!response.ok) {
//           try {
//             console.log(`Main: sign-google-idToken response is not Ok`);
//             const errorData = await response.json();
//             console.error("Main: Error:", errorData.error);

//             deleteValueFor("token");
//             await GoogleSignin.signOut();
//             dispatch(setAuth(false));
//             await SplashScreen.hideAsync();
//             console.log(`Main: Token deleted, Google SignOut, Auth set to False, Splash down`);
//           } catch (error) {
//             // If parsing fails, log a generic error message
//             console.error(
//               "Main: Failed to parse error response:",
//               response.statusText
//             );
//           }

//           deleteValueFor("token");
//           await GoogleSignin.signOut();
//           dispatch(setAuth(false));
//           await SplashScreen.hideAsync();

//         } else {
//           let data = await response.json();
//           // token may be expired

//           await save("token", data.token);

//           dispatch(setAuth("google"));
//         }
//       } catch (error) {
//         console.error(error);
//         dispatch(setAuth(false));
//       }

//       return;

//     } else {
//       let result = await SecureStore.getItemAsync("token");

//       if (!result) {
//         // if False : set 'auth' to false, which means no session available, user will be taken to Login screen.

//         console.log("Token fetch results: ", result, "no token available");

//         dispatch(setAuth(false));
//         // setLoading(false);
//         await SplashScreen.hideAsync();
//         return;
//       } else {
//         // if True : send the token to the backend for verification

//         console.log("Token result: ", result);

//         let response = await fetch(
//           `${global.server_address}/auth/check-token`,
//           {
//             method: "POST",
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ token: result }),
//           }
//         );

//         let jsonData = await response.json();
//         // remove all but error condition
//         if (jsonData === "error") {
//           // Clear session, restart start from login page

//           dispatch(setAuth(false));
//           await deleteValueFor("token");
//           // setLoading(false);
//           await SplashScreen.hideAsync();
//         } else if (jsonData === "pass") {
//           // Request refresh token

//           let refresh_token_response = await fetch(
//             `${global.server_address}/auth/refresh-token`,
//             {
//               method: "POST",
//               headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({ token: result }),
//             }
//           );

//           let data = await refresh_token_response.json();

//           // remove error condition
//           if (data.type === "expired" || data.type === "error") {
//             console.log("Error ID: E004: ", data.message);
//             // Clear session, restart start from login page

//             dispatch(setAuth(false));
//             await deleteValueFor("token");
//             await SplashScreen.hideAsync();
//           } else if (data.type === "pass") {
//             // Save the new generated token, let user it

//             dispatch(setAuth("default"));
//             await save("token", data.token);
//           } else {
//             // Clear session, restart start from login page
//             console.log("ErrorID E003");
//             alert("Error ID: E003");
//             // To do: Edit
//             dispatch(setAuth(false));
//             await deleteValueFor("token");
//             await SplashScreen.hideAsync();
//           }
//         } else {
//           // Clear session, restart start from login page
//           console.log("ErrorID E002");
//           alert("Error ID: E002");

//           dispatch(setAuth(false));
//           await deleteValueFor("token");
//           await SplashScreen.hideAsync();
//         }
//       }
//     }
//   } catch (error) {
//     // Clear session, restart start from login page
//     console.log("ErrorID E001: ", error);
//     alert("Error ID: E001");

//     dispatch(setAuth(false));
//     await deleteValueFor("token");
//     await SplashScreen.hideAsync();
//   }
// }

// Function to check for authentication token
