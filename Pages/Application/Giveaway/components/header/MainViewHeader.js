import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z, zx } from "../../../../../utils/scaling";
import { Feather, Entypo, Ionicons } from "@expo/vector-icons";
import { setIsVisible } from "../../SubPages/History/state/modalState";
import { hidePrizeModal } from "../../Redux States/prizeModalState";

import CoinsDisplay from "../../../../../CustomComponents/CoinsDisplay";
export default function MainViewHeader({ state, navigation }) {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  React.useEffect(() => {
    if (state.index === 0) {
      dispatch(setIsVisible(false));
      dispatch(hidePrizeModal(false));
    }

    return () => {};
  }, [state.index]);

  return (
    <View style={[styles.container, { height: insets.top + z(116) }]}>
      <View
        style={{
          flex: 1,
          width: "100%",
          paddingTop: insets.top + z(6),
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            flexDirection: "row",
            paddingHorizontal: zx(8),
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              if (navigation.isFocused()) {
                navigation.goBack();
              }
            }}
          >
            <Entypo name="chevron-left" size={z(36)} color="black" />
          </TouchableOpacity>
          <CoinsDisplay coinPosition={"right"} />
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "#fff3e8",
            height: z(60),
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#fff3e8",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              borderBottomWidth: z(3),
              borderBlockColor: state.index === 0 ? "#a9bac7" : "#f5f0ec",
            }}
            onPress={() => {
              navigation.navigate("GiveawaysView");
            }}
          >
            <Text
              style={{
                fontSize: z(18),
                opacity: state.index === 0 ? 1 : 0.4,
                fontFamily: "MontserratMedium",
                color: "#735e4d",
              }}
            >
              Giveaways
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#fff3e8",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              borderBottomWidth: z(3),
              borderBlockColor: state.index === 1 ? "#a9bac7" : "#f5f0ec",
            }}
            onPress={() => {
              navigation.navigate("HistoryView");
            }}
          >
            <Text
              style={{
                fontSize: z(18),
                opacity: state.index === 1 ? 1 : 0.4,
                fontFamily: "MontserratMedium",
                color: "#735e4d",
              }}
            >
              History
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    elevation: 5,
    backgroundColor: "#fff3e8",
  },
});
