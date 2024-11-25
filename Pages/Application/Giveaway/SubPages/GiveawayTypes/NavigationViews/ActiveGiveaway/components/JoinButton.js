import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button as PaperButton } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

export default function JoinButton({
  children,
  isUserParticipant,
  currentGiveawayId,
  currentGiveawayType,
}) {
  const coins = useSelector((state) => state.coins.value);

  function handleJoinGiveaway() {
    // check coins frontend
    try {
      if (coins >= 10 && !isUserParticipant) {
        // set state isLoading true
        dispatch(consumeCoins(10));
        socket.emit("join-giveaway", currentGiveawayId, currentGiveawayType);
      } else {
        console.log(`Not enough coins`);
        toast.show(`Not enough coins`, {
          type: "normal",
        });
      }
    } catch (error) {
      // log error
      console.log(error);
      toast.show(`Error: Can't join giveaway`, {
        type: "error",
      });
    }
  }
  return (
    <PaperButton
      icon={({ size, color }) => children}
      labelStyle={styles.btnText}
      disabled={isUserParticipant}
      contentStyle={{
        flexDirection: "row-reverse",
      }}
      mode="elevated"
      buttonColor="#d1edc0"
      onPress={() => {
        handleJoinGiveaway();
      }}
    >
      Join
    </PaperButton>
  );
}

const styles = StyleSheet.create({
  btnText: {
    fontFamily: "MontserratLight",
    letterSpacing: 1,
    color: "#735e4d",
  },
});
