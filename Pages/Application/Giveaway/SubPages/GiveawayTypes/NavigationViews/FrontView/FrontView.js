import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import SingleCircleSVG from "../../../../../../../Components/SingleCircleSVG";
import MultiCirclesSVG from "../../../../../../../Components/MultiCirclesSVG";
import { z, zx } from "../../../../../../../utils/scaling";

import GiveawayCard from "./components/GiveawayCard";

export default function FrontView({ navigation }) {
  // const activeGiveawayX = useSelector((state) => state.activeGiveawayX.value);
  // const activeGiveawayZ = useSelector((state) => state.activeGiveawayZ.value);
  // const participantsGiveawayX = useSelector(
  //   (state) => state.participantsGiveawayX.value
  // );
  // const participantsGiveawayZ = useSelector(
  //   (state) => state.participantsGiveawayZ.value
  // );
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
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
  },
  giveawayCard: {
    // height: z(170),
    backgroundColor: "#eeeeee",
    // padding: 10,
    paddingVertical: z(5),
  },
  row: {
    // flex: 1,
    flexDirection: "row",
    backgroundColor: "#eeeeee",
    alignItems: "center",
    paddingHorizontal: zx(10),
    height: z(50),
    // width: "100%",
    // height: z(40),
  },
  iconContainer: {
    width: zx(40),
    height: zx(40),
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "pink",
    height: "100%",
    // justifyContent: "center",
    paddingHorizontal: zx(10),
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "MontserratRegular",
    color: "#404040",
    // color: "white",
    // width: "100%",
    // height: z(40),
  },

  counter: {
    fontFamily: "MontserratRegular",
    // marginLeft: zx(10),
    color: "#404040",
  },
  rewardContainer: {
    flex: 1,
    backgroundColor: "pink",
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: zx(10),
    // alignItems: "center",
  },
  reward: {
    fontFamily: "MontserratRegular",
    // marginLeft: zx(10),
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
