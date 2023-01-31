import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

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

const Stack = createNativeStackNavigator();

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function deleteValueFor(key) {
  await SecureStore.deleteItemAsync(key);
}

export default function Main() {
  const dispatch = useDispatch();

  // const [loading, setLoading] = useState(false);
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
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      checkForToken();
    }
  }, [fontsLoaded]);
  // on component first load run 'checkForToken' function, which will fetch the token from SecureStore

  // useEffect(() => {
  //   checkForToken();
  // }, []);

  async function checkForToken() {
    try {
      let result = await SecureStore.getItemAsync("token");

      if (!result) {
        // if False : set 'auth' to false, which means no session available, user will be taken to Login screen.

        console.log("Token fetch results: ", result, "no token available");

        dispatch(setAuth(false));
        // setLoading(false);
        await SplashScreen.hideAsync();
        return;
      } else {
        // if True : send the token to the backend for verification

        console.log("Token result: ", result);

        let response = await fetch(
          `${global.server_address}/auth/check-token`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: result }),
          }
        );

        let jsonData = await response.json();
        // remove all but error condition
        if (
          jsonData === "expired" ||
          jsonData === "wrong-device" ||
          jsonData === "error"
        ) {
          // Clear session, restart start from login page

          dispatch(setAuth(false));
          await deleteValueFor("token");
          // setLoading(false);
          await SplashScreen.hideAsync();
        } else if (jsonData === "pass") {
          // Request refresh token

          let refresh_token_response = await fetch(
            `${global.server_address}/auth/refresh-token`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token: result }),
            }
          );

          let data = await refresh_token_response.json();

          // remove error condition
          if (data.type === "expired" || data.type === "error") {
            console.log("Error ID: E004: ", data.message);
            // Clear session, restart start from login page

            dispatch(setAuth(false));
            await deleteValueFor("token");
            // setLoading(false);
            await SplashScreen.hideAsync();
          } else if (data.type === "pass") {
            // Save the new generated token, let user it

            dispatch(setAuth(true));
            await save("token", data.token);
            // setLoading(false);
            await SplashScreen.hideAsync();
          } else {
            // Clear session, restart start from login page
            console.log("ErrorID E003");
            alert("Error ID: E003");
            // To do: Edit
            dispatch(setAuth(false));
            await deleteValueFor("token");
            // setLoading(false);
            await SplashScreen.hideAsync();
          }
        } else {
          // Clear session, restart start from login page
          console.log("ErrorID E002");
          alert("Error ID: E002");

          dispatch(setAuth(false));
          await deleteValueFor("token");
          // setLoading(false);
          await SplashScreen.hideAsync();
        }
      }
    } catch (error) {
      // Clear session, restart start from login page
      console.log("ErrorID E001: ", error);
      alert("Error ID: E001");

      dispatch(setAuth(false));
      await deleteValueFor("token");
      // setLoading(false);
      await SplashScreen.hideAsync();
    }

    // backend resonse :-

    // if Failed : token is expired or hacked, display Login Page, delete the token

    // if Pass : user has active session available : send request for 'Refresh token'

    // if Wrong Device : to do
  }

  // if (loading) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" color="skyblue" />
  //     </View>
  //   );
  // }

  if (auth) {
    return <Application />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            // initialParams={{ setLogin: setLogin }}
            options={{
              animation: "slide_from_bottom",
              // title: "Login",
              // headerStyle: { backgroundColor: "skyblue" },
              // headerTintColor: "#fff",
              // headerTitleAlign: "center",
              // headerTitleStyle: {
              //   fontWeight: "bold",
              // },
              navigationBarColor: "rgba(0,0,0,0)",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              animation: "slide_from_right",
              // title: "Register",
              // headerStyle: { backgroundColor: "skyblue" },

              // headerTintColor: "#fff",
              // headerTitleAlign: "center",
              // headerTitleStyle: {
              //   fontWeight: "bold",
              // },
              navigationBarColor: "rgba(0,0,0,0)",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              animation: "slide_from_right",
              // title: "Forgot Password",
              // headerStyle: { backgroundColor: "skyblue" },
              // headerTintColor: "#fff",
              // headerTitleAlign: "center",
              // headerTitleStyle: {
              //   fontWeight: "bold",
              // },
              navigationBarColor: "rgba(0,0,0,0)",
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  //   return (
  //     <View style={styles.container}>
  //       <Text>Open up App.js to start working on your app!</Text>
  //     </View>
  //   );
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
