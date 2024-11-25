import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
  ActivityIndicator,
  Animated,
  Easing,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import ErrorView from "../../Pages/Error/ErrorView";
import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { z } from "../../utils/scaling";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { Button as PaperButton } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../Pages/SocketContext/SocketContext";
import { setAuth } from "../../Features/auth";

import GoBackSVG from "../../Components/GoBackSVG";
import ProfileSVG from "../../Components/ProfileSVG";
import DeleteIconSVG from "../../Components/DeleteIconSVG";
import TrashIconSVG from "../../Components/TrashIconSVG";
import ProfileIconStroke from "../../Components/ProfileIconStroke";
import EmailIcon from "../../Components/EmailIcon";
import PasswordIcon from "../../Components/PasswordIcon";
import LogoutIcon from "../../Components/LogoutIcon";
import NextSVG from "../../Components/NextSVG";
import UpdatePasswordIcon from "../../Components/UpdatePasswordIcon";

async function deleteValueFor(key) {
  await SecureStore.deleteItemAsync(key);
}

const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const xInt = -(width * 0.9);
const yInt = -(height * 0.55);

export default function Profile({ navigation }) {
  const socket = useSocket();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.value);
  const deleteAccountModal = useSelector(
    (state) => state.deleteAccountModal.value
  );

  const [passwordInput, setPasswordInput] = useState("");

  const [isDisabled, setIsDisabled] = useState(false);
  const [showLayer, setShowLayer] = useState(false);
  const [showLogoutLayer, setShowLogoutLayer] = useState(false);

  const errorToast = (message) => {
    Toast.show({
      type: "error",
      text1: message,
      text2: "Error",
      visibilityTime: 3000,
    });
  };

  // useEffect(() => {
  //   const showSubscription = Keyboard.addListener("keyboardDidShow", (e) =>
  //     setKeyboardHeight(e.endCoordinates.height)
  //   );
  //   const hideSubscription = Keyboard.addListener("keyboardDidHide", () =>
  //     setKeyboardHeight(0)
  //   );
  //   return () => {
  //     showSubscription.remove();
  //     hideSubscription.remove();
  //   };
  // }, []);

  const animateMenuX = React.useRef(new Animated.Value(xInt)).current;
  const animateMenuY = React.useRef(new Animated.Value(0)).current;

  function toggleMenu(value) {
    Animated.timing(animateMenuY, {
      // toValue: { x: 0, y: yInt },
      toValue: value,
      // toValue: deleteAccountModal ? xInt : 0,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.out(Easing.sin),
    }).start(({ finished }) => {
      if (finished) {
        setIsDisabled(false);
        console.log(deleteAccountModal);
      }
    });
  }

  async function handleDeleteAccount() {
    if (passwordInput !== "") {
      try {
        let currentToken = await SecureStore.getItemAsync("token");
        const response = await fetch(
          `${global.server_address}/auth/account-delete-request`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: currentToken,
              password: passwordInput,
            }),
          }
        );

        const data = await response.json();
        console.log(data);
        if (data.type === "wrong-device" || data.type === "success") {
          // if worng device - logout, clear token

          //> respond success > logout, clear token
          deleteValueFor("token");
          dispatch(setAuth(false));
        } else if (data.type === "incorrect") {
          // if worng password - toast worng password - rate limit 3 tries
          errorToast(data.message);
        } else if (data.type === "error") {
          // if error - toast error
          // ErrorID: E027
          errorToast(data.message);
        }
      } catch (error) {
        console.log("ErrorID: E026: ", error);
        errorToast("ErrorID: E026");
      }
    } else {
      Toast.show({
        type: "info",
        text1: "Please enter your password",
        // text2: "Error",
        visibilityTime: 3000,
      });
    }

    // show modal
    // enter password
    // save password in state
    // if state not empty, send POST request
    // includes: password and token
    // On server side:
    // check device
    // if pass > compare password
    // if pass > delete from database
  }

  // useEffect(() => {
  //   // if(deleteAccountModal){
  //   // open
  //   toggleMenu();
  //   // }else{
  //   //close
  //   // }
  // }, [deleteAccountModal, animateMenuX]);
  try {
    return (
      <SafeAreaProvider>
        <AnimatedImageBackground
          source={require("../../../assets/pixel4.jpg")}
          resizeMode="cover"
          style={styles.container}
          blurRadius={2}
        >
          <ImageBackground
            source={require("../../../assets/Ellipse.png")}
            resizeMode="cover"
            style={{
              position: "absolute",
              width: z(800),
              height: z(800),
              borderRadius: z(800),
              backgroundColor: "#000",
              top: z(-600),
            }}
          ></ImageBackground>
          <MaskedView
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: "pink",
                alignItems: "center",
                // paddingTop: insets.top,
                // paddingBottom: insets.bottom,
              },
            ]}
            maskElement={
              <View
                style={{
                  // width: 100,
                  // height: 100,
                  alignSelf: "center",
                  borderRadius: z(100),
                  backgroundColor: "white",
                  marginTop: z(190) - width / 8,
                  // height * 0.04,
                  width: width / 4,
                  height: width / 4,
                  borderRadius: 400,
                  // borderWidth: 2,
                  // borderColor: "white",
                }}
              ></View>
            }
          >
            {/* <View style={{ backgroundColor: "green", width: "100%" }}> */}
            <Image
              source={require("../../../assets/pixel4.jpg")}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
            {/* </View> */}
          </MaskedView>
          {/* <Moment
                to={Math.floor(userData.next_transaction_date)}
                element={Text}
                onChange={() => {
                  if (Math.floor(userData.next_transaction_date) < Date.now()) {
                    setDisplayTimer(false);
                  }
                }}
                
              ></Moment> */}
          <View
            style={{
              flex: 1,
              width: "100%",
              alignItems: "center",
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
            }}
            onLayout={(event) => {
              var { x, y, width, height } = event.nativeEvent.layout;

              console.log(x, y, width, height);
            }}
          >
            <TouchableOpacity
              style={{
                zIndex: 2,
                position: "absolute",
                top: insets.top + z(10),
                left: 17,
                width: z(40),
                height: z(40),
                backgroundColor: "rgba(0,0,0,0.3)",
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "flex-start",
              }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <GoBackSVG fill={"#fff"} width={15} height={15} />
            </TouchableOpacity>
            {/* <View
        style={{
          flex: 1,
          // backgroundColor: "grey",
          width: "100%",
          alignItems: "center",
          paddingTop: 42,
        }}
      > */}
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                // marginTop: 200 - insets.top - width / 8,
                // borderWidth: 3,
                // borderColor: "#fff",
                // height * 0.04,
                // marginTop: 30,
                width: width / 4,
                height: width / 4,
                borderRadius: 400,
                position: "absolute",
                top: z(190) - width / 8,
              }}
            >
              <View
                style={{
                  position: "absolute",
                }}
              >
                <ProfileSVG width={40} height={40} fill={"white"} />
              </View>
            </View>

            <Text
              numberOfLines={1}
              style={{
                maxWidth: width * 0.6,
                // fontFamily: "Playfair",
                fontFamily: "GrandHotel_400Regular",
                fontSize: z(36),
                color: "white",
                // paddingTop: 10,
                position: "absolute",
                top: (z(200) - insets.top) / 2,
              }}
            >
              {userData.name ? userData.name : null}
            </Text>
            {/* user name */}
            <View
              style={{
                // marginTop: width * 0,
                position: "absolute",

                top: z(200) + width / 8 + z(40),
                width: "100%",
                // backgroundColor: "pink",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  // backgroundColor: "yellow",
                  width: "100%",
                  height: z(70),
                  // paddingHorizontal: 30,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: "#9c9c9c",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ProfileIconStroke
                    width={z(34)}
                    height={z(34)}
                    fill={"#fff"}
                  />
                </View>
                <View
                  style={{
                    flex: 4,
                    justifyContent: "center",
                    // backgroundColor: "green",
                  }}
                >
                  <Text style={{ fontSize: z(22), color: "#9c9c9c" }}>
                    {userData.name ? userData.name : null}
                  </Text>
                </View>
              </View>
              {/* Email */}
              <View
                style={{
                  flexDirection: "row",
                  // backgroundColor: "yellow",
                  width: "100%",
                  height: z(70),
                  // paddingHorizontal: 30,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: "#9c9c9c",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* icon */}
                  <EmailIcon width={z(32)} height={z(32)} fill={"#fff"} />
                </View>
                <View
                  style={{
                    flex: 4,
                    justifyContent: "center",
                    // backgroundColor: "green",
                  }}
                >
                  {/* content */}
                  <Text
                    numberOfLines={1}
                    style={{
                      // fontFamily: "Playfair",
                      fontSize: z(22),
                      color: "#9c9c9c",
                    }}
                  >
                    {userData.email ? userData.email : null}
                  </Text>
                </View>
              </View>
              {/* password */}

              <View
                style={{
                  flexDirection: "row",
                  // backgroundColor: "yellow",
                  width: "100%",
                  height: z(70),
                  // paddingHorizontal: 30,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: "#9c9c9c",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PasswordIcon width={z(30)} height={z(30)} fill={"#fff"} />
                  {/* icon */}
                </View>
                <View
                  style={{
                    flex: 3,
                    // alignItems: "center",
                    // flexDirection: "row",
                    justifyContent: "center",

                    // backgroundColor: "green",
                  }}
                >
                  <Text style={{ fontSize: z(22), color: "#9c9c9c" }}>
                    Password
                  </Text>

                  {/* content */}
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ChangePassword");
                  }}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <UpdatePasswordIcon
                    width={z(30)}
                    height={z(30)}
                    fill={"#fff"}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  // backgroundColor: "yellow",
                  width: "100%",
                  height: z(60),
                  // paddingHorizontal: 30,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: "#9c9c9c",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* icon */}
                  <LogoutIcon width={z(30)} height={z(30)} fill={"#fff"} />
                </View>
                <View
                  style={{
                    flex: 3,
                    justifyContent: "center",
                    // backgroundColor: "green",
                  }}
                >
                  <Text style={{ fontSize: z(22), color: "#9c9c9c" }}>
                    Logout
                  </Text>
                  {/* content */}
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setShowLogoutLayer(true);
                  }}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <NextSVG width={z(22)} height={z(22)} fill={"#fff"} />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  // position: "absolute",
                  // top: 150,
                  paddingTop: z(10),
                  flexDirection: "row",
                  // backgroundColor: "pink",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // alignSelf: "center",
                }}
              ></View>
            </View>

            <TouchableOpacity
              disabled={isDisabled}
              onPress={() => {
                if (!deleteAccountModal) {
                  // dispatch(setDeleteAccountModal(true));
                  setShowLayer(true);
                  setIsDisabled(true);
                  toggleMenu(-300 - height * 0.5);
                  // closeMenu();
                }
              }}
              style={{
                position: "absolute",
                bottom: insets.bottom,

                flexDirection: "row",
                paddingBottom: z(15),
              }}
            >
              <DeleteIconSVG width={z(20)} height={z(20)} fill={"#e34f4f"} />
              <Text
                style={{
                  fontFamily: "PlayfairItalic",
                  fontSize: 16,
                  color: "#e34f4f",
                  paddingHorizontal: 5,
                }}
              >
                Delete Account
              </Text>
            </TouchableOpacity>

            {showLayer ? (
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
                    zIndex: 10,
                    // backgroundColor: "grey",
                  }}
                ></View>
              </TouchableWithoutFeedback>
            ) : null}

            <Animated.View
              style={[
                {
                  position: "absolute",
                  width: width * 0.8,
                  borderRadius: 10,
                  zIndex: 12,
                  transform: [
                    {
                      translateY: animateMenuY,
                    },
                  ],
                  alignSelf: "center",
                  bottom: -300,
                  elevation: 5,
                },
              ]}
            >
              <View
                style={{
                  position: "absolute",
                  zIndex: 2,
                  alignSelf: "center",
                  top: z(-29),
                  backgroundColor: "#f53649",
                  justifyContent: "center",
                  alignItems: "center",
                  width: z(58),
                  height: z(58),
                  borderRadius: z(50),
                }}
              >
                <TrashIconSVG width={z(38)} height={z(38)} fill={"#fff"} />
              </View>

              <View
                style={{
                  flex: 1,
                  backgroundColor: "#fff",
                  borderRadius: z(10),
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: z(6),
                    backgroundColor: "#f53649",
                  }}
                ></View>

                <View
                  style={{
                    alignItems: "center",
                    marginTop: z(30),
                  }}
                >
                  <Text
                    style={{
                      fontSize: z(18),
                      fontFamily: "PlayfairBold",
                      color: "#454545",
                    }}
                  >
                    Delete Account?
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: "Playfair",
                    fontSize: z(14),
                    color: "#454545",
                    paddingTop: z(10),
                    paddingHorizontal: z(15),
                  }}
                >
                  You are about to delete your account permanently.
                </Text>

                <TextInput
                  value={passwordInput}
                  onChangeText={(val) => {
                    setPasswordInput(val);
                  }}
                  style={styles.textinput}
                  placeholder="Enter password.."
                  placeholderTextColor={"#404040cc"}
                  secureTextEntry
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <PaperButton
                    onPress={handleDeleteAccount}
                    style={[styles.buttonStyle, { backgroundColor: "#f53649" }]}
                    contentStyle={styles.buttonContent}
                    labelStyle={styles.buttonLabel}
                    // color="green"
                    mode="contained"
                    uppercase={false}
                  >
                    <Text
                      style={{
                        fontSize: z(16),
                        fontFamily: "PlayfairBold",
                        color: "#ffffffcc",
                      }}
                    >
                      Delete
                    </Text>
                  </PaperButton>
                  <PaperButton
                    onPress={() => {
                      Keyboard.dismiss();
                      setShowLayer(false);
                      toggleMenu(0);
                    }}
                    style={[styles.buttonStyle, { backgroundColor: "#fff" }]}
                    contentStyle={styles.buttonContent}
                    labelStyle={styles.buttonLabel}
                    // color="green"
                    mode="contained"
                    uppercase={false}
                  >
                    <Text
                      style={{
                        fontSize: z(16),
                        fontFamily: "PlayfairBold",
                        color: "#454545",
                      }}
                    >
                      Cancel
                    </Text>
                  </PaperButton>
                </View>
              </View>
            </Animated.View>

            {showLogoutLayer ? (
              <View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    backgroundColor: "transparent",
                    zIndex: 9,
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
              >
                <View
                  style={{
                    // height: 220,
                    width: width * 0.8,
                    borderRadius: 10,
                    backgroundColor: "#fff",
                    padding: z(24),
                  }}
                >
                  <Text
                    style={{
                      marginBottom: z(20),
                      fontSize: z(20),
                      fontWeight: "500",
                    }}
                  >
                    Log Out?
                  </Text>
                  <Text
                    style={{
                      marginBottom: z(20),
                      fontSize: z(16),
                      fontWeight: "400",
                    }}
                  >
                    Are you sure want to log out?
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <PaperButton
                      onPress={() => {
                        deleteValueFor("token");
                        dispatch(setAuth(false));
                      }}
                      style={[
                        styles.buttonStyle,
                        { backgroundColor: "#4b6382" },
                      ]}
                      contentStyle={styles.buttonContent}
                      labelStyle={styles.buttonLabel}
                      // color="green"
                      mode="contained"
                      uppercase={false}
                    >
                      <Text
                        style={{
                          fontSize: z(16),
                          fontFamily: "PlayfairBold",
                          color: "#ffffffcc",
                        }}
                      >
                        Log out
                      </Text>
                    </PaperButton>
                    <PaperButton
                      onPress={() => {
                        setShowLogoutLayer(false);
                      }}
                      style={[styles.buttonStyle, { backgroundColor: "#fff" }]}
                      contentStyle={styles.buttonContent}
                      labelStyle={styles.buttonLabel}
                      // color="green"
                      mode="contained"
                      uppercase={false}
                    >
                      <Text
                        style={{
                          fontSize: z(16),
                          fontFamily: "PlayfairBold",
                          color: "#454545",
                        }}
                      >
                        Cancel
                      </Text>
                    </PaperButton>
                  </View>
                </View>
              </View>
            ) : null}
          </View>

          <Toast
            topOffset={z(20)}
            onPress={() => {
              Toast.hide();
            }}
          />
        </AnimatedImageBackground>
      </SafeAreaProvider>
    );
  } catch (error) {
    console.log("ErrorID: E028: ", error);
    <ErrorView Error={"ErrorID: E028"} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  header: {
    fontSize: 24,
    fontFamily: "Righteous_400Regular",
    color: "#fff",
    paddingBottom: 10,
    marginBottom: 80,
    borderBottomColor: "#199187",
    borderBottomWidth: 1,
    // fontWeight: "bold",
    position: "absolute",
    zIndex: 2,
    top: 45,
    left: 65,
  },
  goBack: {
    // zIndex: 2,
    position: "absolute",
    top: 45,
    left: 17,
    // padding: 9,
    backgroundColor: "grey",
    borderRadius: 100,
  },
  content: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    // marginTop: 120,
  },
  row: {
    flexDirection: "row",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    alignItems: "center",
    padding: 10,
    top: 120,
    height: 60,
    marginHorizontal: 10,
  },
  title: {
    // flex: 1,
    fontSize: 18,
    fontFamily: "Playfair",
    color: "#404040",
  },
  info: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  buttonStyle: {
    width: z(120),
    height: 40,
    elevation: 5,
    alignSelf: "center",
    marginBottom: z(15),
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
    width: "100%",
  },

  // modal style

  innerText: {
    fontSize: 18,
    color: "white",
  },
  input: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 10,
    marginRight: 0,
    paddingHorizontal: 8,
    paddingVertical: 6,
    // borderBottomWidth: 1,
    // borderBottomColor: "black",
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    elevation: 5,
    width: "55%",
    // borderTopLeftRadius: 30,
    // borderBottomLeftRadius: 30,
  },
  verifyButtonStyle: {
    marginTop: 20,
    // width: "80%",
    // alignSelf: "center",
    margin: 20,
  },
  verifyButtonContent: {
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 3,
    // paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#59cbbd",
    // backgroundColor: "#3b4650",
  },

  modal_close_button: {
    alignSelf: "flex-start",
    // backgroundColor: "grey",
    position: "absolute",
    top: 8,
    right: 8,
  },
  modal_text: {
    marginTop: 30,
    marginBottom: 20,
    color: "#435860",
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center",
  },
  modal_view: {
    flex: 1,
    backgroundColor: "#c7d8e6",
    margin: 0,
    padding: 10,
    borderRadius: 10,
    maxHeight: 300,
    elevation: 5,
  },
  modal_content: {
    // flex: 1,
    // position: "absolute",
    // top: 0,
    // height: "40%",
    // width: "100%",
    // height: "40%",

    backgroundColor: "transparent",
    borderRadius: 15,
    // justifyContent: "center",
    // alignItems: "center",
    paddingTop: 30,
  },
  textinput: {
    // alignSelf: "stretch",
    height: z(60),
    marginBottom: z(15),
    color: "#404040cc",
    borderBottomColor: "#f8f8f8cc",
    borderBottomWidth: 1,
    // padding: 10,
    // top: 120,
    marginHorizontal: z(15),
    fontSize: z(16),
    fontFamily: "Playfair",
    // width: "100%",
  },
  tips: {
    fontSize: 18,
    color: "white",
    fontFamily: "Righteous_400Regular",
    paddingHorizontal: 15,
    paddingTop: height * 0.03,
  },
});

