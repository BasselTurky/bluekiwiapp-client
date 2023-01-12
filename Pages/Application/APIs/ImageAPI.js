import "react-native-get-random-values";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import DOMParser from "react-native-html-parser";
import { WebView } from "react-native-webview";
import React, { useState, useEffect } from "react";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-snap-carousel";

import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";

import Toast, { BaseToast } from "react-native-toast-message";

import GoBackSVG from "../../../Components/GoBackSVG";
import FavoriteIconSVG from "../../../Components/FavoriteIconSVG";
import AddToFavSVG from "../../../Components/AddToFavSVG";
import SearchSVG from "../../../Components/SearchSVG";
import DownloadIcon from "../../../Components/DownloadIcon";
// import AddToFavFillSVG from "../../../Components/AddToFavFillSVG";
// import AddToFavNoFillSVG from "../../../Components/AddToFavNoFillSVG";
import AddToFavIcon from "../../../Components/AddToFavIcon";
import NextSVG from "../../../Components/NextSVG";
import PrevSVG from "../../../Components/PrevSVG";

import { setSearchResult } from "../../../Features/searchResult";
import { setFavArray } from "../../../Features/favArray";
import {
  increasePageNumber,
  resetPageNumber,
} from "../../../Features/searchPage";
import { setCurrentArray } from "../../../Features/currentArray";
import { setPreviousArray } from "../../../Features/previousArray";
import { setLastSearchInput } from "../../../Features/lastSearchInput";

import { Button as PaperButton } from "react-native-paper";

import ImageComponent from "../components/ImageComponent";
import ImageParallax from "../components/ImageParallax";

// const util = require("util");

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const viewHeight = height * 0.7;
const item_height = height * 0.4;

