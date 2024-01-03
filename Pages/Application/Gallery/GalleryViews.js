import {
  StyleSheet,
  Text,
  View,
  Animated,
  useWindowDimensions,
} from "react-native";
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import GalleryHome from "./components/GalleryHome";
import Favorite from "./components/Favorite";
import GalleryHeader from "./components/GalleryHeader";
import GalleryFooter from "./components/GalleryFooter";
import LoadingLayer from "./components/LoadingLayer";
import PageChangingModal from "./components/PageChangingModal";
import { setModalVisible } from "../../../Features/modalVisible";
// import GalleryTabs from "./GalleryTabs";

import GalleryWebView from "./GalleryWebView";

import { TabView, SceneMap } from "react-native-tab-view";

export default React.memo(function GalleryViews({
  //   download,

  containerHeight,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  onScrollEndDrag,
  handleScroll,

  headerTranslate,
  bottomTabTranslate,
  homeFlatlistRef,
  scrollY,

  mainWebviewUrlRef,
  viewRef,
  //   inputText,
  //   setInputText,
  //   isPortrait,
  //   setIsPortrait,
  //   lastSearchInput,
  //   setReady,
  //   setNewSearch,
  //   setUrlData,
  //   setIsLoading,

  //   setLoadingLayer,
  //   setShowPageSelector,

  //   searchInputRef,
}) {
  const dispatch = useDispatch();
  const layout = useWindowDimensions();
  const searchInputRef = useRef(null);

  useEffect(() => {
    return () => {
      dispatch(setModalVisible(false));
    };
  }, []);

  // GalleryHome, Favorite and Header
  //   const [focused, setFocused] = useState("gallery");

  //   const galleryListRef = useRef(null);

  //   const FirstRoute = () => (
  //     <GalleryHome
  //       download={download}
  //       searchResult={searchResult}
  //       containerHeight={containerHeight}
  //       onMomentumScrollBegin={onMomentumScrollBegin}
  //       onMomentumScrollEnd={onMomentumScrollEnd}
  //       onScrollEndDrag={onScrollEndDrag}
  //       handleScroll={handleScroll}
  //     />
  //   );
  const FirstRoute = React.useMemo(
    () => () =>
      (
        <GalleryHome
          //   download={download}
          //   searchResult={searchResult}
          containerHeight={containerHeight}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          handleScroll={handleScroll}
          homeFlatlistRef={homeFlatlistRef}
          mainWebviewUrlRef={mainWebviewUrlRef}
          viewRef={viewRef}
        />
      ),
    [
      //   download,

      containerHeight,
      onMomentumScrollBegin,
      onMomentumScrollEnd,
      onScrollEndDrag,
      handleScroll,
      homeFlatlistRef,
      mainWebviewUrlRef,
      viewRef,
    ]
  );

  //   const SecondRoute = () => (
  //     <Favorite
  //       download={download}
  //       userData={userData}
  //       favArray={favArray}
  //       containerHeight={containerHeight}
  //       onMomentumScrollBegin={onMomentumScrollBegin}
  //       onMomentumScrollEnd={onMomentumScrollEnd}
  //       onScrollEndDrag={onScrollEndDrag}
  //       handleScroll={handleScroll}
  //     />
  //   );
  const SecondRoute = React.useMemo(
    () => () =>
      (
        <Favorite
          //   download={download}
          //   userData={userData}
          //   favArray={favArray}
          containerHeight={containerHeight}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          handleScroll={handleScroll}
          mainWebviewUrlRef={mainWebviewUrlRef}
          viewRef={viewRef}
        />
      ),
    [
      //   download,
      //   userData,
      //   favArray,
      containerHeight,
      onMomentumScrollBegin,
      onMomentumScrollEnd,
      onScrollEndDrag,
      handleScroll,
      mainWebviewUrlRef,
      viewRef,
    ]
  );

  //   const renderScene = SceneMap({
  //     first: FirstRoute,
  //     second: SecondRoute,
  //   });
  const renderScene = React.useMemo(
    () =>
      SceneMap({
        first: FirstRoute,
        second: SecondRoute,
      }),
    [FirstRoute, SecondRoute]
  );

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);

  console.log("Views");
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      {/* {focused === "gallery" ? (
        <GalleryHome
          //   galleryListRef={galleryListRef}
          download={download}
          // searchResult={searchResult}
          containerHeight={containerHeight}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          handleScroll={handleScroll}

          // headerTranslate={headerTranslate}
        />
      ) : (
        <Favorite
          download={download}
          // searchResult={searchResult}
          containerHeight={containerHeight}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          handleScroll={handleScroll}
          // headerTranslate={headerTranslate}
        />
      )} */}
      {/* <GalleryTabs
        download={download}
        containerHeight={containerHeight}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollEndDrag={onScrollEndDrag}
        handleScroll={handleScroll}
      /> */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        animationEnabled={false}
        swipeEnabled={false}
        renderTabBar={() => (
          <GalleryHeader
            // setFocused={setFocused}
            containerHeight={containerHeight}
            headerTranslate={headerTranslate}
            // inputText={inputText}
            // setInputText={setInputText}
            // isPortrait={isPortrait}
            // setIsPortrait={setIsPortrait}
            // lastSearchInput={lastSearchInput}
            // setReady={setReady}
            // setNewSearch={setNewSearch}
            // setUrlData={setUrlData}
            // setIsLoading={setIsLoading}
            index={index}
            setIndex={setIndex}
            searchInputRef={searchInputRef}
            homeFlatlistRef={homeFlatlistRef}
          />
        )}
      />

      {index === 0 ? (
        <GalleryFooter
          bottomTabTranslate={bottomTabTranslate}
          homeFlatlistRef={homeFlatlistRef}
          scrollY={scrollY}
          //   containerHeight={containerHeight}
          //   setLoadingLayer={setLoadingLayer}
          //   setReady={setReady}
          //   setUrlData={setUrlData}
          //   lastSearchInput={lastSearchInput}
          //   setShowPageSelector={setShowPageSelector}
        />
      ) : null}
      <GalleryWebView searchInputRef={searchInputRef} />
      <PageChangingModal />
      <LoadingLayer />
    </View>
  );
});

const styles = StyleSheet.create({});
// {index === 0 ? ( ) : null}
