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
import { useToast } from "react-native-toast-notifications";
import { Button as PaperButton } from "react-native-paper";

import GoBackSVG from "../../Components/GoBackSVG";
import { Feather, Entypo, Ionicons } from "@expo/vector-icons";

// import { s } from "react-native-size-matters";
import { z, zx, s } from "../../utils/scaling";

import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { resetPasswordHandler } from "./utils/restorePasswordHandler";

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

export default function ForgotPassword({ navigation }) {
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const [email, setEmail] = useState("");

  // const resetPasswordHandler = async () => {
  //   try {
  //     let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  //     if (email === "") {
  //       console.log("Please enter your email!");
  //     } else if (!regex.test(email)) {
  //       console.log("Please enter valid email format");
  //     } else {
  //       let response = await fetch(
  //         `${global.server_address}/auth/reset-password-data`,
  //         {
  //           method: "POST",
  //           headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ email: email }),
  //         }
  //       );
  //       let data = await response.json();

  //       if (data.type === "error") {
  //         // ErrorID: E017
  //         // ErrorID: E018
  //         toast.show(data.message, { type: "error" });
  //       } else if (data.type === "success") {
  //         setEmail("");
  //         toast.show(data.message, {
  //           type: "success",
  //         });
  //       } else {
  //         toast.show("ErrorID: E016", { type: "error" });
  //       }
  //     }
  //   } catch (error) {
  //     console.log("ErrorID: E015: ", error);
  //     toast.show("ErrorID: E015", { type: "error" });
  //   }
  // };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Restore Password</Text>
        </View>

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
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor={"#fff"}
            returnKeyType="next"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
        </KeyboardAvoidingView>
        <Text
          style={{
            fontSize: z(14),
            color: "#fff",
            fontFamily: "MontserratRegular",
            marginBottom: z(20),
          }}
        >
          You will receive an email with password reset link.
        </Text>

        <PaperButton
          onPress={() => resetPasswordHandler(email, toast)}
          style={styles.buttonStyle}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          mode="contained"
          uppercase={false}
        >
          <Text
            style={{
              fontSize: z(17),
              color: "white",
              fontFamily: "MontserratRegular",
              width: "100%",
            }}
          >
            Submit
          </Text>
        </PaperButton>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.goback}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Entypo name="chevron-left" size={z(40)} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: zx(50),
    minHeight: "100%",
  },
  header: {
    marginTop: z(50),
    marginBottom: z(60),
  },
  headerText: {
    color: "white",
    fontSize: z(24),
    fontFamily: "MontserratSemiBold",
    letterSpacing: 1,
  },
  textInput: {
    backgroundColor: "#90d9dd",
    height: z(48),
    marginBottom: z(18),
    borderRadius: 20,
    paddingLeft: zx(18),
    fontFamily: "MontserratRegular",
    color: "white",
  },

  buttonStyle: {
    width: "100%",
    height: z(55),
    elevation: 5,
    marginTop: z(20),
    marginBottom: z(55),
    backgroundColor: "#84c4ff",
    borderRadius: z(6),
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

  innerText: {
    fontSize: 16,
    color: "white",
  },
  goback: {
    width: z(50),
    height: z(50),
    justifyContent: "center",
  },
  footer: {
    alignItems: "flex-start",
  },
});

{
  /* <Text
style={{
  fontSize: s(12),
  color: "#fff",
  fontFamily: "PlayfairBold",
  marginBottom: z(20),
}}
>
You will receive an email with password reset link.
</Text> */
}

{
  /* <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          paddingHorizontal: s(50),
          minHeight: "100%",
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      > */
}

{
  /* <View
          style={{
            marginTop: s(height * 0.128),
          }}
        >
          <Text
            style={{
              fontSize: s(25),
              color: "#fff",
              paddingBottom: s(8),
              fontFamily: "Playfair",
              borderBottomColor: "#fff",
              borderBottomWidth: 1,
              textShadowColor: "#9ac8ec",
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
            marginBottom: z(height * 0.15),
          }}
        >

          <PaperButton
            onPress={resetPasswordHandler}
            style={styles.buttonStyle}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            mode="contained"
            uppercase={false}
          >
            <Text
              style={{
                fontSize: s(14),
                color: "white",
                fontFamily: "Graduate_400Regular",
              }}
            >
              Submit
            </Text>
          </PaperButton>
          <View
            style={{
              flexDirection: "row-reverse",
              marginTop: s(28),
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <GoBackSVG fill={"#fff"} width={s(12)} height={s(12)} />
                <Text
                  style={{
                    fontSize: s(13),
                    color: "#fff",
                    fontFamily: "PlayfairBold",
                    marginLeft: s(8),
                    paddingBottom: s(2),
                  }}
                >
                  Back to Sign in
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View> */
}
