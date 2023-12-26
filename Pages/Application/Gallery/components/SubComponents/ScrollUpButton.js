import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { z } from "../../../../../utils/scaling";

export default function ScrollUpButton({ scrollY, homeFlatlistRef }) {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      //   console.log(value);
      setPosition(value);
    });
  }, []);
  return (
    <>
      {position > 200 ? (
        <TouchableOpacity
          style={{
            height: z(50),
            width: z(50),
            borderRadius: z(20),
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            console.log(scrollY);
            if (homeFlatlistRef.current) {
              homeFlatlistRef.current.scrollToIndex({
                index: 0,
                animated: true,
              });
            }
          }}
        >
          <MaterialCommunityIcons
            name="chevron-double-up"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({});
