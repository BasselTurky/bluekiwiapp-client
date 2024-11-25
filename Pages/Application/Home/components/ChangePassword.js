import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { Button as PaperButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { z, zx } from "../../../../utils/scaling";
import { setAuth } from "../../../../Features/auth";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";

async function deleteValueFor(key) {
  await SecureStore.deleteItemAsync(key);
}

export default function ChangePassword({ setShowChangePass, light }) {
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordInput = React.useRef();
  const confirmPasswordInput = React.useRef();

  async function handleSubmit() {
    try {
      if (
        currentPassword === "" ||
        newPassword === "" ||
        confirmPassword === ""
      ) {
        toast.show("Fields can't be empty", { type: "error" });
      } else if (newPassword !== confirmPassword) {
        toast.show("Password is not matching", { type: "error" });
      } else if (
        currentPassword.length < 8 ||
        currentPassword.length > 16 ||
        newPassword.length < 8 ||
        newPassword.length > 16
      ) {
        toast.show("Password should be between 8-16 characters", {
          type: "error",
        });
      } else {
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
          toast.show(data.message, { type: "error" });
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        } else if (data.type === "success") {
          toast.show(data.message, {
            type: "success",
          });
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        } else {
          toast.show("ErrorID: E030", { type: "error" });
        }
        // }
      }
    } catch (error) {
      console.log("ErrorID: E029: ", error);
      toast.show("ErrorID: E029", { type: "error" });
    }
  }

  return (
    <View
      style={{
        flex: 1,
        zIndex: 2,
        marginTop: insets.top,
      }}
    >
      <View
        style={{
          width: "100%",
          paddingVertical: z(10),
          paddingHorizontal: 17,
          flexDirection: "row",
          zIndex: 2,
        }}
      >
        <TouchableOpacity
          style={{
            width: zx(40),
            height: zx(40),
            backgroundColor: "rgba(0,0,0,0.1)",
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setShowChangePass(false);
          }}
        >
          <Entypo name="chevron-left" size={30} color="black" />
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
              color: light === "night" ? "#fff" : "#5c5c5c",
            }}
          >
            Change Password
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
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
            alignItems: "center",
            zIndex: 1,
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
              placeholderTextColor={light === "night" ? "#fff" : "#9c9c9c"}
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
              placeholderTextColor={light === "night" ? "#fff" : "#9c9c9c"}
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
              placeholderTextColor={light === "night" ? "#fff" : "#9c9c9c"}
              secureTextEntry
              returnKeyType="done"
            />
          </KeyboardAvoidingView>

          <PaperButton
            onPress={handleSubmit}
            style={styles.buttonStyle}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            mode="contained"
            uppercase={false}
          >
            <Text
              style={{
                fontSize: z(18),
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
    height: zx(60),
    marginBottom: z(10),
    color: "#fff",
    borderBottomColor: "#f8f8f8cc",
    borderBottomWidth: 1,
    marginHorizontal: z(30),
    fontSize: z(15),
  },
  buttonStyle: {
    width: z(200),
    height: z(45),
    backgroundColor: "#4b6382",
    elevation: 3,
    alignSelf: "center",
    marginTop: z(35),
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
});
