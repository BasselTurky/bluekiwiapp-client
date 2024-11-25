import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button as PaperButton } from "react-native-paper";
import { z } from "../../../utils/scaling";
import GoogleColoredIcon from "../../../Components/GoogleColoredIcon";

export default function GoogleSignInButton({ handleGoogleSignIn }) {
  return (
    <PaperButton
      onPress={handleGoogleSignIn}
      style={styles.googleButtonStyle}
      contentStyle={styles.buttonContent}
      labelStyle={styles.buttonLabel}
      mode="contained"
      uppercase={false}
      icon={() => <GoogleColoredIcon width={z(26)} height={z(26)} />}
    >
      <Text
        style={{
          fontSize: z(17),
          color: "#7f7f7f",
          fontFamily: "MontserratRegular",
        }}
      >
        Connect with Google
      </Text>
    </PaperButton>
  );
}

const styles = StyleSheet.create({
  googleButtonStyle: {
    width: "100%",
    height: z(55),
    elevation: 5,
    alignSelf: "center",
    marginBottom: z(25),
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
});
