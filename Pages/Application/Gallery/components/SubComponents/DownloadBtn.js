import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageUrl } from "../../../../../Features/pageUrl";
import DownloadIcon from "../../../../../Components/DownloadIcon";
import { z } from "../../../../../utils/scaling";
export default React.memo(function DownloadBtn({
  imageKey,
  imageObject,
  mainWebviewUrlRef,
  viewRef,
}) {
  const dispatch = useDispatch();
  const download = useCallback(() => {
    let start = imageObject.value.lastIndexOf("/");
    let end = imageObject.value.lastIndexOf("_");
    let code = imageObject.value.substring(start + 1, end);
    // let download_url = `https://pixabay.com/images/download/${code}_1920.jpg?attachment`;
    mainWebviewUrlRef.current = `https://pixabay.com/images/download/${code}_1920.jpg?attachment`;
    viewRef.current.injectJavaScript(
      `window.location.href = 'https://pixabay.com/images/download/${code}_1920.jpg?attachment';`
    );
    // dispatch(setPageUrl(download_url));
  }, [imageObject]);

  //   console.log("download");
  return (
    // <Button
    //   title="Download"
    //   onPress={() => {
    //     console.log(imageObject.height, " ", imageObject.width);
    //     //   console.log("download: ");
    //     //   console.log(imageWidth, imageHeight);
    //     download(imageObject.value);
    //     //   console.log(imageObject);
    //   }}
    // />

    <TouchableOpacity
      onPress={download}
      style={{
        // backgroundColor: "red",
        height: z(50),
        width: z(50),
        borderRadius: z(20),
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DownloadIcon fill={"#000000"} height={z(36)} width={z(36)} />
      {/* <EvilIcons name="heart" size={z(40)} color="black" /> */}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({});
