import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import React from "react";
import { z, zx } from "../../utils/scaling";
import { useSelector, useDispatch } from "react-redux";
export default function HistoryView() {
  const giveawayHistory = useSelector((state) => state.giveawayHistory.value);
  const giveawayHistoryArray = [...Object.values(giveawayHistory)].reverse();
  return (
    <View style={styles.container}>
      {/* <Text>History View</Text> */}

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
      <View style={styles.tableContainer}>
        <View style={styles.header}>
          <View style={styles.headerCell}>
            <Text>User</Text>
          </View>
          <View style={styles.headerCell}>
            <Text>Join date</Text>
          </View>
        </View>
        <FlatList
          data={giveawayHistoryArray}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.id}</Text>
            </View>
          )}
          style={styles.flatlist}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  flatlist: {
    // backgroundColor: "pink",
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
    // marginTop: 10,
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
});
