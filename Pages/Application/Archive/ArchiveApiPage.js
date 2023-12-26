import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ArchiveApi from "./ArchiveApi";
// import ArchiveMonth from "./ArchiveMonth";
import ArchiveMonth from "./MonthView/ArchiveMonth";
import { useSelector } from "react-redux";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function ArchiveApiPage() {
  const permanentWallpapers = useSelector(
    (state) => state.permanentWallpapers.value
  );

  const data = ["2021", "2022"];

  // function loadScreens(data) {
  //   // console.log("data ", data);
  //   if (data) {
  //     const years = Object.keys(data);
  //     console.log(years);
  //     for (const year of years) {
  //       let months = Object.keys(data[year]);
  //       // console.log(months);
  //       months.map((month) => {
  //         console.log(year + "-" + month);
  //         return (
  //           <Stack.Screen
  //             name={year + "-" + month}
  //             // component={ImageAPI}
  //             options={{
  //               // animation: "slide_from_left",
  //               animation: "fade",
  //               headerShown: false,
  //             }}
  //           >
  //             {(props) => (
  //               <ArchiveMonth
  //                 {...props}
  //                 //   month={month}
  //                 //   data={data[year][month]}
  //                 // viewRef={viewRef}
  //               />
  //             )}
  //           </Stack.Screen>
  //         );
  //       });
  //     }
  //   }
  // }

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Stack.Screen
        name="ArchiveApi"
        // component={ImageAPI}
        options={{
          // animation: "slide_from_left",
          animation: "fade",
          headerShown: false,
        }}
      >
        {(props) => (
          <ArchiveApi
            {...props}
            // viewRef={viewRef}
            // pageUrl={pageUrl}
            // setPageUrl={setPageUrl}
            // isWebviewLoaded={isWebviewLoaded}
            // setIsWebviewLoaded={setIsWebviewLoaded}
            // isViewLogin={isViewLogin}
            // setIsViewLogin={setIsViewLogin}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="ArchiveMonth"
        // component={ImageAPI}
        options={{
          // animation: "slide_from_left",
          animation: "fade",
          headerShown: false,
        }}
      >
        {(props) => (
          <ArchiveMonth
            {...props}
            // viewRef={viewRef}
            // pageUrl={pageUrl}
            // setPageUrl={setPageUrl}
            // isWebviewLoaded={isWebviewLoaded}
            // setIsWebviewLoaded={setIsWebviewLoaded}
            // isViewLogin={isViewLogin}
            // setIsViewLogin={setIsViewLogin}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
