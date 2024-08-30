// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import logger from "redux-logger";

import { enableMapSet } from "immer";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import authReducer from "./Features/auth";
import userDataReducer from "./Features/userData";
import coinsReducer from "./Features/coins";
import userApisReducer from "./Features/userApis";
import loadedAdReducer from "./Features/loadedAd";
import tipsMenuReducer from "./Features/tipsMenu";
import searchResultReducer from "./Features/searchResult";
import favArrayReducer from "./Features/favArray";
import searchPageReducer from "./Features/searchPage";
import currentArrayReducer from "./Features/currentArray";
import previousArrayReducer from "./Features/previousArray";
import lastSearchInputReducer from "./Features/lastSearchInput";
import dailyWallpapersReducer from "./Features/dailyWallpapers";
import permanentWallpapersReducer from "./Features/permanentWallpapers";
import colorsArrayReducer from "./Features/colorsArray";
import tipsMenuWallpaperReducer from "./Features/tipsMenuWallpaper";
import deleteAccountModalReducer from "./Features/deleteAccountModal";
import pagesReducer from "./Features/pages";
import availableReducer from "./Features/available";
import winnerReducer from "./Features/winner";
import activeReducer from "./Features/active";
import pageUrlReducer from "./Features/pageUrl";
import galleryLastScrollPositionReducer from "./Features/galleryLastScrollPosition";
import searchInputReducer from "./Features/searchInput";
import isWebViewReadyReducer from "./Features/isWebViewReady";
import newSearchReducer from "./Features/newSearch";
import isPortraitReducer from "./Features/isPortrait";
import urlDataReducer from "./Features/urlData";
import isLoadingReducer from "./Features/isLoading";
import isWebviewLoadedReducer from "./Features/isWebviewLoaded";
import isViewLoginReducer from "./Features/isViewLogin";
import modalVisibleReducer from "./Features/modalVisible";
import lastGiveawayXReducer from "./Features/lastGiveawayX";
import lastGiveawayZReducer from "./Features/lastGiveawayZ";
import giveawayXReducer from "./Features/giveawayX";
import giveawayZReducer from "./Features/giveawayZ";
import giveawayHistoryReducer from "./Features/giveawayHistory";
import headerIndexReducer from "./Pages/Application/Giveaway/components/header/state/headerIndex";

enableMapSet();

const rootReducer = combineReducers({
  //   test: testReducer,
  auth: authReducer,
  userData: userDataReducer,
  coins: coinsReducer,
  userApis: userApisReducer,
  loadedAd: loadedAdReducer,
  tipsMenu: tipsMenuReducer,
  searchResult: searchResultReducer,
  favArray: favArrayReducer,
  searchPage: searchPageReducer,
  currentArray: currentArrayReducer,
  previousArray: previousArrayReducer,
  lastSearchInput: lastSearchInputReducer,
  dailyWallpapers: dailyWallpapersReducer,
  permanentWallpapers: permanentWallpapersReducer,
  colorsArray: colorsArrayReducer,
  tipsMenuWallpaper: tipsMenuWallpaperReducer,
  deleteAccountModal: deleteAccountModalReducer,
  pages: pagesReducer,
  available: availableReducer,
  winner: winnerReducer,
  active: activeReducer,
  pageUrl: pageUrlReducer,
  galleryLastScrollPosition: galleryLastScrollPositionReducer,
  searchInput: searchInputReducer,
  isWebViewReady: isWebViewReadyReducer,
  newSearch: newSearchReducer,
  isPortrait: isPortraitReducer,
  urlData: urlDataReducer,
  isLoading: isLoadingReducer,
  isWebviewLoaded: isWebviewLoadedReducer,
  isViewLogin: isViewLoginReducer,
  modalVisible: modalVisibleReducer,
  lastGiveawayX: lastGiveawayXReducer,
  lastGiveawayZ: lastGiveawayZReducer,
  giveawayX: giveawayXReducer,
  giveawayZ: giveawayZReducer,
  giveawayHistory: giveawayHistoryReducer,
  headerIndex: headerIndexReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: [
    "coins",
    "loadedAdReducer",
    "tipsMenuReducer",
    // "colorsArray",
    // "favArray",
    "searchResult",
    // "searchPage",
    "lastSearchInput",
    "deleteAccountModal",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     userData: userDataReducer,
//     coins: coinsReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       immutableCheck: false,
//     }),
// });

//-----------------------------------------------

// import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// const rootReducer = combineReducers({
//   test: testReducer,
// });

// const persistConfig = {
//   key: "root",
//   storage,
//   blacklist: [],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = createStore(persistedReducer, applyMiddleware(thunk));

// export const persistor = persistStore(store);
