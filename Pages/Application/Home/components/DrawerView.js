// #5c5c5c
// backgroundColor: "#2b2d31",
// backgroundColor: "#36485f",
// backgroundColor: "#485e7c",
// backgroundColor: "#f5feff",
// borderLeftColor: "#191a1c",
// borderLeftColor: "#4b5f79",
// borderLeftColor: "#415877",
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons, Entypo, AntDesign, Foundation } from "@expo/vector-icons";
// import AnimatedNumbers from "react-native-animated-numbers";
// import { Entypo } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z, zx } from "../../../../utils/scaling";
import * as SecureStore from "expo-secure-store";
import { Button as PaperButton } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../../Features/auth";

import DeleteIconSVG from "../../../../Components/DeleteIconSVG";
import ProfileIconStroke from "../../../../Components/ProfileIconStroke";
import EmailIcon from "../../../../Components/EmailIcon";
import PasswordIcon from "../../../../Components/PasswordIcon";
import LogoutIcon from "../../../../Components/LogoutIcon";
import NextSVG from "../../../../Components/NextSVG";
import UpdatePasswordIcon from "../../../../Components/UpdatePasswordIcon";
import { BlurView, VibrancyView } from "@react-native-community/blur";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import CoinsStack from "../../../../Components/CoinsStack";
import KiwiCoinSVG from "../../../../Components/KiwiCoinSVG";
import SingleKiwiCoin from "../../../../Components/SingleKiwiCoin";

