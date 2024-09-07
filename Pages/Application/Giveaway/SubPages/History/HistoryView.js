import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import React from "react";
import { z, zx } from "../../../../../utils/scaling";
import { useSelector, useDispatch } from "react-redux";
import HistoryCard from "./components/HistoryCard";
import WinnersModal from "./components/WinnersModal";
import { setIsVisible } from "./state/modalState";
export default function HistoryView() {
  const dispatch = useDispatch();
  const giveawayHistoryRev = useSelector(
    (state) => state.giveawayHistory.reversed
  );
  const historyGiveaways = useSelector((state) => state.historyGiveaways.value);

  React.useEffect(() => {
    return () => {
      dispatch(setIsVisible(false));
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text>History View</Text> */}
      <FlatList
        data={historyGiveaways}
        keyExtractor={(item, index) => item.giveawayId}
        renderItem={({ item }) => <HistoryCard item={item} />}
        style={styles.flatlist}
        // inverted={true}
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
      {/* <Button
      title="Log"
      onPress={() => {
        console.log(giveawayHistoryRev);
      }}
    /> */}
      <WinnersModal />
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
    // paddingVertical: 10,
    // paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  flatlist: {
    // backgroundColor: "pink",
    width: "100%",
    // flex: 1,
    // paddingBottom: 120,
  },
  historyCard: {
    backgroundColor: "#fff9f4",
    paddingVertical: z(5),
    // flexDirection: "row",
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderRightWidth: StyleSheet.hairlineWidth,
    // borderLeftWidth: StyleSheet.hairlineWidth,
    // width: "100%",
    borderColor: "#c4c4c4",
    marginHorizontal: 15,
    marginTop: 10,
    elevation: 5,
    borderRadius: 3,
    // elevation: 5,
  },
  row: {
    flexDirection: "row",
    // backgroundColor: "#eeeeee",
    alignItems: "center",
    paddingHorizontal: zx(10),
    height: z(50),
    // justifyContent: "space-around",
    // width: "100%",
    // flex: 1,
  },
  iconContainer: {
    width: zx(40),
    height: zx(40),
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "pink",
  },
  iconMainContainer: {
    width: zx(26),
    height: zx(26),
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "pink",
  },
  iconPosition: {
    position: "absolute",
    top: 0,
    right: 5,
  },
  textContainer: {
    // flex: 1,
    // flexDirection: "row",
    // height: "100%",
    paddingHorizontal: zx(10),
    // alignItems: "center",
    // justifyContent: "space-between",
  },
  title: {
    fontFamily: "MontserratRegular",
    color: "#735e4d",
  },

  counter: {
    fontFamily: "MontserratRegular",
    color: "#735e4d",
  },

  reward: {
    fontFamily: "MontserratRegular",
    color: "#735e4d",
  },
  winner: {
    fontFamily: "MontserratRegular",
    color: "#735e4d",
    fontSize: 11,
  },
  btn: {
    width: zx(70),
    height: z(34),
    backgroundColor: "#84c4ff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: zx(6),
    zIndex: 2,
    elevation: 5,
  },
  btnText: {
    fontFamily: "MontserratLight",
    // color: "#404040",
    letterSpacing: 1,
    color: "white",
  },
  buttonStyle: {
    width: zx(70),
    height: z(34),
    elevation: 5,
    alignSelf: "center",
    // marginBottom: z(20),
    // backgroundColor: "#59cbbd",
    backgroundColor: "#84c4ff",
    borderRadius: z(6),
  },

  buttonContent: {
    padding: 0,
    margin: 0,
    height: "100%",
    width: "100%",

    // backgroundColor: "pink",
  },
  buttonLabel: {
    padding: 0,
    margin: 0,
    // width: "100%",
    // backgroundColor: "green",
  },
});