{
  /* <View style={styles.container}> */
}

{
  /* <MaskCircle r={30} y={80} /> */
}
{
  /* <LinearGradient
        locations={[0.1, 1]}
        colors={[
          "rgba(255,255,255,0.1)",
          "rgba(255,255,255,1)",
          // "rgba(255,255,255,0.9)",
          // "rgba(255,255,255,0.5)",
        ]}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        }}
      ></LinearGradient> */
}

{
  /* <View
        style={{
          position: "absolute",
          top: 50,
        }}
      >
      
      </View> */
}

{
  /* <Text style={styles.header}>Profile</Text> */
}

{
  /* <View
        style={
          {
            // position: "absolute",
            // top: 100,
          }
        }
      >
     
      </View> */
}

{
  /* <View style={styles.content}> */
}
{
  /* <View style={styles.row}>
          <Text style={styles.title}>Name</Text>
          <View style={styles.info}>
            <Text
              style={{ fontFamily: "Playfair", fontSize: 17, color: "white" }}
            >
              {userData.name ? userData.name : null}
            </Text>
          </View>
        </View> */
}

{
  /* <View style={styles.row}>
          <Text style={styles.title}>Email</Text>
          <View style={styles.info}>
            <Text
              style={{ fontFamily: "Playfair", fontSize: 17, color: "white" }}
            >
              {userData.email ? userData.email : null}
            </Text>
          </View>
        </View> */
}

