import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { Button as PaperButton } from "react-native-paper";

import GoBackSVG from "../../Components/GoBackSVG";

import { s } from "react-native-size-matters";

import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

export default function ForgotPassword({ navigation }) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");

  const errorToast = (message) => {
    Toast.show({
      type: "error",
      text1: message,
      text2: "Error",
      visibilityTime: 3000,
    });
  };

  const resetPasswordHandler = async () => {
    try {
      let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (email === "") {
        console.log("Please enter your email!");
      } else if (!regex.test(email)) {
        console.log("Please enter valid email format");
      } else {
        let response = await fetch(
          `${global.server_address}/auth/reset-password-data`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
          }
        );
        let data = await response.json();

        if (data.type === "error") {
          errorToast(data.message);
        } else if (data.type === "success") {
          setEmail("");
          Toast.show({
            type: "success",
            text1: data.message,
            // text2: data.message,
            visibilityTime: 3000,
          });
        } else {
          errorToast("Couldn't reach the server!");
        }
      }
    } catch (error) {
      console.log("Error L63: ", error);
      errorToast("Couldn't reach the server!");
    }
  };
  return (
    <SafeAreaProvider>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#36485f",
            // alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: s(50),
            minHeight: "100%",
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }}
        >
          <View
            style={{
              marginTop: s(height * 0.128),
              // backgroundColor: "pink",
            }}
          >
            <Text
              style={{
                fontSize: s(25),
                color: "#fff",
                paddingBottom: s(8),
                // backgroundColor: "green",
                // fontWeight: "bold",
                // fontFamily: "ChelaOne_400Regular",
                // fontFamily: "Graduate_400Regular",
                // justifyContent: "center",
                // alignItems: "center",
                // fontFamily: "PinyonScript_400Regular",
                // fontFamily: "GrandHotel_400Regular",
                fontFamily: "Playfair",
                // alignSelf: "center",
                borderBottomColor: "#199187",
                borderBottomWidth: 1,
                textShadowColor: "#9ac8ec",
                // textShadowColor: "#2196F3",
                textShadowOffset: {
                  width: 2,
                  height: 2,
                },
                textShadowRadius: 10,
              }}
            >
              Restore Password
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
                value={email}
                onChangeText={(val) => {
                  setEmail(val);
                }}
                style={styles.textinput}
                placeholder="E-mail address"
                placeholderTextColor={"#c7d8e6"}
                returnKeyType="done"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
                keyboardType="email-address"
              />
            </KeyboardAvoidingView>
          </View>

          <View
            style={{
              marginBottom: s(height * 0.17),
            }}
          >
            <Text
              style={{
                fontSize: s(12),
                color: "#c4c4c4",
                fontFamily: "PlayfairBold",
              }}
            >
              You will receive an email with password reset link.
            </Text>
            <PaperButton
              onPress={resetPasswordHandler}
              style={styles.buttonStyle}
              contentStyle={styles.buttonContent}
              //   labelStyle={styles.buttonLabel}
              mode="contained"
              uppercase={false}
              //   icon="account-box"
            >
              <Text
                style={{
                  fontSize: s(14),
                  color: "white",
                  // fontFamily: "PlayfairBold",
                  fontFamily: "Graduate_400Regular",
                }}
              >
                Submit
              </Text>
            </PaperButton>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <View
                style={{
                  alignSelf: "flex-end",
                  marginTop: s(28),
                  flexDirection: "row",
                  // justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: "grey",
                }}
              >
                <GoBackSVG fill={"#fff"} width={s(12)} height={s(12)} />
                <Text
                  style={{
                    fontSize: s(13),
                    color: "#c4c4c4",
                    fontFamily: "PlayfairBold",
                    marginLeft: s(8),
                    paddingBottom: s(2),
                  }}
                >
                  Back to Login page
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <Toast
            topOffset={s(20) + insets.top}
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

  buttonStyle: {
    marginTop: s(17),
  },
  buttonContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 1,
    // paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#59cbbd",
    // backgroundColor: "#3b4650",
  },
  buttonLabel: {
    fontSize: 34,
    // backgroundColor: "green",
    // customLabelSize: 20,
    width: "90%",
    height: "100%",
    paddingVertical: 5,
    paddingLeft: 15,
    marginVertical: 0,
    marginHorizontal: 0,
    // textAlign: "left",
  },
  innerText: {
    fontSize: 16,
    color: "white",
  },
  goback: {
    alignSelf: "flex-end",
    marginTop: 20,
  },
});
