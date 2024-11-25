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
import { setAuth } from "../../../../../Features/auth";
import { updateDownload_dailyWallpapers } from "../../../../../Features/dailyWallpapers";
import * as SecureStore from "expo-secure-store";
import { setCoins } from "../../../../../Features/coins";
import RNFetchBlob from "rn-fetch-blob";
import DownloadIcon from "../../../../../Components/DownloadIcon";
import KiwiCoinSVG from "../../../../../Components/KiwiCoinSVG";

import { BlurView } from "@react-native-community/blur";

async function deleteValueFor(key) {
  await SecureStore.deleteItemAsync(key);
}

export default function WallpaperCardArchive({ item, toast, errorToast }) {
  const dispatch = useDispatch();
  const [showLayer, setShowLayer] = useState(false);

  function downloadImage(url, updated_coins) {
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
      toast.show({
        type: "success",
        text1: "Download started!",
        visibilityTime: 3000,
      });
      dispatch(setCoins(updated_coins));
      dispatch(updateDownload_dailyWallpapers(item.wallpaper_id));
    } catch (error) {
      console.log("ErrorID: E047: ", error);
      errorToast("ErrorID: E047 Download failed");
    }
  }

  async function consume_coins() {
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
            consumed_coins: 1,
            wallpaper_id: item.wallpaper_id,
          }),
        }
      );

      let data = await response.json();

      if (data.type === "success") {
        //download start
        downloadImage(item.img_link, data.updated_coins);
      } else if (data.type === "insufficient") {
        errorToast(data.message);
      } else if (data.type === "wrong-device") {
        deleteValueFor("token");
        dispatch(setAuth(false));
      } else if (data.type === "error") {
        errorToast(data.message + "X");
      } else {
        errorToast("ErrorID: E049");
      }
    } catch (error) {
      console.log("ErrorID: E048: ", error);
      errorToast("ErrorID: E048");
    }
  }

  async function checkPermissionsAndDownload() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      consume_coins();
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
        <View
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
              position: "absolute",
              width: "100%",
              bottom: 0,
              height: 90,
            }}
          >
            <BlurView
              style={[StyleSheet.absoluteFill]}
              blurAmount={40}
              blurRadius={3}
              blurType={"light"}
              overlayColor={"rgba(0,0,0,0.1)"}
            />
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              // backgroundColor: "blue",
              paddingBottom: 20,
              paddingHorizontal: 20,
              alignItems: "flex-end",
            }}
          >
            <View
              style={{
                minWidth: 40,
                height: 40,
                backgroundColor: "rgba(255,255,255,0.2)",
                padding: 10,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "Graduate_400Regular",
                }}
              >
                {item.downloads}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                minHeight: 40,
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: 10,
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: 10,
              }}
              onPress={checkPermissionsAndDownload}
            >
              <DownloadIcon fill={"#fff"} width={15} height={15} />
              <View
                style={{
                  marginLeft: 5,
                }}
              >
                <KiwiCoinSVG width={30} height={30} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
