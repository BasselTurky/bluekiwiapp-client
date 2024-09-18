import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { z, zx } from "../../../../../../utils/scaling";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome6, AntDesign, FontAwesome } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { Button as PaperButton } from "react-native-paper";
import SingleCircleSVG from "../../../../../../Components/SingleCircleSVG";
import MultiCirclesSVG from "../../../../../../Components/MultiCirclesSVG";
import WinnerIconSVG from "../../../../../../Components/WinnerIconSVG";
import ClaimButton from "./ClaimButton";

import { setIsVisible } from "../state/modalState";
import { setContent } from "../state/modalState";
// const mainColor = "#735e4d";

export default function HistoryCard({ item }) {
  const dispatch = useDispatch();
  // const userData = useSelector((state) => state.userData.value);

  return (
    <View style={styles.historyCard}>
      <View style={styles.row}>
        {/* <View
          style={{
            // backgroundColor: "green",
            flexDirection: "row",
            // flex: 1,
            justifyContent: "center",
            alignItems: "center",
            //   height: 50,
          }}
        > */}
        <View style={styles.iconContainer}>
          <FontAwesome6 name="user-group" size={zx(16)} color={"#735e4d"} />
        </View>
        <View
          style={{
            paddingHorizontal: zx(10),
            width: zx(80),
          }}
        >
          <Text style={styles.counter}>{item.totalParticipants}</Text>
        </View>
        {/* </View> */}
        {/* <View
          style={{
            // backgroundColor: "red",
            flexDirection: "row",
            // flex: 1,
            justifyContent: "center",
            alignItems: "center",
            //   height: 50,
          }}
        > */}
        <View style={styles.iconContainer}>
          <AntDesign name="gift" size={zx(22)} color={"#735e4d"} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.reward}>$ {item.reward_value_usd}</Text>
        </View>
        {/* </View> */}
        {/* <View
          style={{
            // backgroundColor: "blue",
            flexDirection: "row",
            // flex: 1,
            justifyContent: "center",
            alignItems: "center",

            //   height: 50,
          }}
        > */}
        <View style={styles.iconPosition}>
          <View style={styles.iconMainContainer}>
            {item.type === "z" ? (
              <MultiCirclesSVG
                width={zx(24)}
                height={zx(24)}
                fill={"#735e4d"}
              />
            ) : (
              <SingleCircleSVG
                width={zx(24)}
                height={zx(24)}
                fill={"#735e4d"}
              />
            )}
          </View>
        </View>

        {/* </View> */}
        {/* <View style={styles.iconContainer}>
          <WinnerIconSVG width={zx(24)} height={zx(24)} fill={"#735e4d"} />
        </View> */}
      </View>
      <View style={[styles.row, { justifyContent: "space-between" }]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.iconContainer}>
            <WinnerIconSVG width={zx(24)} height={zx(24)} fill={"#735e4d"} />
          </View>

          <View style={styles.textContainer}>
            {item.type === "x" || item.winners.length === 1 ? (
              <Text style={styles.winner}>{item.winners[0].userId}</Text>
            ) : (
              <TouchableOpacity
                style={{
                  elevation: 3,
                  backgroundColor: "#ebe5e1",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  width: zx(65),
                  height: zx(40),
                  borderRadius: 4,
                }}
                onPress={() => {
                  // display modal, with list of winners
                  if (item.winners) {
                    console.log(item.winners);
                  }

                  dispatch(setContent(item.winners));
                  dispatch(setIsVisible(true));
                }}
              >
                <Text style={styles.winner}>{item.winners.length}</Text>
                <Entypo name="list" size={zx(24)} color="#735e4d" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View>
          <ClaimButton item={item} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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

{
  /* <View style={styles.iconContainer}></View>

<View style={styles.iconContainer}>
<FontAwesome6 name="user-group" size={zx(16)} color={mainColor} />
</View>

<View style={styles.iconContainer}>
<AntDesign name="gift" size={zx(22)} color={mainColor} />
</View> */
}
