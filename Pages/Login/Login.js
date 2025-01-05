// "android": {
// "googleServicesFile": "./google-services.json",

import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Button as PaperButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useToast } from "react-native-toast-notifications";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { googleSignIn } from "./utils/googleSignIn";

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

import { s, z } from "../../utils/scaling";

import GoogleSignInButton from "./components/GoogleSignInButton";

import Fontisto from "@expo/vector-icons/Fontisto";
import { logErrorOnServer } from "../../utils/logErrorFunction";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export default function Login({ navigation }) {
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const dispatch = useDispatch();

  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    // clientId:
    //   "109153830656-0u2bb0c7o9dcppqots1i4nn9tq56unok.apps.googleusercontent.com",
    androidClientId:
      "109153830656-1isvohatbn30rmbtd7q5tdbgib6j6unb.apps.googleusercontent.com",
    // webClientId:
    //   "109153830656-0u2bb0c7o9dcppqots1i4nn9tq56unok.apps.googleusercontent.com",
    // androidClientId:
    //   "109153830656-hge71eln0qk4a8m59o3rns68f2to1pjt.apps.googleusercontent.com",
    // redirectUri: "https://auth.expo.io/@bluekiwi/bluekiwi",
    redirectUri: "com.basselturky.bluekiwiapp:/oauthredirect",
    // redirectUri: makeRedirectUri({
    //   native: "com.basselturky.bluekiwiapp.auth://",
    // }),
  });
  //"com.basselturky.bluekiwiapp:/oauthredirect"
  useEffect(() => {
    if (hasLoggedIn && response?.type === "success") {
      const { id_token } = response.params;
      // logErrorOnServer(`ID Token: ${id_token}`);
      console.log("ID Token:", id_token);
      googleSignIn(dispatch, toast, id_token);
    } else if (hasLoggedIn && response?.type === "error") {
      // logErrorOnServer(`Auth Error: ${response.error}`);
      console.error("Auth Error:", response.error);
    } else if (hasLoggedIn) {
      // logErrorOnServer(`Error auth session`);
      console.error("Error auth session");
    }
  }, [response, hasLoggedIn]);

  const handleLoginPress = async () => {
    setHasLoggedIn(true);
    await promptAsync();
  };

  // const handleGoogleSignIn = () => {
  //   googleSignIn(dispatch, toast);
  // };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View
        style={{
          flex: 1,
          minHeight: "100%",
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          zIndex: 10,
        }}
      >
        <View
          style={{
            position: "absolute",
            right: 0,
            left: 0,
            borderBottomColor: "#199187",
            alignItems: "center",
            paddingTop: z(height * 0.065) + insets.top,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: z(90),
              height: z(90),
              borderRadius: z(30),
              elevation: 8,
              overflow: "hidden",
              marginBottom: z(5),
            }}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
              }}
              source={require("../../assets/icon.png")}
            />
          </View>

          <Text
            style={{
              fontSize: z(28),
              color: "#fff",
              fontFamily: "CroissantOne",
              textShadowColor: "#9ac8ec",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              textAlign: "center",
            }}
          >
            Blue Kiwiz
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            marginHorizontal: z(50),
            marginBottom: z(40),
          }}
        >
          <PaperButton
            onPress={() => navigation.navigate("Signin")}
            // onPress={() => handleLogin(email, password)}
            style={styles.buttonStyle}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            mode="contained"
            uppercase={false}
            icon={() => <Fontisto name="email" size={z(27)} color="white" />}
          >
            <Text
              style={{
                fontSize: z(17),
                color: "white",
                fontFamily: "MontserratRegular",
                width: "100%",
              }}
            >
              Sign in with Email
            </Text>
          </PaperButton>

          <GoogleSignInButton handleGoogleSignIn={handleLoginPress} />

          <PaperButton
            mode="outlined"
            onPress={() => navigation.navigate("Register")}
            style={{
              width: "100%",
              height: z(55),
              elevation: 5,
              alignSelf: "center",
              marginBottom: z(25),
              borderRadius: z(6),
              borderColor: "#fff",
            }}
            contentStyle={{
              padding: 0,
              margin: 0,
              height: "100%",
              width: "100%",
            }}
            labelStyle={{
              padding: 0,
              margin: 0,
            }}
            uppercase={false}
          >
            <Text
              style={{
                fontSize: z(17),
                color: "white",
                fontFamily: "MontserratRegular",
              }}
            >
              Sign up
            </Text>
          </PaperButton>
        </View>
      </View>
    </TouchableWithoutFeedback>

    // <View
    //   style={{
    //     flex: 1,

    //     padding: 16,
    //     backgroundColor: "yellow",
    //     // justifyContent: "center",
    //     // alignItems: "center",
    //   }}
    // >
    //   {/* Add TextInput fields here */}
    //   <KeyboardAvoidingView
    //     style={{ height: 300 }}
    //     // behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   >
    //     <View
    //       style={{
    //         backgroundColor: "pink",
    //         flex: 1,
    //         justifyContent: "center",
    //       }}
    //     >
    //       <TextInput
    //         placeholder="Email"
    //         style={{
    //           height: 50,
    //           borderColor: "gray",
    //           borderWidth: 1,
    //           marginBottom: 20,
    //           padding: 10,
    //         }}
    //       />
    //       <TextInput
    //         placeholder="Password"
    //         style={{
    //           height: 50,
    //           borderColor: "gray",
    //           borderWidth: 1,
    //           marginBottom: 20,
    //           padding: 10,
    //         }}
    //       />
    //     </View>
    //   </KeyboardAvoidingView>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 60,
    minHeight: "100%",
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
    height: z(46),
    marginBottom: z(20),
    color: "#000",
    borderBottomColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderRadius: z(6),
    fontFamily: "RobotoRegular",
    fontSize: z(14),
    backgroundColor: "#eaeaec",
    paddingHorizontal: z(10),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#fff", // Customize the line color
  },

  buttonStyle: {
    width: "100%",
    height: z(55),
    elevation: 5,
    marginBottom: z(25),
    backgroundColor: "#84c4ff",
    borderRadius: z(6),
  },
  googleButtonStyle: {
    width: "100%",
    height: z(46),
    elevation: 5,
    alignSelf: "center",
    marginBottom: z(20),
    backgroundColor: "#fff",
    borderRadius: z(6),
  },
  buttonContent: {
    padding: 0,
    margin: 0,
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
  },
  buttonLabel: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
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
    backgroundColor: "transparent",
    borderRadius: 15,
    paddingTop: 30,
  },
  input: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    elevation: 5,
    width: "100%",
  },

  verifyButtonStyle: {
    marginTop: 20,
    margin: 20,
  },
  verifyButtonContent: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#59cbbd",
  },

  modal_close_button: {
    alignSelf: "flex-start",
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

  m_buttonStyle: {
    width: z(100),
    height: z(36),
    elevation: 5,
    alignSelf: "center",
    marginBottom: z(13),
  },
  m_buttonContent: {
    padding: 0,
    margin: 0,
    height: "100%",
    width: "100%",
  },
  m_buttonLabel: {
    padding: 0,
    margin: 0,
    width: "100%",
  },
});
