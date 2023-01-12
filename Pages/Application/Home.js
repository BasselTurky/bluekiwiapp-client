//<uses-permission android:name="com.google.android.gms.permission.AD_ID"/>
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
  Animated,
  Easing,
  Dimensions,
  Image,
  Linking,
} from "react-native";

import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";

import LinearGradient from "react-native-linear-gradient";

import { setAuth } from "../../Features/auth";
import { setUserData } from "../../Features/userData";
import { setUserApis, updateUserApis } from "../../Features/userApis";
import { setCoins, addCoin, consumeCoins } from "../../Features/coins";

import Toast, { BaseToast } from "react-native-toast-message";
import { Button as PaperButton } from "react-native-paper";

import ProfileSVG from "../../Components/ProfileSVG";
import KiwiCoinSVG from "../../Components/KiwiCoinSVG";
import WatchSVG from "../../Components/WatchSVG";
import AdAlert from "../../Components/AdAlertSVG";
import CatSVG from "../../Components/CatSVG";
import DogSVG from "../../Components/DogSVG";
import PlusIconSVG from "../../Components/PlusIconSVG";
import LockPart1SVG from "../../Components/LockPart1SVG";
import LockPart2SVG from "../../Components/LockPart2SVG";

import WallpaperIcon from "../../Components/WallpaperIcon";
import ImagesIcon from "../../Components/ImagesIcon";
import CitiesGuideIcon from "../../Components/CitiesGuideIcon";
import MyNoteIcon from "../../Components/MyNoteIcon";

import ApiButton from "./components/ApiButton";

import DOMParser from "react-native-html-parser";
import { WebView } from "react-native-webview";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
  RewardedAd,
  InterstitialAd,
  AdEventType,
  RewardedInterstitialAd,
  RewardedAdEventType,
} from "react-native-google-mobile-ads";

import { setUserFav } from "../../Features/favArray";
import { addColor, setColorsArray } from "../../Features/colorsArray";
import ImageColors from "react-native-image-colors";

async function deleteValueFor(key) {
  await SecureStore.deleteItemAsync(key);
}

// const rewarded = RewardedAd.createForAdRequest(
//   // TestIds.REWARDED_INTERSTITIAL,
//   "ca-app-pub-4213110958189376/7153602373",
//   {
//     // requestNonPersonalizedAdsOnly: true,
//     keywords: ["trading", "software", "online trading"],
//   }
// );

const toastConfig = {
  success: (props) => <BaseToast {...props} style={{ zIndex: 999 }} />,
};

