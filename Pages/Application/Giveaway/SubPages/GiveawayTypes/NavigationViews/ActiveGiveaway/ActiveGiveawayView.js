import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import { useSocket } from "../../../../../../SocketContext/SocketContext";
import { consumeCoins } from "../../../../../../../Features/coins";
import { useNavigation } from "@react-navigation/native";
export default function ActiveGiveawayView({
  giveawayType,
  activeGiveaway,
  participants,
}) {
  // total
  //   {"info": {"date": "2024-03-14T03:58:57.000Z", "id": 3, "status": "active", "type": "x"}, "participants": [{"date": "2024-03-14T03:59:53.000Z", "uid": "Bassel#2736"}], "type": "x"}
  const toast = useToast();
  const dispatch = useDispatch();
  const socket = useSocket();
  const navigation = useNavigation();
  // console.log(giveawayType);

  // const giveawayHistory = useSelector((state) => state.giveawayHistory.value);

  // const giveawayInfo = useSelector((state) => state[giveawayType].value);
  // console.log(giveawayInfo);

  const activeGiveaway = useSelector((state) => state[activeGiveaway]);

  const giveawayInfo = activeGiveaway.info;
  const isUserParticipant = activeGiveaway.isUserParticipant; // boolean

  const participantsList = useSelector((state) => state[participants].value);

  const coins = useSelector((state) => state.coins.value);

  // const participantsList = giveawayInfo.participants;
  const totalParticipants = participantsList.length;
  const currentGiveawayId = giveawayInfo.id;
  const currentGiveawayType = giveawayInfo.type;
  // const giveawayHistoryIDs = Object.keys(giveawayHistory);

  console.log(giveawayHistory[currentGiveawayId - 1]);
  console.log("history");
  console.log(giveawayHistory);

  // const [isDisabled, setIsDisabled] = React.useState(
  //   giveawayHistory[currentGiveawayId] ? true : false
  // );
  function logParticipants(participantsArray) {
    participantsArray.forEach((participant) => {
      console.log(participant);
    });
  }

  function handleJoinGiveaway() {
    // check coins frontend
    try {
      if (coins >= 10) {
        // set state isLoading true

        dispatch(consumeCoins(10));
        socket.emit("join-giveaway", currentGiveawayId, currentGiveawayType);
        console.log("here1");
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
      {/* <Button
        title="Giveaway History IDs"
        onPress={() => {
          console.log(giveawayHistoryIDs);
        }}
      /> */}
      <Button
        title="Can Join"
        onPress={() => {
          console.log(isUserParticipant ? false : true);
        }}
      />
      <Button
        title="log Participants"
        onPress={() => {
          logParticipants(participants);
        }}
      />
      <Button
        title="Join Giveaway"
        disabled={isUserParticipant ? true : false}
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
