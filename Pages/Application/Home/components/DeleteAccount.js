import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  TextInput,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { z, zx } from "../../../../utils/scaling";
import GoBackSVG from "../../../../Components/GoBackSVG";
import * as SecureStore from "expo-secure-store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button as PaperButton } from "react-native-paper";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import { useSocket } from "../../../SocketContext/SocketContext";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function DeleteAccount({ setShowDeleteAccount, light }) {
  const insets = useSafeAreaInsets();
  const socket = useSocket();
  const [inputText, setInputText] = React.useState("");
  const auth = useSelector((state) => state.auth.value);

  async function handleDelete() {
    if (inputText === "DELETE") {
      //   socket.emit("account-delete");
      socket.emit("account-delete");
      // if (auth === "default") {
      //   // let currentToken = await SecureStore.getItemAsync("token");
      //   // // console.log("default");
      //   // if (currentToken) {
      //   //   socket.emit("account-delete", currentToken);
      //   //   // console.log("default 2");
      //   // }
      // } else if (auth === "google") {
      //   const clientId =
      //     "525928726797-45m49p0kdbcspgsicp72cl6d67fcabk0.apps.googleusercontent.com";
      //   const clientId__ =
      //     "525928726797-ij7d64fhsoaer3i9l8b62h52da3iqqpn.apps.googleusercontent.com";
      //   const clientId_ =
      //     "109153830656-tafdv45ti0dc8c2vs895gl9tlub28r0h.apps.googleusercontent.com";
      //   const tokens = await GoogleSignin.getTokens();
      //   console.log(
      //     "🚀 ~ file: DeleteAccount.js:40 ~ handleDelete ~ tokens:",
      //     tokens.idToken
      //   );
      //   const currentUser = await GoogleSignin.getCurrentUser();

      //   // save currentUser in redux
      //   // console.log("google");

      //   // socket.emit(
      //   //   "account-delete",
      //   //   currentUser.user.id,
      //   //   currentUser.user.email,
      //   //   currentUser.user.givenName
      //   // );
      //   // console.log("checked googleUser");
      // }
    }
  }
  return (
    <View
      style={{
        flex: 1,
        zIndex: 2,
        justifyContent: "center",
        // backgroundColor: "pink",
        // alignItems: "center",
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
          //   backgroundColor: "#2b2d31",
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
            setShowDeleteAccount(false);
          }}
        >
          {/* <GoBackSVG fill={"#fff"} width={zx(15)} height={zx(15)} /> */}
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
              fontSize: z(22),
              color: light === "night" ? "#fff" : "#5c5c5c",
              fontFamily: "RobotoMedium",
            }}
          >
            Delete Account
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          //   flexDirection: "column-reverse",
          paddingBottom: insets.bottom,
          justifyContentL: "center",
          alignItems: "center",
          // backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            flex: 1,
            // position: "absolute",
            // top: 0,
            // bottom: 0,
            width: "100%",
            // right: 0,
            // left: 0,
            alignItems: "center",
            zIndex: 1,
            paddingHorizontal: z(30),
            paddingTop: z(10),
            // backgroundColor: "yellow",
          }}
        >
          <View>
            <Text
              style={{
                color: light === "night" ? "#fff" : "#5c5c5c",
                fontSize: z(18),
                // marginHorizontal: z(30),
              }}
            >
              Deleting your account will remove all of your information from out
              database permanently . This cannot be undone.
            </Text>
            <Text
              style={{
                marginVertical: z(16),
                // color: "rgba(0,0,0,0.4)",
                color: light === "night" ? "#fff" : "#5c5c5c",
                fontSize: z(16),
                // marginHorizontal: z(30),
              }}
            >
              To confirm this, type "DELETE"
            </Text>
          </View>
          <KeyboardAvoidingView
            behavior="padding"
            enabled={true}
            keyboardVerticalOffset={z(100)}
            style={{
              width: "100%",
            }}
          >
            <TextInput
              //   ref={confirmPasswordInput}
              value={inputText}
              onChangeText={(val) => {
                setInputText(val);
              }}
              style={styles.textinput}
              placeholder="Enter"
              placeholderTextColor={light === "night" ? "#9c9c9c" : "#fff"}
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={handleDelete}
            />
          </KeyboardAvoidingView>

          <PaperButton
            onPress={
              // async () => {
              // const currentUser = await GoogleSignin.getCurrentUser();
              // console.log(currentUser);

              handleDelete
              // }
            }
            style={styles.googleButtonStyle}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            mode="contained"
            uppercase={false}
            // icon={() => <GoogleColoredIcon width={z(24)} height={z(24)} />}
          >
            <Text
              style={{
                fontSize: z(18),
                color: "#fff",
                fontFamily: "RobotoMedium",
              }}
            >
              Delete Account
            </Text>
          </PaperButton>
          {/* <PaperButton
            // onPress={handleSubmit}
            style={styles.buttonStyle}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            mode="contained"
            uppercase={false}
          >
            <Text
              style={{
                fontSize: z(18),
                fontFamily: "PlayfairBold",
                color: "#ffffffcc",
              }}
            >
              Submit
            </Text>
          </PaperButton> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textinput: {
    alignSelf: "stretch",
    height: z(46),
    marginBottom: z(24),
    color: "#000",
    borderBottomColor: "#f8f8f8",
    // borderBottomWidth: 1,
    borderRadius: z(6),
    fontFamily: "RobotoRegular",
    fontSize: z(14),
    // marginHorizontal: z(30),
    // color: "#fff",
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingHorizontal: z(10),
  },
  googleButtonStyle: {
    width: "100%",
    height: z(46),
    elevation: 5,
    alignSelf: "center",
    marginBottom: z(20),
    // backgroundColor: "#59cbbd",
    backgroundColor: "#f96070",
    // backgroundColor: "#ff6175",
    borderRadius: z(6),
    // marginHorizontal: z(30),
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