{
  /* <View style={styles.row}>
          <Text style={styles.title}>PayPal</Text>
          <View style={styles.info}>
            <Text style={{ fontFamily: "Playfair", fontSize: 17 }}>
              {userData.paypal ? userData.paypal : null}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ChangePaypal");
              }}
            >
              <EditIconSVG />
              <Text style={{ fontSize: 10 }}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View> */
}

{
  /* <View style={styles.row}>
          <Text style={styles.title}>Password</Text>
          <View
            style={{
              flex: 2,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ChangePassword");
              }}
            >
              <EditIconSVG />
              <Text style={{ fontSize: 10, color: "white" }}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View> */
}

{
  /* <View style={styles.row}>
          <Text style={styles.title}>Coins</Text>
          {displayTimer ? (
            <View style={styles.info}>
              <Text style={{ fontFamily: "Playfair", fontSize: 20 }}>
                Timer
              </Text>
              <Moment
                to={Math.floor(userData.next_transaction_date)}
                element={Text}
                onChange={() => {
                  if (Math.floor(userData.next_transaction_date) < Date.now()) {
                    setDisplayTimer(false);
                  }
                }}
              ></Moment>
            </View>
          ) : (
            <View style={styles.info}>
              <Text style={{ fontFamily: "Playfair", fontSize: 20 }}>
                {coins}
              </Text>
              <View
                style={{
                  alignSelf: "flex-end",
                }}
              >
                <PaperButton
                  onPress={() => {
                    setIsModalVisable(true);
                  }}
                  style={styles.buttonStyle}
                  contentStyle={styles.buttonContent}
                  labelStyle={styles.buttonLabel}
                  // color="green"
                  mode="contained"
                  uppercase={false}
                >
                  <Text
                    style={{ fontSize: 14, fontFamily: "Righteous_400Regular" }}
                  >
                    Collect
                  </Text>
                </PaperButton>
              </View>
            </View>
          )}
        </View> */
}

