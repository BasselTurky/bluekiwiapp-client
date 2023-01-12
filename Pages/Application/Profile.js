import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
  ActivityIndicator,
  Animated,
  Easing,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { Button as PaperButton } from "react-native-paper";
import Modal from "react-native-modal";
import Moment from "react-moment";
import LinearGradient from "react-native-linear-gradient";

import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../Features/auth";
import { setUserData } from "../../Features/userData";
import { setCoins } from "../../Features/coins";
import { setDeleteAccountModal } from "../../Features/deleteAccountModal";

import GoBackSVG from "../../Components/GoBackSVG";
import EditIconSVG from "../../Components/EditIconSVG";
import ModalCloseIconSVG from "../../Components/ModalCloseIconSVG";
import ProfileSVG from "../../Components/ProfileSVG";
import DeleteIconSVG from "../../Components/DeleteIconSVG";
import TrashIconSVG from "../../Components/TrashIconSVG";

import MaskCircle from "./components/MaskCircle";

async function deleteValueFor(key) {
  await SecureStore.deleteItemAsync(key);
}

const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const viewHeight = height * 0.7;
const item_height = height * 0.7;

const xInt = -(width * 0.9);
const yInt = -(height * 0.55);

export default function Profile({ navigation }) {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.value);
  const coins = useSelector((state) => state.coins.value);
  const deleteAccountModal = useSelector(
    (state) => state.deleteAccountModal.value
  );

  const [displayTimer, setDisplayTimer] = useState(false);
  const [showLayer, setShowLayer] = useState(false);

  const [isModalVisable, setIsModalVisable] = useState(true);
  const [otpEmail, setOtpEmail] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [modal_content_state, set_modal_content_state] = useState("content");
  const [passwordInput, setPasswordInput] = useState("");

  const [isDisabled, setIsDisabled] = useState(false);

  const errorToast = (message) => {
    Toast.show({
      type: "error",
      text1: message,
      text2: "Error",
      visibilityTime: 3000,
    });
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) =>
      setKeyboardHeight(e.endCoordinates.height)
    );
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardHeight(0)
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const animateMenuX = React.useRef(new Animated.Value(xInt)).current;
  const animateMenuY = React.useRef(new Animated.Value(0)).current;

  function toggleMenu(value) {
    Animated.timing(animateMenuY, {
      // toValue: { x: 0, y: yInt },
      toValue: value,
      // toValue: deleteAccountModal ? xInt : 0,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.out(Easing.sin),
    }).start(({ finished }) => {
      if (finished) {
        setIsDisabled(false);
        console.log(deleteAccountModal);
      }
    });
  }

  async function handleDeleteAccount() {
    let currentToken = await SecureStore.getItemAsync("token");
    const response = await fetch(
      `${global.server_address}/auth/account-delete-request`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: currentToken,
          password: passwordInput,
        }),
      }
    );

    const data = await response.json();
    if (data.type === "wrong-device" || data.type === "success") {
      // if worng device - logout, clear token

      //> respond success > logout, clear token
      deleteValueFor("token");
      dispatch(setAuth(false));
    } else if (data.type === "incorrect") {
      // if worng password - toast worng password - rate limit 3 tries
      errorToast(data.message);
    } else if (data.type === "error") {
      // if error - toast error
      errorToast(data.message);
    }

    // show modal
    // enter password
    // save password in state
    // if state not empty, send POST request
    // includes: password and token
    // On server side:
    // check device
    // if pass > compare password
    // if pass > delete from database
  }

  // useEffect(() => {
  //   // if(deleteAccountModal){
  //   // open
  //   toggleMenu();
  //   // }else{
  //   //close
  //   // }
  // }, [deleteAccountModal, animateMenuX]);

  return (
    <SafeAreaProvider>
      <AnimatedImageBackground
        source={require("../../assets/profilePage3.png")}
        resizeMode="cover"
        style={styles.container}
      >
        {/* <Moment
                to={Math.floor(userData.next_transaction_date)}
                element={Text}
                onChange={() => {
                  if (Math.floor(userData.next_transaction_date) < Date.now()) {
                    setDisplayTimer(false);
                  }
                }}
                
              ></Moment> */}
        <View
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }}
          onLayout={(event) => {
            var { x, y, width, height } = event.nativeEvent.layout;

            console.log(x, y, width, height);
          }}
        >
          <TouchableOpacity
            style={{
              zIndex: 2,
              position: "absolute",
              top: insets.top + 10,
              left: 17,
              width: 40,
              height: 40,
              backgroundColor: "rgba(0,0,0,0.3)",
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "flex-start",
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <GoBackSVG fill={"#fff"} width={15} height={15} />
          </TouchableOpacity>
          {/* <View
        style={{
          flex: 1,
          // backgroundColor: "grey",
          width: "100%",
          alignItems: "center",
          paddingTop: 42,
        }}
      > */}
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: height * 0.04,
              // marginTop: 30,
            }}
          >
            <Image
              source={require("../../assets/splashProfile4.png")}
              res
              style={{
                width: width / 4,
                height: width / 4,
                borderRadius: 400,
                borderWidth: 2,
                borderColor: "white",
              }}
            />
            <View
              style={{
                position: "absolute",
              }}
            >
              <ProfileSVG width={36} height={36} fill={"white"} />
            </View>
          </View>

          <Text
            numberOfLines={1}
            style={{
              maxWidth: width * 0.6,
              fontFamily: "Playfair",
              fontSize: 20,
              color: "white",
              paddingTop: 10,
            }}
          >
            {userData.name ? userData.name : null}
          </Text>

          <View
            style={{
              // marginTop: width * 0,
              position: "absolute",
              top: height * 0.5,
              // backgroundColor: "pink",
              maxWidth: width * 0.7,
              minWidth: width * 0.7,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                fontFamily: "Playfair",
                fontSize: 22,
                color: "#404040",
              }}
            >
              {userData.email ? userData.email : null}
            </Text>

            <View
              style={{
                // position: "absolute",
                // top: 150,
                paddingTop: 10,
                flexDirection: "row",
                // backgroundColor: "pink",
                alignItems: "center",
                justifyContent: "space-between",
                // alignSelf: "center",
              }}
            >
              <Text style={[styles.title, {}]}>Password:</Text>
              <View
                style={{
                  // flex: 2,
                  flexDirection: "row",
                  alignItems: "center",
                  // justifyContent: "flex-end",
                  // paddingHorizontal: 5,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ChangePassword");
                  }}
                >
                  <EditIconSVG fill={"#404040"} />
                  <Text style={{ fontSize: 10, color: "#404040" }}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                deleteValueFor("token");
                dispatch(setAuth(false));
              }}
              style={{
                paddingTop: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: "Playfair",
                  fontSize: 20,
                  color: "darkred",
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            // onPress={() => {
            //   //delete here
            //   // call api
            //   // wait for response
            //   // logout
            //   // deleteValueFor("token");
            //   // dispatch(setAuth(false));
            // }}
            disabled={isDisabled}
            onPress={() => {
              if (!deleteAccountModal) {
                // dispatch(setDeleteAccountModal(true));
                setShowLayer(true);
                setIsDisabled(true);
                toggleMenu(-300 - height * 0.5);
                // closeMenu();
              }
            }}
            style={{
              position: "absolute",
              bottom: insets.bottom,

              flexDirection: "row",
              paddingBottom: 15,
            }}
          >
            <DeleteIconSVG width={20} height={20} fill={"#e34f4f"} />
            <Text
              style={{
                fontFamily: "PlayfairItalic",
                fontSize: 16,
                color: "#e34f4f",
                paddingHorizontal: 5,
              }}
            >
              Delete Account
            </Text>
          </TouchableOpacity>

          {showLayer ? (
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss();
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                  zIndex: 10,
                  // backgroundColor: "grey",
                }}
              ></View>
            </TouchableWithoutFeedback>
          ) : null}

          <Animated.View
            style={[
              {
                position: "absolute",
                width: width * 0.8,
                // height: height * 0.44,
                // minHeight: 160,

                // left: 0,
                // top: 0.5 * height - 0.5 * (height * 0.54),
                borderRadius: 10,
                zIndex: 12,
                transform: [
                  {
                    translateY: animateMenuY,
                  },
                ],
                alignSelf: "center",
                // alignItems: "center",
                bottom: -300,
                elevation: 5,

                // borderStartWidth: 4,
                // borderEndWidth: 4,
                // borderTopWidth: 9,
              },
            ]}
          >
            <View
              style={{
                position: "absolute",
                zIndex: 2,
                alignSelf: "center",
                top: -29,
                backgroundColor: "#f53649",
                justifyContent: "center",
                alignItems: "center",
                width: 58,
                height: 58,
                borderRadius: 50,
              }}
            >
              <TrashIconSVG width={38} height={38} fill={"#fff"} />
            </View>

            <View
              style={{
                flex: 1,
                backgroundColor: "#fff",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: 6,
                  backgroundColor: "#f53649",
                }}
              ></View>

              <View
                style={{
                  alignItems: "center",
                  marginTop: 30,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "PlayfairBold",
                    color: "#454545",
                  }}
                >
                  Delete Account?
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "Playfair",
                  fontSize: 14,
                  color: "#454545",
                  paddingTop: 10,
                  paddingHorizontal: 15,
                }}
              >
                You are about to delete your account permanently.
              </Text>

              <TextInput
                value={passwordInput}
                onChangeText={(val) => {
                  setPasswordInput(val);
                }}
                style={styles.textinput}
                placeholder="Enter current password.."
                placeholderTextColor={"#404040cc"}
                secureTextEntry
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <PaperButton
                  onPress={() => {
                    Keyboard.dismiss();
                    setShowLayer(false);
                    toggleMenu(0);
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
                      fontSize: 16,
                      fontFamily: "PlayfairBold",
                      color: "#454545",
                    }}
                  >
                    Cancel
                  </Text>
                </PaperButton>
                <PaperButton
                  onPress={handleDeleteAccount}
                  style={[styles.buttonStyle, { backgroundColor: "#f53649" }]}
                  contentStyle={styles.buttonContent}
                  labelStyle={styles.buttonLabel}
                  // color="green"
                  mode="contained"
                  uppercase={false}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "PlayfairBold",
                      color: "#ffffffcc",
                    }}
                  >
                    Delete
                  </Text>
                </PaperButton>
              </View>
            </View>

            {/* <Text style={styles.tips}>Coins are bind to the account</Text> */}
          </Animated.View>

          {/* </View> */}

          {/* <Modal
            style={[styles.modal_content]}
            // avoidKeyboard={true}
            isVisible={isModalVisable}
            backdropOpacity={0}
            onBackButtonPress={() => {
              setIsModalVisable(false);
            }}
            onBackdropPress={() => {
              Keyboard.dismiss();
            }}
            onModalHide={() => {
              setOtpEmail("");
            }}
          >
            {modal_content_state === "loading" ? (
              <ActivityIndicator size="large" color="skyblue" />
            ) : modal_content_state === "content" ? (
              <TouchableWithoutFeedback
                onPress={() => {
                  Keyboard.dismiss();
                }}
              >
                <View style={styles.modal_view}>
                  <Text style={styles.modal_text}>
                    Verification code is sent to email, code expires in 10
                    minutes
                  </Text>

                  {otpEmail ? <Text>{otpEmail}</Text> : null}

                  <TextInput
                    style={styles.input}
                    returnKeyType="done"
                    placeholder="Enter 6-digits code.."
                    value={otpInput}
                    onChangeText={(val) => {
                      setOtpInput(val);
                    }}
                  />

                  <PaperButton
                    // onPress={handleVerification}
                    style={styles.verifyButtonStyle}
                    contentStyle={styles.verifyButtonContent}
                    //   labelStyle={styles.buttonLabel}
                    mode="contained"
                    uppercase={false}
                    //   icon="account-box"
                  >
                    <Text style={styles.innerText}>Verify</Text>
                  </PaperButton>

                  <TouchableOpacity
                    onPress={() => {
                      setIsModalVisable(false);
                    }}
                    style={styles.modal_close_button}
                  >
                    
                    <ModalCloseIconSVG
                      fill={"#1A3442"}
                      width={26}
                      height={26}
                    />
               
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            ) : modal_content_state === "verified" ? (
              <Text>Verified</Text>
            ) : null}
          </Modal> */}
        </View>

        <Toast
          topOffset={20}
          onPress={() => {
            Toast.hide();
          }}
        />
      </AnimatedImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffcb76",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  header: {
    fontSize: 24,
    fontFamily: "Righteous_400Regular",
    color: "#fff",
    paddingBottom: 10,
    marginBottom: 80,
    borderBottomColor: "#199187",
    borderBottomWidth: 1,
    // fontWeight: "bold",
    position: "absolute",
    zIndex: 2,
    top: 45,
    left: 65,
  },
  goBack: {
    // zIndex: 2,
    position: "absolute",
    top: 45,
    left: 17,
    // padding: 9,
    backgroundColor: "grey",
    borderRadius: 100,
  },
  content: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    // marginTop: 120,
  },
  row: {
    flexDirection: "row",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    alignItems: "center",
    padding: 10,
    top: 120,
    height: 60,
    marginHorizontal: 10,
  },
  title: {
    // flex: 1,
    fontSize: 18,
    fontFamily: "Playfair",
    color: "#404040",
  },
  info: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  buttonStyle: {
    // marginTop: 10,
    width: 120,
    height: 40,

    elevation: 5,
    // top: 120,
    alignSelf: "center",

    marginBottom: 15,
  },
  buttonContent: {
    // alignItems: "center",
    // justifyContent: "center",
    // paddingVertical: 3,
    // paddingHorizontal: 10,
    // borderRadius: 4,
    // elevation: 3,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: "#454545",
    padding: 0,
    margin: 0,
    height: "100%",
    width: "100%",
    // backgroundColor: "grey",
    // backgroundColor: "#3b4650",
  },
  buttonLabel: {
    padding: 0,
    margin: 0,
  },

  // modal style

  innerText: {
    fontSize: 18,
    color: "white",
  },
  input: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 10,
    marginRight: 0,
    paddingHorizontal: 8,
    paddingVertical: 6,
    // borderBottomWidth: 1,
    // borderBottomColor: "black",
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    elevation: 5,
    width: "55%",
    // borderTopLeftRadius: 30,
    // borderBottomLeftRadius: 30,
  },
  verifyButtonStyle: {
    marginTop: 20,
    // width: "80%",
    // alignSelf: "center",
    margin: 20,
  },
  verifyButtonContent: {
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 3,
    // paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#59cbbd",
    // backgroundColor: "#3b4650",
  },

  modal_close_button: {
    alignSelf: "flex-start",
    // backgroundColor: "grey",
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
  modal_content: {
    // flex: 1,
    // position: "absolute",
    // top: 0,
    // height: "40%",
    // width: "100%",
    // height: "40%",

    backgroundColor: "transparent",
    borderRadius: 15,
    // justifyContent: "center",
    // alignItems: "center",
    paddingTop: 30,
  },
  textinput: {
    // alignSelf: "stretch",
    height: 60,
    marginBottom: 15,
    color: "#fff",
    borderBottomColor: "#f8f8f8cc",
    borderBottomWidth: 1,
    // padding: 10,
    // top: 120,
    marginHorizontal: 15,
    fontSize: 16,
    fontFamily: "Playfair",
    // width: "100%",
  },
  tips: {
    fontSize: 18,
    color: "white",
    fontFamily: "Righteous_400Regular",
    paddingHorizontal: 15,
    paddingTop: height * 0.03,
  },
});

