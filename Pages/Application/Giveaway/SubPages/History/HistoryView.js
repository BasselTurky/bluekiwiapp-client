import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import React from "react";
import { z, zx } from "../../../../../utils/scaling";
import { useSelector, useDispatch } from "react-redux";
import HistoryCard from "./components/HistoryCard";
import WinnersModal from "./components/WinnersModal";
import { setIsVisible } from "./state/modalState";
import PrizeModal from "../GiveawayTypes/NavigationViews/ActiveGiveaway/components/PrizeModal";

export default function HistoryView() {
  const dispatch = useDispatch();
  const historyGiveaways =
    useSelector((state) => state.historyGiveaways.value) ?? [];
  const prizeModalState = useSelector((state) => state.prizeModalState.value);

  React.useEffect(() => {
    return () => {
      dispatch(setIsVisible(false));
    };
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={[...historyGiveaways].reverse()}
        keyExtractor={(item, index) => `${item.giveawayId}`}
        renderItem={({ item }) => <HistoryCard item={item} />}
        style={styles.flatlist}
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
      <WinnersModal />
      {prizeModalState ? <PrizeModal /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  flatlist: {
    width: "100%",
  },
  historyCard: {
    backgroundColor: "#fff9f4",
    paddingVertical: z(5),
    borderColor: "#c4c4c4",
    marginHorizontal: 15,
    marginTop: 10,
    elevation: 5,
    borderRadius: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: zx(10),
    height: z(50),
  },
  iconContainer: {
    width: zx(40),
    height: zx(40),
    justifyContent: "center",
    alignItems: "center",
  },
  iconMainContainer: {
    width: zx(26),
    height: zx(26),
    justifyContent: "center",
    alignItems: "center",
  },
  iconPosition: {
    position: "absolute",
    top: 0,
    right: 5,
  },
  textContainer: {
    paddingHorizontal: zx(10),
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
    letterSpacing: 1,
    color: "white",
  },
  buttonStyle: {
    width: zx(70),
    height: z(34),
    elevation: 5,
    alignSelf: "center",
    backgroundColor: "#84c4ff",
    borderRadius: z(6),
  },

  buttonContent: {
    padding: 0,
    margin: 0,
    height: "100%",
    width: "100%",
  },
  buttonLabel: {
    padding: 0,
    margin: 0,
  },
});
