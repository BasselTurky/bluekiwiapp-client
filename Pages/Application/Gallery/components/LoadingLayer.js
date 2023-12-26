import { StyleSheet, Text, View } from "react-native";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { z } from "../../../../utils/scaling";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "react-native-paper";
export default function LoadingLayer() {
  const isLoading = useSelector((state) => state.isLoading.value);

  if (!isLoading) {
    return null;
  }

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        zIndex: 20,
        // backgroundColor: "grey",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={z(100)} color="#53acff" />
    </View>
  );
}

const styles = StyleSheet.create({});
