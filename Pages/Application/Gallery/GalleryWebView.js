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
  Image,
} from "react-native";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
// import GalleryViews from "./GalleryViews";

import { WebView } from "react-native-webview";
import { useToast } from "react-native-toast-notifications";
import { Button as PaperButton } from "react-native-paper";
import { z } from "../../../utils/scaling";

import { setSearchResult } from "../../../Features/searchResult";
import { setLastSearchInput } from "../../../Features/lastSearchInput";
import { setPages } from "../../../Features/pages";
import { setPageUrl } from "../../../Features/pageUrl";
import { setSearchInput } from "../../../Features/searchInput";
import { setNewSearch } from "../../../Features/newSearch";
import { setUrlData } from "../../../Features/urlData";
import { setIsWebViewReady } from "../../../Features/isWebViewReady";
import { setIsLoading } from "../../../Features/isLoading";
// import { setNewSearch } from "../../../Features/newSearch";

const winWidth = Dimensions.get("window").width;

export default React.memo(function GalleryWebView({
  // setPageUrl,
  //   isWebviewLoaded,
  //   isViewLogin,
  //
  // scrollY,
  //   containerHeight,
  //   onMomentumScrollBegin,
  //   onMomentumScrollEnd,
  //   onScrollEndDrag,
  //   handleScroll,
  //   headerTranslate,
  //   bottomTabTranslate,
  searchInputRef,
}) {
  // WebView code

  const dispatch = useDispatch();
  const toast = useToast();
  const webViewRef = React.useRef(null);
  //   const pageNumberInputRef = React.useRef(null);

  const [webViewUrl, setWebViewUrl] = useState("");
  const [showWebview, setShowWebview] = useState(false);
  //   const [inputText, setInputText] = useState("");
  //   const [urlData, setUrlData] = useState();
  const urlData = useSelector((state) => state.urlData.value);
  //   const [ready, setReady] = useState(false);
  const isWebViewReady = useSelector((state) => state.isWebViewReady.value);

  //   const [pageNumberInput, setPageNumberInput] = useState("");
  //
  //   const [loadingLayer, setLoadingLayer] = useState(false);

  //   const [isPortrait, setIsPortrait] = useState(false);
  // const isPortrait = useSelector((state) => state.isPortrait.value);

  //   const [newSearch, setNewSearch] = useState(false);
  // const newSearch = useSelector((state) => state.newSearch.value);

  //   const [showPageSelector, setShowPageSelector] = useState(false);

  //   const [isLoading, setIsLoading] = useState(false);

  // const pages = useSelector((state) => state.pages.value);
  const userData = useSelector((state) => state.userData.value);
  // const searchResult = useSelector((state) => state.searchResult.value);
  const favArray = useSelector((state) => state.favArray.value);
  // const searchInput = useSelector((state) => state.searchInput.value);
  //   const searchInputRef = useRef(null);

  useEffect(() => {
    return () => {
      dispatch(setUrlData(null));
      dispatch(setIsWebViewReady(false));
      // dispatch()
    };
  }, []);

  console.log("Web");
  useEffect(() => {
    if (urlData) {
      setWebViewUrl(
        `https://pixabay.com/photos/search/${
          urlData.input
        }/?manual_search=1&pagi=${urlData.page}&safesearch=true${
          urlData.portrait ? "&orientation=vertical" : ""
        }`
      );
    }
  }, [urlData]);

  useEffect(() => {
    setShowWebview(true);
  }, []);
  // TO DO : make array of objects then each obj should have url, width and height
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
      const imageDataArray = []
      let imageDataMap = new Map()
      const imageDataObject = {}

      linkElements.forEach(linkElement => {

          const imgElement = linkElement.querySelector('img');


          if (imgElement) {
              if(imgElement.getAttribute('data-lazy-src') === null){
                
                
                let computedStyle = window.getComputedStyle(imgElement)
                let maxWidth = computedStyle.getPropertyValue('max-width')
                let maxHeight = computedStyle.getPropertyValue('max-height')
                let width = imgElement.width
                let height = imgElement.height
                let url = imgElement.getAttribute('src')
                let imgObj = {width:maxWidth, height:maxHeight, value:url, fav:false}

                imageDataObject[url]=imgObj
                imageDataMap.set(url,imgObj)
                imageDataArray.push(imgObj)
              imageSrcArray.push(imgElement.getAttribute('src'));
              
              }else{
                let computedStyle = window.getComputedStyle(imgElement)
                let maxWidth = computedStyle.getPropertyValue('max-width')
                let maxHeight = computedStyle.getPropertyValue('max-height')
                let width = imgElement.width
                let height = imgElement.height
                let url = imgElement.getAttribute('data-lazy-src')
                let imgObj = {width:maxWidth, height:maxHeight, value:url , fav:false}

                imageDataObject[url]=imgObj
                imageDataMap.set(url,imgObj)
                imageDataArray.push(imgObj)

                imageSrcArray.push(imgElement.getAttribute('data-lazy-src'));  
              }
              
          }
      });

      window.ReactNativeWebView.postMessage(JSON.stringify({ message: "get-photos" , data: imageSrcArray , total_pages: total, page_number: page_number, dataObj: imageDataObject, dataMap: imageDataMap }))
         console.log({ message: "get-photos" , data: imageDataArray , total_pages: total, page_number: page_number })

          }

          

        }catch(error){
          window.ReactNativeWebView.postMessage(JSON.stringify({ message: "error" , data: error}))
          console.log({ message: "error" , data: error})
        }

        
      })()
      `
    );
  }

  function modifyResult(array_of_image_objects) {
    try {
      let array = [...array_of_image_objects];

      for (let i = 0; i < array.length; i++) {
        // go inside every array[i] and add key { fav: false }
        array[i]["fav"] = false;
      }

      //   let newArray = [...array];

      //   for (let i = 0; i < newArray.length; i++) {
      //     newArray[i] = { value: newArray[i], fav: false };
      //   }

      //   return newArray;
      return array;
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
  function __markFav(resultArray, favArray) {
    try {
      if (favArray.length) {
        const favSet = new Set(favArray.map((item) => item.value));

        const newOriginal = resultArray.map((item) => {
          if (favSet.has(item.value)) {
            return { ...item, fav: true };
          }
          return item;
        });
        return newOriginal;
      } else {
        return resultArray;
      }
    } catch (error) {
      console.log("Error:", error);
      return resultArray; // Return original array in case of an error
    }
  }

  function _markFav(resultArray, favArray) {
    try {
      if (favArray.length) {
        const favSet = new Set(favArray.map((item) => item.value));

        resultArray.forEach((item) => {
          if (favSet.has(item.value)) {
            item.fav = true;
          }
        });

        return resultArray;
      } else {
        return resultArray;
      }
    } catch (error) {
      console.log("Error:", error);
      return resultArray; // Return original array in case of an error
    }
  }

  function getImageDimensions_(array_of_image_objects) {
    // [{fav:false, value:uri}]
    let array = array_of_image_objects;
    for (let i = 0; i < array.length; i++) {
      // i is {fav:false, value:uri}
      // define width and height
      // let width
      let height;

      Image.getSize(array[i].value, (w, h) => {
        height = (winWidth * h) / w;
      });

      // add dimensions to image object
      array[i]["width"] = winWidth;
      array[i]["height"] = height;
    }
    return array;
  }

  async function getImageDimensions(array_of_image_objects) {
    // const img = new Image
    // console.log("type: ", typeof array_of_image_objects);
    // let arr = Array.from(array_of_image_objects);
    // console.log(arr);
    // console.log("type: ", typeof arr);
    let array = [...array_of_image_objects];
    // let array = Array.isArray(array_of_image_objects)
    //   ? [...array_of_image_objects] // Create a copy of the array to avoid modifying the original
    //   : [array_of_image_objects];

    for (let i = 0; i < array.length; i++) {
      //   let imageObject = array[i];

      try {
        const { width, height } = await getImageSizeAsync(array[i].value);
        array[i]["width"] = winWidth;
        array[i]["height"] = (winWidth * height) / width;
        // console.log(width, " ", height);
      } catch (error) {
        console.error(
          `Error getting image dimensions for ${array[i].value}:`,
          error
        );
      }
    }

    return array;
  }

  function getImageSizeAsync(uri) {
    return new Promise((resolve, reject) => {
      Image.getSize(
        uri,
        (width, height) => {
          resolve({ width, height });
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  return (
    // <View
    //   style={{
    //     flex: 1,
    //   }}
    // >

    <>
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
              if (isWebViewReady) {
                // ready and setReady are used to prevent get_photos_arrary function from running at first load

                console.log("getting photos");
                get_photos_array(); // result will be sent to onMessage
                console.log("after");
              }
            }}
            javaScriptEnabled
            onMessage={async (event) => {
              try {
                let eventObj = JSON.parse(event.nativeEvent.data);
                // console.log(eventObj.dataObj);
                let message = eventObj.message;
                let data = eventObj.dataObj;
                let total_pages = eventObj.total_pages;
                let page_number = eventObj.page_number;

                let searchInputValue = searchInputRef.current.value;
                console.log("onMessage: ", searchInputValue);
                if (message === "get-photos") {
                  dispatch(
                    setPages({
                      current: page_number,
                      total: total_pages,
                    })
                  );

                  //   let modifiedResult = modifyResult(data);

                  // let markedResult = _markFav(data, favArray[userData.email]);
                  // console.log("done processing");

                  //---------------------------------------------
                  // mark favorites:
                  let favObj = favArray[userData.email];
                  // favArray[userData.email] should be a map
                  for (const key in favObj) {
                    if (data.hasOwnProperty(key)) {
                      data[key].fav = true;
                    }
                  }

                  // if (favmap && favmap.size > 0) {
                  //   favmap.forEach((value, key, map) => {
                  //     if (data.has(key)) {
                  //       data.get(key).fav = true;
                  //     }
                  //   });
                  // }

                  //   let array_of_images_with_dimensions =
                  //     await getImageDimensions(markedResult);

                  //   console.log(array_of_images_with_dimensions);
                  //   console.log(markedResult);
                  dispatch(setSearchResult(data));
                  dispatch(setIsLoading(false));
                  // if (newSearch) {
                  dispatch(setLastSearchInput(urlData));
                  //   //   dispatch(setSearchInput(""));

                  //   console.log("after clear : ", searchInputRef.current.value);
                  // }
                  searchInputRef.current.value = "";
                  // dispatch(setNewSearch(false));

                  // setLoadingLayer(false);

                  // setIsLoading(false);
                } else if (message === "no-result") {
                  console.log("no result");
                  toast.show("No results found!", {
                    type: "normal",
                  });
                  // dispatch(setSearchInput(""));
                  searchInputRef.current.value = "";
                  console.log("after clear 2 : ", searchInputRef.current.value);

                  // dispatch(setNewSearch(false));

                  // setLoadingLayer(false);

                  // setIsLoading(false);
                } else {
                  console.log("error: ", data);
                  console.log(message);
                  // dispatch(setNewSearch(false));

                  // setLoadingLayer(false);

                  // setIsLoading(false);
                }
              } catch (error) {
                console.log(error);
              }
            }}
          />
        </View>
      ) : null}
    </>
    // </View>
  );
});

const styles = StyleSheet.create({});

{
  /* <GalleryViews
        // download={download}
        // scrollY={scrollY}
        containerHeight={containerHeight}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollEndDrag={onScrollEndDrag}
        handleScroll={handleScroll}
        headerTranslate={headerTranslate}
        bottomTabTranslate={bottomTabTranslate}
        searchInputRef={searchInputRef}
        // inputText={inputText}
        // setInputText={setInputText}
        // isPortrait={isPortrait}
        // setIsPortrait={setIsPortrait}
        // lastSearchInput={lastSearchInput}
        // setUrlData={setUrlData}
        // setReady={setReady}
        // setNewSearch={setNewSearch}

        // setIsLoading={setIsLoading}
        // setLoadingLayer={setLoadingLayer}
        // setShowPageSelector={setShowPageSelector}
        
      /> */
}
