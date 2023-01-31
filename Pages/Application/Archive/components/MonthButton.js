import { StyleSheet, Text, View, Animated, Easing } from "react-native";
import React, { useState, useEffect } from "react";
import { Button as PaperButton } from "react-native-paper";
import { z } from "../../../../utils/scaling";
export default function MonthButton({
  navigation,
  permanentWallpapers,
  availableMonths,
  index,
  year,
  month,
  monthsArray,
  isScaled,
}) {
  const emptyMonths = Array.from(
    new Array(monthsArray.length - availableMonths.length).keys()
  );
  //   console.log(emptyMonths);
  const scaleVar = emptyMonths[index - availableMonths.length]
    ? emptyMonths[index - availableMonths.length]
    : 0;
  //   if (!permanentWallpapers.value[year][month]) {
  //     console.log("herennn");
  //     console.log(
  //       emptyMonths[index - availableMonths.length],
  //       availableMonths.length,
  //       emptyMonths.length,
  //       month,
  //       index
  //     );
  //   }

  const animatedScale = React.useRef(new Animated.Value(0)).current;

  const scaleRange = animatedScale.interpolate({
    inputRange: [0, 0.7, 0.8, 0.9, 1],
    outputRange: [0, 0.2, 0.3, 0.6, 1],
  });

  const scaleUp = () => {
    Animated.timing(animatedScale, {
      toValue: 1,
      duration: 800 + 200 * Number(month),
      useNativeDriver: true,
      easing: Easing.out(Easing.sin),
    }).start();
  };
  const scaleDown = () => {
    Animated.timing(animatedScale, {
      toValue: 0,
      duration: 800 + 200 * Number(month),
      useNativeDriver: true,
      easing: Easing.in(Easing.sin),
    }).start();
  };

  useEffect(() => {
    if (isScaled) {
      scaleUp();
    } else {
      scaleDown();
    }
  }, [isScaled]);

  return (
    <PaperButton
      onPress={() => {
        if (permanentWallpapers.value[year][month]) {
          navigation.navigate("ArchiveMonth", {
            month: month,
            year: year,
            images: permanentWallpapers.value[year][month],
          });
        }
      }}
      style={{
        position: "absolute",
        width: 45,
        height: 45,
        borderRadius: 45,
        backgroundColor: "#af9199",
        // justifyContent: "center",
        // alignItems: "center",
        padding: 0,
        margin: 0,
        minWidth: 0,
        // elevation: 5,

        opacity: permanentWallpapers.value[year][month]
          ? 1
          : 0.5 - scaleVar / 15,

        // Number(month)
        //(emptyMonths[index - availableMonths.length] + 0.1)
        transform: [
          {
            translateX:
              100 * Math.sin((Math.PI * 2 * (Number(month) * 30)) / 360),
          },
          {
            translateY:
              100 * Math.cos((Math.PI * 2 * (Number(month) * 30)) / 360),
          },
          {
            scale: scaleRange,
          },
        ],
      }}
      contentStyle={styles.buttonContent}
      labelStyle={styles.buttonLabel}
      mode="contained"
      uppercase={false}
    >
      {permanentWallpapers.value[year][month] ? (
        <Text>{monthsArray[Number(month) - 1]}</Text>
      ) : null}
      {/* <Text>{monthsArray[Number(month) - 1]}</Text> */}
    </PaperButton>
  );
}

const styles = StyleSheet.create({
  buttonContent: {
    padding: 0,
    margin: 0,
    height: "100%",
    width: "100%",
  },
  buttonLabel: {
    padding: 0,
    margin: 0,
    marginVertical: 0,
    marginHorizontal: 0,
  },
});
