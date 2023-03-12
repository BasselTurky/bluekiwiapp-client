import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  ActivityIndicator,
  Image,
  Animated,
  Easing,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Toast from "react-native-toast-message";
import { Button as PaperButton } from "react-native-paper";
// import { s } from "react-native-size-matters";

import * as SecureStore from "expo-secure-store";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { setAuth } from "../../Features/auth";
import moment from "moment";

import { useHeaderHeight } from "@react-navigation/elements";

import CheckIcon from "../../Components/CheckIcon";

import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

// function s(size) {
//   return (width / 350) * size;
// }

import { s, z } from "../../utils/scaling";

export default function Login({ navigation }) {
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalVisable, setIsModalVisable] = useState(true);
  const [otpEmail, setOtpEmail] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [modal_content_state, set_modal_content_state] = useState("content");
  const [isLoading, setIsLoading] = useState(false);

  const passwordInput = useRef();

  const headerHeight = useHeaderHeight();

  const [showLayer, setShowLayer] = useState(false);

  const animateMenuX = React.useRef(new Animated.Value(0)).current;
  const animateMenuY = React.useRef(new Animated.Value(0)).current;

  function toggleMenu(value) {
    Animated.timing(animateMenuX, {
      // toValue: { x: 0, y: yInt },
      toValue: value,
      // toValue: deleteAccountModal ? xInt : 0,
      duration: 800,
      useNativeDriver: false,
      easing: Easing.out(Easing.sin),
    }).start(({ finished }) => {
      if (finished) {
        // setIsDisabled(false);
        // console.log(deleteAccountModal);
      }
    });
  }

  const errorToast = (message) => {
    console.log(message);
    Toast.show({
      type: "error",
      text1: message,
      text2: "Error",
      visibilityTime: 3000,
    });
  };

  const sendLoginDataToServer = async () => {
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (email === "" || password === "") {
      //   console.log("Fields can't be empty!!");
      errorToast("Fields can't be empty!!");
    } else if (!regex.test(email)) {
      errorToast("Please enter valid email format");
    } else if (password.length < 8 || password.length > 16) {
      errorToast("Password should be between 8-16 characters");
    } else {
      try {
        // Check if Device ID is available

        let device_id;

        let current_device_id = await SecureStore.getItemAsync("device_id");

        if (current_device_id) {
          device_id = current_device_id;
        } else {
          device_id = uuid();
        }

        let date = moment().format("MMMM Do YYYY, h:mm:ss a");

        let response = await fetch(`${global.server_address}/auth/login-data`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            device_id: device_id,
            date: date,
          }),
        });

        let data = await response.json();

        if (data.type === "error") {
          // ErrorID: E007
          errorToast(data.message);
          return;
        } else if (data.type === "success") {
          await save("token", data.token);

          await SecureStore.setItemAsync("device_id", device_id);

          dispatch(setAuth(true));

          return;
        } else if (data.type === "verify") {
          await SecureStore.setItemAsync("device_id", device_id);

          // open verification layout
          setOtpEmail(data.email);
          await SecureStore.setItemAsync("otp", data.otp_token);

          // setIsModalVisable(true);
          setShowLayer(true);
          toggleMenu(50 + width - (width - width * 0.8) / 2);

          return;
        } else {
          errorToast("ErrorID: E006");
          return;
        }
      } catch (error) {
        console.log("ErrorID E005: ", error);
        // alert('Error ID: E001')
        errorToast("ErrorID: E005");
        return;
      }
    }
  };

  async function handleVerification() {
    // start loading
    // set_modal_content_state("loading");
    setIsLoading(true);

    try {
      let otp_token = await SecureStore.getItemAsync("otp");
      let device_id = await SecureStore.getItemAsync("device_id");

      let response = await fetch(`${global.server_address}/auth/verify-otp`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp_token: otp_token,
          otpInput: otpInput,
          device_id: device_id,
        }),
      });
      let data = await response.json();

      // verified state
      if (data.type === "verified") {
        // save token
        await save("token", data.token);

        set_modal_content_state("verified");
        setIsLoading(false);
        setTimeout(() => {
          dispatch(setAuth(true));
        }, 500);
        return;
      } else if (
        data.type === "expired" ||
        data.type === "failed" ||
        data.type === "error"
      ) {
        // stop loading, diplay try again message
        setIsLoading(false);
        // ErrorID: E010
        errorToast(data.message);
        set_modal_content_state("content");
        return;
      }
      //   else if(data.type === 'failed'){
      //     errorToast(data.message)
      //     set_modal_content_state("content");
      //     return

      //   }else if(data.type === 'error'){

      //     errorToast(data.message)
      //     set_modal_content_state("content");
      //     return
      //   }
      else {
        errorToast("ErrorID: E009");
        return;
      }
    } catch (error) {
      console.log("ErrorID E008: ", error);
      errorToast("ErrorID: E008");
      return;
    }
  }

  return (
    <SafeAreaProvider>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View
          style={
            {
              flex: 1,
              backgroundColor: "#36485f",
              // alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: s(50),
              // paddingHorizontal: 60,
              minHeight: "100%",
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
            }

            // [
            // styles.container,
            // {
            //   minHeight: isModalVisable
            //     ? Dimensions.get("window").height
            //     : "100%",
            // },
            // ]
          }
        >
          <View
            style={{
              flexDirection: "row",
              // marginBottom: s(70),
              borderBottomColor: "#199187",
              // borderBottomWidth: 1,
              alignItems: "flex-end",
              // backgroundColor: "pink",
              marginTop: s(height * 0.128),
              // marginTop: height * 0.15,
            }}
          >
            <View
              style={{
                // width: 60,
                // height: 60,
                width: s(50),
                height: s(50),
                borderRadius: s(16),
                elevation: 8,
                overflow: "hidden",
                marginRight: s(16),
                marginBottom: s(14),
                // backgroundColor: "yellow",
              }}
            >
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                }}
                source={require("../../assets/icon.png")}
              />
            </View>

            <Text
              style={{
                fontSize: s(42),
                // fontSize: 50,
                color: "#fff",
                // paddingBottom: 10,
                // backgroundColor: "green",
                // justifyContent: "center",
                // alignItems: "center",
                // fontWeight: "bold",
                // fontFamily: "ChelaOne_400Regular",
                // fontFamily: "Graduate_400Regular",
                // fontFamily: "PinyonScript_400Regular",
                fontFamily: "GrandHotel_400Regular",
                textShadowColor: "#9ac8ec",
                // textShadowColor: "#2196F3",
                textShadowOffset: {
                  width: 2,
                  height: 2,
                },
                textShadowRadius: 10,
                // backgroundColor: "pink",
                // paddingHorizontal: s(6),
              }}
            >
              Blue Kiwi
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              position: "absolute",
              top: insets.top,
              bottom: insets.bottom,
              right: 0,
              left: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <KeyboardAvoidingView
              behavior="padding"
              enabled={true}
              keyboardVerticalOffset={s(90)}
              style={{
                width: "100%",
              }}
            >
              <TextInput
                onSubmitEditing={() => {
                  passwordInput.current?.focus();
                }}
                value={email}
                onChangeText={(val) => {
                  setEmail(val);
                }}
                style={styles.textinput}
                placeholder="E-mail..."
                placeholderTextColor={"#c7d8e6"}
                returnKeyType="next"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
                keyboardType="email-address"
              />
              <TextInput
                ref={passwordInput}
                returnKeyType="done"
                value={password}
                onChangeText={(val) => {
                  setPassword(val);
                }}
                style={styles.textinput}
                placeholder="Password..."
                placeholderTextColor={"#c7d8e6"}
                secureTextEntry
              />
            </KeyboardAvoidingView>
          </View>

          <View
            style={{
              marginBottom: s(height * 0.128),
              // marginBottom: height * 0.15,
              // backgroundColor: "grey",
            }}
          >
            <View
              style={{
                marginBottom: s(32),
                // flexDirection: "row-reverse",
                // backgroundColor: "blue",
                alignSelf: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPassword")}
                style={
                  {
                    // alignSelf: "flex-end",
                    // marginTop: 10,
                  }
                }
              >
                <Text
                  style={{
                    fontSize: z(14),
                    // fontSize: 14,
                    color: "#c4c4c4",
                    // fontFamily: "PlayfairBold",
                  }}
                >
                  Forgot your password?
                </Text>
              </TouchableOpacity>
            </View>

            <PaperButton
              onPress={sendLoginDataToServer}
              style={styles.buttonStyle}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              mode="contained"
              uppercase={false}
              //   icon="account-box"
            >
              <Text
                style={{
                  fontSize: s(14),
                  color: "white",
                  // fontFamily: "PlayfairBold",
                  // fontFamily: "ChelaOne_400Regular",
                  fontFamily: "Graduate_400Regular",
                  width: "100%",
                  // fontFamily: "PinyonScript_400Regular",
                  // fontFamily: "GrandHotel_400Regular",
                }}
              >
                Login
              </Text>
            </PaperButton>

            <View
              style={{
                // alignSelf: "flex-end",
                marginTop: s(26),
                // marginTop: 30,
                // backgroundColor: "pink",
                flexDirection: "row-reverse",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Register");
                }}
                style={
                  {
                    // backgroundColor: "green",
                  }
                }
              >
                <Text
                  style={{
                    fontSize: z(15),
                    color: "#c4c4c4",
                    // fontFamily: "PlayfairBold",
                    //   alignSelf: "flex-end",
                    //   marginTop: 30,
                    //   backgroundColor: "white",
                  }}
                >
                  Don't have an account? Register here!
                </Text>
              </TouchableOpacity>
            </View>

            {/* <Button
              title="Show"
              onPress={() => {
                setShowLayer(true);
                toggleMenu(50 + width - (width - width * 0.8) / 2);
              }}
            /> */}
          </View>

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
                    translateX: animateMenuX,
                    // translateY: animateMenuY,
                  },
                ],
                alignSelf: "center",
                // bottom: -300,
                elevation: 5,
                minHeight: s(200),
                left: -width * 0.8 - 50,
                top: height * 0.5 - s(200) * 0.5,
              },
            ]}
          >
            <View
              style={{
                position: "absolute",
                zIndex: 2,
                alignSelf: "center",
                top: s(-25),
                backgroundColor:
                  modal_content_state === "verified" ? "#4BB543" : "#2196F3",
                // backgroundColor: "#84C4FF",
                justifyContent: "center",
                alignItems: "center",
                width: s(50),
                height: s(50),
                borderRadius: 50,
              }}
            >
              <CheckIcon width={s(34)} height={s(34)} />
            </View>

            <View
              style={{
                flex: 1,
                backgroundColor:
                  modal_content_state === "verified" ? "#bbf6b7" : "#fff",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: s(5),
                  backgroundColor:
                    modal_content_state === "verified" ? "#4BB543" : "#2196F3",
                }}
              ></View>

              {modal_content_state === "content" ? (
                <View>
                  <View
                    style={{
                      alignItems: "center",
                      marginTop: s(25),
                    }}
                  >
                    <Text
                      style={{
                        fontSize: s(16),
                        fontFamily: "PlayfairBold",
                        color: "#454545",
                      }}
                    >
                      Verification
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontFamily: "Playfair",
                      fontSize: s(12),
                      color: "#454545",
                      paddingTop: s(8),
                      paddingHorizontal: s(13),
                    }}
                  >
                    Verification code was sent, please check your email: {email}
                  </Text>
                  <View
                    style={{
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <TextInput
                      returnKeyType="done"
                      style={{
                        // alignSelf: "center",
                        height: s(40),
                        marginBottom: s(20),
                        color: "#454545",
                        // borderBottomColor: "#f8f8f8",
                        // borderBottomWidth: 1,
                        fontFamily: "Playfair",
                        fontSize: s(15),
                        // marginHorizontal: s(50),

                        // textAlign: "center",
                        // color: "#fff",
                        // backgroundColor: "pink",s
                        paddingHorizontal: s(13),
                        minWidth: "70%",
                      }}
                      placeholder="Enter 6-digits code.."
                      value={otpInput}
                      onChangeText={(val) => {
                        setOtpInput(val);
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
                        Keyboard.dismiss();
                        setShowLayer(false);
                        toggleMenu(0);
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
                          color: "#454545",
                        }}
                      >
                        Cancel
                      </Text>
                    </PaperButton>
                    <PaperButton
                      onPress={handleVerification}
                      style={[
                        styles.m_buttonStyle,
                        { backgroundColor: "#2196F3" },
                      ]}
                      contentStyle={styles.m_buttonContent}
                      labelStyle={styles.m_buttonLabel}
                      disabled={isLoading}
                      // color="green"
                      mode="contained"
                      uppercase={false}
                    >
                      {isLoading ? (
                        <ActivityIndicator size="large" color="skyblue" />
                      ) : (
                        <Text
                          style={{
                            fontSize: s(14),
                            fontFamily: "PlayfairBold",
                            color: "#ffffffcc",
                          }}
                        >
                          Verify
                        </Text>
                      )}
                    </PaperButton>
                  </View>
                </View>
              ) : modal_content_state === "verified" ? (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    // backgroundColor: "pink",
                  }}
                >
                  <Text
                    style={{
                      fontSize: s(30),
                      color: "#22413c",
                      // paddingBottom: s(8),
                      // backgroundColor: "green",
                      // fontWeight: "bold",
                      // fontFamily: "ChelaOne_400Regular",
                      // fontFamily: "Graduate_400Regular",
                      // justifyContent: "center",
                      // alignItems: "center",
                      // fontFamily: "PinyonScript_400Regular",
                      // fontFamily: "GrandHotel_400Regular",
                      fontFamily: "PlayfairBold",
                      textShadowColor: "grey",
                      textShadowOffset: {
                        width: 2,
                        height: 2,
                      },
                      textShadowRadius: 10,
                      // alignSelf: "center",
                      // borderBottomColor: "#199187",
                      // borderBottomWidth: 1,
                    }}
                  >
                    Verified!
                  </Text>
                </View>
              ) : null}
            </View>
          </Animated.View>

          <Toast
            topOffset={20 + insets.top}
            onPress={() => {
              Toast.hide();
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#36485f",
    // alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 60,
    minHeight: "100%",
  },
  header: {
    fontSize: 24,
    color: "#fff",
    paddingBottom: 10,
    marginBottom: 80,
    borderBottomColor: "#199187",
    borderBottomWidth: 1,
    fontWeight: "bold",
  },
  textinput: {
    alignSelf: "stretch",
    height: s(50),
    marginBottom: s(26),
    color: "#fff",
    borderBottomColor: "#f8f8f8",
    borderBottomWidth: 1,
    fontFamily: "Playfair",
    fontSize: s(15),
    marginHorizontal: s(50),
    color: "#fff",
  },

  // buttonStyle: {
  //   marginTop: s(8),
  // },
  // buttonContent: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   // paddingVertical: 3,
  //   // paddingHorizontal: 10,
  //   borderRadius: 4,
  //   elevation: 3,
  //   backgroundColor: "#59cbbd",
  //   width: "100%",

  //   // backgroundColor: "#3b4650",
  // },

  buttonStyle: {
    width: "100%",
    height: s(38),
    elevation: 5,
    alignSelf: "center",
    marginBottom: s(8),
    backgroundColor: "#59cbbd",
  },
  buttonContent: {
    padding: 0,
    margin: 0,
    height: "100%",
    width: "100%",
    // backgroundColor: "pink",
  },
  buttonLabel: {
    padding: 0,
    margin: 0,
    width: "100%",
    // backgroundColor: "green",
  },
  //   buttonLabel: {
  //     fontSize: 34,
  //     // backgroundColor: "green",
  //     // customLabelSize: 20,
  //     width: "90%",
  //     height: "100%",
  //     paddingVertical: 5,
  //     paddingLeft: 15,
  //     marginVertical: 0,
  //     marginHorizontal: 0,
  //     // textAlign: "left",
  //   },
  innerText: {
    fontSize: 18,
    color: "white",
  },
  goback: {
    alignSelf: "flex-end",
    marginTop: 20,
  },
  layer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 300,
    backgroundColor: "transparent",
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
  input: {
    marginTop: 20,
    marginBottom: 10,
    // marginHorizontal: 10,
    // marginRight: 0,
    paddingHorizontal: 8,
    paddingVertical: 6,
    // borderBottomWidth: 1,
    // borderBottomColor: "black",
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    elevation: 5,
    width: "100%",
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
  setOtpEmail("");
}}
>
{modal_content_state === "loading" ? (
  <ActivityIndicator size="large" color="skyblue" />
) : modal_content_state === "content" ? (
  <TouchableWithoutFeedback
    onPress={() => {
      Keyboard.dismiss();
    }}
  >
    <View
      style={{
        flex: 1,
        backgroundColor: "#c7d8e6",
        margin: 0,
        // padding: 10,
        borderRadius: 10,
        maxHeight: 300,
        elevation: 5,
      }}
    >
      <Text
        style={{
          // marginTop: 30,
          // marginBottom: 20,
          color: "#435860",
          fontWeight: "bold",
          fontSize: 18,
          alignSelf: "center",
        }}
      >
        Verification code is sent to email, code expires in 10
        minutes
      </Text>

      {otpEmail ? <Text>{otpEmail}</Text> : null}

      <TextInput
        style={styles.input}
        returnKeyType="done"
        placeholder="Enter 6-digits code.."
        value={otpInput}
        onChangeText={(val) => {
          setOtpInput(val);
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <PaperButton
          onPress={() => {}}
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
              fontSize: 16,
              fontFamily: "PlayfairBold",
              color: "#454545",
            }}
          >
            Cancel
          </Text>
        </PaperButton>
        <PaperButton
          onPress={() => {}}
          style={[
            styles.m_buttonStyle,
            { backgroundColor: "#f53649" },
          ]}
          contentStyle={styles.m_buttonContent}
          labelStyle={styles.m_buttonLabel}
          // color="green"
          mode="contained"
          uppercase={false}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "PlayfairBold",
              color: "#ffffffcc",
            }}
          >
            Delete
          </Text>
        </PaperButton>
      </View>
      <PaperButton
        onPress={handleVerification}
        style={styles.verifyButtonStyle}
        contentStyle={styles.verifyButtonContent}
        //   labelStyle={styles.buttonLabel}
        mode="contained"
        uppercase={false}
        //   icon="account-box"
      >
        <Text style={styles.innerText}>Verify</Text>
      </PaperButton>

      <TouchableOpacity
        onPress={() => {
          setIsModalVisable(false);
        }}
        style={styles.modal_close_button}
      >

        <ModalCloseIconSVG
          fill={"#1A3442"}
          width={26}
          height={26}
        />

      </TouchableOpacity>
    </View>
  </TouchableWithoutFeedback>
) : modal_content_state === "verified" ? (
  <Text>Verified</Text>
) : null}
</Modal> */
}
