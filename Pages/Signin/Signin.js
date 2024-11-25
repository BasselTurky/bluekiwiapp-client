import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { z, zx } from "../../utils/scaling";
import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import { useDispatch } from "react-redux";
import { Button as PaperButton } from "react-native-paper";
import { Feather, Entypo, Ionicons } from "@expo/vector-icons";

import { sendLoginDataToServer } from "../Login/utils/sendLoginDataToServer";

export default function Signin({ navigation }) {
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const passwordInput = useRef();

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
          <Text style={styles.headerText}>WELCOME</Text>
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
          <TextInput
            ref={passwordInput}
            returnKeyType="done"
            value={password}
            onChangeText={(val) => {
              setPassword(val);
            }}
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor={"#fff"}
            secureTextEntry
          />
        </KeyboardAvoidingView>

        <PaperButton
          onPress={() =>
            sendLoginDataToServer(email, password, dispatch, toast)
          }
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
            Sign in
          </Text>
        </PaperButton>

        <View
          style={{
            alignSelf: "flex-end",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
            style={{
              justifyContent: "center",

              height: z(40),
            }}
          >
            <Text
              style={{
                fontSize: z(14),
                color: "#fff",
                fontFamily: "MontserratRegular",
              }}
            >
              Forgot your password?
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={{
              width: z(50),
              height: z(50),
              justifyContent: "center",
            }}
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
  textInput: {
    backgroundColor: "#90d9dd",
    height: z(48),
    marginBottom: z(18),
    borderRadius: 20,
    paddingLeft: zx(18),
    fontFamily: "MontserratRegular",
    color: "white",
  },
  layout: {
    flex: 1,
    position: "absolute",
    right: 0,
    left: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: z(50),
  },

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
  },
  footer: {
    alignItems: "flex-start",
  },
});
