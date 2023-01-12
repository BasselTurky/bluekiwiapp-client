import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { Button as PaperButton } from "react-native-paper";

export default function ForgotPassword({ navigation }) {
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
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Restore Password</Text>
        <View>
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
        </View>
        <Text style={{ color: "#c3dae3", fontWeight: "bold" }}>
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
          <Text style={styles.innerText}>Submit</Text>
        </PaperButton>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <View style={styles.goback}>
            <Text style={{ color: "#c4c4c4" }}>Back to Login page</Text>
          </View>
        </TouchableOpacity>
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
    marginTop: 20,
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
