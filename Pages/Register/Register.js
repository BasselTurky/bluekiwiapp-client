import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useToast } from "react-native-toast-notifications";
import { Button as PaperButton } from "react-native-paper";
import { z, zx } from "../../utils/scaling";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, Entypo, Ionicons } from "@expo/vector-icons";
import { sendSignupDataToServer } from "./utils/sendSignupDataToServer";

export default function Register({ navigation }) {
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const firstnameInput = useRef();
  const lastnameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();

  const handleSignup = () => {
    sendSignupDataToServer(
      toast,
      navigation,
      setFirstname,
      setLastname,
      setEmail,
      setPassword,
      setConfirmPassword,
      {
        firstname,
        lastname,
        email,
        password,
      }
    );
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
          paddingHorizontal: zx(50),
          minHeight: "100%",
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>CREATE ACCOUNT</Text>
        </View>

        <TextInput
          style={styles.textInput}
          ref={firstnameInput}
          onSubmitEditing={() => {
            lastnameInput.current?.focus();
          }}
          value={firstname}
          onChangeText={(val) => {
            setFirstname(val);
          }}
          placeholder="Firstname"
          placeholderTextColor={"#fff"}
          returnKeyType="next"
        />
        <TextInput
          style={styles.textInput}
          ref={lastnameInput}
          onSubmitEditing={() => {
            emailInput.current?.focus();
          }}
          value={lastname}
          onChangeText={(val) => {
            setLastname(val);
          }}
          placeholder="Lastname"
          placeholderTextColor={"#fff"}
          returnKeyType="next"
        />

        <TextInput
          style={styles.textInput}
          ref={emailInput}
          onSubmitEditing={() => {
            passwordInput.current?.focus();
          }}
          value={email}
          onChangeText={(val) => {
            setEmail(val);
          }}
          placeholder="Email"
          placeholderTextColor={"#fff"}
          returnKeyType="next"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.textInput}
          ref={passwordInput}
          onSubmitEditing={() => {
            confirmPasswordInput.current?.focus();
          }}
          value={password}
          onChangeText={(val) => {
            setPassword(val);
          }}
          placeholder="Password"
          placeholderTextColor={"#fff"}
          returnKeyType="next"
          secureTextEntry
        />

        <TextInput
          style={styles.textInput}
          ref={confirmPasswordInput}
          value={confirmPassword}
          onChangeText={(val) => {
            setConfirmPassword(val);
          }}
          placeholder="Confirm password"
          placeholderTextColor={"#fff"}
          returnKeyType="done"
          secureTextEntry
        />

        <View
          style={
            {
              // marginBottom: s(height * 0.08),
              // flex: 1,
            }
          }
        >
          <PaperButton
            onPress={handleSignup}
            style={styles.buttonStyle}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            mode="contained"
            uppercase={false}
            //   icon="account-box"
          >
            <Text style={styles.btnText}>Sign up</Text>
          </PaperButton>

          <View style={styles.footer}>
            <TouchableOpacity
              style={{
                width: z(50),
                height: z(50),
                // backgroundColor: "pink",
                justifyContent: "center",
              }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Entypo name="chevron-left" size={z(40)} color="white" />
            </TouchableOpacity>
          </View>

          {/* <View
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
          </View> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#36485f",
    justifyContent: "center",
    paddingHorizontal: 60,
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
  textInputView: {},
  textInput: {
    backgroundColor: "#90d9dd",
    height: z(48),
    marginBottom: z(18),
    borderRadius: 20,
    paddingLeft: zx(18),
    fontFamily: "MontserratRegular",
    color: "white",
  },
  footer: {
    marginTop: z(40),
    alignItems: "flex-start",
  },

  buttonStyle: {
    width: "100%",
    height: z(55),
    elevation: 5,
    marginTop: z(20),
    marginBottom: z(15),
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
  btnText: {
    fontSize: z(17),
    color: "white",
    fontFamily: "MontserratRegular",
    width: "100%",
  },
});