{
  /* <View
          style={{
            flexDirection: "row",
            // borderBottomColor: "white",
            // borderBottomWidth: 1,
            alignItems: "center",
            padding: 10,
            top: 120,
            height: 60,
            marginHorizontal: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              deleteValueFor("token");
              dispatch(setAuth(false));
            }}
          >
            <Text
              style={{
                fontFamily: "PlayfairItalic",
                fontSize: 20,
                color: "darkred",
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View> */
}

{
  /* <View
          style={{
            flexDirection: "row",
            // borderBottomColor: "white",
            // borderBottomWidth: 1,
            alignItems: "center",
            padding: 10,
            top: 360,
            height: 60,
            marginHorizontal: 10,
          }}
        >
  
        </View> */
}

{
  /* Modal ------------------------------------------------ */
}

{
  /* <Modal
          style={[styles.modal_content]}
          // avoidKeyboard={true}
          isVisible={isModalVisable}
          backdropOpacity={0.2}
          onBackButtonPress={() => {
            setIsModalVisable(false);
          }}
          onBackdropPress={() => {
            Keyboard.dismiss();
          }}
          onModalHide={() => {
            // setOtpEmail("");
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <View style={styles.modal_view}>
              <View style={{ paddingTop: 20 }}>
                <Text style={styles.modal_text}>
                  This process can be done once every 48 hours.
                </Text>
                <Text style={styles.modal_text}>
                  Make sure your PayPal username is correct.
                </Text>
                <Text style={styles.modal_text}>
                  More details will be sent to: {userData.email}
                </Text>
              </View>

              <PaperButton
                onPress={handleCollect}
                style={styles.verifyButtonStyle}
                contentStyle={styles.verifyButtonContent}
                //   labelStyle={styles.buttonLabel}
                mode="contained"
                uppercase={false}
                //   icon="account-box"
              >
                <Text style={styles.innerText}>Confirm</Text>
              </PaperButton>

              <TouchableOpacity
                onPress={() => {
                  setIsModalVisable(false);
                }}
                style={styles.modal_close_button}
              >
              
                <ModalCloseIconSVG fill={"#1A3442"} width={26} height={26} />
               
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </Modal> */
}

