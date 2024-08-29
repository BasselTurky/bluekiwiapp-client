import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { z, zx } from "../../../utils/scaling";
import { Button as PaperButton } from "react-native-paper";
import { FontAwesome6, AntDesign, FontAwesome } from "@expo/vector-icons";
import OpenButton from "./OpenButton";
const mainColor = "#735e4d";

export default function GiveawayCard({
  children, // icon
  giveaway,
  title,
  navigation,
  route,
}) {
  const participants = giveaway.participants.length;
  console.log(giveaway);

  const reward =
    participants <= 1999 ? 10 : Math.floor(participants / 1000) * 10;

  const isAvailable = true;
  return (
    // <View style={styles.container}>
    <View style={styles.giveawayCard}>
      <View style={styles.row}>
        <View style={styles.iconContainer}>{children}</View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <FontAwesome6 name="user-group" size={zx(16)} color={mainColor} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.counter}>{participants} / 1000</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <AntDesign name="gift" size={zx(22)} color={mainColor} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.reward}>$ {reward}</Text>
          <OpenButton
            navigation={navigation}
            route={route}
            giveawayId={giveaway.info.id}
          />
        </View>
      </View>
    </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  giveawayCard: {
    backgroundColor: "#fff9f4",
    paddingVertical: z(5),

    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderRightWidth: StyleSheet.hairlineWidth,
    // borderLeftWidth: StyleSheet.hairlineWidth,

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
    color: mainColor,
  },

  counter: {
    fontFamily: "MontserratRegular",
    color: mainColor,
  },

  reward: {
    fontFamily: "MontserratRegular",
    color: mainColor,
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
