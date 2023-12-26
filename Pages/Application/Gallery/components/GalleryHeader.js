import {
  StyleSheet,
  Text,
  View,
  Animated,
  StatusBar,
  Button,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { setActive } from "../../../../Features/active";
import { useDispatch, useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "../../../../utils/scaling";
import { setSearchInput } from "../../../../Features/searchInput";
import { Feather, Entypo, Ionicons } from "@expo/vector-icons";

import { setIsWebViewReady } from "../../../../Features/isWebViewReady";
// import { setNewSearch } from "../../../../Features/newSearch";
// import { setIsPortrait } from "../../../../Features/isPortrait";
import { setUrlData } from "../../../../Features/urlData";
import { setIsLoading } from "../../../../Features/isLoading";
export default function GalleryHeader({
  //   setFocused,
  headerTranslate,
  containerHeight,

  //   inputText,
  //   setInputText,
  //   isPortrait,
  //   setIsPortrait,
  //   lastSearchInput,
  //   setReady,
  //   setNewSearch,
  //   setUrlData,
  //   setIsLoading,
  index,
  setIndex,
  searchInputRef,
  homeFlatlistRef,
}) {
  //   const active = useSelector((state) => state.active.value);

  // search icon, search input, seach handleFunction, setReady, setNewSearch, setUrlData, lastSearchInput

  const regex = /^[a-zA-Z ]+$/;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const [input, setInput] = useState("");
  const [portrait, setPortrait] = useState(false);

  const searchInput = useSelector((state) => state.searchInput.value);

  // const isPortrait = useSelector((state) => state.isPortrait.value);
  // const lastSearchInput = useSelector((state) => state.lastSearchInput.value);
  // const favArray = useSelector((state) => state.favArray.value);

  function submitSearch() {
    let searchInputValue = searchInputRef.current.value;
    console.log("stat search: ", searchInputValue);

    if (searchInputValue !== "" && regex.test(searchInputValue)) {
      // if (lastSearchInput === searchInputValue) {
      //   // dispatch(setSearchInput(""));
      //   // searchInputRef.current.clear();
      //   searchInputRef.current.value = "";
      //   setInput("");
      //   return;
      // }

      try {
        if (homeFlatlistRef.current) {
          console.log("here");
          homeFlatlistRef.current.scrollToIndex({ index: 0, animated: true });
        }
        dispatch(setIsLoading(true));
        // setReady(true);
        dispatch(setIsWebViewReady(true));
        // dispatch(setNewSearch(true));
        dispatch(
          setUrlData({
            input: searchInputValue,
            page: 1,
            portrait: portrait,
          })
        );
        console.log("again: ", searchInputValue);
        setInput("");
        // setIsLoading(true);

        Keyboard.dismiss();
      } catch (error) {
        console.log("L433", error);
      }
    }
  }
  return (
    <Animated.View
      style={{
        top: 0,
        transform: [{ translateY: headerTranslate }],
        position: "absolute",
        left: 0,
        right: 0,
        height: containerHeight,
        backgroundColor: "#fff",
        zIndex: 2,
        elevation: 5,
      }}
    >
      <View
        style={{
          flex: 1,
          //   height: containerHeight,
          // elevation: 8,
          width: "100%",
          //   backgroundColor: "#f54",
          paddingTop: insets.top + z(6),
          //   backgroundColor: "red",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            flexDirection: "row",
            // backgroundColor: "pink",
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              //   backgroundColor: "yellow",
              paddingHorizontal: z(8),
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Entypo name="chevron-left" size={z(36)} color="black" />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              flex: 1,
              backgroundColor: "#f2f2f2",
              marginRight: z(20),
              borderRadius: z(20),
              overflow: "hidden",
              paddingHorizontal: z(5),
              elevation: 1,
              zIndex: 2,
              //   paddingRight: insets.right,
              //   paddingLeft: insets.left,
            }}
          >
            <TouchableOpacity
              style={{
                // backgroundColor: "green",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: z(10),
              }}
              onPress={submitSearch}
            >
              <Feather name="search" size={z(24)} color="#bbbbbb" />
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                // alignItems: "center",
                paddingHorizontal: z(5),
              }}
            >
              <TextInput
                ref={searchInputRef}
                style={{
                  fontSize: z(16),
                }}
                placeholder="Search for amazing photos"
                placeholderTextColor={"#c1c1c1"}
                value={input}
                onChangeText={(text) => {
                  //   dispatch(setSearchInput(text));
                  searchInputRef.current.value = text;
                  setInput(text);
                }}
                returnKeyType="search"
                onSubmitEditing={submitSearch}
              />
            </View>

            <TouchableOpacity
              style={{
                // backgroundColor: "green",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: z(10),
              }}
              onPress={() => {
                if (portrait) {
                  setPortrait(false);
                } else {
                  setPortrait(true);
                }
              }}
            >
              <Ionicons
                name="ios-phone-portrait-outline"
                size={30}
                color={portrait ? "black" : "#bbbbbb"}
              />
            </TouchableOpacity>
          </View>

          {/* <Button
            title="Search"
            onPress={() => {
              if (inputText !== "" && regex.test(inputText)) {
                if (lastSearchInput === inputText) {
                  setInputText("");
                  return;
                }
                try {
                  setReady(true);
                  setNewSearch(true);
                  setUrlData({
                    input: inputText,
                    page: 1,
                  });
                  setIsLoading(true);
                  Keyboard.dismiss();
                } catch (error) {
                  console.log("L433", error);
                }
              }
            }}
          /> */}

          {/* <Button
            title="Portrait"
            onPress={() => {
              if (isPortrait) {
                setIsPortrait(false);
              } else {
                setIsPortrait(true);
              }
            }}
          /> */}
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "#fff",
            height: z(60),
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              borderBottomWidth: z(3),
              borderBlockColor: index === 0 ? "lightblue" : "#f0f0f0",
            }}
            onPress={() => {
              setIndex(0);
            }}
          >
            <Text
              style={{
                fontSize: z(18),
                opacity: index === 0 ? 1 : 0.4,
              }}
            >
              Gallery
            </Text>
          </TouchableOpacity>
          {/* <Button
            title="Gallery"
            onPress={() => {
              //   setFocused("gallery");
              //   navigation.navigate("Gallery");
              //   dispatch(setActive("gallery"));
              
            }}
          /> */}
          {/* <Button
            title="Favorite"
            onPress={() => {
              //   setFocused("favorite");
              //   navigation.navigate("Favorite");
              //   dispatch(setActive("favorite"));
              setIndex(1);
            }}
          /> */}
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              borderBottomWidth: z(3),
              borderBlockColor: index === 1 ? "lightblue" : "#f0f0f0",
            }}
            onPress={() => {
              setIndex(1);
            }}
          >
            <Text
              style={{
                fontSize: z(18),
                opacity: index === 1 ? 1 : 0.4,
              }}
            >
              Favorite
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({});
