import {
  StyleSheet,
  Text,
  View,
  Animated,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z, zx } from "../../../../utils/scaling";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ScrollUpButton from "./SubComponents/ScrollUpButton";

import { setIsWebViewReady } from "../../../../Features/isWebViewReady";
import { setUrlData } from "../../../../Features/urlData";
import { setIsLoading } from "../../../../Features/isLoading";

import { setModalVisible } from "../../../../Features/modalVisible";
// import next and back icons
export default function GalleryFooter({
  bottomTabTranslate,
  homeFlatlistRef,
  scrollY,
  //   containerHeight,

  //   setLoadingLayer,
  //   setReady,
  //   setUrlData,
  //   lastSearchInput,
  //   setShowPageSelector,
}) {
  const dispatch = useDispatch();
  const pages = useSelector((state) => state.pages.value);
  const lastSearchInput = useSelector((state) => state.lastSearchInput.value);

  const insets = useSafeAreaInsets();
  // add buttons to change pages
  // which require all states related to changing pages

  // pages, setUrlData, setReady, lastSearchInput, showPageSelector, setShowPageSelector

  // if number of pages > 1 : display go back arrow
  // onPress: setReady(true); > setUrlData :
  // input: lastSearchInput,
  // page: Number(pages.current) - 1,

  // View to display current page / total pages  > {pages.current} / {pages.total}
  // on View Press : if total pages > 1 : show page selector modal {showPageSelector}

  // display go to next page arrow if: Number(pages.current) < Number(pages.total)

  // onPress: if : Number(pages.current) < Number(pages.total)
  // setReady(true); > setUrlData
  // input: lastSearchInput,
  // page: Number(pages.current) + 1,
  return (
    <Animated.View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        height: zx(120),
        bottom: 0,
        transform: [{ translateY: bottomTabTranslate }],
        backgroundColor: "#fff",
        paddingBottom: insets.bottom,
        elevation: 12,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          //   backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            // backgroundColor: "green",
          }}
        >
          {Number(pages.current) > 1 ? (
            <TouchableOpacity
              style={{
                //   backgroundColor: "pink",
                height: z(50),
                width: z(50),
                borderRadius: z(20),
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                if (pages.current > 1) {
                  // setLoadingLayer(true);
                  dispatch(setIsLoading(true));
                  homeFlatlistRef.current.scrollToIndex({
                    index: 0,
                    animated: true,
                  });

                  dispatch(setIsWebViewReady(true));
                  // setReady(true);
                  console.log(lastSearchInput);
                  dispatch(
                    setUrlData({
                      input: lastSearchInput.input,
                      page: Number(pages.current) - 1,
                      portrait: lastSearchInput.portrait,
                    })
                  );
                }
              }}
            >
              <Entypo name="chevron-thin-left" size={z(22)} color="#535353" />
            </TouchableOpacity>
          ) : null}
        </View>
        {pages.current ? (
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "yellow",
              width: z(140),
              height: "80%",
              borderRadius: z(20),
              backgroundColor: "#fff",
              elevation: 1,
              marginHorizontal: z(10),
            }}
            onPress={() => {
              if (Number(pages.total > 1)) {
                dispatch(setModalVisible(true));
              }
            }}
          >
            <Text
              style={{
                fontSize: z(20),
                color: "#535353",
              }}
            >
              {pages.current} / {pages.total}
            </Text>
          </TouchableOpacity>
        ) : null}
        <View
          style={{
            flex: 1,
            // backgroundColor: "green",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View>
            {Number(pages.current) < Number(pages.total) ? (
              <TouchableOpacity
                style={{
                  //   backgroundColor: "pink",
                  height: z(50),
                  width: z(50),
                  borderRadius: z(20),
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => {
                  if (Number(pages.current) < Number(pages.total)) {
                    //   setLoadingLayer(true);
                    dispatch(setIsLoading(true));
                    //   setReady(true);
                    homeFlatlistRef.current.scrollToIndex({
                      index: 0,
                      animated: true,
                    });

                    dispatch(setIsWebViewReady(true));
                    console.log(lastSearchInput);
                    dispatch(
                      setUrlData({
                        input: lastSearchInput.input,
                        page: Number(pages.current) + 1,
                        portrait: lastSearchInput.portrait,
                      })
                    );
                  }
                }}
              >
                <Entypo
                  name="chevron-thin-right"
                  size={z(22)}
                  color="#535353"
                />
              </TouchableOpacity>
            ) : null}
          </View>
          <View
            style={{
              //   backgroundColor: "red",
              marginRight: z(10),
            }}
          >
            <ScrollUpButton
              scrollY={scrollY}
              homeFlatlistRef={homeFlatlistRef}
            />

            {/* <TouchableOpacity
                style={{
                  height: z(50),
                  width: z(50),
                  borderRadius: z(20),
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => {
                  if (homeFlatlistRef.current) {
                    homeFlatlistRef.current.scrollToIndex({
                      index: 0,
                      animated: true,
                    });
                  }
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-double-up"
                  size={24}
                  color="black"
                />
              </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({});
