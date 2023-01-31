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
import { z } from "../../../../utils/scaling";
import { updateDownload_dailyWallpapers } from "../../../../Features/dailyWallpapers";
import { updateDownloads_permanentWallpapers } from "../../../../Features/permanentWallpapers";

import * as SecureStore from "expo-secure-store";
async function deleteValueFor(key) {
  await SecureStore.deleteItemAsync(key);
}
import { setAuth } from "../../../../Features/auth";

import { consumeCoins } from "../../../../Features/coins";
import { setCoins } from "../../../../Features/coins";

import RNFetchBlob from "rn-fetch-blob";

import KiwiCoinSVG from "../../../../Components/KiwiCoinSVG";
import DownloadIcon from "../../../../Components/DownloadIcon";

import { BlurView, VibrancyView } from "@react-native-community/blur";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function WallpaperCard({
  index,
  item,
  toast,
  errorToast,
  type,
  required_coins,
  year,
  month,
  wallpaper_id_,
}) {
  const dispatch = useDispatch();
  const [showLayer, setShowLayer] = useState(false);

  const permanentWallpapers = useSelector(
    (state) => state.permanentWallpapers.value
  );

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
        // text2: "Error",
        visibilityTime: 3000,
      });
      dispatch(setCoins(updated_coins));
      if (type === "daily") {
        dispatch(updateDownload_dailyWallpapers(item.wallpaper_id));
      }
      if (type === "archive") {
        dispatch(
          updateDownloads_permanentWallpapers({
            year: year,
            month: month,
            wallpaper_id: wallpaper_id_,
          })
        );
      }
    } catch (error) {
      // To do: refund
      console.log("ErrorID: E042: ", error);
      errorToast("ErrorID: E042 Download failed");
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
            consumed_coins: required_coins,
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
        // ErrorID: E045
        errorToast(data.message);
      } else {
        errorToast("ErrorID: E044");
      }
    } catch (error) {
      console.log("ErrorID: E043: ", error);
      errorToast("ErrorID: E043");
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
        borderRadius: z(30),
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
          // locations={[0.1, 0.3, 0.7, 0.9]}
          // colors={[
          //   "transparent",
          //   "transparent",
          //   "transparent",
          //   "rgba(0,0,0,0.8)",
          // ]}
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
              height: z(90),
              // backgroundColor: "yellow",
            }}
          >
            <BlurView
              style={[StyleSheet.absoluteFill]}
              blurAmount={40}
              blurRadius={2}
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
              paddingBottom: z(20),
              paddingHorizontal: z(20),
              alignItems: "flex-end",
            }}
          >
            <View
              style={{
                // position: "absolute",
                // bottom: 15,
                // right: 15,
                minWidth: z(40),
                height: z(40),
                backgroundColor: "rgba(255,255,255,0.2)",
                padding: z(10),
                // paddingVertical: 12,
                borderRadius: z(10),
                // marginHorizontal: 10,
                justifyContent: "center",
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
                {type === "archive"
                  ? permanentWallpapers.value[year][month][index].downloads
                  : item.downloads}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                // position: "absolute",
                // bottom: 15,
                // right: 15,
                minHeight: z(40),
                // minWidth: 80,
                backgroundColor: "rgba(255,255,255,0.2)",
                // padding: 10,
                // paddingVertical: 12,
                borderRadius: z(10),
                // marginHorizontal: 10,
                // justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: z(10),
              }}
              onPress={checkPermissionsAndDownload}
            >
              <DownloadIcon fill={"#fff"} width={z(15)} height={z(15)} />
              <View
                style={{
                  marginLeft: z(5),
                }}
              >
                <KiwiCoinSVG width={z(30)} height={z(30)} />
              </View>
              {required_coins > 1 ? (
                <Text
                  style={{
                    fontFamily: "Graduate_400Regular",
                    color: "white",
                  }}
                >
                  {required_coins}
                </Text>
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
