import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import Main from "./Main";
import "react-native-get-random-values";
import { z } from "./utils/scaling";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import * as Updates from "expo-updates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

global.server_address = "https://bluekiwiapp.com";

LogBox.ignoreAllLogs();

SplashScreen.preventAutoHideAsync();

export default function App() {
  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  useEffect(() => {
    onFetchUpdateAsync();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <Main />
          </SafeAreaProvider>
          <StatusBar style="dark" />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({});
