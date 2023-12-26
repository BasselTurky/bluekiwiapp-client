import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useToast } from "react-native-toast-notifications";

import { Button as PaperButton } from "react-native-paper";

import GoBackSVG from "../../Components/GoBackSVG";

import { s } from "react-native-size-matters";
import { z } from "../../utils/scaling";
import { useSafeAreaInsets } from "react-native-safe-area-context";

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

export default function Register({ navigation }) {
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const nameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();

  const sendRegisterDataToServer = async () => {
    let regex = /^[a-zA-Z]+$/;
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
      // paypal === ""
    ) {
      //   console.log("Fields can't be empty!!");
      toast.show("Fields can't be empty!!", { type: "error" });
    } else if (!regex.test(name)) {
      //   console.log("Name should include letters only");
      toast.show("Name should include letters only", { type: "error" });
    } else if (!emailRegex.test(email)) {
      //   console.log("Please enter valid email format");
      toast.show("Please enter valid email format", { type: "error" });
    } else if (password.length < 8 || password.length > 16) {
      //   console.log("Password should be between 8-16 characters");
      toast.show("Password should be between 8-16 characters", {
        type: "error",
      });
    } else if (password !== confirmPassword) {
      //   console.log("Password is not matching");
      toast.show("Password is not matching", { type: "error" });
    }
    //  else if (!emailRegex.test(paypal)) {
    //   //   console.log("Please enter valid email format");
    //   toast.show("Please enter valid email format",{type:'error'});
    // }
    else {
      try {
        let response = await fetch(
          `${global.server_address}/auth/register-data`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              email: email,
              password: password,
              // paypal: paypal,
            }),
          }
        );
        let data = await response.json();
        // console.log(data);

        if (data.type === "success") {
          // console.log(data.message);
          toast.show("Registeration Complete", {
            type: "success",
          });

          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          // setPaypal("");
          setTimeout(() => {
            navigation.navigate("Login");
          }, 6000);
        } else if (data.type === "error") {
          // ErrorID: E013
          // ErrorID: E014
          toast.show(data.message, { type: "error" });
        } else {
          toast.show("ErrorID: E012", { type: "error" });
        }
      } catch (error) {
        console.log("ErrorID E011: ", error);
        toast.show("ErrorID: E011", { type: "error" });
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
            marginTop: s(height * 0.12),
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
              borderBottomColor: "#fff",
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
            Create Account
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
              ref={nameInput}
              onSubmitEditing={() => {
                emailInput.current?.focus();
              }}
              value={name}
              onChangeText={(val) => {
                setName(val);
              }}
              style={styles.textinput}
              placeholder="Name"
              placeholderTextColor={"#c7d8e6"}
              returnKeyType="next"
            />
            <TextInput
              ref={emailInput}
              onSubmitEditing={() => {
                passwordInput.current?.focus();
              }}
              value={email}
              onChangeText={(val) => {
                setEmail(val);
              }}
              style={styles.textinput}
              placeholder="E-mail address"
              placeholderTextColor={"#c7d8e6"}
              returnKeyType="next"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              keyboardType="email-address"
            />
            <TextInput
              ref={passwordInput}
              onSubmitEditing={() => {
                confirmPasswordInput.current?.focus();
              }}
              value={password}
              onChangeText={(val) => {
                setPassword(val);
              }}
              style={styles.textinput}
              placeholder="Password..."
              placeholderTextColor={"#c7d8e6"}
              returnKeyType="next"
              secureTextEntry
            />
            <TextInput
              ref={confirmPasswordInput}
              // onSubmitEditing={() => {
              //   paypalInput.current?.focus();
              // }}
              value={confirmPassword}
              onChangeText={(val) => {
                setConfirmPassword(val);
              }}
              style={styles.textinput}
              placeholder="Confirm password..."
              placeholderTextColor={"#c7d8e6"}
              returnKeyType="done"
              secureTextEntry
            />
          </KeyboardAvoidingView>
        </View>

        {/* <Form /> */}

        {/* <TextInput
          ref={paypalInput}
          value={paypal}
          onChangeText={(val) => {
            setPaypal(val);
          }}
          style={styles.textinput}
          placeholder="Paypal username: e.g. @kiwismith.."
          placeholderTextColor={"#c7d8e6"}
          returnKeyType="done"
        /> */}
        <View
          style={{
            marginBottom: s(height * 0.08),
          }}
        >
          <PaperButton
            onPress={sendRegisterDataToServer}
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
                fontFamily: "Graduate_400Regular",
              }}
            >
              Sign up
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
                  // alignSelf: "flex-end",

                  flexDirection: "row",
                  // justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: "grey",
                }}
              >
                {/* <View
                    style={{
                      backgroundColor: "rgba(0,0,0,0.2)",
                      alignItems: "center",
                      justifyContent: "center",
                      width: z(30),
                      height: z(30),
                      borderRadius: z(30),
                    }}
                  >
                    
                  </View> */}
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
                  Already have an account? Sign in
                </Text>
              </View>
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
    backgroundColor: "#36485f",
    // alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 60,
  },
  header: {
    fontSize: 24,
    color: "#fff",
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: "#199187",
    borderBottomWidth: 1,
    fontWeight: "bold",
  },
  textinput: {
    alignSelf: "stretch",
    height: s(38),
    marginBottom: s(8),
    color: "#fff",
    borderBottomColor: "#f8f8f8",
    borderBottomWidth: 1,
    fontFamily: "Playfair",
    fontSize: s(13),
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
  //   // backgroundColor: "#3b4650",
  // },
  // buttonLabel: {
  //   fontSize: 34,
  //   // backgroundColor: "green",
  //   // customLabelSize: 20,
  //   width: "90%",
  //   height: "100%",
  //   paddingVertical: 5,
  //   paddingLeft: 15,
  //   marginVertical: 0,
  //   marginHorizontal: 0,
  //   // textAlign: "left",
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

  innerText: {
    fontSize: 18,
    color: "white",
    fontFamily: "PlayfairBold",
  },
  goback: {
    alignSelf: "flex-end",
    marginTop: 20,
  },
});

// Toast.show({
//     type: "error",
//     text1: error,
//     text2: "This is an Error message ",
//     visibilityTime: 3000,
//   });
