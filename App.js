import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import Main from "./Main";
import "react-native-get-random-values";
import { z } from "./utils/scaling";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ToastProvider } from "react-native-toast-notifications";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import { SafeAreaProvider } from "react-native-safe-area-context";

import * as SplashScreen from "expo-splash-screen";

global.server_address = "https://bluekiwiapp.com";

LogBox.ignoreAllLogs();

SplashScreen.preventAutoHideAsync();

export default function App() {
  // const insets = useSafeAreaInsets();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            {/* <ToastProvider
              offsetTop={z(40)}
              animationType="slide-in"
              placement="top"
              duration={3000}
            > */}
            <Main />
            {/* </ToastProvider> */}
          </SafeAreaProvider>

          <StatusBar style="dark" />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({});