{
  /* <View style={styles.container}> */
}

{
  /* <MaskCircle r={30} y={80} /> */
}
{
  /* <LinearGradient
        locations={[0.1, 1]}
        colors={[
          "rgba(255,255,255,0.1)",
          "rgba(255,255,255,1)",
          // "rgba(255,255,255,0.9)",
          // "rgba(255,255,255,0.5)",
        ]}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        }}
      ></LinearGradient> */
}

{
  /* <View
        style={{
          position: "absolute",
          top: 50,
        }}
      >
      
      </View> */
}

{
  /* <Text style={styles.header}>Profile</Text> */
}

{
  /* <View
        style={
          {
            // position: "absolute",
            // top: 100,
          }
        }
      >
     
      </View> */
}

{
  /* <View style={styles.content}> */
}
{
  /* <View style={styles.row}>
          <Text style={styles.title}>Name</Text>
          <View style={styles.info}>
            <Text
              style={{ fontFamily: "Playfair", fontSize: 17, color: "white" }}
            >
              {userData.name ? userData.name : null}
            </Text>
          </View>
        </View> */
}

{
  /* <View style={styles.row}>
          <Text style={styles.title}>Email</Text>
          <View style={styles.info}>
            <Text
              style={{ fontFamily: "Playfair", fontSize: 17, color: "white" }}
            >
              {userData.email ? userData.email : null}
            </Text>
          </View>
        </View> */
}

