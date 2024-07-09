import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import { useSocket } from "../../SocketContext/SocketContext";
import { consumeCoins } from "../../../Features/coins";

export default function ActiveGiveawayView({ navigation, giveawayInfo }) {
  // total
  //   {"info": {"date": "2024-03-14T03:58:57.000Z", "id": 3, "status": "active", "type": "x"}, "participants": [{"date": "2024-03-14T03:59:53.000Z", "uid": "Bassel#2736"}], "type": "x"}
  const toast = useToast();
  const dispatch = useDispatch();
  const socket = useSocket();

  const giveawayHistory = useSelector((state) => state.giveawayHistory.value);
  const coins = useSelector((state) => state.coins.value);

  const participantsList = giveawayInfo.participants;
  const totalParticipants = giveawayInfo.participants.length;
  const currentGiveawayId = giveawayInfo.info.id;
  const giveawayHistoryIDs = Object.keys(giveawayHistory);

  const [isDisabled, setIsDisabled] = React.useState(
    giveawayHistory[currentGiveawayId] ? true : false
  );
  function logParticipants(participantsArray) {
    participantsArray.forEach((participant) => {
      console.log(participant);
    });
  }

  function handleJoinGiveaway() {
    // check coins frontend
    try {
      if (coins >= 10) {
        dispatch(consumeCoins(10));
        socket.emit("join-giveaway", currentGiveawayId);
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
    <View style={styles.container}>
      <Text>ActiveGiveawayView</Text>
      <Button
        title="Go Back"
        onPress={() => {
          navigation.goBack();
        }}
      />

      <Button
        title="Log giveaway info"
        onPress={() => {
          console.log(giveawayInfo);
        }}
      />
      <Button
        title="Total Participants"
        onPress={() => {
          console.log(totalParticipants);
        }}
      />
      <Button
        title="Current Giveaway Id"
        onPress={() => {
          console.log(currentGiveawayId);
        }}
      />
      <Button
        title="Giveaway History IDs"
        onPress={() => {
          console.log(giveawayHistoryIDs);
        }}
      />
      <Button
        title="Can Join"
        onPress={() => {
          console.log(!isDisabled);
        }}
      />
      <Button
        title="log Participants"
        onPress={() => {
          logParticipants(participantsList);
        }}
      />
      <Button
        title="Join Giveaway"
        disabled={isDisabled}
        onPress={handleJoinGiveaway}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
