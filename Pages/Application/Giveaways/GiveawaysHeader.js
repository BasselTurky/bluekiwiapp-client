import {
  StyleSheet,
  Text,
  View,
  Animated,
  StatusBar,
  Button,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z, zx } from "../../../utils/scaling";
import { Feather, Entypo, Ionicons } from "@expo/vector-icons";

export default function GiveawaysHeader({ index, setIndex }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

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
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: zx(8),
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Entypo name="chevron-left" size={z(36)} color="black" />
          </TouchableOpacity>

          <View></View>
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "#fff",
            height: z(60),
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              borderBottomWidth: z(3),
              borderBlockColor: index === 0 ? "lightblue" : "#f0f0f0",
            }}
            onPress={() => {
              setIndex(0);
            }}
          >
            <Text
              style={{
                fontSize: z(18),
                opacity: index === 0 ? 1 : 0.4,
                fontFamily: "MontserratRegular",
              }}
            >
              Giveaways
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              borderBottomWidth: z(3),
              borderBlockColor: index === 1 ? "lightblue" : "#f0f0f0",
            }}
            onPress={() => {
              setIndex(1);
            }}
          >
            <Text
              style={{
                fontSize: z(18),
                opacity: index === 1 ? 1 : 0.4,
                fontFamily: "MontserratRegular",
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
  },
});