{
  /* <View style={styles.row}>
          <Text style={styles.title}>PayPal</Text>
          <View style={styles.info}>
            <Text style={{ fontFamily: "Playfair", fontSize: 17 }}>
              {userData.paypal ? userData.paypal : null}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ChangePaypal");
              }}
            >
              <EditIconSVG />
              <Text style={{ fontSize: 10 }}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View> */
}

{
  /* <View style={styles.row}>
          <Text style={styles.title}>Password</Text>
          <View
            style={{
              flex: 2,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ChangePassword");
              }}
            >
              <EditIconSVG />
              <Text style={{ fontSize: 10, color: "white" }}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View> */
}

{
  /* <View style={styles.row}>
          <Text style={styles.title}>Coins</Text>
          {displayTimer ? (
            <View style={styles.info}>
              <Text style={{ fontFamily: "Playfair", fontSize: 20 }}>
                Timer
              </Text>
              <Moment
                to={Math.floor(userData.next_transaction_date)}
                element={Text}
                onChange={() => {
                  if (Math.floor(userData.next_transaction_date) < Date.now()) {
                    setDisplayTimer(false);
                  }
                }}
              ></Moment>
            </View>
          ) : (
            <View style={styles.info}>
              <Text style={{ fontFamily: "Playfair", fontSize: 20 }}>
                {coins}
              </Text>
              <View
                style={{
                  alignSelf: "flex-end",
                }}
              >
                <PaperButton
                  onPress={() => {
                    setIsModalVisable(true);
                  }}
                  style={styles.buttonStyle}
                  contentStyle={styles.buttonContent}
                  labelStyle={styles.buttonLabel}
                  // color="green"
                  mode="contained"
                  uppercase={false}
                >
                  <Text
                    style={{ fontSize: 14, fontFamily: "Righteous_400Regular" }}
                  >
                    Collect
                  </Text>
                </PaperButton>
              </View>
            </View>
          )}
        </View> */
}

