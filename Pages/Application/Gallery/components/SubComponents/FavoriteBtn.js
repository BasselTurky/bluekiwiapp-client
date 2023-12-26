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
export default React.memo(function FavoriteBtn({
  imageKey,
  imageObject,
  index,
}) {
  const toast = useToast();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.value);
  const favArray = useSelector((state) => state.favArray.value);

  // dispatch(resetFavInSearchResult(imageUrl));

  const handleFavorites = useCallback(() => {
    console.log({
      user: userData.email,
      key: imageKey,
      imgObj: imageObject,
    });
    if (imageObject.fav) {
      // remove from fav on press:
      console.log("there");
      dispatch(removeFromFav({ user: userData.email, key: imageKey }));
      dispatch(updateSearchResult({ key: imageKey, update: false }));
    } else {
      // add to fav on press:
      console.log("here");
      console.log(favArray[userData.email]);
      if (Object.keys(favArray[userData.email]).length < 100) {
        console.log({
          user: userData.email,
          key: imageKey,
          imgObj: imageObject,
        });
        dispatch(
          addFav({ user: userData.email, key: imageKey, imgObj: imageObject })
        );
        dispatch(updateSearchResult({ key: imageKey, update: true }));
      } else {
        toast.show("100 favorites limit reached!", {
          type: "normal",
        });
      }
    }
  }, [dispatch, favArray, imageObject, index, toast, userData.email]);

  return (
    <TouchableOpacity
      onPress={handleFavorites}
      style={{
        // backgroundColor: "red",
        height: z(50),
        width: z(50),
        borderRadius: z(20),
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {imageObject.fav ? (
        <HeartFilled fill={"red"} height={z(34)} width={z(34)} />
      ) : (
        <HeartIcon color={"#000000"} height={z(34)} width={z(34)} />
      )}

      {/* <EvilIcons name="heart" size={z(40)} color="black" /> */}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({});
{
  /* <Button title="Add to Favorites" onPress={addToFavorites} /> */
}
