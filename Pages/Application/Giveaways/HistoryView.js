import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
export default function HistoryView() {
  const giveawayHistory = useSelector((state) => state.giveawayHistory.value);
  const giveawayHistoryArray = [...Object.values(giveawayHistory)].reverse();
  return (
    <View style={styles.container}>
      <Text>History View</Text>

      <Button
        title="Log History"
        onPress={() => {
          console.log(giveawayHistory);
        }}
      />
      <Button
        title="Log History Array reversed"
        onPress={() => {
          console.log(giveawayHistoryArray);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
