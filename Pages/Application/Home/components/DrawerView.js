import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { z, zx } from "../../../../utils/scaling";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { Button as PaperButton } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../../Features/auth";

import GoBackSVG from "../../../../Components/GoBackSVG";
import ProfileSVG from "../../../../Components/ProfileSVG";
import DeleteIconSVG from "../../../../Components/DeleteIconSVG";
import TrashIconSVG from "../../../../Components/TrashIconSVG";
import ProfileIconStroke from "../../../../Components/ProfileIconStroke";
import EmailIcon from "../../../../Components/EmailIcon";
import PasswordIcon from "../../../../Components/PasswordIcon";
import LogoutIcon from "../../../../Components/LogoutIcon";
import NextSVG from "../../../../Components/NextSVG";
import UpdatePasswordIcon from "../../../../Components/UpdatePasswordIcon";

import ChangePassword from "./ChangePassword";

async function deleteValueFor(key) {
  await SecureStore.deleteItemAsync(key);
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function DrawerView({ Toast, errorToast }) {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const userData = useSelector((state) => state.userData.value);

  const [showLogoutLayer, setShowLogoutLayer] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#2b2d31",
        // backgroundColor: "#e2e9ee",
        // paddingBottom: insets.bottom,
        // paddingTop: insets.top,
        // alignItems: "center",
        // overflow: "hidden",
        borderLeftColor: "#191a1c",
        borderLeftWidth: 10,
      }}
    >
      {/* logo */}
      <View
        style={{
          width: "100%",
          height: zx(180),
          backgroundColor: "#1e1f22",

          //   backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: insets.top,
          borderBottomWidth: 2,
          borderBottomColor: "#191a1c",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: zx(90),
            height: zx(90),
            borderRadius: zx(24),
            backgroundColor: "#191a1c",
            // marginBottom: zx(10),
          }}
        >
          <View
            style={{
              width: zx(70),
              height: zx(70),
              borderRadius: zx(20),
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
          </View>
        </View>
      </View>

      {showChangePass ? (
        <ChangePassword
          setShowChangePass={setShowChangePass}
          Toast={Toast}
          errorToast={errorToast}
        />
      ) : (
        // <View
        //   style={{
        //     flex: 1,
        //   }}
        // >
        //   <Text>Chenge Pass</Text>
        //   <Button
        //     title="back"
        //     onPress={() => {
        //       setShowChangePass(false);
        //     }}
        //   />
        // </View>
        <View
          style={{
            flex: 1,
            //   backgroundColor: "green",
          }}
        >
          {/* name */}
          <View
            style={{
              flexDirection: "row",
              // backgroundColor: "yellow",
              width: "100%",
              height: z(70),
              // paddingHorizontal: 30,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: "#9c9c9c",
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ProfileIconStroke width={z(30)} height={z(30)} fill={"#fff"} />
            </View>
            <View
              style={{
                flex: 4,
                justifyContent: "center",
                // backgroundColor: "green",
              }}
            >
              <Text style={{ fontSize: z(18), color: "#9c9c9c" }}>
                {userData ? userData.name : null}
              </Text>
            </View>
          </View>
          {/* email */}
          <View
            style={{
              flexDirection: "row",
              // backgroundColor: "yellow",
              width: "100%",
              height: z(70),
              // paddingHorizontal: 30,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: "#9c9c9c",
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* icon */}
              <EmailIcon width={z(28)} height={z(28)} fill={"#fff"} />
            </View>
            <View
              style={{
                flex: 4,
                justifyContent: "center",
                // backgroundColor: "green",
              }}
            >
              {/* content */}
              <Text
                numberOfLines={1}
                style={{
                  // fontFamily: "Playfair",
                  fontSize: z(18),
                  color: "#9c9c9c",
                }}
              >
                {userData ? userData.email : null}
              </Text>
            </View>
          </View>
          {/* pass */}
          <View
            style={{
              flexDirection: "row",
              // backgroundColor: "yellow",
              width: "100%",
              height: z(70),
              // paddingHorizontal: 30,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: "#9c9c9c",
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PasswordIcon width={z(26)} height={z(26)} fill={"#fff"} />
              {/* icon */}
            </View>
            <View
              style={{
                flex: 3,
                // alignItems: "center",
                // flexDirection: "row",
                justifyContent: "center",

                // backgroundColor: "green",
              }}
            >
              <Text style={{ fontSize: z(18), color: "#9c9c9c" }}>
                Password
              </Text>

              {/* content */}
            </View>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate("Password");
                setShowChangePass(true);
              }}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <UpdatePasswordIcon width={z(30)} height={z(30)} fill={"#fff"} />
            </TouchableOpacity>
          </View>
          {/* logout */}
          <View
            style={{
              flexDirection: "row",
              // backgroundColor: "yellow",
              width: "100%",
              height: z(70),
              // paddingHorizontal: 30,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: "#9c9c9c",
            }}
          >
            {showLogoutLayer ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: "100%",
                  //   backgroundColor: "green",
                }}
              >
                <PaperButton
                  onPress={() => {
                    deleteValueFor("token");
                    dispatch(setAuth(false));
                  }}
                  style={[styles.buttonStyle, { backgroundColor: "#4b6382" }]}
                  contentStyle={styles.buttonContent}
                  labelStyle={styles.buttonLabel}
                  // color="green"
                  mode="contained"
                  uppercase={false}
                >
                  <Text
                    style={{
                      fontSize: z(16),
                      fontFamily: "PlayfairBold",
                      color: "#ffffffcc",
                    }}
                  >
                    Log out
                  </Text>
                </PaperButton>
                <PaperButton
                  onPress={() => {
                    setShowLogoutLayer(false);
                  }}
                  style={[styles.buttonStyle, { backgroundColor: "#fff" }]}
                  contentStyle={styles.buttonContent}
                  labelStyle={styles.buttonLabel}
                  // color="green"
                  mode="contained"
                  uppercase={false}
                >
                  <Text
                    style={{
                      fontSize: z(16),
                      fontFamily: "PlayfairBold",
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
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* icon */}
                  <LogoutIcon width={z(28)} height={z(28)} fill={"#fff"} />
                </View>
                <View
                  style={{
                    flex: 3,
                    justifyContent: "center",
                    // backgroundColor: "green",
                  }}
                >
                  <Text style={{ fontSize: z(18), color: "#9c9c9c" }}>
                    Logout
                  </Text>
                  {/* content */}
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setShowLogoutLayer(true);
                  }}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <NextSVG width={z(22)} height={z(22)} fill={"#fff"} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          {/* delete */}
          <TouchableOpacity
            //   disabled={isDisabled}
            onPress={() => {
              // if (!deleteAccountModal) {
              //   setShowLayer(true);
              //   setIsDisabled(true);
              //   toggleMenu(-300 - height * 0.5);
              // }
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
                fontFamily: "PlayfairItalic",
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

      {/* {showLogoutLayer ? (
        <View
          style={[
            // StyleSheet.absoluteFill,
            {
              position: "absolute",
              // height: height,
              width: width,
              top: 0,
              bottom: 0,
              backgroundColor: "transparent",
              // backgroundColor: "grey",
              zIndex: 100,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <View
            style={{
              // height: 220,
              width: width * 0.8,
              borderRadius: 10,
              backgroundColor: "#fff",
              padding: z(24),
            }}
          >
            <Text
              style={{
                marginBottom: z(20),
                fontSize: z(20),
                fontWeight: "500",
              }}
            >
              Log Out?
            </Text>
            <Text
              style={{
                marginBottom: z(20),
                fontSize: z(16),
                fontWeight: "400",
              }}
            >
              Are you sure want to log out?
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <PaperButton
                onPress={() => {
                  deleteValueFor("token");
                  dispatch(setAuth(false));
                }}
                style={[styles.buttonStyle, { backgroundColor: "#4b6382" }]}
                contentStyle={styles.buttonContent}
                labelStyle={styles.buttonLabel}
                // color="green"
                mode="contained"
                uppercase={false}
              >
                <Text
                  style={{
                    fontSize: z(16),
                    fontFamily: "PlayfairBold",
                    color: "#ffffffcc",
                  }}
                >
                  Log out
                </Text>
              </PaperButton>
              <PaperButton
                onPress={() => {
                  setShowLogoutLayer(false);
                }}
                style={[styles.buttonStyle, { backgroundColor: "#fff" }]}
                contentStyle={styles.buttonContent}
                labelStyle={styles.buttonLabel}
                // color="green"
                mode="contained"
                uppercase={false}
              >
                <Text
                  style={{
                    fontSize: z(16),
                    fontFamily: "PlayfairBold",
                    color: "#454545",
                  }}
                >
                  Cancel
                </Text>
              </PaperButton>
            </View>
          </View>
        </View>
      ) : null} */}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: z(120),
    height: 40,
    elevation: 5,
    alignSelf: "center",
    // marginBottom: z(15),
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
