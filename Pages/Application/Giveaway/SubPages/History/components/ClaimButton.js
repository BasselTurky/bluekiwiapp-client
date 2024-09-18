import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { z, zx } from "../../../../../../utils/scaling";
import { Button as PaperButton } from "react-native-paper";
import { FontAwesome6, AntDesign, FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { displayPrizeModal } from "../../../Redux States/prizeModalState";
import { setSelectedGiveaway } from "../../../Redux States/selectedGiveaway";

export default function ClaimButton({ item }) {
  const dispatch = useDispatch();
  const historyGiveaways = useSelector((state) => state.historyGiveaways.value);
  // console.log(item);
  return (
    <>
      {item.winner ? (
        item.received ? (
          <Text style={styles.claimed}>Claimed</Text>
        ) : item.inProgress ? (
          <Text style={styles.inProgress}>In Progress</Text>
        ) : (
          <PaperButton
            labelStyle={styles.btnText}
            contentStyle={{
              flexDirection: "row-reverse",
            }}
            style={
              {
                // borderRadius: 5,
              }
            }
            mode="elevated"
            buttonColor="#4CAF50"
            // buttonColor="#d1edc0"
            onPress={() => {
              console.log(historyGiveaways);
              dispatch(setSelectedGiveaway(item));
              dispatch(displayPrizeModal(true));
            }}
          >
            Claim
          </PaperButton>
        )
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  btnText: {
    fontFamily: "MontserratLight",
    // color: "#404040",
    letterSpacing: 1,
    color: "#fff",
    // color: "#735e4d",
  },
  claimed: {
    fontFamily: "MontserratLight",
    letterSpacing: 1,
    color: "#735e4d",
    width: zx(94),
    textAlign: "center",
  },
  inProgress: {
    fontFamily: "MontserratLight",
    letterSpacing: 1,
    color: "#735e4d",
    width: zx(94),
    textAlign: "center",
  },
});
