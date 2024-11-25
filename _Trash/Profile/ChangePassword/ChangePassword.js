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
  KeyboardAvoidingView,
} from "react-native";

import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { z } from "../../../utils/scaling";
import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { Button as PaperButton } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";

import GoBackSVG from "../../../Components/GoBackSVG";

import { setAuth } from "../../../Features/auth";
import { setUserData } from "../../../Features/userData";

async function deleteValueFor(key) {
  await SecureStore.deleteItemAsync(key);
}

var height = Dimensions.get("window").height;

export default function ChangePassword({ navigation }) {
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userData = useSelector((state) => state.userData.value);

  const errorToast = (message) => {
    Toast.show({
      type: "error",
      text1: message,
      text2: "Error",
      visibilityTime: 3000,
    });
  };

  async function handleSubmit() {
    try {
      if (
        currentPassword === "" ||
        newPassword === "" ||
        confirmPassword === ""
      ) {
        errorToast("Fields can't be empty");
      } else if (newPassword !== confirmPassword) {
        //   console.log("Password is not matching");
        errorToast("Password is not matching");
      } else if (
        currentPassword.length < 8 ||
        currentPassword.length > 16 ||
        newPassword.length < 8 ||
        newPassword.length > 16
      ) {
        //   console.log("Password should be between 8-16 characters");
        errorToast("Password should be between 8-16 characters");
      } else {
        // let current_device_id = await SecureStore.getItemAsync("device_id");

        // if (current_device_id) {
        let currentToken = await SecureStore.getItemAsync("token");

        let response = await fetch(
          `${global.server_address}/auth/update-password`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              // email: userData.email,
              // current_device_id,
              token: currentToken,
              currentPassword,
              newPassword,
            }),
          }
        );

        let data = await response.json();

        if (data.type === "wrong-device") {
          deleteValueFor("token");
          dispatch(setAuth(false));
        } else if (data.type === "wrong-password" || data.type === "error") {
          // ErrorID: E031
          errorToast(data.message);
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        } else if (data.type === "success") {
          // errorToast(data.message)
          Toast.show({
            type: "success",
            text1: data.message,
            text2: "Success",
            visibilityTime: 3000,
          });
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          // dispatch(setUserData(data.userData));
        } else {
          errorToast("ErrorID: E030");
        }
        // }
      }
    } catch (error) {
      console.log("ErrorID: E029: ", error);
      errorToast("ErrorID: E029");
    }
  }

  return (
    // <ImageBackground
    //   source={require("../../assets/HomeBackground.png")}
    //   resizeMode="cover"
    //   style={[styles.container, { height: height }]}
    // >
    //   {/* <TouchableWithoutFeedback
    //     onPress={() => {
    //       Keyboard.dismiss();
    //     }}
    //   > */}

    //   {/* </TouchableWithoutFeedback> */}
    //   <Toast
    //     topOffset={20}
    //     onPress={() => {
    //       Toast.hide();
    //     }}
    //   />
    // </ImageBackground>
    <SafeAreaProvider>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
        // style={{
        //   flex: 1,
        //   backgroundColor: "green",
        // }}
      >
        <ImageBackground
          source={require("../../../../assets/profilePage3.png")}
          // source={require("../../../../assets/pixel4.jpg")}
          resizeMode="cover"
          style={[
            {
              flex: 1,
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop:
                height * 0.04 < 24
                  ? insets.top + height * 0.005
                  : insets.top + height * 0.015,
              // paddingTop: insets.top + 10,
              paddingBottom: insets.bottom,
            },
            // styles.container,
          ]}
        >
          <View style={{ width: "100%", alignItems: "center" }}>
            <View
              style={{
                width: "100%",

                paddingHorizontal: 17,
                // backgroundColor: "green",
              }}
            >
              <TouchableOpacity
                style={{
                  // zIndex: 2,
                  // position: "absolute",
                  // top: 30,
                  // left: 17,
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
            </View>
            <Text
              style={{
                fontSize: z(26),
                fontFamily: "Righteous_400Regular",
                color: "rgba(0,0,0,0.4)",
                // backgroundColor: "yellow",
              }}
            >
              Update Password
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <KeyboardAvoidingView
              behavior="padding"
              enabled={true}
              keyboardVerticalOffset={z(100)}
              style={{
                width: "100%",
              }}
            >
              <TextInput
                value={currentPassword}
                onChangeText={(val) => {
                  setCurrentPassword(val);
                }}
                style={styles.textinput}
                placeholder="Enter current password.."
                placeholderTextColor={"#404040cc"}
                secureTextEntry
              />
              <TextInput
                value={newPassword}
                onChangeText={(val) => {
                  setNewPassword(val);
                }}
                style={styles.textinput}
                placeholder="Enter your new password.."
                placeholderTextColor={"#404040cc"}
                secureTextEntry
              />
              <TextInput
                value={confirmPassword}
                onChangeText={(val) => {
                  setConfirmPassword(val);
                }}
                style={styles.textinput}
                placeholder="Confirm your new password.."
                placeholderTextColor={"#404040cc"}
                secureTextEntry
              />
            </KeyboardAvoidingView>
          </View>

          <PaperButton
            onPress={handleSubmit}
            style={styles.buttonStyle}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            // color="green"
            mode="contained"
            uppercase={false}
          >
            <Text
              style={{
                fontSize: z(18),
                fontFamily: "PlayfairBold",
                color: "#ffffffcc",
              }}
            >
              Submit
            </Text>
          </PaperButton>
        </ImageBackground>
        {/* <Toast
          topOffset={20}
          onPress={() => {
            Toast.hide();
          }}
        /> */}
      </TouchableWithoutFeedback>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: "space-between",
    // width: "100%",
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
    // zIndex: 2,
    top: 45,
    left: 65,
  },
  goBack: {
    zIndex: 2,
    position: "absolute",
    top: 45,
    left: 15,
    padding: 5,
    // backgroundColor: "grey",
  },
  content: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 120,
  },
  row: {
    flexDirection: "row",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    alignItems: "center",
    padding: 10,
    // top: 120,
    height: 60,
    marginHorizontal: 10,
  },
  textinput: {
    // alignSelf: "stretch",
    height: z(60),
    marginBottom: z(28),
    color: "#fff",
    borderBottomColor: "#f8f8f8cc",
    borderBottomWidth: 1,
    // padding: 10,
    // top: 120,
    marginHorizontal: z(30),
    fontSize: z(16),
    fontFamily: "Playfair",
    // width: "100%",
  },

  buttonStyle: {
    // marginTop: 10,
    width: z(200),
    height: 45,
    backgroundColor: "#af9199",
    elevation: 3,
    // top: 120,
    alignSelf: "center",
    marginBottom: z(80),
  },
  buttonContent: {
    // alignItems: "center",
    // justifyContent: "center",
    // paddingVertical: 3,
    // paddingHorizontal: 10,
    // borderRadius: 4,
    // elevation: 3,
    padding: 0,
    margin: 0,
    height: "100%",
    width: "100%",
    // backgroundColor: "grey",
    // backgroundColor: "#3b4650",
  },
  buttonLabel: {
    padding: 0,
    margin: 0,
    width: "100%",
  },
});
