import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { z } from "../../../../utils/scaling";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

export default function ApiButton({
  navigation,
  api,
  apiText,
  navigationPage,
  requiredCoins,
  children,
  homeFlatlistRef,
}) {
  const isWebviewLoaded = useSelector((state) => state.isWebviewLoaded.value);
  const isViewLogin = useSelector((state) => state.isViewLogin.value);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          position: "absolute",
          borderRadius: z(25),
          width: z(130),
          height: z(150),
          backgroundColor: "rgba(0,0,0,0.15)",
          right: -4,
          bottom: -5,
        }}
      ></View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          backgroundColor: "#e2e9ee",
          padding: z(5),
          borderRadius: z(20),
          width: z(130),
          height: z(150),
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
          elevation: 5,
          overflow: "hidden",
        }}
        onPress={() => {
          if (api === "image_api") {
            if (isViewLogin && isWebviewLoaded) {
              navigation.navigate(navigationPage);
            }
          } else {
            navigation.navigate(navigationPage);
          }
        }}
      >
        <View
          style={{
            height: z(100),
            zIndex: 4,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {children}
        </View>
        <Text
          style={{
            flex: 1,
            paddingVertical: 2,
            textAlign: "center",
            width: "100%",
            color: "black",
            fontSize: z(14),
            fontFamily: "RobotoMedium",
          }}
        >
          {apiText}
        </Text>

        {api === "image_api" && !isViewLogin ? (
          <View
            style={{
              ...StyleSheet.absoluteFill,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
              backgroundColor: "rgba(0,0,0,0.1)",
            }}
          >
            <ActivityIndicator size={z(30)} color="#53acff" />
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
