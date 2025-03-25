//<uses-permission android:name="com.google.android.gms.permission.AD_ID"/>
import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Keyboard,
  Button,
} from "react-native";
import { z } from "../../../utils/scaling";
import React, { useState, useEffect } from "react";
import ErrorView from "../../Error/ErrorView";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DrawerLayout } from "react-native-gesture-handler";
import DrawerView from "./components/DrawerView";
import { Button as PaperButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { useToast } from "react-native-toast-notifications";
import MyNoteIcon from "../../../Components/MyNoteIcon";

import ApiButton from "./components/ApiButton";
const height = Dimensions.get("window").height;

export default React.memo(function HomeView({ navigation }) {
  console.log("HomeView");
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const drawerRef = React.useRef();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.value);

  async function sendmail() {
    try {
      const response = await fetch(`${global.server_address}/auth/sendmail`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "basselturky101@gmail.com",
          host: "smtp-relay.brevo.com",
          port: 587,
          user: "80fd60001@smtp-brevo.com",
          pass: "zg6cvGXkMpjs195P",
        }),
      });

      if (response.ok) {
        console.log("response is Ok");
      } else {
        console.log("response is not ok!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  try {
    return (
      <DrawerLayout
        ref={drawerRef}
        onDrawerStateChanged={(state) => {
          if (state === "Dragging") {
            Keyboard.dismiss();
          } else if (state === "Settling") {
            Keyboard.dismiss();
          }
        }}
        onDrawerSlide={(position) => {
          if (position === 0) {
            Keyboard.dismiss();
          }
        }}
        overlayColor="rgba(0,0,0,0.1)"
        drawerWidth={z(320)}
        drawerPosition="left"
        drawerType="front"
        keyboardDismissMode="on-drag"
        renderNavigationView={() => {
          return <DrawerView />;
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: z(80) + insets.bottom,
          }}
        >
          <View
            style={{
              width: "100%",
              position: "absolute",
              top:
                height * 0.04 < 24
                  ? insets.top + height * 0.02
                  : insets.top + height * 0.04,
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                elevation: 5,
                borderRadius: 50,
                marginRight: 17,
                width: 40,
                height: 40,
                borderRadius: 50,
                backgroundColor: "#83c4ff",

                overflow: "hidden",
              }}
              onPress={() => {
                drawerRef.current.openDrawer();
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 22,
                  }}
                >
                  {userData ? userData.firstname.charAt(0).toUpperCase() : "B"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* <View style={[styles.row]}> */}
          {/* <ApiButton
              navigation={navigation}
              api={"wallpaper_api"}
              apiText={"Wallpapers"}
              navigationPage={"WallpaperApi"}
              requiredCoins={0}
            >
              <Image
                source={require("../../../assets/frame26.png")}
                resizeMode="contain"
                style={{
                  width: "90%",
                }}
              />
            </ApiButton> */}
          {/* <PaperButton
              onPress={() =>
                // sendLoginDataToServer(email, password, dispatch, toast)
                console.log("pressed")
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
            </PaperButton> */}
          {/* <TouchableOpacity
              onPress={() => {
                console.log("press");
              }}
            >
              <View style={styles.halfCircle}>
                <Text style={styles.buttonText}>Click Me</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.log("press");
              }}
            >
              <View style={styles.halfCircleDown}>
                <Text style={styles.buttonText}>Click Me</Text>
              </View>
            </TouchableOpacity> */}
          <View
            style={{
              flexDirection: "column",
              gap: 3,
            }}
          >
            <PaperButton
              // icon={({ size, color }) => (
              //   <View
              //     style={{
              //       height: z(100),
              //       zIndex: 4,
              //       alignItems: "center",
              //       justifyContent: "center",
              //       width: "100%",
              //     }}
              //   >
              //     <Image
              //       source={require("../../../assets/frame26.png")}
              //       resizeMode="contain"
              //       style={{
              //         width: "90%",
              //       }}
              //     />
              //   </View>
              // )}
              style={{
                width: 200, // Adjust the width as needed
                height: 100, // Half of the width to create a half-circle
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                borderTopLeftRadius: 100,
                borderTopRightRadius: 100,
                justifyContent: "center", // Center the text vertically
                alignItems: "center",
                // marginBottom: 1,
              }}
              labelStyle={{
                fontFamily: "MontserratSemiBold",
                letterSpacing: 1,
                color: "white",
                fontSize: 16,
              }}
              contentStyle={{
                width: 200, // Adjust the width as needed
                height: 100, // Half of the width to create a half-circle
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                borderTopLeftRadius: 100,
                borderTopRightRadius: 100,
                justifyContent: "center", // Center the text vertically
                alignItems: "center",
              }}
              mode="elevated"
              buttonColor="#4f5980"
              onPress={() => {
                console.log("pressed");
                navigation.navigate("WallpaperApi");
              }}
            >
              Wallpapers
            </PaperButton>
            <PaperButton
              // icon={({ size, color }) => (
              //   <View
              //     style={{
              //       height: z(100),
              //       zIndex: 4,
              //       alignItems: "center",
              //       justifyContent: "center",
              //       width: "100%",
              //     }}
              //   >
              //     <Image
              //       source={require("../../../assets/frame26.png")}
              //       resizeMode="contain"
              //       style={{
              //         width: "90%",
              //       }}
              //     />
              //   </View>
              // )}
              style={{
                width: 200, // Adjust the width as needed
                height: 100, // Half of the width to create a half-circle
                borderBottomLeftRadius: 100,
                borderBottomRightRadius: 100,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                justifyContent: "center", // Center the text vertically
                alignItems: "center",
              }}
              labelStyle={{
                fontFamily: "MontserratSemiBold",
                letterSpacing: 1,
                color: "white",
                fontSize: 16,
              }}
              contentStyle={{
                width: 200, // Adjust the width as needed
                height: 100, // Half of the width to create a half-circle
                borderBottomLeftRadius: 100,
                borderBottomRightRadius: 100,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                justifyContent: "center", // Center the text vertically
                alignItems: "center",
              }}
              mode="elevated"
              buttonColor="#4f5980"
              onPress={() => {
                console.log("pressed");
                navigation.navigate("Giveaways");
              }}
            >
              Giveaways
            </PaperButton>
          </View>

          {/* <Button
              title="ADS"
              onPress={() => {
                navigation.navigate("AdsView");
              }}
            />
            <Button title="Sendmail" onPress={sendmail} /> */}
          {/* </View> */}

          {/* <View
            style={[
              {
                marginTop: 20,
              },
              styles.row,
            ]}
          > */}
          {/* <ApiButton
              navigation={navigation}
              api={"archive_api"}
              apiText={"Archive"}
              navigationPage={"ArchiveApiPage"}
              requiredCoins={5}
            >
              <Image
                source={require("../../../assets/Archive2.png")}
                resizeMode="contain"
                style={{
                  width: "70%",
                }}
              />
            </ApiButton> */}

          {/* <ApiButton
              navigation={navigation}
              api={"giveaways"}
              apiText={"Giveaways"}
              navigationPage={"Giveaways"}
              requiredCoins={5}
            >
              <MyNoteIcon width={z(42)} height={z(42)} fill={"white"} />
            </ApiButton> */}
          {/* </View> */}
        </View>
      </DrawerLayout>
    );
  } catch (error) {
    console.log("ErrorID: E022: ", error);
    return <ErrorView Error={"ErrorID: E022"} />;
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: z(80),

    // opacity: 1,
    // backgroundColor: "#fff3e8",
  },
  profileIcon: {
    borderRadius: 50,
    elevation: 5,
  },
  score: {
    width: 80,
    height: 30,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderWidth: 2,
    borderColor: "#36485f",

    borderRadius: 10,

    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 10,
  },
  scoreText: {
    fontFamily: "Righteous_400Regular",
    fontSize: 16,
    color: "#36485f",
  },

  kiwiCoin: {},
  plusIcon: {},
  watchButton: {
    marginTop: 10,
    flexDirection: "row",
    width: 160,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#8fbdff",
    paddingHorizontal: 5,
    elevation: 5,
    zIndex: 5,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
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
  halfCircle: {
    width: 100, // Adjust the width as needed
    height: 50, // Half of the width to create a half-circle
    backgroundColor: "blue", // Button color
    borderBottomLeftRadius: 50, // Radius to create the half-circle
    borderBottomRightRadius: 50, // Radius to create the half-circle
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    justifyContent: "center", // Center the text vertically
    alignItems: "center", // Center the text horizontally
  },
  buttonText: {
    color: "white", // Text color
    fontSize: 16, // Text size
  },
  halfCircleDown: {
    width: 100, // Adjust the width as needed
    height: 50, // Half of the width to create a half-circle
    backgroundColor: "blue", // Button color
    borderTopLeftRadius: 50, // Radius to create the half-circle
    borderTopRightRadius: 50, // Radius to create the half-circle
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    justifyContent: "center", // Center the text vertically
    alignItems: "center", // Center the text horizontally
  },
});