export default function ImageAPI({
  navigation,
  viewRef,
  pageUrl,
  setPageUrl,
  isWebviewLoaded,
  setIsWebviewLoaded,
  isViewLogin,
  setIsViewLogin,
}) {
  const carouselRef = React.useRef(null);
  const insets = useSafeAreaInsets();

  const winWidth = Dimensions.get("window").width;
  const winHeight = Dimensions.get("window").height;

  const imgWidth = winWidth * 0.8;

  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");
  const [showWebview, setShowWebview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [url, setUrl] = useState("https://pixabay.com/");
  const [urlText, setUrlText] = useState("");
  const [displayCurrrent, setDisplayCurrrent] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const [showLayer, setShowLayer] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);

  // download webview
  // let viewRef = React.useRef(null);
  // const [pageUrl, setPageUrl] = React.useState("https://pixabay.com");
  // const [isWebviewLoaded, setIsWebviewLoaded] = useState(false);
  const userData = useSelector((state) => state.userData.value);
  const searchResult = useSelector((state) => state.searchResult.value);
  const favArray = useSelector((state) => state.favArray.value);
  const searchPage = useSelector((state) => state.searchPage.value);
  const currentArray = useSelector((state) => state.currentArray.value);
  const previousArray = useSelector((state) => state.previousArray.value);
  const lastSearchInput = useSelector((state) => state.lastSearchInput.value);

  const jsCode = `window.ReactNativeWebView.postMessage(document.documentElement.innerHTML)`;

  // const pix_url = `https://pixabay.com/photos/search/${inputText}/?manual_search=1&page=1&safesearch=true`;

  // useEffect(() => {
  //   console.log("favArray: ", favArray);
  // }, [favArray]);

  function modifyResult(array) {
    try {
      let newArray = [...array];

      for (let i = 0; i < newArray.length; i++) {
        newArray[i] = { value: newArray[i], fav: false };
      }

      return newArray;
    } catch (error) {
      console.log("L131", error);
    }
  }

  function mark_fav(resultArray, fav_array) {
    try {
      if (fav_array.length) {
        let dubIndex = [];

        // let total = [...resultArray];

        // total.push(...resultArray);--------------------

        let joined = [...resultArray, ...fav_array].sort((a, b) => {
          if (a.value < b.value) {
            return -1;
          }
          if (a.value > b.value) {
            return 1;
          }
          return 0;
        });

        // for (const item of total) {
        //   console.log(item);
        // }

        // for (const item of fav_array) {
        //   console.log(item);
        // }
        // joined.push(...total, ...fav_array);----------------------

        // joined------------------

        for (let i = 0; i < joined.length; i++) {
          if (i < joined.length - 1) {
            if (joined[i].value === joined[i + 1].value) {
              dubIndex.push(joined[i]);
            }
          }
        }

        let original_with_dub = [...resultArray, ...dubIndex].sort((a, b) => {
          if (a.value < b.value) {
            return -1;
          }
          if (a.value > b.value) {
            return 1;
          }
          return 0;
        });

        // original_with_dub.push();------------------------------

        // original_with_dub

        let newOriginal = [];

        for (let i = 0; i < original_with_dub.length; i++) {
          if (i < original_with_dub.length - 1) {
            if (original_with_dub[i].value === original_with_dub[i + 1].value) {
              original_with_dub[i].fav = true;

              newOriginal.push(original_with_dub[i]);
              i++;
            } else {
              newOriginal.push(original_with_dub[i]);
            }
          } else {
            newOriginal.push(original_with_dub[i]);
          }
        }

        return newOriginal;
      } else {
        return resultArray;
      }
    } catch (error) {
      console.log("L193", error);
    }
  }

  function download(url) {
    try {
      // extract image code
      console.log(url);
      let start = url.lastIndexOf("/");
      let end = url.indexOf("__");
      let code = url.substring(start + 1, end);
      // create download url

      let download_url = `https://pixabay.com/images/download/${code}_1920.jpg?attachment`;
      console.log("url: ", download_url);
      console.log(isWebviewLoaded, isViewLogin);
      // load webview with download link
      if (isWebviewLoaded && isViewLogin) {
        setPageUrl(download_url);
        console.log("success");
      }
      console.log("download done");
    } catch (error) {
      console.log("L219", error);
    }
  }
  // function get_result_from_html(event) {
  //   if (url !== "") {
  //     let array = [];
  //     const htmlString = event.nativeEvent.data;
  //     const parser = new DOMParser.DOMParser();
  //     const parsed = parser.parseFromString(htmlString, "text/html");
  //     const imgsArray = parsed.getElementsByClassName("photo-result-image");

  //     // console.log(imgsArray);
  //     for (let i = 0; i < imgsArray.length; i++) {
  //       if (!imgsArray[i].attributes[4]) {
  //         // console.log(imgsArray[i].attributes[0].value);
  //         array.push(imgsArray[i].attributes[0].value);
  //       } else {
  //         // console.log(imgsArray[i].attributes[3].value);
  //         array.push(imgsArray[i].attributes[3].value);
  //       }
  //     }
  //     // console.log(array);
  //     // modify to {}
  //     let modifiedResult = modifyResult(array);
  //     // mark fav
  //     let markedResult = mark_fav(modifiedResult, favArray);
  //     // dispatch
  //     dispatch(setSearchResult(markedResult));
  //     // turn off loading
  //     setIsLoading(false);
  //   }
  //   // set webview Display to false
  //   // setShowWebview(false);
  // }

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function get_two_random_values(mainArray) {
    try {
      let array = [...mainArray];
      let randomPicks = [];

      let firstRandomIndex = randomInteger(0, array.length - 1);
      let firstValue = array[firstRandomIndex];
      // delete first value from array

      array.splice(firstRandomIndex, 1);
      console.log("first clip ", firstRandomIndex, array.length);
      let secondRandomIndex = randomInteger(0, array.length - 1);
      let secondValue = array[secondRandomIndex];

      array.splice(secondRandomIndex, 1);
      console.log("second clip ", secondRandomIndex, array.length);
      randomPicks.push(firstValue, secondValue);
      console.log(randomPicks, array.length);
      return { randomPicks, array };
    } catch (error) {
      console.log("L280", error);
    }
  }

  useEffect(() => {
    try {
      if (searchResult.length === 100) {
        let resultObject = get_two_random_values(searchResult);
        // save and extract
        dispatch(setSearchResult(resultObject.array));
        dispatch(setCurrentArray(resultObject.randomPicks));
        setIsNextDisabled(false);
      }
    } catch (error) {
      console.log("295", error);
    }

    // console.log(searchResult.length);
  }, [searchResult]);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ImageBackground
          source={require("../../../assets/splashx2.png")}
          resizeMode="cover"
          style={{
            flex: 1,
            backgroundColor: "#ffcb76",
            alignItems: "center",
            paddingTop:
              height * 0.04 < 24
                ? insets.top + height * 0.005
                : insets.top + height * 0.015,
            // paddingTop: insets.top + 10,
            paddingBottom: insets.bottom,
            // justifyContent: "center",
            // width: "100%",
          }}
        >
          <View
            style={{
              width: width,
              // height: 50,
              alignItems: "center",
              marginBottom: height * 0.05,
              elevation: 10,
              // zIndex: 2,
            }}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 17,
              }}
            >
              <TouchableOpacity
                style={{
                  // zIndex: 2,
                  // position: "absolute",
                  // top: 30,
                  // left: 17,
                  width: 40,
                  height: 40,
                  backgroundColor: "rgba(0,0,0,0.3)",
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <GoBackSVG fill={"#fff"} width={15} height={15} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  // zIndex: 2,
                  // position: "absolute",
                  // top: 30,
                  // right: 17,
                  width: 40,
                  height: 40,
                  backgroundColor: "rgba(0,0,0,0.3)",
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  navigation.navigate("Favorites");
                }}
              >
                <FavoriteIconSVG fill={"#fff"} width={18} height={18} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                height: 40,
                maxWidth: "75%",
                width: "75%",
                marginTop: height * 0.015,
                flexDirection: "row",
                // height: 40,
                // backgroundColor: "grey",
              }}
            >
              <View
                style={{
                  flex: 1,
                  // paddingHorizontal: 8,
                  // paddingVertical: 6,
                  backgroundColor: "#fff",
                  // borderRadius: 30,
                  borderBottomLeftRadius: 30,
                  borderTopLeftRadius: 30,
                  elevation: 5,
                  justifyContent: "center",

                  // justifyContent: "space-between",
                }}
              >
                <TextInput
                  style={{
                    paddingHorizontal: 16,
                    // paddingVertical: 6,
                  }}
                  placeholder="Search here.."
                  value={inputText}
                  onChangeText={(text) => {
                    setInputText(text);
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  if (inputText !== "") {
                    try {
                      setUrlText("");
                      // setIsLoading(true);
                      // setShowWebview(true)
                      dispatch(resetPageNumber());
                      setUrlText(inputText);
                      dispatch(setLastSearchInput(inputText));
                      setInputText("");
                      Keyboard.dismiss();
                      if (carouselRef.current) {
                        carouselRef.current.snapToItem(0);
                      }
                    } catch (error) {
                      console.log("L433", error);
                    }
                  }
                }}
                disabled={isLoading}
                activeOpacity={0.6}
                style={{
                  backgroundColor: "pink",
                  height: "100%",
                  width: 50,
                  borderBottomRightRadius: 30,
                  borderTopRightRadius: 30,
                  elevation: 5,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isLoading ? (
                  <ActivityIndicator size={"small"} color={"#7caac2"} />
                ) : (
                  <SearchSVG width={22} height={22} fill={"white"} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          {/* next / prev ---- start */}

          {/* <View
            style={{
              // backgroundColor: "grey",
              height: 50,
              width: "100%",
              marginTop: height * 0.02,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              marginBottom: height * 0.02,
            }}
          >
            {previousArray.length && !displayCurrrent === false ? (
              <TouchableOpacity
                style={{
                  // zIndex: 2,
                  // position: "absolute",
                  // top: 130,
                  // right: 67,
                  width: 40,
                  height: 40,
                  backgroundColor: "rgba(0,0,0,0.3)",
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingRight: 3,
                  marginRight: 17,
                }}
                onPress={() => {
                  setDisplayCurrrent(false);
                }}
              >
                <PrevSVG fill={"#fff"} width={20} height={20} />
              </TouchableOpacity>
            ) : null}

            {currentArray.length ? (
              <TouchableOpacity
                style={{
                  // zIndex: 2,
                  // position: "absolute",
                  // top: 130,
                  // right: 17,
                  width: 40,
                  height: 40,
                  backgroundColor: "rgba(0,0,0,0.3)",
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 3,
                  marginRight: 17,
                }}
                disabled={isNextDisabled}
                onPress={() => {
                  if (!displayCurrrent) {
                    setDisplayCurrrent(true);
                  } else {
                    if (searchResult.length > 1) {
                      console.log("page numbber: ", searchPage);
                      // pick 2 , extract , display , save current in prev
                      dispatch(setPreviousArray(currentArray));

                      let resultObject = get_two_random_values(searchResult);

                      // console.log(resultObject.randomPicks);
                      dispatch(setSearchResult(resultObject.array));

                      dispatch(setCurrentArray(resultObject.randomPicks));
                    } else {
                      //
                      setIsNextDisabled(true);
                      if (urlText === "") {
                        console.log("here 1");

                        dispatch(increasePageNumber());
                        setUrlText(lastSearchInput);
                      }
                      {
                        dispatch(increasePageNumber());
                      }
                    }
                  }
                }}
              >
                <NextSVG fill={"#fff"} width={20} height={20} />
              </TouchableOpacity>
            ) : null}
          </View> */}

          {/* next / prev ---- end */}

          {searchResult.length ? (
            <>
              <View
                style={{
                  backgroundColor: "rgba(0,0,0,0.1)",
                  alignItems: "center",
                  justifyContent: "center",
                  height: viewHeight,
                  width: width,
                  overflow: "hidden",
                  borderRadius: 80,

                  // borderBottomLeftRadius: 80,
                  // borderBottomRightRadius: 80,
                  // elevation: 5,
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: "rgba(0,0,0,0.5)",
                }}
              >
                <Carousel
                  ref={carouselRef}
                  maxToRenderPerBatch={5}
                  vertical={true}
                  data={searchResult}
                  itemWidth={width * 0.8}
                  // itemHeight={height * 0.325}
                  itemHeight={item_height}
                  sliderWidth={width}
                  sliderHeight={viewHeight}
                  enableMomentum={true}
                  onSnapToItem={(index) => {
                    setCurrentSlide(index);
                  }}
                  // loop={true}
                  containerCustomStyle={{
                    // backgroundColor: "pink",
                    // alignItems: "center",
                    // marginVertical: 40,
                    width: width,
                    // padding: 10,
                    // borderWidth: 3,

                    // height: height * 0.5,
                    borderRadius: 50,
                  }}
                  contentContainerCustomStyle={{
                    // backgroundColor: "lightyellow",
                    // height: height * 0.5,
                    alignItems: "center",
                    // width: width * 0.4,
                    // padding: 20,
                    // borderWidth: 3,
                    borderColor: "green",
                    // borderRadius: 50,
                  }}
                  slideStyle={{
                    // backgroundColor: "grey",
                    // width: width * 0.5,
                    // height: height * 0.5,
                    // borderRadius: 50,

                    // padding: 10,
                    // borderWidth: 3,

                    borderColor: "blue",

                    // alignItems: "center",
                    justifyContent: "center",
                    // height:
                    width: item_height * (16 / 13),
                    // overflow: "hidden",
                  }}
                  // pagingEnabled={true}
                  renderItem={({ item, index }) => {
                    return (
                      <ImageParallax
                        key={index}
                        index={index}
                        image_object={item}
                        download={download}
                        toast={Toast}
                      />
                    );
                  }}
                />
              </View>
              {currentSlide > 1 ? (
                <View
                  style={{
                    flex: 1,
                    width: "100%",
                    // height: 40,
                    // backgroundColor: "blue",
                    // justifyContent: "center",
                    flexDirection: "row-reverse",
                    alignItems: "center",
                    paddingHorizontal: 17,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      // zIndex: 2,
                      // position: "absolute",
                      // top: 30,
                      // left: 17,
                      width: 40,
                      height: 40,
                      backgroundColor: "rgba(0,0,0,0.3)",
                      borderRadius: 100,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      carouselRef.current.snapToItem(1);
                    }}
                  >
                    {/* <GoBackSVG fill={"#fff"} width={15} height={15} /> */}
                    <Text
                      style={{
                        fontSize: 18,
                        color: "white",
                        fontFamily: "Righteous_400Regular",
                      }}
                    >
                      Up
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </>
          ) : null}

          {/* {displayCurrrent && currentArray.length ? (
            <>
              <ImageComponent
                index={0}
                type={"current"}
                image_object={currentArray[0]}
                download={download}
                marginTop={0}
              />
              <ImageComponent
                index={1}
                type={"current"}
                image_object={currentArray[1]}
                download={download}
                marginTop={height * 0.03}
              />

            </>
          ) : !displayCurrrent && previousArray.length ? (
            <>
              <ImageComponent
                index={0}
                type={"previous"}
                image_object={previousArray[0]}
                download={download}
                marginTop={0}
              />
              <ImageComponent
                index={1}
                type={"previous"}
                image_object={previousArray[1]}
                download={download}
                marginTop={height * 0.03}
              />

            </>
          ) : null} */}

          <View
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              // backgroundColor: "grey",
              // zIndex: 40,
              width: 1,
              height: 1,
            }}
          >
            <WebView
              style={{
                width: 1,
                // height: 100,
                // position: "absolute",
                // left: 50,
                // top: 50,
              }}
              userAgent={
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
              }
              // source={{
              //   uri: `https://pixabay.com/photos/search/cat/?manual_search=1&page=1&safesearch=true`,
              // }}
              source={{
                uri: `https://pixabay.com/photos/search/${urlText}/?manual_search=1&pagi=${searchPage}&safesearch=true`,
              }}
              javaScriptEnabled
              injectedJavaScript={jsCode}
              onMessage={(event) => {
                if (urlText !== "") {
                  try {
                    let array = [];
                    let htmlString = event.nativeEvent.data;
                    let parser = new DOMParser.DOMParser();
                    let parsed = parser.parseFromString(
                      htmlString,
                      "text/html"
                    );
                    let imgsArray =
                      parsed.getElementsByClassName("photo-result-image");

                    // console.log(imgsArray);
                    for (let i = 0; i < imgsArray.length; i++) {
                      if (!imgsArray[i].attributes[4]) {
                        // console.log(imgsArray[i].attributes[0].value);
                        array.push(imgsArray[i].attributes[0].value);
                      } else {
                        // console.log(imgsArray[i].attributes[3].value);
                        array.push(imgsArray[i].attributes[3].value);
                      }
                    }
                    // console.log(array);
                    // modify to {}

                    let modifiedResult = modifyResult(array);

                    // console.log(modifiedResult);
                    // mark fav

                    let markedResult = mark_fav(
                      modifiedResult,
                      favArray[userData.email]
                    );
                    // console.log(markedResult[0]);
                    // dispatch

                    dispatch(setSearchResult(markedResult));
                  } catch (error) {
                    console.log("L790", error);
                  }

                  // turn off loading
                  // setIsLoading(false);
                }
                // set webview Display to false
                // setShowWebview(false);
              }}
            />
          </View>

          {/* <Text
        style={{
          position: "absolute",
          top: 150,
          left: 70,
        }}
      >
        Page number: {searchPage}
      </Text> */}

          <Toast
            topOffset={insets.top + 5}
            // config={toastConfig}
            onPress={() => {
              Toast.hide();
            }}
          />

          {/* ) : null} */}
        </ImageBackground>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 10,
  },

  goBack: {
    zIndex: 2,
    position: "absolute",
    top: 45,
    left: 15,
    padding: 5,
    // backgroundColor: "grey",
  },
  favorites: {
    zIndex: 2,
    position: "absolute",
    top: 45,
    right: 15,
    padding: 5,
    // backgroundColor: "grey",
  },

  buttonStyle: {
    position: "absolute",
    width: 140,
    height: 35,
    backgroundColor: "#59cbbd",
    elevation: 3,
    bottom: 65,
  },
  buttonContent: {
    padding: 0,
    margin: 0,
    height: "100%",
    width: "100%",
  },
  buttonLabel: {
    padding: 0,
    margin: 0,
  },
});