{
  /* <View
          style={{
            flexDirection: "row",
            // borderBottomColor: "white",
            // borderBottomWidth: 1,
            alignItems: "center",
            padding: 10,
            top: 120,
            height: 60,
            marginHorizontal: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              deleteValueFor("token");
              dispatch(setAuth(false));
            }}
          >
            <Text
              style={{
                fontFamily: "PlayfairItalic",
                fontSize: 20,
                color: "darkred",
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View> */
}

{
  /* <View
          style={{
            flexDirection: "row",
            // borderBottomColor: "white",
            // borderBottomWidth: 1,
            alignItems: "center",
            padding: 10,
            top: 360,
            height: 60,
            marginHorizontal: 10,
          }}
        >
  
        </View> */
}

{
  /* Modal ------------------------------------------------ */
}

{
  /* <Modal
          style={[styles.modal_content]}
          // avoidKeyboard={true}
          isVisible={isModalVisable}
          backdropOpacity={0.2}
          onBackButtonPress={() => {
            setIsModalVisable(false);
          }}
          onBackdropPress={() => {
            Keyboard.dismiss();
          }}
          onModalHide={() => {
            // setOtpEmail("");
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <View style={styles.modal_view}>
              <View style={{ paddingTop: 20 }}>
                <Text style={styles.modal_text}>
                  This process can be done once every 48 hours.
                </Text>
                <Text style={styles.modal_text}>
                  Make sure your PayPal username is correct.
                </Text>
                <Text style={styles.modal_text}>
                  More details will be sent to: {userData.email}
                </Text>
              </View>

              <PaperButton
                onPress={handleCollect}
                style={styles.verifyButtonStyle}
                contentStyle={styles.verifyButtonContent}
                //   labelStyle={styles.buttonLabel}
                mode="contained"
                uppercase={false}
                //   icon="account-box"
              >
                <Text style={styles.innerText}>Confirm</Text>
              </PaperButton>

              <TouchableOpacity
                onPress={() => {
                  setIsModalVisable(false);
                }}
                style={styles.modal_close_button}
              >
              
                <ModalCloseIconSVG fill={"#1A3442"} width={26} height={26} />
               
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </Modal> */
}

