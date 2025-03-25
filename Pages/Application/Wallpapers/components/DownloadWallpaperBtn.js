import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Linking,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { z, zx } from "../../../../utils/scaling";
import { useSocket } from "../../../SocketContext/SocketContext";
import { useToast } from "react-native-toast-notifications";
import SingleKiwiCoin from "../../../../Components/SingleKiwiCoin";
import DownloadIcon from "../../../../Components/DownloadIcon";

import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

async function requestPermissions() {
  const { status: existingStatus } = await MediaLibrary.getPermissionsAsync();

  if (existingStatus === "granted") {
    // Permission already granted, no need to request again
    return true;
  }

  // If permission is not granted, request it
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== "granted") {
    alert("Permission to access media library is required to save files.");
    return false;
  }

  return true;
}

export default function DownloadWallpaperBtn({ item }) {
  const socket = useSocket();
  const dispatch = useDispatch();
  const toast = useToast();
  const coins = useSelector((state) => state.coins.value);
  const [downloading, setDownloading] = useState(false);

  // async function requestStoragePermission() {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //       {
  //         title: "Storage Permission",
  //         message: "This app needs access to your storage to save files.",
  //         buttonNeutral: "Ask Me Later",
  //         buttonNegative: "Cancel",
  //         buttonPositive: "OK",
  //       }
  //     );

  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       return true;
  //     } else {
  //       ToastAndroid.show("Storage permission denied.", ToastAndroid.SHORT);
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error("Error requesting storage permission:", error);
  //     return false;
  //   }
  // }

  // async function saveToDownloads(imageUrl) {
  //   try {
  //     setDownloading(true); // Start downloading, show ActivityIndicator

  //     // Request storage permission
  //     const hasPermission = await requestStoragePermission();
  //     if (!hasPermission) {
  //       ToastAndroid.show("No Permission.", ToastAndroid.SHORT);
  //       return;
  //     }

  //     // Extract the file name from the URL
  //     const fileName = imageUrl.split("/").pop();

  //     // Define the local file path (temporary storage)
  //     const fileUri = FileSystem.documentDirectory + fileName;

  //     // Download the file to temporary storage
  //     await FileSystem.downloadAsync(imageUrl, fileUri);

  //     // Request access to external storage (Downloads folder)
  //     const permissions =
  //       await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
  //     if (permissions.granted) {
  //       // Create the file in the selected directory
  //       await FileSystem.StorageAccessFramework.createFileAsync(
  //         permissions.directoryUri,
  //         fileName,
  //         "image/jpeg"
  //       );

  //       // Show success message
  //       ToastAndroid.show(
  //         "File saved to Downloads folder!",
  //         ToastAndroid.SHORT
  //       );
  //     } else {
  //       ToastAndroid.show("Permission denied.", ToastAndroid.SHORT);
  //     }
  //   } catch (error) {
  //     console.error("Error saving file:", error);
  //     ToastAndroid.show("Failed to save file.", ToastAndroid.SHORT);
  //   } finally {
  //     setDownloading(false); // Stop downloading, hide ActivityIndicator
  //   }
  // }

  async function downloadImage(imageUrl) {
    try {
      setDownloading(true);
      // Request permissions
      const permissionRequested = await requestPermissions();
      if (!permissionRequested) return;

      // Extract the file name from the URL
      const fileName = imageUrl.split("/").pop();
      console.log("filename: ", fileName);

      // Define the local file path
      const fileUri = FileSystem.documentDirectory + fileName;

      // Download the file
      const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);

      // Save the file to the gallery
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("Downloaded", asset, false);

      // Show success message

      ToastAndroid.show("Image saved to gallery!", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Error downloading image:", error);

      ToastAndroid.show("Failed to download image.", ToastAndroid.SHORT);
    } finally {
      setDownloading(false); // Stop downloading, hide ActivityIndicator
    }
  }

  async function handleDownload() {
    // user current coins
    if (coins < 1) {
      toast.show("Not enough coins", { type: "error" });
      return;
    }

    downloadImage(item.img_link);
  }

  return (
    <>
      {downloading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: zx(80),
          }}
        >
          <ActivityIndicator size="large" color="#735e4d" />
        </View>
      ) : (
        <TouchableOpacity
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
            // ToastAndroid.show("Image saved to gallery!", ToastAndroid.SHORT);
            handleDownload();
          }}
        >
          <DownloadIcon fill={"#735e4d"} height={z(36)} width={z(36)} />

          <SingleKiwiCoin height={z(30)} width={z(30)} />
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
