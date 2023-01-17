import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  PermissionsAndroid,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LinearGradient from "react-native-linear-gradient";

import { setAuth } from "../../../Features/auth";
import { updateDownload_dailyWallpapers } from "../../../Features/dailyWallpapers";

import * as SecureStore from "expo-secure-store";
async function deleteValueFor(key) {
  await SecureStore.deleteItemAsync(key);
}

import RNFetchBlob from "rn-fetch-blob";
import DownloadIcon from "../../../Components/DownloadIcon";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function WallpaperCard({ item, toast, errorToast }) {
  const dispatch = useDispatch();
  const [showLayer, setShowLayer] = useState(false);

  function downloadImage(url) {
    try {
      const { config, fs } = RNFetchBlob;
      let PictureDir = fs.dirs.PictureDir;
      config({
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          description: "Image",
          path: PictureDir + "/wallpaper_" + Date.now() + ".jpg",
        },
      }).fetch("GET", url);

      // update donwload number in redux
      dispatch(updateDownload_dailyWallpapers(item.wallpaper_id));
    } catch (error) {
      errorToast("Download failed");
    }
  }

  async function consumeCoins() {
    try {
      let currentToken = await SecureStore.getItemAsync("token");
      console.log("current token: ", currentToken);
      let response = await fetch(
        `${global.server_address}/api/download-wallpaper`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: currentToken,
            consumed_coins: 2,
            wallpaper_id: item.wallpaper_id,
          }),
        }
      );

      let data = await response.json();

      if (data.type === "success") {
        //download start
        downloadImage(item.img_link);
      } else if (data.type === "insufficient") {
        errorToast(data.message);
      } else if (data.type === "wrong-device") {
        deleteValueFor("token");
        dispatch(setAuth(false));
      } else if (data.type === "error") {
        errorToast(data.message);
      }
    } catch (error) {
      console.log(error);
      errorToast("Something went wrong!");
    }
  }

  async function checkPermissionsAndDownload() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      consumeCoins();
    } else {
      alert("Permissions Denied");
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        if (showLayer) {
          setShowLayer(false);
        } else {
          setShowLayer(true);
        }
      }}
      style={{
        backgroundColor: "black",
        height: "100%",
        width: "100%",
        borderRadius: 30,
        overflow: "hidden",
        elevation: 10,
      }}
    >
      <Image
        style={{
          width: "100%",
          height: "100%",
        }}
        resizeMode="contain"
        source={{
          uri: item.img_link,
        }}
      />
      {showLayer ? (
        <LinearGradient
          locations={[0.1, 0.3, 0.7, 0.9]}
          colors={[
            "transparent",
            "transparent",
            "transparent",
            "rgba(0,0,0,0.8)",
          ]}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            borderRadius: 10,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              // backgroundColor: "blue",
              paddingBottom: 20,
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                // position: "absolute",
                // bottom: 15,
                // right: 15,
                minWidth: 40,
                backgroundColor: "rgba(255,255,255,0.2)",
                padding: 10,
                borderRadius: 10,
                // marginHorizontal: 10,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  // fontFamily: "Righteous_400Regular",
                  fontFamily: "Graduate_400Regular",
                }}
              >
                {item.downloads}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                // position: "absolute",
                // bottom: 15,
                // right: 15,
                width: 40,
                height: 40,
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={checkPermissionsAndDownload}
            >
              <DownloadIcon fill={"#fff"} width={15} height={15} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
