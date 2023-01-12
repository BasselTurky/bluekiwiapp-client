import { StatusBar } from "expo-status-bar";
// import { Provider } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
// import { store } from "./store";
import Main from "./Main";
import "react-native-get-random-values";

import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

// NavigationBar.setBackgroundColorAsync("rgba(0,0,0,0)");

// import { AppLoading } from "expo";

import * as SplashScreen from "expo-splash-screen";

global.server_address = "https://bluekiwiapp.com";
// server address: 'https://bluekiwiapp.com'
// localhost: 'http://192.168.1.6:8080'

LogBox.ignoreAllLogs();

SplashScreen.preventAutoHideAsync();

export default function App() {
  // async function getColor() {
  //   const color = await NavigationBar.getBackgroundColorAsync();
  //   console.log(color);
  // }

  // React.useEffect(() => {
  //   getColor();
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Main />
          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({});

// const [appIsReady, setAppIsReady] = React.useState(false);

// React.useEffect(() => {
//   setAppIsReady(true);
// }, []);

// const onLayoutRootView = React.useCallback(async () => {
//   if (appIsReady) {
//     await SplashScreen.hideAsync();
//   }
// }, [appIsReady]);

// if (!fontsLoaded) {
//   return null;
// }
