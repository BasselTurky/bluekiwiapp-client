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

import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { Button as PaperButton } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";

import { z, zx } from "../../../../utils/scaling";

import { setAuth } from "../../../../Features/auth";
// import { setUserData } from "../../../../Features/userData";

import GoBackSVG from "../../../../Components/GoBackSVG";

async function deleteValueFor(key) {
  await SecureStore.deleteItemAsync(key);
}

var height = Dimensions.get("window").height;

export default function ChangePassword({
  setShowChangePass,
  Toast,
  errorToast,
}) {
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordInput = React.useRef();
  const confirmPasswordInput = React.useRef();

  //   const errorToast = (message) => {
  //     Toast.show({
  //       type: "error",
  //       text1: message,
  //       text2: "Error",
  //       visibilityTime: 3000,
  //     });
  //   };

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
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          width: "100%",
          paddingVertical: z(10),
          paddingHorizontal: 17,
          flexDirection: "row",
          zIndex: 2,
          backgroundColor: "#2b2d31",
        }}
      >
        <TouchableOpacity
          style={{
            // zIndex: 2,
            // position: "absolute",
            // top: 30,
            // left: 17,
            width: zx(40),
            height: zx(40),
            backgroundColor: "rgba(0,0,0,0.3)",
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            //   navigation.goBack();
            setShowChangePass(false);
          }}
        >
          <GoBackSVG fill={"#fff"} width={zx(15)} height={zx(15)} />
        </TouchableOpacity>

        <View
          style={{
            paddingLeft: z(20),
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: z(20),
              color: "#9c9c9c",
            }}
          >
            Change Password
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          //   backgroundColor: "green",
          flexDirection: "column-reverse",
          paddingBottom: insets.bottom,
        }}
      >
        <View
          style={{
            flex: 1,
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            // justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
            // backgroundColor: "green",
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
              onSubmitEditing={() => {
                passwordInput.current?.focus();
              }}
              value={currentPassword}
              onChangeText={(val) => {
                setCurrentPassword(val);
              }}
              style={styles.textinput}
              placeholder="Enter current password.."
              placeholderTextColor={"#9c9c9c"}
              secureTextEntry
              returnKeyType="next"
            />
            <TextInput
              ref={passwordInput}
              onSubmitEditing={() => {
                confirmPasswordInput.current?.focus();
              }}
              value={newPassword}
              onChangeText={(val) => {
                setNewPassword(val);
              }}
              style={styles.textinput}
              placeholder="Enter your new password.."
              placeholderTextColor={"#9c9c9c"}
              secureTextEntry
              returnKeyType="next"
            />
            <TextInput
              ref={confirmPasswordInput}
              value={confirmPassword}
              onChangeText={(val) => {
                setConfirmPassword(val);
              }}
              style={styles.textinput}
              placeholder="Confirm your new password.."
              placeholderTextColor={"#9c9c9c"}
              secureTextEntry
              returnKeyType="done"
            />
          </KeyboardAvoidingView>

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
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textinput: {
    // alignSelf: "stretch",
    height: zx(60),
    marginBottom: z(10),
    color: "#fff",
    borderBottomColor: "#f8f8f8cc",
    borderBottomWidth: 1,
    // padding: 10,
    // top: 120,
    marginHorizontal: z(30),
    fontSize: z(15),
    fontFamily: "Playfair",
    // width: "100%",
  },
  buttonStyle: {
    // marginTop: 10,
    width: z(200),
    height: z(45),
    backgroundColor: "#4b6382",
    elevation: 3,
    // top: 120,
    alignSelf: "center",
    marginTop: z(35),
    // marginBottom: zx(200),
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
