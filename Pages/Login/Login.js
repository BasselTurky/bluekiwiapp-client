// "android": {
// "googleServicesFile": "./google-services.json",

import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  Animated,
  Easing,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Button as PaperButton } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { setAuth } from "../../Features/auth";
import moment from "moment";
import GoogleColoredIcon from "../../Components/GoogleColoredIcon";
import { useToast } from "react-native-toast-notifications";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "525928726797-45m49p0kdbcspgsicp72cl6d67fcabk0.apps.googleusercontent.com",
  // "525928726797-45m49p0kdbcspgsicp72cl6d67fcabk0.apps.googleusercontent.com",
});

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

async function getToken() {
  const token = await SecureStore.getItemAsync("token");
  console.log("token: ", token);
}

import { s, z } from "../../utils/scaling";

export default function Login({ navigation }) {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // TODO send token to backend, verify it, extract data, add data to jwt, send it back to frontend, store it in secure store, attach token to each socket io connection

      let response = await fetch(
        `${global.server_address}/auth/sign-google-idToken`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: userInfo.idToken,
          }),
        }
      );

      if (response.ok) {
        let data = await response.json();
        console.log(data);
        await save("token", data.token);
        dispatch(setAuth("google"));
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log("user cancelled the login flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log("operation (e.g. sign in) is in progress already");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log("play services not available or outdated");
      } else {
        // some other error happened
        console.log("some other error happened : ", error);
      }
    }
  };

  const insets = useSafeAreaInsets();
  const toast = useToast();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const passwordInput = useRef();

  // const headerHeight = useHeaderHeight();

  // const animateMenuX = React.useRef(new Animated.Value(0)).current;
  // const animateMenuY = React.useRef(new Animated.Value(0)).current;
  getToken();

  // function toggleMenu(value) {
  //   Animated.timing(animateMenuX, {
  //     // toValue: { x: 0, y: yInt },
  //     toValue: value,
  //     // toValue: deleteAccountModal ? xInt : 0,
  //     duration: 800,
  //     useNativeDriver: false,
  //     easing: Easing.out(Easing.sin),
  //   }).start(({ finished }) => {
  //     if (finished) {
  //       // setIsDisabled(false);
  //       // console.log(deleteAccountModal);
  //     }
  //   });
  // }

  const sendLoginDataToServer = async () => {
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (email === "" || password === "") {
      toast.show("Fields can't be empty!!", { type: "error" });
    } else if (!regex.test(email)) {
      toast.show("Please enter valid email format", { type: "error" });
    } else if (password.length < 8 || password.length > 16) {
      toast.show("Password should be between 8-16 characters", {
        type: "error",
      });
    } else {
      try {
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
            date: date,
          }),
        });

        let data = await response.json();

        if (data.type === "error") {
          toast.show(data.message, { type: "error" });
          return;
        } else if (data.type === "success") {
          await save("token", data.token);
          dispatch(setAuth("default"));

          return;
        } else {
          toast.show("ErrorID: E006", { type: "error" });
          return;
        }
      } catch (error) {
        console.log("ErrorID E005: ", error);
        toast.show("ErrorID: E005", { type: "error" });
        return;
      }
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View
        style={{
          flex: 1,
          // backgroundColor: "#36485f",
          // backgroundColor: "#7dffd4",
          // backgroundColor: "#fff",
          // justifyContent: "space-between",
          // paddingHorizontal: s(50),
          minHeight: "100%",
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <View
          style={{
            position: "absolute",
            right: 0,
            left: 0,
            borderBottomColor: "#199187",
            alignItems: "center",
            paddingTop: z(height * 0.065) + insets.top,
            // backgroundColor: "#7dffd4",
          }}
        >
          <View
            style={{
              width: z(90),
              height: z(90),
              borderRadius: z(30),
              elevation: 8,
              overflow: "hidden",
              marginBottom: z(5),
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
              fontSize: z(28),
              color: "#fff",
              fontFamily: "GrandHotel_400Regular",
              textShadowColor: "#9ac8ec",
              textShadowOffset: {
                width: 2,
                height: 2,
              },
              textShadowRadius: z(10),
              marginBottom: z(5),
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
            justifyContent: "flex-end",
            alignItems: "center",
            marginHorizontal: z(50),
          }}
        >
          <KeyboardAvoidingView
            behavior="position"
            enabled={true}
            keyboardVerticalOffset={z(40)}
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
              placeholderTextColor={"#9c9c9c"}
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
              placeholderTextColor={"#9c9c9c"}
              secureTextEntry
            />
          </KeyboardAvoidingView>

          <View
            style={{
              marginBottom: z(20),
              alignSelf: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
              style={{}}
            >
              <Text
                style={{
                  fontSize: z(14),
                  color: "#fff",
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
          >
            <Text
              style={{
                fontSize: z(14),
                color: "white",
                fontFamily: "RobotoMedium",
                width: "100%",
              }}
            >
              SIGN IN
            </Text>
          </PaperButton>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: z(50),
              width: "100%",
              marginBottom: z(20),
            }}
          >
            <View style={styles.line}></View>
            <Text
              style={{
                marginHorizontal: z(20),
                color: "#fff",
              }}
            >
              Or
            </Text>
            <View style={styles.line}></View>
          </View>

          <PaperButton
            onPress={signIn}
            style={styles.googleButtonStyle}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            mode="contained"
            uppercase={false}
            icon={() => <GoogleColoredIcon width={z(24)} height={z(24)} />}
          >
            <Text
              style={{
                fontSize: z(14),
                color: "#7f7f7f",
                fontFamily: "RobotoMedium",
              }}
            >
              Connect with Google
            </Text>
          </PaperButton>

          <View
            style={{
              flexDirection: "row-reverse",
              marginBottom: z(32),
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text
                style={{
                  fontSize: z(17),
                  color: "#fff",
                }}
              >
                Create account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: z(46),
    marginBottom: z(20),
    color: "#000",
    borderBottomColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderRadius: z(6),
    fontFamily: "RobotoRegular",
    fontSize: z(14),
    // marginHorizontal: z(40),
    // color: "#fff",
    backgroundColor: "#eaeaec",
    paddingHorizontal: z(10),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#fff", // Customize the line color
  },

  // buttonStyle: {
  //   marginTop: z(8),
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
    height: z(46),
    elevation: 5,
    alignSelf: "center",
    marginBottom: z(20),
    // backgroundColor: "#59cbbd",
    backgroundColor: "#84c4ff",
    borderRadius: z(6),
  },
  googleButtonStyle: {
    width: "100%",
    height: z(46),
    elevation: 5,
    alignSelf: "center",
    marginBottom: z(20),
    // backgroundColor: "#59cbbd",
    backgroundColor: "#fff",
    // backgroundColor: "#ff6175",
    borderRadius: z(6),
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
    // width: "100%",
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
    width: z(100),
    height: z(36),
    elevation: 5,
    alignSelf: "center",
    marginBottom: z(13),
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
  Keyboard.dismisz();
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

{
  /* {showLayer ? (
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
          ) : null} */
}

{
  /* <Animated.View
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
          </Animated.View> */
}

// async function handleVerification() {
//   // start loading
//   // set_modal_content_state("loading");
//   setIsLoading(true);

//   try {
//     let otp_token = await SecureStore.getItemAsync("otp");
//     let device_id = await SecureStore.getItemAsync("device_id");

//     let response = await fetch(`${global.server_address}/auth/verify-otp`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         otp_token: otp_token,
//         otpInput: otpInput,
//         device_id: device_id,
//       }),
//     });
//     let data = await response.json();

//     // verified state
//     if (data.type === "verified") {
//       // save token
//       await save("token", data.token);

//       set_modal_content_state("verified");
//       setIsLoading(false);
//       setTimeout(() => {
//         dispatch(setAuth(true));
//       }, 500);
//       return;
//     } else if (
//       data.type === "expired" ||
//       data.type === "failed" ||
//       data.type === "error"
//     ) {
//       // stop loading, diplay try again message
//       setIsLoading(false);
//       // ErrorID: E010
//       toast.show(data.message, { type: "error" });
//       set_modal_content_state("content");
//       return;
//     }
//     //   else if(data.type === 'failed'){
//     //     toast.show(data.messag,{type:'error'}e)
//     //     set_modal_content_state("content");
//     //     return

//     //   }else if(data.type === 'error'){

//     //     toast.show(data.messag,{type:'error'}e)
//     //     set_modal_content_state("content");
//     //     return
//     //   }
//     else {
//       toast.show("ErrorID: E009", { type: "error" });
//       return;
//     }
//   } catch (error) {
//     console.log("ErrorID E008: ", error);
//     toast.show("ErrorID: E008", { type: "error" });
//     return;
//   }
// }