{
  /* Modal ------------------------------------------------ */
}

{
  /* </View> */
}

// Important -------------------------------------------------------------

// async function handleCollect() {
//   try {
//     let current_device_id = await SecureStore.getItemAsync("device_id");
//     if (current_device_id) {
//       let response = await fetch(
//         `${global.server_address}/api/process-collect`,
//         {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: userData.email,
//             current_device_id,
//             paypal: userData.paypal,
//             coins,
//             time: Date.now(),
//           }),
//         }
//       );

//       let data = await response.json();

//       if (data.type === "wrong-device") {
//         deleteValueFor("token");
//         dispatch(setAuth(false));
//       } else if (data.type === "coins-error") {
//         errorToast(data.message);
//         // update userData
//         dispatch(setUserData(data.userInfo));
//         dispatch(setCoins(data.userInfo.coins));
//       } else if (data.type === "error") {
//         errorToast(data.message);
//       } else if (data.type === "success") {
//         // update userData
//         Toast.show({
//           type: "success",
//           text1: data.message,
//           //   text2: "Success",
//           visibilityTime: 3000,
//         });

//         dispatch(setUserData(data.userInfo));
//         dispatch(setCoins(data.userInfo.coins));
//         setIsModalVisable(false);
//       } else {
//         errorToast("Something went wrong");
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     errorToast("Something went wrong");
//   }
// }

// useEffect(() => {
//   if (userData.next_transaction_date > Date.now()) {
//     setDisplayTimer(true);
//   }
// }, [userData]);

// Important -------------------------------------------------------------
