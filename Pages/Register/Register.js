import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Toast from "react-native-toast-message";

import { Button as PaperButton } from "react-native-paper";

export default function Register({ navigation }) {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [paypal, setPaypal] = useState("");

  const nameInput = useRef();
  const lastNameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();
  const paypalInput = useRef();

  const errorToast = (message) => {
    Toast.show({
      type: "error",
      text1: message,
      text2: "Error",
      visibilityTime: 3000,
    });
  };

  const sendRegisterDataToServer = async () => {
    let regex = /^[a-zA-Z]+$/;
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      paypal === ""
    ) {
      //   console.log("Fields can't be empty!!");
      errorToast("Fields can't be empty!!");
    } else if (!regex.test(name)) {
      //   console.log("Name should include letters only");
      errorToast("Name should include letters only");
    } else if (!emailRegex.test(email)) {
      //   console.log("Please enter valid email format");
      errorToast("Please enter valid email format");
    } else if (password.length < 8 || password.length > 16) {
      //   console.log("Password should be between 8-16 characters");
      errorToast("Password should be between 8-16 characters");
    } else if (password !== confirmPassword) {
      //   console.log("Password is not matching");
      errorToast("Password is not matching");
    }
    //  else if (!emailRegex.test(paypal)) {
    //   //   console.log("Please enter valid email format");
    //   errorToast("Please enter valid email format");
    // }
    else {
      console.log("pass");
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
            paypal: paypal,
          }),
        }
      );
      let data = await response.json();
      console.log(data);

      if (data.type === "success") {
        console.log(data.message);
        Toast.show({
          type: "success",
          text1: data.message,
          text2: "Registeration Complete",
          visibilityTime: 6000,
        });

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPaypal("");
        setTimeout(() => {
          navigation.navigate("Login");
        }, 6000);

        // display succes info
      } else if (data.type === "error") {
        console.log(data.message);
        errorToast(data.message);
      } else {
        console.log("Something went wrong : backend register-data");
      }
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Registeration</Text>
        {/* <Form /> */}
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
          onSubmitEditing={() => {
            paypalInput.current?.focus();
          }}
          value={confirmPassword}
          onChangeText={(val) => {
            setConfirmPassword(val);
          }}
          style={styles.textinput}
          placeholder="Confirm password..."
          placeholderTextColor={"#c7d8e6"}
          returnKeyType="next"
          secureTextEntry
        />
        <TextInput
          ref={paypalInput}
          value={paypal}
          onChangeText={(val) => {
            setPaypal(val);
          }}
          style={styles.textinput}
          placeholder="Paypal username: e.g. @kiwismith.."
          placeholderTextColor={"#c7d8e6"}
          returnKeyType="done"
        />

        <PaperButton
          onPress={sendRegisterDataToServer}
          style={styles.buttonStyle}
          contentStyle={styles.buttonContent}
          //   labelStyle={styles.buttonLabel}
          mode="contained"
          uppercase={false}
          //   icon="account-box"
        >
          <Text style={styles.innerText}>Sign up</Text>
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
    marginBottom: 40,
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
    fontSize: 18,
    color: "white",
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
