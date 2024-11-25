import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { z, zx } from "../../utils/scaling";
import SingleCircleSVG from "../../Components/SingleCircleSVG";
import MultiCirclesSVG from "../../Components/MultiCirclesSVG";

import GiveawayCard from "../../Pages/Application/Giveaway/SubPages/GiveawayTypes/NavigationViews/FrontView/components/GiveawayCard";

import { FontAwesome6, AntDesign } from "@expo/vector-icons";

export default function MainView({ navigation }) {
  const giveawayX = useSelector((state) => state.giveawayX.value);
  const giveawayZ = useSelector((state) => state.giveawayZ.value);
  const giveawayHistory = useSelector((state) => state.giveawayHistory.value);
  // console.log(giveawayHistory);

  //  number of users in state
  // reward value
  // // x more users to start
  const participants = giveawayX.participants.length;
  const reward =
    participants <= 1999 ? 10 : Math.floor(participants / 1000) * 10;
  //  navigation.navigate("ViewX");
  //  navigation.navigate("ViewZ");
  return (
    <View style={styles.container}>
      {/* <View style={styles.giveawayCard}>
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <SingleCircleSVG width={zx(36)} height={zx(36)} fill={"#404040"} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Single Winner</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <FontAwesome6 name="user-group" size={zx(16)} color="#404040" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.counter}>{participants} / 1000</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <AntDesign name="gift" size={zx(22)} color="#404040" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.reward}>$ {reward}</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                navigation.navigate("ViewX");
              }}
            >
              <Text style={styles.btnText}>Open</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View> */}
      <GiveawayCard
        giveaway={giveawayX}
        title={"Single Winner"}
        navigation={navigation}
        route={"ViewX"}
      >
        <SingleCircleSVG width={zx(36)} height={zx(36)} fill={"#735e4d"} />
      </GiveawayCard>
      <GiveawayCard
        giveaway={giveawayZ}
        title={"Multipe Winners"}
        navigation={navigation}
        route={"ViewZ"}
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
