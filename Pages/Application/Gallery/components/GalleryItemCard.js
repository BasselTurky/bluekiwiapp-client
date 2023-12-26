import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
} from "react-native";
import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import { addFav } from "../../../../Features/favArray";
import { updateSearchResult } from "../../../../Features/searchResult";
import { setPageUrl } from "../../../../Features/pageUrl";
import { z } from "../../../../utils/scaling";
import DownloadBtn from "./SubComponents/DownloadBtn";
import FlexImage from "./SubComponents/FlexImage";
import FavoriteBtn from "./SubComponents/FavoriteBtn";

const winWidth = Dimensions.get("window").width;
const winHeight = Dimensions.get("window").height;

export default React.memo(function GalleryItemCard({
  imageKey,
  imageObject,
  index,
  mainWebviewUrlRef,
  viewRef,
}) {
  //   console.log("Card");
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
        <FavoriteBtn
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
});

const styles = StyleSheet.create({});

// const userData = useSelector((state) => state.userData.value);
//   const toast = useToast();
//   const dispatch = useDispatch();
//   const userData = useSelector((state) => state.userData.value);
//   const favArray = useSelector((state) => state.favArray.value);

//   const [width, setWidth] = useState(0);
//   const [height, setHeight] = useState(0);

//   const widthRef = useRef(winWidth);
//   const heightRef = useRef(0);
//   const displayImage = useRef(false);
//   Image.getSize(imageObject.value, (w, h) => {
//     // setWidth(containerWidth);
//     // setHeight((containerWidth * h) / w);
//     setWidth(winWidth);
//     setHeight((winWidth * h) / w);
//   });

//   useLayoutEffect(() => {

//   }, [imageObject, winWidth]);

//   Image.getSize(imageObject.value, (w, h) => {
//     // setWidth(winWidth);
//     // setHeight((winWidth * h) / w);
//     heightRef.current = (winWidth * h) / w;
//   });
//   useEffect(() => {
//     const fetchImageSize = async () => {
//       try {
//         const { width, height } = await new Promise((resolve, reject) => {
//           Image.getSize(
//             imageObject.value,
//             (w, h) => {
//               resolve({ width: w, height: h });
//             },
//             reject
//           );
//         });

//         // Update the refs with the calculated dimensions
//         widthRef.current = winWidth;
//         //   console.log();
//         heightRef.current = (winWidth * height) / width;
//         displayImage.current = true;
//         console.log(widthRef.current, " ", heightRef.current);
//       } catch (error) {
//         console.error("Error fetching image size:", error);
//       }
//     };

//     fetchImageSize();
//   }, [imageObject]);

//   useEffect(() => {
//     console.log("object");

//     Image.getSize(imageObject.value, (w, h) => {
//       setWidth(winWidth);
//       setHeight((winWidth * h) / w);
//     });
//   }, []);
//   console.log("img");
//   function download(url) {
//     try {
//       // extract image code
//       //   console.log(url);
//       let start = url.lastIndexOf("/");
//       let end = url.lastIndexOf("_");
//       let code = url.substring(start + 1, end);
//       //   console.log("here ", code);
//       let download_url = `https://pixabay.com/images/download/${code}_1920.jpg?attachment`;
//       //   console.log("url: ", download_url);
//       //   console.log(isWebviewLoaded, isViewLogin);
//       // load webview with download link

//       // not needed:
//       //   if (isWebviewLoaded && isViewLogin) {
//       dispatch(setPageUrl(download_url));
//       // console.log("success");
//       //   }
//       console.log("download done");
//     } catch (error) {
//       toast.show("ErrorID: E057: ", { type: "error" });
//     }
//   }

//   const download = useCallback(() => {
//     let start = imageObject.value.lastIndexOf("/");
//     let end = imageObject.value.lastIndexOf("_");
//     let code = imageObject.value.substring(start + 1, end);
//     let download_url = `https://pixabay.com/images/download/${code}_1920.jpg?attachment`;
//     dispatch(setPageUrl(download_url));
//   }, [dispatch, imageObject]);

//   const addToFavorites = useCallback(() => {
//     if (favArray[userData.email].length < 100) {
//       dispatch(addFav({ key: userData.email, value: imageObject }));
//       dispatch(updateSearchResult({ index: index, value: true }));
//     } else {
//       toast.show("100 favorites limit reached!", {
//         type: "normal",
//       });
//     }
//   }, [dispatch, favArray, imageObject, index, toast, userData.email]);

//   const x = useRef(0);
//   useEffect(() => {
//     console.log(x);
//   }, [x.current]);

{
  /* <View
        style={{
          //   flex: 2,
          // width: "100%",
          backgroundColor: "#c4c4c4",
          //   height: "auto",
        }}
      >
       
        <Image

          style={{
            width: width,
            height: height,
          }}
          resizeMode="contain"
          // resizeMethod={"resize"}
          source={{
            uri: imageObject.value,
          }}
        />
    
      </View>
      <Button
        title="Download"
        onPress={() => {
          //   console.log("download: ");
          console.log(imageWidth, imageHeight);
          //   download(imageObject.value);
          //   console.log(imageObject);
        }}
      />
      <Button
        title="Add to Favorites"
        onPress={
          addToFavorites
        }
      /> */
}
