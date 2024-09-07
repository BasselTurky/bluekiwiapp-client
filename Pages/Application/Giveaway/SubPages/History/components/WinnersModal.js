import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsVisible } from "../state/modalState";
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import CloseThinSVG from "../../../../../../Components/CloseThinSVG";
import { Button as PaperButton } from "react-native-paper";

import { z, zx } from "../../../../../../utils/scaling";
export default function WinnersModal() {
  const modalState = useSelector((state) => state.modalState.value);
  const dispatch = useDispatch();
  const testArray = [
    { userId: "Test Id" },
    { userId: "Test Id" },
    { userId: "Test Id" },
    { userId: "Test Id" },
    { userId: "Test Id" },
    { userId: "Test Id" },
    { userId: "Test Id" },
    { userId: "Test Id" },
    { userId: "Test Id" },
    { userId: "Test Id" },
    { userId: "Test Id" },
    { userId: "Test Id" },
    { userId: "Test Id" },
    { userId: "Test Id" },
    { userId: "Test Id" },
    { userId: "Test Id" },
    { userId: "Test Id" },
    { userId: "Test Id" },
    { userId: "Test Id" },
    { userId: "Test Id" },
    { userId: "Test Id" },
    { userId: "Test Id" },
    { userId: "Test Id" },
    { userId: "Test Id" },
  ];
  return (
    <>
      {modalState.isVisible ? (
        // <TouchableWithoutFeedback>
        //   <View style={styles.overlay}>
        //     <TouchableWithoutFeedback>
        <View style={styles.overlay}>
          <View style={styles.tableContainer}>
            <View style={styles.header}>
              <View style={styles.headerCell}>
                <Text style={styles.title}>Winners</Text>
              </View>
              {/* <View style={[styles.headerCell, { alignItems: "flex-end" }]}>
                    <AntDesign name="close" size={24} color="black" />
                  </View> */}
            </View>
            <FlatList
              data={modalState.content}
              //   data={testArray}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => (
                <View style={styles.winnerCard}>
                  <Text style={styles.text}>{item.userId}</Text>
                </View>
              )}
              style={styles.flatlist}
              nestedScrollEnabled={true}
              ListFooterComponent={() => {
                return (
                  <View
                    style={{
                      width: "100%",
                      height: 20,
                    }}
                  ></View>
                );
              }}
            />
            <View
              style={{
                width: "100%",

                // backgroundColor: "pink",
                alignItems: "center",
              }}
            >
              <PaperButton
                icon={({ size, color }) => (
                  <CloseThinSVG width={12} height={12} fill="black" />
                  // <EvilIcons name="close" size={21} color="black" />
                )}
                labelStyle={styles.btnText}
                contentStyle={{
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                style={{
                  marginVertical: 20,
                  width: zx(120),
                }}
                mode="elevated"
                buttonColor="white"
                //   buttonColor="#84c4ff"
                onPress={() => {
                  dispatch(setIsVisible(false));
                }}
              >
                Close
              </PaperButton>
            </View>
          </View>
        </View>
      ) : //       {/* <Button
      //         title="close"
      //         onPress={() => {
      //           dispatch(setIsVisible(false));
      //         }}
      //       /> */}
      //     {/* </TouchableWithoutFeedback>
      //   </View>
      // </TouchableWithoutFeedback> */}
      null}
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,

    // backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginHorizontal: 15,
    marginTop: 10,
  },
  winnerCard: {
    backgroundColor: "#fff9f4",
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,

    elevation: 5,
  },
  text: {
    fontFamily: "MontserratRegular",
    color: "#735e4d",
  },
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    // paddingHorizontal: zx(30),
    // paddingVertical: z(30),
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  tableContainer: {
    flex: 1,
    backgroundColor: "#fff9f4",
    // zIndex: 2,
    // elevation: 5,
    // backgroundColor: "yellow",
    width: "100%",
    // backgroundColor: "#fff9f4",
    // marginHorizontal: 15,
    // margin: 10,
    elevation: 5,
    borderRadius: 3,
    overflow: "hidden",
  },
  header: {
    height: z(60),
    flexDirection: "row",
  },
  headerCell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ebdece",
  },
  flatlist: {
    flex: 1,
    paddingHorizontal: 10,
    // backgroundColor: "pink",
  },
  btnText: {
    fontFamily: "MontserratLight",
    // color: "#404040",
    fontSize: 16,
    letterSpacing: 1,
    color: "black",
    // alignItems: "center",
  },
  title: {
    fontFamily: "MontserratRegular",
    color: "#735e4d",
    fontSize: 18,
  },
});
