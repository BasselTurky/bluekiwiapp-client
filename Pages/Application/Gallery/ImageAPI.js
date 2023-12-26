import "react-native-get-random-values";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { WebView } from "react-native-webview";
import React, { useState, useEffect } from "react";
import { s } from "react-native-size-matters";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-snap-carousel";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import GoBackSVG from "../../../Components/GoBackSVG";
import FavoriteIconSVG from "../../../Components/FavoriteIconSVG";
import SearchSVG from "../../../Components/SearchSVG";
import PortraitSVG from "../../../Components/PortraitSVG";
import NextSVG from "../../../Components/NextSVG";
import PrevSVG from "../../../Components/PrevSVG";

import { setSearchResult } from "../../../Features/searchResult";
import { setLastSearchInput } from "../../../Features/lastSearchInput";
import { setPages } from "../../../Features/pages";

import { Button as PaperButton } from "react-native-paper";

import ImageParallax from "./components/ImageParallax";

import ErrorView from "../../Error/ErrorView";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const viewHeight = height * 0.7;
const item_height = width * 0.7;

import { z } from "../../../utils/scaling";

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
  const toast = useToast();
  const webViewRef = React.useRef(null);
  const pageNumberInputRef = React.useRef(null);
  const [webViewUrl, setWebViewUrl] = useState("");
  const [inputText, setInputText] = useState("");
  const [urlText, setUrlText] = useState("");
  const [urlData, setUrlData] = useState();
  const [ready, setReady] = useState(false);
  // const searchPage = useSelector((state) => state.searchPage.value);
  const [pageNumberInput, setPageNumberInput] = useState("");
  const [loadingLayer, setLoadingLayer] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  const [newSearch, setNewSearch] = useState(false);

  const [showPageSelector, setShowPageSelector] = useState(false);

  const lastSearchInput = useSelector((state) => state.lastSearchInput.value);
  const pages = useSelector((state) => state.pages.value);

  const regex = /^[a-zA-Z ]+$/;

  const jsCode = `window.ReactNativeWebView.postMessage(document.documentElement.innerHTML)`;

  const carouselRef = React.useRef(null);
  const insets = useSafeAreaInsets();

  const winWidth = Dimensions.get("window").width;
  const winHeight = Dimensions.get("window").height;

  const imgWidth = winWidth * 0.8;

  const dispatch = useDispatch();

  const [showWebview, setShowWebview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [url, setUrl] = useState("https://pixabay.com/");

  const [displayCurrrent, setDisplayCurrrent] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const [showLayer, setShowLayer] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);

  const [endReached, setEndReached] = useState(0);

  const userData = useSelector((state) => state.userData.value);
  const searchResult = useSelector((state) => state.searchResult.value);
  const favArray = useSelector((state) => state.favArray.value);

  useEffect(() => {
    if (urlData) {
      setWebViewUrl(
        `https://pixabay.com/photos/search/${
          urlData.input
        }/?manual_search=1&pagi=${urlData.page}&safesearch=true${
          isPortrait ? "&orientation=vertical" : ""
        }`
      );
    }
  }, [urlData]);

  useEffect(() => {
    setShowWebview(true);
  }, []);

  function get_photos_array() {
    webViewRef.current.injectJavaScript(
      `
      (function(){
        try{

          let available_pages = window.document.getElementsByClassName('pages--1CAfr')[0]

          if(!available_pages){
            window.ReactNativeWebView.postMessage(JSON.stringify({ message: "no-result" }))
          }else{

            let page_number
            let total = ''
            const divElement = document.querySelector('.pages--1CAfr');
            if(divElement){

           const pageInput = divElement.querySelector('.pageInput--sZUNb');
            page_number = pageInput.value

            const textContent = divElement.textContent;

            for (let i = 0; i < textContent.length ; i++){
              if(!isNaN(parseInt(textContent[i]))){
                total += textContent[i]
              }
            }

            }else{

              page_number = 1
              total = 1
            }

              const linkElements = document.querySelectorAll('a.link--WHWzm');


      const imageSrcArray = [];


      linkElements.forEach(linkElement => {

          const imgElement = linkElement.querySelector('img');


          if (imgElement) {
              if(imgElement.getAttribute('data-lazy-src') === null){
              imageSrcArray.push(imgElement.getAttribute('src'));
              
              }else{
                imageSrcArray.push(imgElement.getAttribute('data-lazy-src'));  
              }
              
          }
      });

      window.ReactNativeWebView.postMessage(JSON.stringify({ message: "get-photos" , data: imageSrcArray , total_pages: total, page_number: page_number }))
         console.log({ message: "get-photos" , data: imageSrcArray , total_pages: total, page_number: page_number })

          }

          

        }catch(error){
          window.ReactNativeWebView.postMessage(JSON.stringify({ message: "error" , data: error}))
          console.log({ message: "error" , data: error})
        }

        
      })()
      `
    );
  }

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

        let joined = [...resultArray, ...fav_array].sort((a, b) => {
          if (a.value < b.value) {
            return -1;
          }
          if (a.value > b.value) {
            return 1;
          }
          return 0;
        });

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
      let end = url.lastIndexOf("_");
      let code = url.substring(start + 1, end);
      console.log("here ", code);
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
      toast.show("ErrorID: E057: ", { type: "error" });
    }
  }
  try {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          paddingTop:
            height * 0.04 < 24
              ? insets.top + height * 0.005
              : insets.top + height * 0.015,
          paddingBottom: insets.bottom,
        }}
      >
        <View
          style={{
            width: width,
            alignItems: "center",
            marginBottom: z(height * 0.05),
            elevation: 10,
            backgroundColor: "green",
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: z(17),
              backgroundColor: "yellow",
            }}
          >
            <TouchableOpacity
              style={{
                width: z(40),
                height: z(40),
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
                width: z(40),
                height: z(40),
                backgroundColor: "rgba(0,0,0,0.3)",
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                console.log(width, height);
                navigation.navigate("Favorites");
              }}
            >
              <FavoriteIconSVG fill={"#fff"} width={18} height={18} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              height: z(40),
              maxWidth: "75%",
              width: "75%",
              marginTop: z(height * 0.015),
              flexDirection: "row",
              backgroundColor: "blue",
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "#40414f",
                borderBottomLeftRadius: z(30),
                borderTopLeftRadius: z(30),
                elevation: 5,
                justifyContent: "center",
              }}
            >
              <TextInput
                style={{
                  paddingHorizontal: z(16),
                  color: "#c1c1c1",
                }}
                placeholder="Search here.."
                value={inputText}
                onChangeText={(text) => {
                  setInputText(text);
                }}
                placeholderTextColor="#c1c1c1"
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                backgroundColor: isPortrait ? "#7ac16899" : "#40414f",
                height: "100%",
                paddingHorizontal: z(5),
                elevation: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                if (isPortrait) {
                  setIsPortrait(false);
                } else {
                  setIsPortrait(true);
                }
              }}
            >
              <PortraitSVG width={z(26)} height={z(26)} fill={"white"} />
            </TouchableOpacity>
            <TouchableOpacity
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
              disabled={isLoading}
              activeOpacity={0.6}
              style={{
                backgroundColor: "rgba(175,145,153,0.9)",
                height: "100%",
                width: z(50),
                borderBottomRightRadius: z(30),
                borderTopRightRadius: z(30),
                elevation: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isLoading ? (
                <ActivityIndicator size={"small"} color={"#40414f"} />
              ) : (
                <SearchSVG width={z(22)} height={z(22)} fill={"white"} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {searchResult.length ? (
          <View>
            <View
              style={{
                backgroundColor: "rgba(255,255,255,0.025)",
                alignItems: "center",
                justifyContent: "center",
                height: viewHeight,
                width: width,
                overflow: "hidden",
                borderRadius: 80,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: "rgba(255,255,255,0.2)",
              }}
            >
              {/* <Carousel
                ref={carouselRef}
                maxToRenderPerBatch={5}
                vertical={true}
                data={searchResult}
                // itemWidth={width * 0.8}
                // itemHeight={height * 0.325}
                itemHeight={item_height}
                // sliderWidth={width}
                sliderHeight={viewHeight}
                enableMomentum={true}
                onSnapToItem={(index) => {
                  // if (index > searchResult.length - 9 && !endReached) {
                  //   setEndReached(true);
                  //   dispatch(increasePageNumber());
                  //   setUrlText(lastSearchInput);
                  // }
                  // console.log(index);
                  // console.log(searchResult.length);
                  setCurrentSlide(index);
                }}
                containerCustomStyle={{
                  // backgroundColor: "pink",
                  // alignItems: "center",
                  // marginVertical: 40,
                  // width: width,
                  // padding: 10,
                  // borderWidth: 3,

                  // height: height * 0.5,
                  borderRadius: z(50),
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
                    />
                  );
                }}
              /> */}
            </View>

            <View
              style={{
                width: "100%",
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: z(17),
                marginTop: z(24),
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexGrow: 1,
                  flexDirection: "row-reverse",
                }}
              >
                {Number(pages.current) > 1 ? (
                  <TouchableOpacity
                    disabled={loadingLayer}
                    activeOpacity={0.8}
                    onPress={() => {
                      if (pages.current > 1) {
                        setLoadingLayer(true);
                        setReady(true);
                        setUrlData({
                          input: lastSearchInput,
                          page: Number(pages.current) - 1,
                        });
                      }
                    }}
                    style={{
                      width: z(40),
                      height: z(40),
                      borderRadius: 100,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <PrevSVG fill={"#8e767c"} width={z(26)} height={z(26)} />
                  </TouchableOpacity>
                ) : null}
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: "#40414f",
                  padding: z(10),
                  borderRadius: z(10),
                  marginHorizontal: z(10),
                }}
                onPress={() => {
                  if (Number(pages.total > 1)) {
                    setShowPageSelector(true);
                    setTimeout(() => {
                      try {
                        pageNumberInputRef.current.focus();
                      } catch (error) {}
                    }, 300);
                  }
                }}
              >
                <Text
                  style={{
                    color: "#909090",
                    fontFamily: "Righteous_400Regular",
                  }}
                >
                  {pages.current} / {pages.total}
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  flex: 1,
                  flexGrow: 1,
                  flexDirection: "row",
                }}
              >
                {Number(pages.current) < Number(pages.total) ? (
                  <TouchableOpacity
                    disabled={loadingLayer}
                    activeOpacity={0.8}
                    onPress={() => {
                      if (Number(pages.current) < Number(pages.total)) {
                        setLoadingLayer(true);
                        setReady(true);
                        setUrlData({
                          input: lastSearchInput,
                          page: Number(pages.current) + 1,
                        });

                        // setUrlText("");

                        // setIsLoading(true);
                      }
                    }}
                    style={{
                      width: z(40),
                      height: z(40),
                      // backgroundColor: "rgba(0,0,0,0.3)",
                      borderRadius: 100,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <NextSVG
                      fill={"#8e767c"}
                      // fill={"rgba(175,145,153,1)"}
                      width={z(26)}
                      height={z(26)}
                    />
                    {/* <NextSVG fill={"#36485f"} width={26} height={26} /> */}
                  </TouchableOpacity>
                ) : null}
              </View>

              {/* {currentSlide > 1 ? (
                <TouchableOpacity
                  style={{
                    // zIndex: 2,
                    position: "absolute",
                    // top: 30,
                    right: 17,
                    // alignSelf: "flex-end",
                    width: z(40),
                    height: z(40),
                    backgroundColor: "rgba(0,0,0,0.3)",
                    borderRadius: 100,
                    // borderBottomLeftRadius: 50,
                    // borderBottomRightRadius: 50,
                    // borderTopLeftRadius: 100,
                    // borderTopRightRadius: 100,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    carouselRef.current.snapToItem(1);
                  }}
                >           
                  <Text
                    style={{
                      fontSize: z(18),
                      color: "white",
                      fontFamily: "Righteous_400Regular",
                    }}
                  >
                    Up
                  </Text>
                </TouchableOpacity>
              ) : null} */}
            </View>
          </View>
        ) : (
          <View>
            <Text
              style={{
                marginTop: z(50),
                fontSize: z(18),
                fontFamily: "Righteous_400Regular",
                color: "#404040",
              }}
            >
              Search and download high quality images..
            </Text>
          </View>
        )}

        {showPageSelector ? (
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <View
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "grey",
              }}
            >
              <KeyboardAvoidingView
                behavior="padding"
                enabled={true}
                keyboardVerticalOffset={s(90)}
                style={{}}
              >
                <View
                  style={{
                    width: width * 0.8,
                    borderRadius: z(10),
                    zIndex: 12,
                    // alignSelf: "center",
                    // bottom: -300,
                    elevation: 5,
                    height: s(120),
                    backgroundColor: "#fff",
                    justifyContent: "space-around",
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <TextInput
                      ref={pageNumberInputRef}
                      returnKeyType="done"
                      keyboardType="number-pad"
                      numberOfLines={1}
                      style={{
                        // alignSelf: "center",
                        height: s(44),
                        // marginBottom: s(10),
                        color: "#454545",
                        // borderBottomColor: "#f8f8f8",
                        // borderBottomWidth: 1,
                        // fontFamily: "Playfair",
                        // fontFamily: "ChelaOne_400Regular",
                        fontFamily: "Graduate_400Regular",
                        // fontFamily: "PinyonScript_400Regular",
                        // fontFamily: "GrandHotel_400Regular",
                        fontSize: s(15),
                        // marginHorizontal: s(50),

                        textAlign: "center",
                        // color: "#fff",
                        // backgroundColor: "pink",
                        paddingHorizontal: s(10),
                        minWidth: "70%",
                      }}
                      placeholder="Enter page number.."
                      value={pageNumberInput}
                      onChangeText={(val) => {
                        setPageNumberInput(val);
                      }}
                      placeholderTextColor={"#404040cc"}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <PaperButton
                      onPress={() => {
                        setPageNumberInput("");
                        setShowPageSelector(false);
                      }}
                      style={[
                        styles.m_buttonStyle,
                        { backgroundColor: "#fff" },
                      ]}
                      contentStyle={styles.m_buttonContent}
                      labelStyle={styles.m_buttonLabel}
                      // color="green"
                      mode="contained"
                      uppercase={false}
                    >
                      <Text
                        style={{
                          fontSize: s(14),
                          fontFamily: "PlayfairBold",
                          color: "#36485f",
                        }}
                      >
                        Cancel
                      </Text>
                    </PaperButton>
                    <PaperButton
                      disabled={loadingLayer}
                      onPress={() => {
                        if (
                          Number(pageNumberInput) <= Number(pages.total) &&
                          Number(pageNumberInput) >= 1 &&
                          Number(pageNumberInput) !== Number(pages.current)
                        ) {
                          setLoadingLayer(true);
                          setReady(true);
                          setUrlData({
                            input: lastSearchInput,
                            page: Number(pageNumberInput),
                          });
                          setPageNumberInput("");
                          // setUrlText("");

                          // setIsLoading(true);
                          Keyboard.dismiss();
                          setShowPageSelector(false);
                        }
                      }}
                      style={[
                        styles.m_buttonStyle,
                        { backgroundColor: "#36485f" },
                      ]}
                      contentStyle={styles.m_buttonContent}
                      labelStyle={styles.m_buttonLabel}
                      // disabled={isLoading}
                      // color="green"
                      mode="contained"
                      uppercase={false}
                    >
                      <Text
                        style={{
                          fontSize: s(14),
                          fontFamily: "PlayfairBold",
                          color: "#ffffffcc",
                        }}
                      >
                        Go
                      </Text>
                    </PaperButton>
                  </View>
                </View>
              </KeyboardAvoidingView>
              {/* <Button
                title="Close"
                onPress={() => {
                  setShowPageSelector(false);
                }}
              /> */}
            </View>
          </TouchableWithoutFeedback>
        ) : null}

        {loadingLayer ? (
          <TouchableWithoutFeedback>
            <View
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  backgroundColor: "#83c4ff",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size={"large"} color={"#fff"} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        ) : null}

        {showWebview ? (
          <View
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: 1,
              height: 1,
            }}
          >
            <WebView
              ref={webViewRef}
              style={{
                width: 1,
                height: 1,
              }}
              userAgent={
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
              }
              source={{
                uri: webViewUrl,
              }}
              onLoad={() => {
                if (ready) {
                  console.log("getting photos");
                  get_photos_array(); // result will be sent to onMessage
                  console.log("after");
                }
              }}
              javaScriptEnabled
              onMessage={(event) => {
                let eventObj = JSON.parse(event.nativeEvent.data);
                let message = eventObj.message;
                let data = eventObj.data;
                let total_pages = eventObj.total_pages;
                let page_number = eventObj.page_number;

                if (message === "get-photos") {
                  dispatch(
                    setPages({
                      current: page_number,
                      total: total_pages,
                    })
                  );

                  let modifiedResult = modifyResult(data);

                  let markedResult = mark_fav(
                    modifiedResult,
                    favArray[userData.email]
                  );
                  console.log("done processing");
                  dispatch(setSearchResult(markedResult));

                  if (newSearch) {
                    dispatch(setLastSearchInput(inputText));
                    setInputText("");
                  }

                  setNewSearch(false);
                  setLoadingLayer(false);
                  setIsLoading(false);
                } else if (message === "no-result") {
                  console.log("no result");
                  toast.show("No results found!", {
                    type: "normal",
                  });
                  setInputText("");
                  setNewSearch(false);
                  setLoadingLayer(false);
                  setIsLoading(false);
                } else {
                  console.log("error: ", data);
                  console.log(message);
                  setNewSearch(false);
                  setLoadingLayer(false);
                  setIsLoading(false);
                }
              }}
            />
          </View>
        ) : null}
      </View>
    );
  } catch (error) {
    console.log("ErrorID: E058: ", error);
    return <ErrorView Error={"ErrorID: E058"} />;
  }
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
  m_buttonStyle: {
    width: s(100),
    height: s(36),
    elevation: 5,
    alignSelf: "center",
    marginBottom: s(13),
  },
  m_buttonContent: {
    padding: 0,
    margin: 0,
    height: "100%",
    width: "100%",
  },
  m_buttonLabel: {
    padding: 0,
    margin: 0,
    width: "100%",
  },
});

{
  /* <Button
            title="show"
            onPress={() => {
              console.log(searchResult.length);
              console.log(urlData);
              console.log(lastSearchInput);
            }}
          /> */
}
{
  /* {displayCurrrent && currentArray.length ? (
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
          ) : null} */
}

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
