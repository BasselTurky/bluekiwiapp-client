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
} from "react-native";

import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { Button as PaperButton } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";

import GoBackSVG from "../../Components/GoBackSVG";

import { setAuth } from "../../Features/auth";
import { setUserData } from "../../Features/userData";

async function deleteValueFor(key) {
  await SecureStore.deleteItemAsync(key);
}

var height = Dimensions.get("window").height;

export default function ChangePaypal({ navigation }) {
  const dispatch = useDispatch();
  const [paypal, setPaypal] = useState("");
  const [password, setPassword] = useState("");

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
      if (paypal === "" || password === "") {
        errorToast("Fields can't be empty");
      } else if (password.length < 8 || password.length > 16) {
        errorToast("Password should be between 8-16 characters");
      } else {
        let current_device_id = await SecureStore.getItemAsync("device_id");

        if (current_device_id) {
          let response = await fetch(
            `${global.server_address}/auth/update-paypal`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: userData.email,
                current_device_id,
                paypal,
                password,
              }),
            }
          );

          let data = await response.json();

          if (data.type === "wrong-device") {
            deleteValueFor("token");
            dispatch(setAuth(false));
          } else if (data.type === "wrong-password" || data.type === "error") {
            errorToast(data.message);
            setPaypal("");
            setPassword("");
          } else if (data.type === "success") {
            // errorToast(data.message)
            Toast.show({
              type: "success",
              text1: data.message,
              //   text2: "Success",
              visibilityTime: 3000,
            });
            setPaypal("");
            setPassword("");
            dispatch(setUserData(data.userData));
          } else {
            errorToast("Something went wrong");
          }
        }
      }
    } catch (error) {
      console.log(error);
      errorToast("Something went wrong");
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ImageBackground
        source={require("../../assets/HomeBackground.png")}
        resizeMode="cover"
        style={[styles.container, { height: height }]}
      >
        <Text style={styles.header}>Update PayPal</Text>
        <TouchableOpacity
          style={styles.goBack}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <GoBackSVG fill={"#fff"} width={24} height={24} />
        </TouchableOpacity>

        <View style={styles.content}>
          <TextInput
            value={paypal}
            onChangeText={(val) => {
              setPaypal(val);
            }}
            style={styles.textinput}
            placeholder="Enter your new PayPal username.."
            placeholderTextColor={"#c7d8e6"}
            maxLength={200}

            //   secureTextEntry
          />
          <TextInput
            value={password}
            onChangeText={(val) => {
              setPassword(val);
            }}
            style={styles.textinput}
            placeholder="Enter your current password.."
            placeholderTextColor={"#c7d8e6"}
            secureTextEntry
          />

          <PaperButton
            onPress={handleSubmit}
            style={styles.buttonStyle}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            // color="green"
            mode="contained"
            uppercase={false}
          >
            <Text style={{ fontSize: 18, fontFamily: "PlayfairBold" }}>
              Submit
            </Text>
          </PaperButton>
        </View>
        <Toast
          topOffset={20}
          onPress={() => {
            Toast.hide();
          }}
        />
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffcb76",
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
    // zIndex: 1,
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
    marginHorizontal: 30,
  },
  textinput: {
    alignSelf: "stretch",
    height: 60,
    marginBottom: 30,
    color: "#fff",
    borderBottomColor: "#f8f8f8",
    borderBottomWidth: 1,
    padding: 10,
    top: 120,
    marginHorizontal: 30,
    fontSize: 16,
    fontFamily: "Playfair",
  },

  buttonStyle: {
    // marginTop: 10,
    width: 200,
    height: 45,
    backgroundColor: "#59cbbd",
    elevation: 3,
    top: 120,
    alignSelf: "center",
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
  },
});
