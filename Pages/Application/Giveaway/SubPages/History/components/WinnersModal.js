import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsVisible } from "../state/modalState";
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
        <View style={styles.overlay}>
          <View style={styles.tableContainer}>
            <View style={styles.header}>
              <View style={styles.headerCell}>
                <Text style={styles.title}>Winners</Text>
              </View>
            </View>
            <FlatList
              data={modalState.content}
              keyExtractor={(item, index) => `${item.id}`}
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
                alignItems: "center",
              }}
            >
              <PaperButton
                icon={({ size, color }) => (
                  <CloseThinSVG width={12} height={12} fill="black" />
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
                onPress={() => {
                  dispatch(setIsVisible(false));
                }}
              >
                Close
              </PaperButton>
            </View>
          </View>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 25,
    paddingHorizontal: 25,
    paddingTop: 20,
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
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  tableContainer: {
    flex: 1,
    backgroundColor: "#fff9f4",
    width: "100%",
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
  },
  btnText: {
    fontFamily: "MontserratLight",
    fontSize: 16,
    letterSpacing: 1,
    color: "black",
  },
  title: {
    fontFamily: "MontserratRegular",
    color: "#735e4d",
    fontSize: 18,
  },
});
