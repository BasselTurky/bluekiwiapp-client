import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React from "react";
import { z, zx } from "../../../../../utils/scaling";
import { useDispatch, useSelector } from "react-redux";
import { setIsWebViewReady } from "../../../../../Features/isWebViewReady";
import { setNewSearch } from "../../../../../Features/newSearch";
import { setUrlData } from "../../../../../Features/urlData";
import { setIsLoading } from "../../../../../Features/isLoading";
export default function QuickSearchBtn({ customInput, width }) {
  const regex = /^[a-zA-Z ]+$/;
  const dispatch = useDispatch();
  // const lastSearchInput = useSelector((state) => state.lastSearchInput.value);

  function submitSearch() {
    // let searchInputValue = searchInputRef.current.value;
    // console.log("stat search: ", searchInputValue);

    // if (regex.test(searchInputValue)) {
    //   if (lastSearchInput === searchInputValue) {
    //     // dispatch(setSearchInput(""));
    //     // searchInputRef.current.clear();
    //     searchInputRef.current.value = "";
    //     setInput("");
    //     return;
    //   }
    try {
      // if (homeFlatlistRef.current) {
      //   console.log("here");
      //   homeFlatlistRef.current.scrollToIndex({ index: 0, animated: true });
      // }
      // setReady(true);
      dispatch(setIsLoading(true));

      dispatch(setIsWebViewReady(true));
      //   dispatch(setNewSearch(true));
      dispatch(
        setUrlData({
          input: customInput,
          page: 1,
          portrait: false,
        })
      );
      // console.log("again: ", searchInputValue);
      // setInput("");
      // setIsLoading(true);

      Keyboard.dismiss();
    } catch (error) {
      console.log("L433", error);
    }
    // }
  }

  return (
    <TouchableOpacity
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: zx(45),
        width: z(width),
        borderRadius: z(12),
        elevation: 5,
        backgroundColor: "#fff",
        marginHorizontal: z(5),
      }}
      onPress={submitSearch}
    >
      <Text
        style={{
          fontSize: z(15),
        }}
      >
        {customInput}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
