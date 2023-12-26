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
import { useToast } from "react-native-toast-notifications";
import { addFav } from "../../../../../Features/favArray";
import { updateSearchResult } from "../../../../../Features/searchResult";
import { resetFavInSearchResult } from "../../../../../Features/searchResult";
import { removeFromFav } from "../../../../../Features/favArray";
import { EvilIcons } from "@expo/vector-icons";
import HeartIcon from "./../../../../../Components/HeartIcon";
import HeartFilled from "../../../../../Components/HeartFilled";
import { z } from "../../../../../utils/scaling";

export default function FavoriteRemoveBtn({ imageKey, imageObject, index }) {
  const toast = useToast();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.value);
  const favArray = useSelector((state) => state.favArray.value);
  //   const favArray = useSelector((state) => state.favArray.value);

  // dispatch(resetFavInSearchResult(imageUrl));

  const removeFromFavorites = useCallback(() => {
    // if (favArray[userData.email].length < 100) {
    console.log(favArray);
    dispatch(removeFromFav({ user: userData.email, key: imageKey }));
    //   dispatch(addFav({ user: userData.email, key:imageKey, imgObj:imageObject }));
    dispatch(updateSearchResult({ key: imageKey, update: false }));
    // } else {
    //   toast.show("100 favorites limit reached!", {
    //     type: "normal",
    //   });
    // }
  }, [dispatch, imageObject, userData]);

  return (
    <TouchableOpacity
      onPress={removeFromFavorites}
      style={{
        // backgroundColor: "red",
        height: z(50),
        width: z(50),
        borderRadius: z(20),
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* { add heart icon with x } */}
      <HeartFilled fill={"red"} height={z(34)} width={z(34)} />

      {/* <EvilIcons name="heart" size={z(40)} color="black" /> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});

// {imageObject.fav ? (

//       ) : (
//         <HeartIcon color={"#000000"} height={z(34)} width={z(34)} />
//       )}
