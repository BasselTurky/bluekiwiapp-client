import { StyleSheet, Text, View, Animated } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import FavoriteItemCard from "./FavoriteItemCard";
import { useFocusEffect } from "@react-navigation/native";
import { setActive } from "../../../../Features/active";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z, zx } from "../../../../utils/scaling";
export default function Favorite({
  //   download,
  // searchResult,
  //   userData,
  //   favArray,
  containerHeight,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  onScrollEndDrag,
  handleScroll,
  mainWebviewUrlRef,
  viewRef,
}) {
  // Favorite Item Card
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.value);
  const favArray = useSelector((state) => state.favArray.value)[userData.email];

  useFocusEffect(
    React.useCallback(() => {
      // Code to run when the screen is focused
      //   console.log('GalleryHome screen is focused');
      dispatch(setActive("favorite"));
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
      {favArray && Object.keys(favArray).length > 0 ? (
        <Animated.FlatList
          onScroll={handleScroll}
          data={Object.entries(favArray).reverse()}
          keyExtractor={(item, index) => item[0]}
          // renderItem={({ item }) => <RenderItem item={item} navigation={navigation} />}
          renderItem={({ item, index }) => (
            <FavoriteItemCard
              imageKey={item[0]}
              imageObject={item[1]}
              index={index}
              mainWebviewUrlRef={mainWebviewUrlRef}
              viewRef={viewRef}
              //   download={download}
            />
          )}
          ListFooterComponent={() => (
            <View
              style={{
                height: insets.bottom + zx(10),
                width: "100%",
              }}
            ></View>
          )}
          contentContainerStyle={{
            paddingTop: containerHeight,
            marginTop: 8,
          }}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          scrollEventThrottle={1}
          // inverted={true}
        />
      ) : null}
      <View
        style={{
          position: "absolute",
          height: z(40),
          width: z(96),
          backgroundColor: "#rgba(0,0,0,0.4)",
          // right: 10,
          bottom: insets.bottom + z(10),
          zIndex: 10,
          // elevation: 1,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: z(10),
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            fontSize: z(16),
            color: "#e2e2e2",
            letterSpacing: 1,
          }}
        >
          {Object.keys(favArray).length} / 100
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
