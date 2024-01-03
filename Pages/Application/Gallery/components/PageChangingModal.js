import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalVisible } from "../../../../Features/modalVisible";
import { z, zx } from "../../../../utils/scaling";
import { Button as PaperButton } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { setUrlData } from "../../../../Features/urlData";
import { setIsLoading } from "../../../../Features/isLoading";
import { setIsWebViewReady } from "../../../../Features/isWebViewReady";
import { useToast } from "react-native-toast-notifications";

export default function PageChangingModal() {
  // const [modalVisible, setModalVisible] = React.useState(true);

  const dispatch = useDispatch();
  const modalVisible = useSelector((state) => state.modalVisible.value);
  const pages = useSelector((state) => state.pages.value);
  const lastSearchInput = useSelector((state) => state.lastSearchInput.value);

  const [pageNumberInput, setPageNumberInput] = React.useState("");

  function handleSubmit() {
    // store input value
    // use it to change DataUrl
    if (
      Number(pageNumberInput) <= Number(pages.total) &&
      Number(pageNumberInput) >= 1 &&
      Number(pageNumberInput) !== Number(pages.current)
    ) {
      Keyboard.dismiss();
      dispatch(setIsLoading(true));
      dispatch(setIsWebViewReady(true));

      dispatch(
        setUrlData({
          input: lastSearchInput.input,
          page: Number(pageNumberInput),
          portrait: lastSearchInput.portrait,
        })
      );
      setPageNumberInput("");
      // setUrlText("");

      // setIsLoading(true);

      dispatch(setModalVisible(false));
    }
  }
  return (
    // <View
    //   style={{
    //     zIndex: 20,
    //     ...StyleSheet.absoluteFillObject,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     // backgroundColor: "green",
    //   }}
    // >
    <Modal
      style={
        {
          // backgroundColor: "rgba(0,0,0,1)",
        }
      }
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      statusBarTranslucent={true}
      onRequestClose={() => {
        //   Alert.alert('Modal has been closed.');
        // console.log("triggered");
        dispatch(setModalVisible(false));
      }}
    >
      <Pressable
        style={styles.centeredView}
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <KeyboardAvoidingView
          behavior="position"
          enabled={true}
          keyboardVerticalOffset={z(40)}
          style={
            {
              // width: "100%",
            }
          }
        >
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{
                position: "absolute",
                right: z(10),
                top: z(10),
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "#f2f2f2",
                // paddingHorizontal: z(8),
                // paddingVertical: z(5),
                // borderRadius: z(8),
                width: z(40),
                height: z(40),
                // elevation: 2,
              }}
              onPress={() => dispatch(setModalVisible(false))}
            >
              {/* <FontAwesome name="close" size={z(27)} color="black" /> */}
              <Ionicons name="close" size={z(29)} color="black" />
              {/* <AntDesign name="closecircleo" size={26} color="black" /> */}
            </TouchableOpacity>
            <Text style={styles.modalText}>Jump to Page:</Text>
            <View
              style={{
                // flexDirection: "row",
                // flex: 1,
                // backgroundColor: "#f2f2f2",
                // marginRight: z(20),
                // borderRadius: z(20),
                // overflow: "hidden",
                // paddingHorizontal: z(5),
                // elevation: 1,
                zIndex: 2,
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
                // backgroundColor: "yellow",

                // height: "auto",
                // width: z(250),
                // paddingLeft: z(20),
                //   paddingRight: insets.right,
                //   paddingLeft: insets.left,
              }}
            >
              <TextInput
                // ref={pageNumberInputRef}
                returnKeyType="done"
                keyboardType="number-pad"
                numberOfLines={1}
                style={{
                  // flex: 1,
                  height: z(46),
                  color: "#454545",
                  // fontFamily: "Graduate_400Regular",
                  fontSize: z(16),
                  paddingHorizontal: z(10),
                  // borderBottomColor: "grey",
                  // borderBottomWidth: 1,
                  marginHorizontal: z(5),
                  textAlign: "center",
                  // paddingHorizontal: z(10),
                  // minWidth: "70%",
                  backgroundColor: "#f2f2f2",
                  width: "100%",
                  marginBottom: zx(10),
                  borderRadius: z(10),
                }}
                placeholder="Enter page number.."
                value={pageNumberInput}
                onChangeText={(val) => {
                  setPageNumberInput(val);
                }}
                placeholderTextColor={"#404040cc"}
                onSubmitEditing={handleSubmit}
              />
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
                    fontSize: z(16),
                    color: "white",
                    fontFamily: "RobotoMedium",
                    width: "100%",
                  }}
                >
                  Go
                </Text>
              </PaperButton>
              {/* <Text
                style={{
                  backgroundColor: "yellow",
                  fontSize: z(18),
                }}
              >
                / 2000
              </Text> */}
            </View>

            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => dispatch(setModalVisible(false))}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable> */}
          </View>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
    // </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    // backgroundColor: "green",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: z(20),
    paddingVertical: zx(26),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: z(300),
    height: zx(200),
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: z(18),
    textAlign: "center",
    marginTop: z(16),
    fontSize: z(18),
    fontWeight: "bold",
  },
  buttonStyle: {
    // width: z(50),
    width: "100%",
    height: zx(46),
    elevation: 5,
    alignSelf: "center",
    // marginBottom: z(20),
    // backgroundColor: "#59cbbd",
    backgroundColor: "#84c4ff",
    borderRadius: z(10),
  },
  googleButtonStyle: {
    width: "100%",
    height: z(46),
    elevation: 5,
    alignSelf: "center",
    marginBottom: z(20),
    // backgroundColor: "#59cbbd",
    backgroundColor: "#fff",
    // backgroundColor: "#ff6175",
    borderRadius: z(6),
  },
  buttonContent: {
    padding: 0,
    margin: 0,
    height: "100%",
    width: "100%",

    // backgroundColor: "pink",
  },
  buttonLabel: {
    padding: 0,
    margin: 0,
    // width: "100%",
    // backgroundColor: "green",
  },
});
