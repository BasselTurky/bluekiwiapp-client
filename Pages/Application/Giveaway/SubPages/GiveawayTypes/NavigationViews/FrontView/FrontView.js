import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SingleCircleSVG from "../../../../../../../Components/SingleCircleSVG";
import MultiCirclesSVG from "../../../../../../../Components/MultiCirclesSVG";
import { z, zx } from "../../../../../../../utils/scaling";

import GiveawayCard from "./components/GiveawayCard";

export default function FrontView({ navigation }) {
  return (
    <View style={styles.container}>
      <GiveawayCard
        activeGiveawayString={"activeGiveawayX"}
        participantsGiveawayString={"participantsGiveawayX"}
        title={"Single Winner"}
        navigation={navigation}
        route={"Single"}
      >
        <SingleCircleSVG width={zx(36)} height={zx(36)} fill={"#735e4d"} />
      </GiveawayCard>
      <GiveawayCard
        activeGiveawayString={"activeGiveawayZ"}
        participantsGiveawayString={"participantsGiveawayZ"}
        title={"Multipe Winners"}
        navigation={navigation}
        route={"Multiple"}
      >
        <MultiCirclesSVG width={zx(36)} height={zx(36)} fill={"#735e4d"} />
      </GiveawayCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  giveawayCard: {
    backgroundColor: "#eeeeee",
    paddingVertical: z(5),
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#eeeeee",
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
  textContainer: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
    paddingHorizontal: zx(10),
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "MontserratRegular",
    color: "#404040",
  },

  counter: {
    fontFamily: "MontserratRegular",
    color: "#404040",
  },
  rewardContainer: {
    flex: 1,
    backgroundColor: "pink",
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: zx(10),
  },
  reward: {
    fontFamily: "MontserratRegular",
    color: "#404040",
  },
  btn: {
    width: zx(70),
    height: z(34),
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: zx(3),
  },
  btnText: {
    fontFamily: "MontserratLight",
    color: "#404040",
    letterSpacing: 1,
    color: "white",
  },
});
