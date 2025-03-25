import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../../SocketContext/SocketContext";
import { z, zx } from "../../../../utils/scaling";
import SingleKiwiCoin from "../../../../Components/SingleKiwiCoin";
import DownloadIcon from "../../../../Components/DownloadIcon";
import { BlurView, VibrancyView } from "@react-native-community/blur";
import { Button as PaperButton } from "react-native-paper";

import DownloadWallpaperBtn from "./DownloadWallpaperBtn";

export default function WallpaperCard({
  index,
  item,
  // type,
  required_coins,
  // year,
  // month,
  // wallpaper_id_,
}) {
  const socket = useSocket();
  const dispatch = useDispatch();
  const [showLayer, setShowLayer] = useState(false);

  const permanentWallpapers = useSelector(
    (state) => state.permanentWallpapers.value
  );

  function consume_coins() {
    socket.emit(
      "download-wallpaper",
      required_coins,
      item.wallpaper_id,
      // type,
      item
      // year,
      // month,
      // wallpaper_id_
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
    <View
      // activeOpacity={0.9}
      // onPress={() => {
      //   if (showLayer) {
      //     setShowLayer(false);
      //   } else {
      //     setShowLayer(true);
      //   }
      // }}
      style={{
        backgroundColor: "black",
        height: "100%",
        width: "100%",
        borderRadius: z(10),
        overflow: "hidden",
        elevation: 5,
      }}
    >
      <Image
        style={{
          width: "100%",
          height: "90%",
        }}
        resizeMode="cover"
        source={{
          uri: item.img_link,
        }}
      />
      {/* {showLayer ? (
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
              style={[
                StyleSheet.absoluteFill,
                {
                  // backgroundColor: "#fff",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              ]}
              blurAmount={2}
              blurType={"dark"}
              overlayColor={"transparent"}
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
                backgroundColor: "rgba(0,0,0,0.2)",
                padding: z(10),
                borderRadius: z(10),
                justifyContent: "center",
                alignItems: "center",
              }}
            >

            </View>
            <TouchableOpacity
              style={{
                minHeight: z(40),
                backgroundColor: "rgba(0,0,0,0.2)",
                borderRadius: z(10),
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: z(10),
              }}
              // onPress={checkPermissionsAndDownload}
            >
              <DownloadIcon fill={"#fff"} width={z(24)} height={z(24)} />
              <View
                style={{
                  marginLeft: z(9),
                }}
              >
                <SingleKiwiCoin width={z(30)} height={z(30)} />
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
      ) : null} */}
      <View
        style={{
          flex: 1,
          // height: 80,
          // width: 100,
          backgroundColor: "#ebdece",
          justifyContent: "center",
          alignItems: "flex-end",
          paddingHorizontal: zx(10),
        }}
      >
        {/* <PaperButton
          icon={({ size, color }) => (
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <SingleKiwiCoin height={z(30)} width={z(30)} />
              <SingleKiwiCoin height={z(30)} width={z(30)} />
            </View>
          )}
          labelStyle={styles.btnText}
          contentStyle={{
            // flexDirection: "row-reverse",
            // borderColor: "yellow",
            // justifyContent: "center",
            // alignItems: "center",
            width: "100%",
            padding: 0,
            margin: 0,
          }}
          style={{
            borderColor: "black",
            width: 100,
            padding: 0,
            margin: 0,
          }}
          mode="outlined"
          buttonColor="transparent"
          // onPress={() => {
          //   console.log("downloading: ", currentIndex);
          // }}
        >
      
        </PaperButton> */}
        {/* <TouchableOpacity
          style={{
            flexDirection: "row",
            // backgroundColor: "green",
            alignItems: "center",
            justifyContent: "space-around",
            width: zx(80),
            padding: 5,
            // borderWidth: 1,
            // borderRadius: 50,
          }}
          onPress={() => {
            console.log(item);
          }}
        >
          <DownloadIcon fill={"#735e4d"} height={z(36)} width={z(36)} />

          <SingleKiwiCoin height={z(30)} width={z(30)} />
        </TouchableOpacity> */}
        <DownloadWallpaperBtn item={item} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnText: {
    fontFamily: "MontserratLight",
    letterSpacing: 1,
    color: "black",
    // width: "100%",
    padding: 0,
    margin: 0,
  },
});
