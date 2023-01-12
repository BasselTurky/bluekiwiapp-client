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
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Toast from "react-native-toast-message";
import { Button as PaperButton } from "react-native-paper";

import * as SecureStore from "expo-secure-store";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { setAuth } from "../../Features/auth";
import moment from "moment";

import Modal from "react-native-modal";

import { useHeaderHeight } from "@react-navigation/elements";

import ModalCloseIconSVG from "../../Components/ModalCloseIconSVG";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalVisable, setIsModalVisable] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [modal_content_state, set_modal_content_state] = useState("content");

  const passwordInput = useRef();

  const headerHeight = useHeaderHeight();

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
          errorToast(data.message + "t");
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

          setIsModalVisable(true);

          return;
        } else {
          errorToast("Something went wrong");
          return;
        }
      } catch (error) {
        console.log(error);
        errorToast("Couldn't reach the server");
        return;
      }
    }
  };

  async function handleVerification() {
    // start loading
    set_modal_content_state("loading");

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
        errorToast(data.message + "x");
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
        errorToast("Szomething went wrong!!!");
        return;
      }
    } catch (error) {
      console.log(error);
      errorToast("Couldn't reach the server");
      return;
    }
  }

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
            minHeight: isModalVisable
              ? Dimensions.get("window").height
              : "100%",
          },
        ]}
      >
        <Text style={styles.header}>Logo | Blue Kiwi</Text>
        <View>
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
        </View>
        <View>
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
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPassword")}
          style={{
            alignSelf: "flex-end",
            marginBottom: 38,
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 13, color: "#c4c4c4" }}>
            Forgot your password?
          </Text>
        </TouchableOpacity>

        <PaperButton
          onPress={sendLoginDataToServer}
          style={styles.buttonStyle}
          contentStyle={styles.buttonContent}
          //   labelStyle={styles.buttonLabel}
          mode="contained"
          uppercase={false}
          //   icon="account-box"
        >
          <Text style={styles.innerText}>Login</Text>
        </PaperButton>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
          style={{
            alignSelf: "flex-end",
            marginTop: 30,
          }}
        >
          <Text
            style={{
              color: "#c4c4c4",
              //   alignSelf: "flex-end",
              //   marginTop: 30,
              //   backgroundColor: "white",
            }}
          >
            Don't have account? Register here!
          </Text>
        </TouchableOpacity>

        {/* <VerificationLayer /> */}
        <Modal
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
              <View style={styles.modal_view}>
                <Text style={styles.modal_text}>
                  Verification code is sent to email, code expires in 10 minutes
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
                  {/* <View > */}
                  <ModalCloseIconSVG fill={"#1A3442"} width={26} height={26} />
                  {/* </View> */}
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          ) : modal_content_state === "verified" ? (
            <Text>Verified</Text>
          ) : null}
        </Modal>
        <Toast
          topOffset={20}
          onPress={() => {
            Toast.hide();
          }}
        />
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
    marginBottom: 80,
    borderBottomColor: "#199187",
    borderBottomWidth: 1,
    fontWeight: "bold",
  },
  textinput: {
    alignSelf: "stretch",
    height: 40,
    marginBottom: 30,
    color: "#fff",
    borderBottomColor: "#f8f8f8",
    borderBottomWidth: 1,
  },

  buttonStyle: {
    marginTop: 10,
  },
  buttonContent: {
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 3,
    // paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#59cbbd",
    // backgroundColor: "#3b4650",
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
});
