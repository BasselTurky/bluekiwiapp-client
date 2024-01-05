import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import GalleryItemCard from "./GalleryItemCard";
import { useFocusEffect } from "@react-navigation/native";
import { setActive } from "../../../../Features/active";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z, zx } from "../../../../utils/scaling";
import QuickSearchBtn from "./SubComponents/QuickSearchBtn";

const winWidth = Dimensions.get("window").width;
const winHeight = Dimensions.get("window").height;

export default function GalleryHome({
  //   galleryListRef,
  //   download,
  //   searchResult,
  containerHeight,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  onScrollEndDrag,
  handleScroll,
  homeFlatlistRef,
  mainWebviewUrlRef,
  viewRef,
}) {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const searchResult = useSelector((state) => state.searchResult.value);

  // Item: Gallery Image Card component
  //   const searchResult = useSelector((state) => state.searchResult.value);
  //   const galleryLastScrollPosition = useSelector(
  //     (state) => state.galleryLastScrollPosition.value
  //   );
  // need data
  //   console.log(" I rerendered");

  //   useEffect(() => {
  //     console.log(galleryLastScrollPosition);
  //     if (galleryListRef.current) {
  //       if (galleryLastScrollPosition > 0) {
  //         galleryListRef.current.scrollToOffset({
  //           offset: galleryLastScrollPosition,
  //           animated: false,
  //         });
  //       }
  //     }
  //   }, [galleryListRef]);
  console.log("home");
  //   function imageWidth(Image, uri) {
  //     let width;
  //     let height;
  //     Image.getSize(uri, (w, h) => {
  //       width = winWidth;
  //       height = (winWidth * h) / w;
  //     });
  //     // console.log(width, " ", height, " ", uri);
  //     return { width: width, height: height };
  //   }

  // remove this :
  useFocusEffect(
    React.useCallback(() => {
      // Code to run when the screen is focused
      //   console.log('GalleryHome screen is focused');
      dispatch(setActive("gallery"));
      console.log("changess");
      // Optionally, you can return a cleanup function
      return () => {
        // Code to run when the screen is unfocused or component unmounts
        // console.log('GalleryHome screen is unfocused');
      };
    }, [])
  );
  return (
    <View
      style={{
        flex: 1,
        // paddingBottom: insets.bottom,
      }}
    >
      {searchResult && Object.keys(searchResult).length > 0 ? (
        <Animated.FlatList
          ref={homeFlatlistRef}
          // style={{
          //   paddingBottom: insets.bottom,
          // }}
          onScroll={handleScroll}
          data={Object.entries(searchResult)}
          keyExtractor={(item, index) => item[0]}
          // renderItem={({ item }) => <RenderItem item={item} navigation={navigation} />}
          ListFooterComponent={() => (
            <View
              style={{
                height: insets.bottom + zx(10),
                width: "100%",
              }}
            ></View>
          )}
          renderItem={({ item, index }) => {
            //   let imageSizeObj = imageWidth(Image, item.value);

            return (
              <GalleryItemCard
                //   key={index}
                imageKey={item[0]}
                imageObject={item[1]}
                index={index}
                mainWebviewUrlRef={mainWebviewUrlRef}
                viewRef={viewRef}
              />
            );
          }}
          contentContainerStyle={{
            paddingTop: containerHeight,
            marginTop: 8,
          }}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          scrollEventThrottle={1}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            // paddingHorizontal: z(60),
            // backgroundColor: "grey",
          }}
        >
          <Text
            style={{
              fontSize: z(26),
              // fontFamily: "PlayfairItalic",
              fontWeight: "bold",
              letterSpacing: z(2),
              lineHeight: zx(60),
              color: "#b3b3b3",
              textAlign: "center",
              marginBottom: zx(20),
            }}
          >
            Explore and discover{"\n"}thousands of stunning and high-quality
            photos.{"\n"}
          </Text>
          <View
            style={{
              // backgroundColor: "green",
              width: "100%",
              height: zx(85),
              // borderWidth: 1,
              // borderColor: "#000",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: zx(10),
              }}
            >
              <QuickSearchBtn width={140} customInput={"Night Sky"} />
              <QuickSearchBtn width={100} customInput={"Pets"} />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <QuickSearchBtn width={120} customInput={"Van gogh"} />
              <QuickSearchBtn width={120} customInput={"Forest"} />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
