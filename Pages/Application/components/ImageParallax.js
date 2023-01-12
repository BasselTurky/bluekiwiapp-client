import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LinearGradient from "react-native-linear-gradient";

import AddToFavIcon from "../../../Components/AddToFavIcon";
import DownloadIcon from "../../../Components/DownloadIcon";

import { addFav } from "../../../Features/favArray";

import { updateCurrentArray } from "../../../Features/currentArray";
import { updatePreviousArray } from "../../../Features/previousArray";
import { updateSearchResult } from "../../../Features/searchResult";
export default function ImageParallax({
  index,
  type,
  image_object,
  download,
  marginTop,
  toast,
}) {
  const winWidth = Dimensions.get("window").width;
  const winHeight = Dimensions.get("window").height;

  const imgWidth = winWidth * 0.8;
  const imgHeight = winHeight * 0.325;

  const dispatch = useDispatch();
  const [showLayer, setShowLayer] = useState(false);

  const userData = useSelector((state) => state.userData.value);
  const favArray = useSelector((state) => state.favArray.value);

  return (
    // <View
    //   style={
    //     {
    //       // elevation: 5,
    //     }
    //   }
    // >
    <TouchableOpacity
      style={{
        // backgroundColor: "rgba(0,0,0,0.2)",
        backgroundColor: "black",
        // width: imgWidth,
        // height: imgWidth * (13 / 16),
        // width: imgHeight * (16 / 13),
        // height: imgHeight,
        // marginTop: marginTop,
        height: "100%",
        width: "100%",
        // borderWidth: 4,
        borderRadius: 10,
        overflow: "hidden",

        // padding: 10,
      }}
      activeOpacity={0.8}
      onPress={() => {
        // download(currentArray[0].value);
        if (showLayer) {
          setShowLayer(false);
        } else {
          setShowLayer(true);
        }
      }}
    >
      <Image
        style={{
          width: "100%",
          height: "100%",
          // borderRadius: 20,
        }}
        resizeMode="contain"
        // resizeMethod={"resize"}
        source={{
          uri: image_object.value,
        }}
      />
      {showLayer ? (
        <LinearGradient
          locations={[0.1, 0.3, 0.7, 0.9]}
          colors={[
            "rgba(0,0,0,0.8)",
            "transparent",
            "transparent",
            "rgba(0,0,0,0.8)",
          ]}
          style={styles.container}
        >
          <TouchableOpacity
            style={{
              // zIndex: 2,
              position: "absolute",
              // top: 30,
              // left: 17,
              bottom: 15,
              right: 15,
              width: 40,
              height: 40,
              backgroundColor: "rgba(255,255,255,0.3)",
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              // image_object.value
              download(image_object.value);
              // download(currentArray[0].value);
            }}
          >
            <DownloadIcon fill={"#fff"} width={15} height={15} />
          </TouchableOpacity>

          {image_object.fav ? (
            <View
              style={{
                // zIndex: 2,
                position: "absolute",
                // top: 30,
                // left: 17,
                bottom: 15,
                right: 70,
                width: 40,
                height: 40,
                backgroundColor: "rgba(255,255,255,0.3)",
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AddToFavIcon
                color={"#fff"}
                // fill={"transparent"}
                fill={"#fff"}
                // fill={image_object.fav?"#fff":'transparent'}
                width={15}
                height={15}
              />
            </View>
          ) : (
            <TouchableOpacity
              style={{
                // zIndex: 2,
                position: "absolute",
                // top: 30,
                // left: 17,
                bottom: 15,
                right: 70,
                width: 40,
                height: 40,
                backgroundColor: "rgba(255,255,255,0.3)",
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                // change fav value to true
                // if (type === "current") {
                //   dispatch(updateCurrentArray({ index: index, value: true }));
                // } else if (type === "previous") {
                //   dispatch(updatePreviousArray({ index: index, value: true }));
                // }
                if (favArray[userData.email].length < 100) {
                  // add

                  dispatch(
                    addFav({ key: userData.email, value: image_object })
                  );

                  dispatch(updateSearchResult({ index: index, value: true }));
                } else {
                  // don't add
                  toast.show({
                    type: "info",
                    text1: "100 favorites limit reached!",
                    visibilityTime: 3000,
                  });
                }

                // to do: update searchResult

                // download(currentArray[0].value);
              }}
            >
              <AddToFavIcon
                color={"#fff"}
                fill={"transparent"}
                // fill={image_object.fav?"#fff":'transparent'}
                width={15}
                height={15}
              />
            </TouchableOpacity>
          )}
        </LinearGradient>
      ) : null}
    </TouchableOpacity>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 10,
  },
});
