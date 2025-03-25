import { StyleSheet, View } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button as PaperButton } from "react-native-paper";
import CloseThinSVG from "../../../../../../../../Components/CloseThinSVG";
import { z, zx } from "../../../../../../../../utils/scaling";
import { hideInfoModal } from "../../../../../Redux States/prizeInfoModalState";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PrizeInfoModal() {
  const prizeInfoModalState = useSelector(
    (state) => state.prizeInfoModalState.value
  );
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  return (
    <>
      {prizeInfoModalState ? (
        <View style={[styles.overlay, { paddingBottom: 25 + insets.bottom }]}>
          <View style={styles.tableContainer}>
            <View style={{ flex: 1 }}></View>
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
                  dispatch(hideInfoModal(false));
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
    // paddingBottom: 25,
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
