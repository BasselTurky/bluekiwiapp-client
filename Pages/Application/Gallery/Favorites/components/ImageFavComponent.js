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

import AddToFavIcon from "../../../../../Components/AddToFavIcon";
import DownloadIcon from "../../../../../Components/DownloadIcon";

import { removeFromFav } from "../../../../../Features/favArray";

import { resetFavInSearchResult } from "../../../../../Features/searchResult";

export default function ImageFavComponent({
  favCarouselRef,
  index,
  imageUrl,
  download,
  // color,
}) {
  const dispatch = useDispatch();
  const [showLayer, setShowLayer] = useState(false);

  const userData = useSelector((state) => state.userData.value);

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
