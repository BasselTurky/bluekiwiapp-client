import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFav } from "../../../../Features/favArray";
import { resetFavInSearchResult } from "../../../../Features/searchResult";
import { setPageUrl } from "../../../../Features/pageUrl";
import { useToast } from "react-native-toast-notifications";
import FavoriteBtn from "./SubComponents/FavoriteBtn";
import FavoriteRemoveBtn from "./SubComponents/FavoriteRemoveBtn";
import DownloadBtn from "./SubComponents/DownloadBtn";
import FlexImage from "./SubComponents/FlexImage";
import { z } from "../../../../utils/scaling";
export default function FavoriteItemCard({
  imageKey,
  imageObject,
  index,
  mainWebviewUrlRef,
  viewRef,
}) {
  // const dispatch = useDispatch();
  // const toast = useToast();
  // const userData = useSelector((state) => state.userData.value);

  // function download(url) {
  //   try {
  //     // extract image code
  //     //   console.log(url);
  //     let start = url.lastIndexOf("/");
  //     let end = url.lastIndexOf("_");
  //     let code = url.substring(start + 1, end);
  //     //   console.log("here ", code);
  //     let download_url = `https://pixabay.com/images/download/${code}_1920.jpg?attachment`;
  //     //   console.log("url: ", download_url);
  //     //   console.log(isWebviewLoaded, isViewLogin);
  //     // load webview with download link

  //     // not needed:
  //     //   if (isWebviewLoaded && isViewLogin) {
  //     dispatch(setPageUrl(download_url));
  //     // console.log("success");
  //     //   }
  //     console.log("download done");
  //   } catch (error) {
  //     toast.show("ErrorID: E057: ", { type: "error" });
  //   }
  // }

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "auto",
        paddingTop: z(30),
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: "#f0f0f0",
      }}
    >
      <FlexImage imageObject={imageObject} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: z(30),
          height: z(80),
        }}
      >
        <FavoriteRemoveBtn
          imageKey={imageKey}
          imageObject={imageObject}
          index={index}
        />

        <DownloadBtn
          imageKey={imageKey}
          imageObject={imageObject}
          mainWebviewUrlRef={mainWebviewUrlRef}
          viewRef={viewRef}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
