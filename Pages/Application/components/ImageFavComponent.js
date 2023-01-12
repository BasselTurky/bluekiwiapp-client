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
import { removeFromFav } from "../../../Features/favArray";

import { updateCurrentArray } from "../../../Features/currentArray";
import { updatePreviousArray } from "../../../Features/previousArray";
import { resetFavInSearchResult } from "../../../Features/searchResult";

export default function ImageFavComponent({
  favCarouselRef,
  index,
  imageUrl,
  download,
  // color,
}) {
  // console.log("rendered");
  // const winWidth = Dimensions.get("window").width;
  // const winHeight = Dimensions.get("window").height;

  // const imgWidth = winWidth * 0.8;
  // const imgHeight = winHeight * 0.325;

  const dispatch = useDispatch();
  const [showLayer, setShowLayer] = useState(false);

  const userData = useSelector((state) => state.userData.value);
  const currentArray = useSelector((state) => state.currentArray.value);
  const previousArray = useSelector((state) => state.previousArray.value);
  const favArray = useSelector((state) => state.favArray.value);
  const searchResult = useSelector((state) => state.searchResult.value);

  // function download(url) {
  //   // extract image code
  //   console.log(url);
  //   let start = url.lastIndexOf("/");
  //   let end = url.indexOf("__");
  //   let code = url.substring(start + 1, end);
  //   // create download url

  //   let download_url = `https://pixabay.com/images/download/${code}_1920.jpg?attachment`;
  //   console.log("url: ", download_url);
  //   console.log(isWebviewLoaded, isViewLogin);
  //   // load webview with download link
  //   if (isWebviewLoaded && isViewLogin) {
  //     setPageUrl(download_url);
  //     console.log("success");
  //   }
  //   console.log("download done");
  // }

  // function check_array(firstArray, secondArray, value, index) {
  //   for (let i = 0; i < firstArray.length; i++) {
  //     if (firstArray[i].value === value) {
  //       // update
  //       dispatch(updateCurrentArray({ index: i, value: false }));
  //     }
  //   }

  //   for (let i = 0; i < secondArray.length; i++) {
  //     if (secondArray[i].value === value) {
  //       // update
  //       dispatch(updatePreviousArray({ index: i, value: false }));
  //     }
  //   }
  // }

  return (
    <TouchableOpacity
      style={{
        // backgroundColor: "black",
        width: "100%",
        height: "100%",
        // borderRadius: 10,
        // padding: 10,
        overflow: "hidden",
      }}
      activeOpacity={0.8}
      onPress={() => {
        if (showLayer) {
          setShowLayer(false);
        } else {
          setShowLayer(true);
        }
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          margin: 10,
          borderRadius: 10,
          overflow: "hidden",
          // elevation: 8,
        }}
      >
        <Image
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="contain"
          source={{
            uri: imageUrl.value,
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
                download(imageUrl.value);
                // download(currentArray[0].value);
              }}
            >
              <DownloadIcon fill={"#fff"} width={15} height={15} />
            </TouchableOpacity>

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
                dispatch(resetFavInSearchResult(imageUrl));
                dispatch(removeFromFav({ key: userData.email, index: index }));
                // if (
                //   index === favArray[userData.email].length - 1 &&
                //   index !== 0
                // ) {

                //   dispatch(resetFavInSearchResult(imageUrl));
                //   favCarouselRef.current.snapToItem(index - 1);
                //   setTimeout(() => {
                //     dispatch(
                //       removeFromFav({ key: userData.email, index: index })
                //     );
                //   }, 300);
                // } else {

                //   dispatch(resetFavInSearchResult(imageUrl));
                //   dispatch(
                //     removeFromFav({ key: userData.email, index: index })
                //   );
                // }
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
            </TouchableOpacity>
          </LinearGradient>
        ) : null}
      </View>
    </TouchableOpacity>
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

{
  /* {image_object.fav ? (
            null
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
                if (type === "current") {
                  dispatch(updateCurrentArray({ index: index, value: true }));
                } else if (type === "previous") {
                  dispatch(updatePreviousArray({ index: index, value: true }));
                }

                dispatch(
                  addFav({ key: userData.email, value: image_object.value })
                );

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
          )} */
}
