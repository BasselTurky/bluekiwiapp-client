import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { z, zx } from "../../../../../../utils/scaling";
import { Button as PaperButton } from "react-native-paper";
import { FontAwesome6, AntDesign, FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

export default function ClaimButton({ item }) {
  return (
    <>
      {item.winner && !item.received ? (
        <PaperButton
          //   icon={({ size, color }) =>
          //     giveawayHistory[giveawayId] ? null : (
          //       <FontAwesome name="circle" size={12} color="red" />
          //     )
          //   }

          labelStyle={styles.btnText}
          contentStyle={{
            flexDirection: "row-reverse",
          }}
          style={{
            // width: zx(95),
            // height: zx(40),
            borderRadius: 4,
          }}
          mode="elevated"
          buttonColor="#d1edc0"
          onPress={() => {
            console.log(item);
            // console.log("item");
            // console.log(user.received);
          }}
        >
          Claim
        </PaperButton>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  btnText: {
    fontFamily: "MontserratLight",
    // color: "#404040",
    letterSpacing: 1,
    color: "#735e4d",
  },
});