async function deleteValueFor(key) {
  await SecureStore.deleteItemAsync(key);
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function DrawerView() {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const userData = useSelector((state) => state.userData.value);
  const coins = useSelector((state) => state.coins.value);
  const auth = useSelector((state) => state.auth.value);

  const [showLogoutLayer, setShowLogoutLayer] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [light, setLight] = useState("night");
  const [animateToNumber, setAnimateToNumber] = React.useState(7979);

  // TODO go on every Height style make sure it uses zx() not z()
  return (
    <BlurView
      blurType="dark"
      blurAmount={30}
      // reducedTransparencyFallbackColor="white"
      overlayColor="transparent"
      style={{
        flex: 1,
        backgroundColor:
          light === "night" ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          // alignItems: "center",
          // backgroundColor: "pink",
        }}
      >
        {/* logo */}
        {/* <View
          style={{
            width: "100%",
            height: zx(180),
            paddingTop: insets.top,
            zIndex: 1,
          }}
        > */}
        {/* <View
            style={{
              width: zx(86),
              height: zx(86),
              borderRadius: zx(86),
              overflow: "hidden",
            }}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
              }}
              source={require("../../../../assets/icon.png")}
            />
          </View> */}
        {/* </View> */}

        {showChangePass ? (
          <ChangePassword setShowChangePass={setShowChangePass} light={light} />
        ) : showDeleteAccount ? (
          <DeleteAccount
            setShowDeleteAccount={setShowDeleteAccount}
            light={light}
          />
        ) : (
          <View
            style={{
              flex: 1,
              zIndex: 2,
              paddingHorizontal: z(20),
              justifyContent: "center",
            }}
          >
            {/* name */}
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                height: z(70),
                // borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: "#9c9c9c",
                // backgroundColor: "green",
                alignItems: "center",
              }}
            >
              {/* <View
                style={{
                  // flex: 1,
                  // alignItems: "center",
                  justifyContent: "center",
                  paddingRight: z(20),
                  // backgroundColor: "yellow",
                }}
              >

                <SingleKiwiCoin height={z(30)} width={z(30)} />
              </View> */}
              <View
                style={{
                  // flex: 4,
                  flexDirection: "row",
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,0.1)",
                  justifyContent: "center",
                  alignItems: "center",
                  height: zx(40),
                  borderRadius: z(6),
                  paddingHorizontal: z(10),
                  width: z(140),
                  marginLeft: z(10),
                  paddingLeft: z(20),
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    left: z(-20),
                  }}
                >
                  <SingleKiwiCoin height={z(46)} width={z(46)} />
                </View>

                <Text
                  style={{
                    fontSize: z(18),
                    color: light === "night" ? "#fff" : "#5c5c5c",
                    // fontFamily: "RobotoRegular",
                    fontWeight: "bold",
                    textAlign: "center",
                    letterSpacing: z(2),
                  }}
                >
                  {coins.toString().padStart(4, "0")}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                height: z(70),
                // borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: "#9c9c9c",
              }}
            >
              <View
                style={{
                  // flex: 1,
                  // alignItems: "center",
                  justifyContent: "center",
                  paddingRight: z(20),
                }}
              >
                {/* <ProfileIconStroke width={z(30)} height={z(30)} fill={"#000"} /> */}
                <Ionicons
                  name="person"
                  size={24}
                  color={light === "night" ? "#fff" : "#5c5c5c"}
                />
              </View>
              <View
                style={{
                  // flex: 4,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: z(16),
                    color: light === "night" ? "#fff" : "#5c5c5c",
                  }}
                  ellipsizeMode="middle"
                >
                  {userData ? userData.uid : null}
                </Text>
              </View>
            </View>
            {/* email */}
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                height: z(70),
                // borderBottomWidth: StyleSheet.hairlineWidth,
                // borderBottomColor: "#9c9c9c",
                // alignItems: "center",
                // backgroundColor: "green",
              }}
            >
              <View
                style={{
                  // flex: 1,
                  // alignItems: "center",
                  justifyContent: "center",
                  paddingRight: z(20),
                }}
              >
                <Entypo
                  name="email"
                  size={24}
                  color={light === "night" ? "#fff" : "#5c5c5c"}
                />
              </View>
              <View
                style={{
                  // flex: 4,
                  justifyContent: "center",
                }}
              >
                {/* content */}
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: z(18),
                    color: light === "night" ? "#fff" : "#5c5c5c",
                    width: z(230),
                    justifyContent: "center",
                  }}
                  ellipsizeMode="tail"
                >
                  {userData ? userData.email : null}
                </Text>
              </View>
            </View>
            {/* pass */}
            {/* {auth === "google" ? null : ( */}
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                height: z(70),
                // borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: "#9c9c9c",
              }}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      // flex: 1,
                      // alignItems: "center",
                      justifyContent: "center",
                      paddingRight: z(20),
                    }}
                  >
                    <Foundation
                      name="key"
                      size={24}
                      color={light === "night" ? "#fff" : "#5c5c5c"}
                    />

                    {/* <PasswordIcon
                    width={z(26)}
                    height={z(26)}
                    fill={light === "night" ? "#fff" : "#5c5c5c"}
                  /> */}
                  </View>

                  <View
                    style={{
                      // flex: 3,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: z(18),
                        color: light === "night" ? "#fff" : "#5c5c5c",
                      }}
                    >
                      Password
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setShowChangePass(true);
                  }}
                  style={{
                    // flex: 1,
                    // alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <UpdatePasswordIcon
                    width={z(30)}
                    height={z(30)}
                    fill={"#000"}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/*  )} */}

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                height: z(70),
                // borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: "#9c9c9c",
              }}
            >
              <View
                style={{
                  // flex: 1,
                  // alignItems: "center",
                  justifyContent: "center",
                  paddingRight: z(20),
                }}
              >
                {/* <ProfileIconStroke width={z(30)} height={z(30)} fill={"#000"} /> */}
                <AntDesign
                  name="exclamationcircleo"
                  size={24}
                  color={light === "night" ? "#fff" : "#5c5c5c"}
                />
              </View>
              <View
                style={{
                  // flex: 4,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: z(16),
                    color: light === "night" ? "#fff" : "#5c5c5c",
                  }}
                  ellipsizeMode="middle"
                >
                  About
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                height: z(70),
                // borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: "#9c9c9c",
              }}
            >
              <View
                style={{
                  // flex: 1,
                  // alignItems: "center",
                  justifyContent: "center",
                  paddingRight: z(20),
                }}
              >
                {/* <ProfileIconStroke width={z(30)} height={z(30)} fill={"#000"} /> */}

                <AntDesign
                  name="questioncircleo"
                  size={24}
                  color={light === "night" ? "#fff" : "#5c5c5c"}
                />
              </View>
              <View
                style={{
                  // flex: 4,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: z(16),
                    color: light === "night" ? "#fff" : "#5c5c5c",
                  }}
                  ellipsizeMode="middle"
                >
                  Help
                </Text>
              </View>
            </View>

            {/* logout */}
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                height: z(70),
                // borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: "#9c9c9c",
              }}
            >
              {showLogoutLayer ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                >
                  <PaperButton
                    onPress={async () => {
                      deleteValueFor("token");
                      await GoogleSignin.signOut();
                      dispatch(setAuth(false));
                    }}
                    style={[styles.buttonStyle, { backgroundColor: "#4b6382" }]}
                    contentStyle={styles.buttonContent}
                    labelStyle={styles.buttonLabel}
                    mode="contained"
                    uppercase={false}
                  >
                    <Text
                      style={{
                        fontSize: z(16),
                        // fontFamily: "PlayfairBold",
                        color: "#ffffffcc",
                      }}
                    >
                      Sign Out
                    </Text>
                  </PaperButton>
                  <PaperButton
                    onPress={() => {
                      setShowLogoutLayer(false);
                    }}
                    style={[styles.buttonStyle, { backgroundColor: "#fff" }]}
                    contentStyle={styles.buttonContent}
                    labelStyle={styles.buttonLabel}
                    mode="contained"
                    uppercase={false}
                  >
                    <Text
                      style={{
                        fontSize: z(16),
                        // fontFamily: "PlayfairBold",
                        color: "#454545",
                      }}
                    >
                      Stay
                    </Text>
                  </PaperButton>
                </View>
              ) : (
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        // flex: 1,
                        // alignItems: "center",
                        justifyContent: "center",
                        paddingRight: z(20),
                      }}
                    >
                      {/* icon */}
                      {/* <LogoutIcon width={z(28)} height={z(28)} fill={"#000"} /> */}
                      <AntDesign
                        name="logout"
                        size={24}
                        color={light === "night" ? "#fff" : "#5c5c5c"}
                      />
                    </View>
                    <View
                      style={{
                        // flex: 3,
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: z(18),
                          color: light === "night" ? "#fff" : "#5c5c5c",
                        }}
                      >
                        Sign Out
                      </Text>
                      {/* content */}
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      setShowLogoutLayer(true);
                    }}
                    style={{
                      // flex: 1,
                      // alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* <NextSVG width={z(22)} height={z(22)} fill={"#000"} /> */}
                    <Entypo name="chevron-right" size={38} color="black" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            {/* delete */}
            <TouchableOpacity
              onPress={() => {
                // display InputText, let user enter current password
                // save password in state, add handeDeleteAccount_ functuion to onPress
                setShowDeleteAccount(true);
              }}
              style={{
                position: "absolute",
                bottom: insets.bottom,
                alignSelf: "center",
                flexDirection: "row",
                paddingBottom: z(15),
                alignItems: "center",
              }}
            >
              <DeleteIconSVG width={z(20)} height={z(20)} fill={"#e34f4f"} />
              <Text
                style={{
                  // fontFamily: "PlayfairItalic",
                  fontSize: z(16),
                  color: "#e34f4f",
                  paddingHorizontal: 5,
                }}
              >
                Delete Account
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: z(120),
    height: 40,
    elevation: 5,
    alignSelf: "center",
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
