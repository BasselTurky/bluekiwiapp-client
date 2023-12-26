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
import { useSocket } from "../../../SocketContext/SocketContext";

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
import { downloadImage } from "../../../../utils/downloadImage";

import KiwiCoinSVG from "../../../../Components/KiwiCoinSVG";
import DownloadIcon from "../../../../Components/DownloadIcon";

import { BlurView, VibrancyView } from "@react-native-community/blur";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function WallpaperCard({
  index,
  item,
  type,
  required_coins,
  year,
  month,
  wallpaper_id_,
}) {
  const socket = useSocket();
  const dispatch = useDispatch();
  const [showLayer, setShowLayer] = useState(false);

  const permanentWallpapers = useSelector(
    (state) => state.permanentWallpapers.value
  );
  const userData = useSelector((state) => state.userData.value);

  function consume_coins() {
    socket.emit(
      "download-wallpaper",
      required_coins,
      item.wallpaper_id,
      type,
      item,
      year,
      month,
      wallpaper_id_,
      userData.email
    );
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
              paddingBottom: z(20),
              paddingHorizontal: z(20),
              alignItems: "flex-end",
            }}
          >
            <View
              style={{
                minWidth: z(40),
                height: z(40),
                backgroundColor: "rgba(255,255,255,0.2)",
                padding: z(10),
                borderRadius: z(10),
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
                {type === "archive"
                  ? permanentWallpapers.value[year][month][index].downloads
                  : item.downloads}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                minHeight: z(40),
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: z(10),
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
