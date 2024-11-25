import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import React from "react";
import { z, zx } from "../../../../utils/scaling";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button as PaperButton } from "react-native-paper";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import { useSocket } from "../../../SocketContext/SocketContext";

export default function DeleteAccount({ setShowDeleteAccount, light }) {
  const insets = useSafeAreaInsets();
  const socket = useSocket();
  const [inputText, setInputText] = React.useState("");

  async function handleDelete() {
    if (inputText === "DELETE") {
      socket.emit("account-delete");
    }
  }
  return (
    <View
      style={{
        flex: 1,
        zIndex: 2,
        justifyContent: "center",
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
            setShowDeleteAccount(false);
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
          paddingBottom: insets.bottom,
          justifyContentL: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            zIndex: 1,
            paddingHorizontal: z(30),
            paddingTop: z(10),
          }}
        >
          <View>
            <Text
              style={{
                color: light === "night" ? "#fff" : "#5c5c5c",
                fontSize: z(18),
              }}
            >
              Deleting your account will remove all of your information from out
              database permanently . This cannot be undone.
            </Text>
            <Text
              style={{
                marginVertical: z(16),
                color: light === "night" ? "#fff" : "#5c5c5c",
                fontSize: z(16),
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
            onPress={handleDelete}
            style={styles.googleButtonStyle}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            mode="contained"
            uppercase={false}
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
    borderRadius: z(6),
    fontFamily: "RobotoRegular",
    fontSize: z(14),
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingHorizontal: z(10),
  },
  googleButtonStyle: {
    width: "100%",
    height: z(46),
    elevation: 5,
    alignSelf: "center",
    marginBottom: z(20),
    backgroundColor: "#f96070",
    borderRadius: z(6),
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