{
  /* Modal ------------------------------------------------ */
}

{
  /* </View> */
}

// Important -------------------------------------------------------------

// async function handleCollect() {
//   try {
//     let current_device_id = await SecureStore.getItemAsync("device_id");
//     if (current_device_id) {
//       let response = await fetch(
//         `${global.server_address}/api/process-collect`,
//         {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: userData.email,
//             current_device_id,
//             paypal: userData.paypal,
//             coins,
//             time: Date.now(),
//           }),
//         }
//       );

//       let data = await response.json();

//       if (data.type === "wrong-device") {
//         deleteValueFor("token");
//         dispatch(setAuth(false));
//       } else if (data.type === "coins-error") {
//         errorToast(data.message);
//         // update userData
//         dispatch(setUserData(data.userInfo));
//         dispatch(setCoins(data.userInfo.coins));
//       } else if (data.type === "error") {
//         errorToast(data.message);
//       } else if (data.type === "success") {
//         // update userData
//         Toast.show({
//           type: "success",
//           text1: data.message,
//           //   text2: "Success",
//           visibilityTime: 3000,
//         });

//         dispatch(setUserData(data.userInfo));
//         dispatch(setCoins(data.userInfo.coins));
//         setIsModalVisable(false);
//       } else {
//         errorToast("Something went wrong");
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     errorToast("Something went wrong");
//   }
// }

// useEffect(() => {
//   if (userData.next_transaction_date > Date.now()) {
//     setDisplayTimer(true);
//   }
// }, [userData]);

// Important -------------------------------------------------------------