var timing;

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
// const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function Home({
  navigation,
  viewRef,
  pageUrl,
  setPageUrl,
  isWebviewLoaded,
  setIsWebviewLoaded,
  isViewLogin,
  setIsViewLogin,
}) {
  const insets = useSafeAreaInsets();

  // const winWidth = Dimensions.get("window").width;
  // const winHeight = Dimensions.get("window").height;

  // let viewRef = React.useRef(null);
  // const [pageUrl, setPageUrl] = React.useState("https://pixabay.com");
  // const [isWebviewLoaded, setIsWebviewLoaded] = useState(false);
  // const [isViewLogin, setIsViewLogin] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const [loaded, setLoaded] = useState(false);
  const [timer, setTimer] = useState(0);
  const [unlockLayer, setUnlockLayer] = useState(false);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.value);
  const userApis = useSelector((state) => state.userApis.value);
  const coins = useSelector((state) => state.coins.value);
  const currentArray = useSelector((state) => state.currentArray.value);
  const searchResult = useSelector((state) => state.searchResult.value);
  const favArray = useSelector((state) => state.favArray.value);
  const colorsArray = useSelector((state) => state.colorsArray.value);
  const dailyWallpapers = useSelector((state) => state.dailyWallpapers.value);

  // async function extractColors() {
  //   // get images array
  //   let tempArray = [];
  //   // loop over it
  //   for (let i = 0; i < dailyWallpapers.value.length; i++) {
  //     try {
  //       const result = await ImageColors.getColors(
  //         dailyWallpapers.value[i].img_link
  //       );
  //       // return result.average;
  //       let avg = result.average;
  //       tempArray.push(avg);
  //     } catch (error) {
  //       console.log(error);
  //       console.log("out");
  //       // return "grey";
  //     }
  //   }

  //   dispatch(setColorsArray(tempArray));
  //   // on every index extract the color
  //   // push it into temp array
  //   // dispatch temp array
  // }

  // useEffect(() => {
  //   extractColors();
  // }, [dailyWallpapers]);

  const errorToast = (message) => {
    Toast.show({
      type: "error",
      text1: message,
      text2: "Error",
      visibilityTime: 3000,
    });
  };

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function sleep(ms, fn, ...args) {
    await timeout(ms);
    return fn(...args);
  }

  async function start() {
    await sleep(1000, open_login);
    await sleep(1000, insert_auth);
    await sleep(1000, click_login);
  }

  function check_login() {
    viewRef.current.injectJavaScript(
      `
        (function(){
           let available = false
           let profile = window.document.getElementsByClassName('userMenu--BWkSG')[0]
           if(profile){
             available = true
           }
          window.ReactNativeWebView.postMessage(JSON.stringify({ message: "login status" , data: available}))
          
        })()
      `
    );
  }
  async function open_login() {
    viewRef.current.injectJavaScript(
      `window.document.getElementsByClassName('loginButton--uIEF2 buttonBase--r4opq tertiaryButton--+4ehJ')[0].click()`
    );
  }
  async function insert_auth() {
    viewRef.current.injectJavaScript(`
    (function(){
      let event = new Event('change', { bubbles: true });

event.simulated = true;


window.document.getElementsByClassName('textInput--yG-0W')[1].setAttribute('value','basselturky121@gmail.com')

window.document.getElementsByClassName('textInput--yG-0W')[1].dispatchEvent(event);


window.document.getElementsByClassName('textInput--yG-0W')[2].setAttribute('value','blue101@webview')

window.document.getElementsByClassName('textInput--yG-0W')[2].dispatchEvent(event);
    })()

 `);
  }
  async function click_login() {
    viewRef.current.injectJavaScript(
      `window.document.getElementsByClassName('loginButton--cVPDu e2e-auth-login-submit-button base--o-Oap primary--uRlHk')[0].click()`
    );
    console.log("logged in");
    console.log(pageUrl);
  }

  useEffect(() => {
    if (isWebviewLoaded) {
      setTimeout(() => {
        check_login();
      }, 1000);
    }
  }, [isWebviewLoaded]);

  useEffect(() => {
    if (isViewLogin) {
      // login steps with delay
      console.log("Webview login success");
    }
  }, [isViewLogin]);

  useEffect(() => {
    try {
      // fetch user data

      async function fetchUserData() {
        let currentToken = await SecureStore.getItemAsync("token");
        console.log("current token: ", currentToken);
        let response = await fetch(`${global.server_address}/auth/user`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: currentToken }),
        });

        let data = await response.json();
        console.log(data);

        if (data.type === "expired" || data.type === "wrong-device") {
          deleteValueFor("token");
          dispatch(setAuth(false));
          return;
        } else if (data.type === "success") {
          let userDataObj = {
            name: data.userInfo.name,
            email: data.userInfo.email,
            device_id: data.userInfo.device_id,
            coins: data.userInfo.coins,
          };
          let userApisObj = {
            // use truthy condition ==
            // results are in 0 and 1
            wallpaper_api: data.userInfo.wallpaper_api,
            animated_api: data.userInfo.animated_api,
            image_api: data.userInfo.image_api,
            cities_guide_api: data.userInfo.cities_guide_api,
            tasks_note: data.userInfo.tasks_note,
            giveaways: data.userInfo.giveaways,
          };
          dispatch(setUserData(userDataObj));
          dispatch(setUserApis(userApisObj));
          dispatch(setCoins(userDataObj.coins));
          return;
        } else if (data.type === "error") {
          errorToast("Couldn't reach the server!");
        } else {
          errorToast("Something went wrong!");
        }
      }

      fetchUserData();
    } catch (error) {
      console.log("Error L78: ", error);
      errorToast("Couldn't reach the server!");
    }
  }, []);

  useEffect(() => {
    // console.log(favArray);
    // console.log(userData);
    if (userData) {
      let email = userData.email;
      let userKey = favArray[email];
      if (!userKey) {
        dispatch(setUserFav({ key: userData.email, value: [] }));
      }
    }
  }, [userData, favArray]);

  function remainingdDigits(number) {
    var length = (Math.log(number) * Math.LOG10E + 1) | 0;

    let remaining = 3 - length;

    let result = "";
    for (let i = 0; i < remaining; i++) {
      result = result.concat("0");
    }

    return result;
  }

  return (
    <SafeAreaProvider>
      <ImageBackground
        source={require("../../assets/splashx2.png")}
        resizeMode="cover"
        style={styles.container}
      >
        <View
          style={{
            // height: 40,
            width: "100%",
            // backgroundColor: "pink",
            position: "absolute",
            top:
              height * 0.04 < 24
                ? insets.top + height * 0.02
                : insets.top + height * 0.04,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableHighlight
            style={
              // styles.profileIcon
              {
                elevation: 5,
                borderRadius: 50,
                marginLeft: 17,
              }
            }
            // activeOpacity={0.7}
            onPress={() => {
              navigation.navigate("ProfilePage");
            }}
          >
            {/* <ProfileSVG height={38} width={38} /> */}
            <Image
              source={require("../../assets/splashProfile.png")}
              res
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
              }}
            />
          </TouchableHighlight>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 126,
              }}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate("AdsView");
              }}
            >
              <PlusIconSVG height={30} width={30} />
            </TouchableOpacity>

            <View style={[styles.score, { position: "absolute", right: 36 }]}>
              <Text style={styles.scoreText}>
                {remainingdDigits(coins)}
                {coins}
              </Text>
            </View>

            <View
              style={{
                position: "absolute",
                right: 17,
              }}
            >
              <KiwiCoinSVG height={38} width={38} />
            </View>
          </View>
        </View>

        {/* download webview start*/}

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
            ref={viewRef}
            style={{
              // flex: 0,
              width: 1,
              // width: 300,
            }}
            // containerStyle={{
            //   flex: 1,
            // }}
            userAgent={
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
            }
            source={{
              uri: pageUrl,
            }}
            onLoad={() => {
              setIsWebviewLoaded(true);
              console.log("loaded");
            }}
            javaScriptEnabled
            onMessage={(event) => {
              // const htmlString = event.nativeEvent.data;
              // console.log(htmlString);
              let eventObj = JSON.parse(event.nativeEvent.data);
              let message = eventObj.message;
              let data = eventObj.data;
              console.log(eventObj);
              if (data) {
                setIsViewLogin(true);
              } else {
                setIsViewLogin(false);

                // start();

                setTimeout(() => {
                  open_login();
                  setTimeout(() => {
                    insert_auth();
                    setTimeout(() => {
                      click_login();

                      if (attempts < 3) {
                        setTimeout(() => {
                          check_login();
                          setAttempts(attempts + 1);
                        }, 3000);
                      }
                    }, 1000);
                  }, 1000);
                }, 1000);
              }
            }}
          />
        </View>

        {/* download webview end*/}

        <View style={[styles.row]}>
          <ApiButton
            navigation={navigation}
            api={"wallpaper_api"}
            apiText={"Wallpapers"}
            navigationPage={"WallpaperApi"}
            requiredCoins={0}
          >
            <WallpaperIcon width={36} height={36} fill={"black"} />
          </ApiButton>

          <ApiButton
            navigation={navigation}
            // viewRef={viewRef}
            // pageUrl={pageUrl}
            // setPageUrl={setPageUrl}
            // isWebviewLoaded={isWebviewLoaded}
            // isViewLogin={isViewLogin}

            api={"image_api"}
            apiText={"Gallery"}
            navigationPage={"ImageApiPage"}
            requiredCoins={10}
          >
            <ImagesIcon width={36} height={36} fill={"black"} />
          </ApiButton>
        </View>

        <View
          style={[
            {
              marginTop: 20,
            },
            styles.row,
          ]}
        >
          <ApiButton
            navigation={navigation}
            api={"cities_guide_api"}
            apiText={"Cities Guide"}
            navigationPage={"CitiesAPI"}
            requiredCoins={5}
          >
            <CitiesGuideIcon width={36} height={36} />
          </ApiButton>

          <ApiButton
            navigation={navigation}
            api={"tasks_note"}
            apiText={"My Note"}
            navigationPage={"NoteApi"}
            requiredCoins={5}
          >
            <MyNoteIcon width={36} height={36} fill={"black"} />
          </ApiButton>
        </View>
        {/* <Button
          title="Show"
          onPress={() => {
            console.log(height);
            console.log(height * 0.04);
          }}
        /> */}
        {/* <Button
        title="show"
        onPress={async () => {
          // console.log(currentArray);
          await Linking.openURL(
            "https://pixabay.com/images/download/cat-6492741_1920.jpg?attachment"
          );
        }}
      />
      <Button
        title="showx"
        onPress={() => {
          console.log(searchResult);
        }}
      /> */}
        {/* <View
        style={[
          {
            marginTop: 20,
          },
          styles.row,
        ]}
      >
        <ApiButton
          navigation={navigation}
          api={"giveaways"}
          apiText={"Giveaway"}
          navigationPage={"Giveaway"}
          requiredCoins={5}
        />
      </View> */}

        <Toast
          topOffset={20}
          // config={toastConfig}
          onPress={() => {
            Toast.hide();
          }}
        />
      </ImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffcb76",
    alignItems: "center",
    justifyContent: "center",
  },
  profileIcon: {
    // position: "absolute",
    // top: 56,
    // left: 16,

    // right: 15,
    // width:40,
    // height:40,
    // borderWidth: 3,
    borderRadius: 50,
    // padding: 4,

    // borderBottomColor: "white",
    // borderStyle: "dashed",
    // borderColor: "grey",
    // backgroundColor: "#36485f",
    elevation: 5,
  },
  score: {
    width: 80,
    height: 30,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderWidth: 2,
    borderColor: "#36485f",

    borderRadius: 10,

    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 10,
    // elevation: 5,
    // position: "absolute",
    // top: 61,
    // right: 36,
    // borderColor: "#ffd69e",
  },
  scoreText: {
    fontFamily: "Righteous_400Regular",
    fontSize: 16,
    color: "#36485f",
    // position: "absolute",
    // top: -6,
    // left: 10,
  },

  kiwiCoin: {
    // position: "absolute",
    // top: 56,
    // // zIndex: 2,
    // right: 16,
  },
  plusIcon: {
    // position: "absolute",
    // top: 61,
    // // zIndex: 2,
    // right: 126,
  },
  watchButton: {
    marginTop: 10,
    flexDirection: "row",
    width: 160,
    height: 50,
    // borderWidth: 2,
    borderRadius: 10,
    // borderColor: "grey",
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#8fbdff",
    paddingHorizontal: 5,
    elevation: 5,
    zIndex: 5,
  },
  row: {
    // marginTop: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

//-----

// const [rewardedInterstitialLoaded, setRewardedInterstitialLoaded] =
//   useState(false);

// const loadRewardedInterstitial = () => {
//   const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
//     RewardedAdEventType.LOADED,
//     () => {
//       setRewardedInterstitialLoaded(true);
//     }
//   );

//   const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
//     RewardedAdEventType.EARNED_REWARD,
//     async (reward) => {
//       console.log(`User earned reward of ${reward.amount} ${reward.type}`);

//       // send request and save coin in DB, if response is succesful increase Coin state by 1

//       try {
//         let response = await fetch(`${global.server_address}/api/save-coin`, {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: userData.email,
//             device_id: userData.device_id,
//           }),
//         });

//         let data = await response.json();

//         if (data.type === "error") {
//           errorToast(data.message);
//         } else if (data.type === "wrong-device") {
//           deleteValueFor("token");
//           dispatch(setAuth(false));
//         } else if (data.type === "success") {
//           dispatch(addCoin());
//         } else {
//           console.log(data);
//           errorToast("Something went wrong!");
//         }
//       } catch (error) {
//         console.log(error);
//         errorToast("Something went wrong!");
//       }
//     }
//   );

//   const unsubscribeClosed = rewardedInterstitial.addAdEventListener(
//     AdEventType.CLOSED,
//     () => {
//       setRewardedInterstitialLoaded(false);
//       rewardedInterstitial.load();
//     }
//   );

//   rewardedInterstitial.load();

//   return () => {
//     unsubscribeLoaded();
//     unsubscribeClosed();
//     unsubscribeEarned();
//   };
// };

// useEffect(() => {
//   const unsubscribeRewardedInterstitialEvents = loadRewardedInterstitial();

//   return () => {
//     unsubscribeRewardedInterstitialEvents();
//   };
// }, [userData]);

// On first load

{
  /* <View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              // backgroundColor: "#36485f",
              // padding: 5,
              // borderRadius: 10,
              // zIndex: 2,
              // elevation: 5,
              backgroundColor: "#fff",
              padding: 5,
              borderRadius: 10,
              width: 70,
              height: 70,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 2,
              elevation: 5,
            }}
            onPress={() => {
              navigation.navigate("ImageApiPage");
            }}
          >
            <Text>ImageAPI</Text>
            
          </TouchableOpacity>

          {userApis.image_api == false ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setUnlockLayer(true);
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "rgba(57,57,57,0.8)",
                  // padding: 5,
                  borderRadius: 10,
                  // width: 70,
                  // height: 70,
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 3,
                  // elevation: 5,
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    // backgroundColor: "pink",
                    top: 26,
                  }}
                >
                  <LockPart1SVG width={36} height={36} fill="black" />
                </View>
                <Animated.View
                  style={[
                    {
                      position: "absolute",
                      // backgroundColor: "pink",
                      top: 12,
                      // 2 to 12
                    },
                    animatedLock.getLayout(),
                  ]}
                >
                  <LockPart2SVG width={36} height={36} fill="black" />
                </Animated.View>
              </View>
            </TouchableWithoutFeedback>
          ) : null}

          {unlockLayer ? (
            <View
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "pink",
                borderRadius: 10,
                zIndex: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 10, paddingVertical: 5 }}>
                Use 10 Coins to Unlock
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: "green",
                    marginHorizontal: 4,
                  }}
                  onPress={() => {
                    // setUnlockLayer(false);

                    // send post with email, token|device id
                    // check available coins
                    // if less than 10 > toast error
                    // if more > take 10 and update api in db

                    // startAnimation(animatedLock, 17, 2);

                    // start animation
                    // after animation ends
                    // update state
                    unlockApi(animatedLock, 17, 2, "image_api", 10);
                    // console.log(userApis);
                  }}
                ></TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: "red",
                    marginHorizontal: 4,
                  }}
                  onPress={() => {
                    setUnlockLayer(false);
                  }}
                ></TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View> */
}

{
  /* <View
          style={{
            backgroundColor: "#36485f",
            padding: 5,
            borderRadius: 10,
            width: 70,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
            elevation: 5,
          }}
        >
          <Text>Wallpapers</Text>
        </View> */
}

{
  /* <TouchableOpacity
          activeOpacity={0.8}
          style={{
            // backgroundColor: "#36485f",
            // padding: 5,
            // borderRadius: 10,
            // zIndex: 2,
            // elevation: 5,
            backgroundColor: "#36485f",
            padding: 5,
            borderRadius: 10,
            width: 70,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
            elevation: 5,
          }}
          onPress={() => {
            navigation.navigate("Giveaway");
          }}
        >
          <Text>Giveaway</Text>
        </TouchableOpacity> */
}

{
  /* <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: "#36485f",
            padding: 5,
            borderRadius: 10,
            zIndex: 2,
            elevation: 5,
          }}
          onPress={() => {
            navigation.navigate("DogAPI");
          }}
        >
          <DogSVG height={60} width={60} />
        </TouchableOpacity> */
}

{
  /* <TouchableOpacity
          activeOpacity={0.8}
          style={{
            // backgroundColor: "#36485f",
            // padding: 5,
            // borderRadius: 10,
            // zIndex: 2,
            // elevation: 5,
            backgroundColor: "#36485f",
            padding: 5,
            borderRadius: 10,
            width: 70,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
            elevation: 5,
          }}
          onPress={() => {
            navigation.navigate("CitiesAPI");
          }}
        >
          <Text>Cities Guide</Text>
         
        </TouchableOpacity> */
}

{
  /* <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: "#36485f",
            padding: 5,
            borderRadius: 10,
            zIndex: 2,
            elevation: 5,
          }}
          onPress={() => {
            navigation.navigate("CatAPI");
          }}
        >
          <CatSVG height={60} width={60} />
        </TouchableOpacity> */
}

{
  /* <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: "#36485f",
            padding: 5,
            borderRadius: 10,
            width: 70,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
            elevation: 5,
          }}
          onPress={() => {
            // navigation.navigate("ImageApiPage");
          }}
        >
          <Text>Tasks reminder</Text>
        </TouchableOpacity> */
}

{
  /* <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: "#36485f",
            padding: 5,
            borderRadius: 10,
            zIndex: 2,
            elevation: 5,
          }}
          onPress={() => {
            navigation.navigate("CatAPI");
          }}
        >
          <CatSVG height={60} width={60} />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: "#36485f",
            padding: 5,
            borderRadius: 10,
            width: 70,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
            elevation: 5,
          }}
        >
          <Text>To be added</Text>
        </View> */
}

{
  /* ads */
}
{
  /* <View style={{ position: "absolute", bottom: 100 }}>
        <TouchableOpacity
          style={styles.watchButton}
          activeOpacity={0.7}
          disabled={loaded ? false : true}
          onPress={() => {
            rewarded.show();
            timing = Date.now();
            console.log("started at ", timing);
          }}
        >
          <View style={{ position: "absolute", zIndex: 3, top: -5, left: -5 }}>
            <AdAlert />
          </View>

          <WatchSVG height={32} width={32} />

          <Text
            style={{
              marginHorizontal: 10,
              fontSize: 18,

              color: "white",
              fontFamily: "Righteous_400Regular",
            }}
          >
            {loaded ? "Watch now" : "Loading.."}
          </Text>
      
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            backgroundColor: "#435875",
            padding: 4,
            paddingHorizontal: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            justifyContent: "center",
            zIndex: 4,
            borderBottomWidth: 2,
            borderBottomColor: "grey",
          }}
        >
          <Text
            style={{
              // marginHorizontal: 10,
              fontSize: 14,
              // fontWeight: "bold",
              color: "white",

              marginRight: 5,
              //   fontFamily: "ConcertOne_400Regular",
            }}
          >
            Receive:
          </Text>
          <KiwiCoinSVG height={22} width={22} />
        </View>
      </View> */
}

{
  /* <LinearGradient
        locations={[0.05, 0.2, 0.8, 1]}
        colors={["#cce1ff", "#a8ccff", "#ffecc3", "#ffcb76"]}
        style={styles.container}
      > */
}
{
  /* <Text>Application</Text>
          {userData ? (
            <>
              <Text>{userData.name}</Text>
              <Text>{userData.email}</Text>
              <Text>{userData.paypal}</Text>
              <Text>{userData.device_id}</Text>
            </>
          ) : null}
          <Button
            title="Profile"
            onPress={() => {
              navigation.navigate("Profile");
            }}
          />
          <Button
            title="Logout"
            onPress={() => {
              deleteValueFor("token");
              dispatch(setAuth(false));
            }}
          /> */
}

{
  /* </LinearGradient> */
}

// useEffect(() => {
//   const unsubscribeLoaded = rewarded.addAdEventListener(
//     RewardedAdEventType.LOADED,
//     () => {
//       setLoaded(true);
//     }
//   );

//   const unsubscribeEarned = rewarded.addAdEventListener(
//     RewardedAdEventType.EARNED_REWARD,
//     async (reward) => {
//       console.log(reward);

//       try {
//         let response = await fetch(`${global.server_address}/api/save-coin`, {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: userData.email,
//             device_id: userData.device_id,
//           }),
//         });

//         let data = await response.json();

//         if (data.type === "error") {
//           errorToast(data.message);
//         } else if (data.type === "wrong-device") {
//           deleteValueFor("token");
//           dispatch(setAuth(false));
//         } else if (data.type === "success") {
//           dispatch(addCoin());
//         } else {
//           console.log(data);
//           errorToast("Something went wrong!");
//         }
//       } catch (error) {
//         console.log(error);
//         errorToast("Something went wrong!");
//       }
//     }
//   );

//   const unsubscribeClosed = rewarded.addAdEventListener(
//     AdEventType.CLOSED,
//     () => {
//       let currentTime = Date.now();
//       console.log("ended: ", currentTime - timing);
//       setLoaded(false);
//       rewarded.load();
//     }
//   );

//   rewarded.load();

//   return () => {
//     unsubscribeLoaded();
//     unsubscribeEarned();
//     unsubscribeClosed();
//   };
// }, [userData]);

{
  /* <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: "#36485f",
            padding: 5,
            borderRadius: 10,
            width: 70,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
            elevation: 5,
          }}
          onPress={() => {
            // navigation.navigate("CitiesAPI");
          }}
        >
          <Text>test</Text>
        </TouchableOpacity> */
}
{
  /* <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: "#36485f",
            padding: 5,
            borderRadius: 10,
            width: 70,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
            elevation: 5,
          }}
          onPress={() => {
            // navigation.navigate("Giveaway");
          }}
        >
          <Text>test</Text>
        </TouchableOpacity> */
}

// --------- animation

// const animatedLock = React.useRef(
//   new Animated.ValueXY({ x: 17, y: 12 })
// ).current;

// const startAnimation = (animatedRef, xValue, yValue, api) => {
//   Animated.timing(animatedRef, {
//     toValue: { x: xValue, y: yValue },
//     duration: 1000,
//     useNativeDriver: false,
//     easing: Easing.out(Easing.sin),
//   }).start(({ finished }) => {
//     if (finished) {
//       setTimeout(() => {
//         dispatch(updateUserApis({ api: api, booleanValue: 1 }));

//         Toast.show({
//           type: "success",
//           text1: "New feature unlocked",
//           // text2: "Registeration Complete",
//           visibilityTime: 3000,
//         });
//       }, 500);
//     }
//   });
// };

// // ----------

// async function unlockApi(animatedRef, xValue, yValue, api, required_coins) {
//   try {
//     setUnlockLayer(false);

//     let currentToken = await SecureStore.getItemAsync("token");

//     let response = await fetch(`${global.server_address}/api/update-apis`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         api: api,
//         token: currentToken,
//         required_coins,
//       }),
//     });

//     let data = await response.json();
//     console.log(data);

//     if (data.type === "not_enough") {
//       errorToast(data.message);
//     } else if (data.type === "wrong-device") {
//       deleteValueFor("token");
//       dispatch(setAuth(false));
//     } else if (data.type === "success") {
//       console.log("here");

//       startAnimation(animatedRef, xValue, yValue, api);
//       dispatch(consumeCoins(required_coins));
//     }
//   } catch (error) {
//     console.log(error);
//     errorToast("Something went wrong!!");
//   }

// send post with email, token|device id
// check available coins
// if less than 10 > toast error
// if more > take 10 and update api in db

// start animation
// after animation ends
// update state
// }

// --------- animation

{
  /* <Button
        title="Open"
        onPress={() => {
          viewRef.current.injectJavaScript(
            `window.document.getElementsByClassName('loginButton--uIEF2 buttonBase--r4opq tertiaryButton--+4ehJ')[0].click()`
          );
        }}
      />
      <Button
        title="add email and pass"
        onPress={() => {
          viewRef.current.injectJavaScript(
            `
            (function(){
              let event = new Event('change', { bubbles: true });

event.simulated = true;


window.document.getElementsByClassName('textInput--yG-0W')[1].setAttribute('value','basselturky121@gmail.com')

window.document.getElementsByClassName('textInput--yG-0W')[1].dispatchEvent(event);


window.document.getElementsByClassName('textInput--yG-0W')[2].setAttribute('value','blue101@webview')

window.document.getElementsByClassName('textInput--yG-0W')[2].dispatchEvent(event);
            })()
            
            
            `
          );
        }}
      />
      <Button
        title="login"
        onPress={() => {
          viewRef.current.injectJavaScript(
            `window.document.getElementsByClassName('loginButton--cVPDu e2e-auth-login-submit-button base--o-Oap primary--uRlHk')[0].click()`
          );
        }}
      /> */
}
