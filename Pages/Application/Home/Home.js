//<uses-permission android:name="com.google.android.gms.permission.AD_ID"/>
import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Keyboard,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";

import HomeView from "./HomeView";
import HomeWebview from "./HomeWebview";

export default React.memo(function Home({
  navigation,
  viewRef,
  mainWebviewUrlRef,
}) {
  console.log("Home");

  // const isViewLoginRef = useRef(false);
  // const isWebviewLoadedRef = useRef(false);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <HomeView
        navigation={navigation}
        viewRef={viewRef}
        mainWebviewUrlRef={mainWebviewUrlRef}
        // isViewLoginRef={isViewLoginRef}
        // isWebviewLoadedRef={isWebviewLoadedRef}
      />
      <HomeWebview
        viewRef={viewRef}
        mainWebviewUrlRef={mainWebviewUrlRef}
        // isViewLoginRef={isViewLoginRef}
        // isWebviewLoadedRef={isWebviewLoadedRef}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileIcon: {
    borderRadius: 50,
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
  },
  scoreText: {
    fontFamily: "Righteous_400Regular",
    fontSize: 16,
    color: "#36485f",
  },

  kiwiCoin: {},
  plusIcon: {},
  watchButton: {
    marginTop: 10,
    flexDirection: "row",
    width: 160,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#8fbdff",
    paddingHorizontal: 5,
    elevation: 5,
    zIndex: 5,
  },
  row: {
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

// function check_login() {
//   viewRef.current.injectJavaScript(
//     `
//     (function () {
//       let available = false;
//       let profile = window.document.getElementsByClassName("userMenu--BWkSG")[0];
//       if (profile) {
//         available = true;
//       }
//       window.ReactNativeWebView.postMessage(
//         JSON.stringify({ message: "login status", data: available })
//       );
//     })();
//     `
//   );
// }
// async function open_login() {
//   viewRef.current.injectJavaScript(
//     `window.document.getElementsByClassName('loginButton--uIEF2 buttonBase--r4opq tertiaryButton--+4ehJ')[0].click()`
//   );
// }
// async function insert_auth() {
//   viewRef.current.injectJavaScript(`
//   (function () {
//     let event = new Event("change", { bubbles: true });

//     event.simulated = true;

//     window.document
//       .getElementsByClassName("textInput--yG-0W")[1]
//       .setAttribute("value", "basselturky121@gmail.com");

//     window.document
//       .getElementsByClassName("textInput--yG-0W")[1]
//       .dispatchEvent(event);

//     window.document
//       .getElementsByClassName("textInput--yG-0W")[2]
//       .setAttribute("value", "blue101@webview");

//     window.document
//       .getElementsByClassName("textInput--yG-0W")[2]
//       .dispatchEvent(event);
//   })();

// `);
// }
// async function click_login() {
//   viewRef.current.injectJavaScript(
//     `
//     window.document
//     .getElementsByClassName(
//       "loginButton--cVPDu e2e-auth-login-submit-button base--o-Oap primary--uRlHk"
//     )[0]
//     .click();
//     `
//   );
//   console.log("logged in");
//   console.log(pageUrl);
// }

// async function fullLoginWebview() {
//   viewRef.current.injectJavaScript(
//     `
//   (function () {
//     let event = new Event("change", { bubbles: true });
//     event.simulated = true;

//     // Function to check the condition every 50 ms for 500 ms at the beginning
//     const checkConditionAtBeginning = (startTime) => {
//       const currentTime = Date.now();
//       const elapsedTime = currentTime - startTime;

//       if (elapsedTime <= 500) {
//         let available = false;
//         const profile = window.document.getElementsByClassName("userMenu--BWkSG")[0];

//         if (profile) {
//           available = true;
//           console.log("true at the beginning"); // Log true if the condition becomes true
//         } else {
//           // Continue checking every 50 ms
//           setTimeout(() => checkConditionAtBeginning(startTime), 50);
//         }
//       } else {
//         console.log("Initial timeout reached. Condition not met within 500 ms.");

//         // Proceed with checking the button
//         checkButton();
//       }
//     };

//     // Start checking for the condition at the beginning every 50 ms for 500 ms
//     checkConditionAtBeginning(Date.now());

//     // Function to check if the button element is available
//     const checkButton = () => {
//       try {
//         const loginButton = window.document.getElementsByClassName("loginButton--uIEF2 buttonBase--r4opq tertiaryButton--+4ehJ")[0];

//         if (loginButton) {
//           // Click the login button
//           loginButton.click();

//           // Continue with checking inputs
//           checkInputs();
//         } else {
//           // Continue checking until the button is available
//           setTimeout(checkButton, 100);
//         }
//       } catch (error) {
//         console.error("Error checking button:", error.message);
//                     window.ReactNativeWebView.postMessage(
//               JSON.stringify({ message: "login-failed", error: error.message })
//             );
//       }
//     };

//     // Function to check if the input elements are available
//     const checkInputs = () => {
//       try {
//         const emailInput = window.document.getElementsByClassName("textInput--yG-0W")[1];
//         const passwordInput = window.document.getElementsByClassName("textInput--yG-0W")[2];

//         if (emailInput && passwordInput) {
//           // Set values and trigger change event for email input
//           emailInput.setAttribute("value", "basselturky121@gmail.com");
//           emailInput.dispatchEvent(event);

//           // Set values and trigger change event for password input
//           passwordInput.setAttribute("value", "blue101@webview");
//           passwordInput.dispatchEvent(event);

//           // Delay before clicking the login button (100 ms)
//           setTimeout(() => {
//             // Click the login button
//             window.document
//               .getElementsByClassName(
//                 "loginButton--cVPDu e2e-auth-login-submit-button base--o-Oap primary--uRlHk"
//               )[0]
//               .click();

//             // Start checking for the condition with a maximum timeout of 2 seconds
//             const startTime = Date.now();
//             checkCondition(startTime);
//           }, 100);
//         } else {
//           // Continue checking until the inputs are available
//           setTimeout(checkInputs, 100);
//         }
//       } catch (error) {
//         console.error("Error checking inputs:", error.message);
//                     window.ReactNativeWebView.postMessage(
//               JSON.stringify({ message: "login-failed", error: error.message })
//             );
//       }
//     };

//     // Function to check the condition with a maximum timeout of 2 seconds
//     const checkCondition = (startTime) => {
//       const currentTime = Date.now();
//       const elapsedTime = currentTime - startTime;

//       if (elapsedTime <= 2000) {
//         let available = false;
//         const profile = window.document.getElementsByClassName("userMenu--BWkSG")[0];

//         if (profile) {
//           available = true;
//           console.log("true"); // Log true if the condition becomes true
//                         window.ReactNativeWebView.postMessage(
//                 JSON.stringify({ message: "login-success", data: true })
//               );
//         } else {
//           // Continue checking every 50 ms
//           setTimeout(() => checkCondition(startTime), 50);
//         }
//       } else {
//         console.log("Timeout reached. Condition not met within 2 seconds.");
//                     window.ReactNativeWebView.postMessage(
//               JSON.stringify({ message: "login-failed", error: "Timeout reached." })
//             );
//       }
//     };
//   })();
//   `
//   );
//   // console.log("injected");
// }

// const [attempts, setAttempts] = useState(0);

// const dispatch = useDispatch();
// const userData = useSelector((state) => state.userData.value);
// const coins = useSelector((state) => state.coins.value);
// const favArray = useSelector((state) => state.favArray.value);
// const pageUrl = useSelector((state) => state.pageUrl.value);

// useEffect(() => {
//   if (isWebviewLoaded) {
//     setTimeout(() => {
//       // check_login();
//       fullLoginWebview();
//       console.log("login attempt");
//       console.log(pageUrl);
//     }, 500);
//   }
// }, [isWebviewLoaded]);

// useEffect(() => {
//   if (isViewLogin) {
//     // login steps with delay
//     console.log("Webview login success");
//   }
// }, [isViewLogin]);

// useEffect(() => {
//   if (userData) {
//     let email = userData.email;
//     // console.log(userData.email);
//     // console.log(favArray);
//     // let userKey = favArray[email];
//     // if (favArray) {
//     // console.log(favArray, "sss");
//     if (!favArray[email]) {
//       dispatch(createUserFav(email));
//     }
//     // }
//   }
// }, [userData]);

// useEffect(() => {
//   return () => {
//     // clear search result
//     dispatch(setSearchResult(null));
//     dispatch(setPageUrl("https://pixabay.com"));
//     dispatch(
//       setPages({
//         current: "",
//         total: "",
//       })
//     );
//   };
// }, []);

// console.log("Home");
// try {

// import { z } from "../../../utils/scaling";

// import ErrorView from "../../Error/ErrorView";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// import { DrawerLayout } from "react-native-gesture-handler";
// import DrawerView from "./components/DrawerView";

// import { useDispatch, useSelector } from "react-redux";

// import { useToast } from "react-native-toast-notifications";
// import MyNoteIcon from "../../../Components/MyNoteIcon";

// import ApiButton from "./components/ApiButton";

// import { WebView } from "react-native-webview";

// import { createUserFav } from "../../../Features/favArray";
// import { setPageUrl } from "../../../Features/pageUrl";
// import { setSearchResult } from "../../../Features/searchResult";
// import { setPages } from "../../../Features/pages";
// const width = Dimensions.get("window").width;
// const height = Dimensions.get("window").height;