{
  /* <TouchableOpacity
        style={styles.favorites}
        onPress={() => {
          navigation.navigate("Favorites");
        }}
      >
        <FavoriteIconSVG width={36} height={36} />
      </TouchableOpacity> */
}

{
  /* <TouchableOpacity
            style={{
              backgroundColor: "rgba(0,0,0,0.2)",
              width: imgWidth,
              height: imgWidth * (13 / 16),
              marginTop: 70,
              // borderWidth: 4,
              borderRadius: 10,
              // padding: 10,
            }}
            activeOpacity={0.8}
            onPress={() => {
              // download(currentArray[0].value);
              if (showLayer) {
                setShowLayer(false);
              } else {
                setShowLayer(true);
              }
            }}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
                // borderRadius: 20,
              }}
              resizeMode="contain"
              source={{
                uri: currentArray[0].value,
              }}
            />
            {showLayer ? (
              <LinearGradient
                locations={[0.1, 0.3, 0.7, 0.9]}
                colors={[
                  "rgba(0,0,0,0.8)",
                  "transparent",
                  "transparent",
                  "rgba(0,0,0,0.8)",
                ]}
                style={styles.container}
              >
                <TouchableOpacity
                  style={{
                    // zIndex: 2,
                    position: "absolute",
                    // top: 30,
                    // left: 17,
                    bottom: 15,
                    right: 15,
                    width: 40,
                    height: 40,
                    backgroundColor: "rgba(255,255,255,0.3)",
                    borderRadius: 100,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    download(currentArray[0].value);
                  }}
                >
                  <DownloadIcon fill={"#fff"} width={15} height={15} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    // zIndex: 2,
                    position: "absolute",
                    // top: 30,
                    // left: 17,
                    bottom: 15,
                    right: 70,
                    width: 40,
                    height: 40,
                    backgroundColor: "rgba(255,255,255,0.3)",
                    borderRadius: 100,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    // download(currentArray[0].value);
                  }}
                >
                  <AddToFavIcon
                    color={"#fff"}
                    // fill={"transparent"}
                    fill={"#fff"}
                    width={15}
                    height={15}
                  />
                </TouchableOpacity>
              </LinearGradient>
            ) : null}
          </TouchableOpacity> */
}
{
  /* <TouchableOpacity
            style={{
              backgroundColor: "rgba(0,0,0,0.2)",
              width: imgWidth,
              height: imgWidth * (13 / 16),
              marginTop: 25,
              // borderWidth: 4,
              borderRadius: 10,
              // padding: 10,
            }}
            onPress={() => {
              download(currentArray[1].value);
            }}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
              }}
              resizeMode="contain"
              source={{
                uri: currentArray[1].value,
              }}
            />
            <LinearGradient
              locations={[0.1, 0.3, 0.7, 0.9]}
              colors={[
                "rgba(0,0,0,0.8)",
                "transparent",
                "transparent",
                "rgba(0,0,0,0.8)",
              ]}
              style={styles.container}
            ></LinearGradient>
          </TouchableOpacity> */
}

{
  /* <TouchableOpacity
            style={{
              backgroundColor: "rgba(0,0,0,0.2)",
              width: imgWidth,
              height: imgWidth * (13 / 16),
              marginTop: 70,
              // borderWidth: 4,
              borderRadius: 10,
              // padding: 10,
            }}
            onPress={() => {
              download(previousArray[0].value);
            }}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
                // borderRadius: 20,
              }}
              resizeMode="contain"
              source={{
                uri: previousArray[0].value,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(0,0,0,0.2)",
              width: imgWidth,
              height: imgWidth * (13 / 16),
              marginTop: 25,
              // borderWidth: 4,
              borderRadius: 10,
              // padding: 10,
            }}
            onPress={() => {
              download(previousArray[1].value);
            }}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
              }}
              resizeMode="contain"
              source={{
                uri: previousArray[1].value,
              }}
            />
          </TouchableOpacity> */
}
