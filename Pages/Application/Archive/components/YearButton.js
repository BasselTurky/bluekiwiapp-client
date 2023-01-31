import { StyleSheet, Text, View, Animated, Easing } from "react-native";
import React, { useState, useEffect } from "react";
import { Button as PaperButton } from "react-native-paper";
import { z } from "../../../../utils/scaling";
import MonthButton from "./MonthButton";

export default function YearButton({
  navigation,
  permanentWallpapers,
  year,
  monthsArray,
}) {
  const [isScaled, setIsScaled] = useState(false);

  function renderMonth(year) {
    let availableMonths = Object.keys(permanentWallpapers.value[year]);
    let months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    return months.map((month, index) => {
      let delay = 300;
      return (
        <MonthButton
          key={index}
          navigation={navigation}
          permanentWallpapers={permanentWallpapers}
          availableMonths={availableMonths}
          index={index}
          year={year}
          month={month}
          monthsArray={monthsArray}
          isScaled={isScaled}
        />
      );
    });
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PaperButton
        onPress={() => {
          if (isScaled) {
            setIsScaled(false);
          } else {
            setIsScaled(true);
          }
        }}
        style={styles.buttonStyle}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
        // color="green"
        mode="contained"
        uppercase={false}
      >
        {/* <View>
<ArchiveIcon width={30} height={30} />
</View> */}

        <Text
          style={{
            fontSize: 20,
            // fontFamily: "PlayfairBold",
            fontFamily: "Graduate_400Regular",
            color: "#ffffffcc",
          }}
        >
          {year}
        </Text>
      </PaperButton>
      {renderMonth(year)}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    // position: "absolute",
    // top: height * 0.5,
    // backgroundColor: "transparent",
    backgroundColor: "#af919999",
    elevation: 0,
    alignSelf: "center",
    // marginBottom: 180,
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.5)",
  },
  buttonContent: {
    padding: 0,
    margin: 0,
    height: "100%",
    width: "100%",
    // elevation: 0,
  },
  buttonLabel: {
    padding: 0,
    margin: 0,
    marginVertical: 0,
    marginHorizontal: 0,
    // elevation: 0,
    width: "100%",
  },
});
