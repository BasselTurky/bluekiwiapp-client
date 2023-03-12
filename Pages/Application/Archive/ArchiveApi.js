import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { z } from "../../../utils/scaling";
import * as SecureStore from "expo-secure-store";
import GoBackSVG from "../../../Components/GoBackSVG";

import { setPermanentWallpapers } from "../../../Features/permanentWallpapers";

import { Button as PaperButton } from "react-native-paper";
import ArchiveIcon from "../../../Components/ArchiveIcon";

import Toast, { BaseToast } from "react-native-toast-message";

import MonthButton from "./components/MonthButton";
import YearButton from "./components/YearButton";

import ErrorView from "../../Error/ErrorView";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

async function deleteValueFor(key) {
  await SecureStore.deleteItemAsync(key);
}
import { setAuth } from "../../../Features/auth";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ArchiveApi({ navigation }) {
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();
  const dailyWallpapers = useSelector((state) => state.dailyWallpapers.value);
  const permanentWallpapers = useSelector(
    (state) => state.permanentWallpapers.value
  );

  // const [isScaled, setIsScaled] = useState(false);

  // const angels = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360];

  async function fetchWallpapers() {
    try {
      let currentToken = await SecureStore.getItemAsync("token");
      const response = await fetch(
        `${global.server_address}/api/get-all-wallpapers`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: currentToken,
          }),
        }
      );

      const data = await response.json();
      if (data.type === "success") {
        let total = {};

        for (let i = 0; i < data.result.length; i++) {
          let row = data.result[i];
          let year = row.date.substring(0, 4);
          let month = row.date.substring(5, 7);
          let day = row.date.substring(8, 10);

          if (!total[year]) {
            total[year] = {};
          }

          if (!total[year][month]) {
            total[year][month] = [];
          }

          total[year][month].push(row);
        }

        dispatch(
          setPermanentWallpapers({
            date: data.date,
            value: total,
          })
        );
      } else if (data.type === "wrong-device") {
        deleteValueFor("token");
        dispatch(setAuth(false));
      } else if (data.type === "error") {
        // ErrorID: E052
        errorToast(data.message);
      } else {
        errorToast("ErrorID: E051");
      }
    } catch (error) {
      console.log("ErrorID: E050: ", error);
      errorToast("ErrorID: E050");
    }
  }

  async function getAllWallpapers() {
    try {
      let response = await fetch(
        `https://worldtimeapi.org/api/timezone/Etc/UTC`
      );
      let data = await response.json();

      let utc_time = data.utc_datetime;
      // convert utc_time to 10 index string
      let shortened_date = utc_time.substring(0, 8) + "01";
      let date = new Date(shortened_date).getTime();

      if (!permanentWallpapers.date) {
        // first time
        fetchWallpapers();
      } else if (date > new Date(permanentWallpapers.date).getTime()) {
        // if today's date > stored date "last fetch"
        fetchWallpapers();
      } else {
        // do nuthing
        console.log("doing nothing");
      }
    } catch (error) {
      console.log("ErrorID: E053: ", error);
      errorToast("ErrorID: E053");
    }
  }

  useEffect(() => {
    getAllWallpapers();
  }, [permanentWallpapers]);

  const monthsArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  // function renderMonth(year) {
  //   // let months = Object.keys(permanentWallpapers.value[year]);
  //   let months = [
  //     "01",
  //     "02",
  //     "03",
  //     "04",
  //     "05",
  //     "06",
  //     "07",
  //     "08",
  //     "09",
  //     "10",
  //     "11",
  //     "12",
  //   ];
  //   return months.map((month, index) => {
  //     let delay = 300;
  //     return (
  //       <MonthButton
  //         permanentWallpapers={permanentWallpapers}
  //         year={year}
  //         month={month}
  //         monthsArray={monthsArray}
  //         isScaled={isScaled}
  //       />
  //     );
  //   });
  // }
  // <PaperButton
  //   onPress={() => {}}
  //   style={{
  //     position: "absolute",
  //     width: 45,
  //     height: 45,
  //     borderRadius: 45,
  //     backgroundColor: "#af9199",
  //     // justifyContent: "center",
  //     // alignItems: "center",
  //     padding: 0,
  //     margin: 0,
  //     minWidth: 0,
  //     // elevation: 5,
  //     opacity: permanentWallpapers.value[year][month]
  //       ? 1
  //       : 0.5 - Number(month) / 25,
  //     transform: [
  //       {
  //         translateX:
  //           100 * Math.sin((Math.PI * 2 * (Number(month) * 30)) / 360),
  //       },
  //       {
  //         translateY:
  //           100 * Math.cos((Math.PI * 2 * (Number(month) * 30)) / 360),
  //       },
  //       // {
  //       //   scale: 0.5,
  //       // },
  //     ],
  //   }}
  //   contentStyle={styles.buttonContent}
  //   labelStyle={styles.buttonLabel}
  //   mode="contained"
  //   uppercase={false}
  // >
  //   {permanentWallpapers.value[year][month] ? (
  //     <Text>{monthsArray[Number(month) - 1]}</Text>
  //   ) : null}
  //   {/* <Text>{monthsArray[Number(month) - 1]}</Text> */}
  // </PaperButton>
  function renderYears() {
    if (permanentWallpapers) {
      let years = Object.keys(permanentWallpapers.value);

      return years.map((year, index) => {
        return (
          <YearButton
            key={index}
            navigation={navigation}
            permanentWallpapers={permanentWallpapers}
            year={year}
            monthsArray={monthsArray}
          />
          //       <View
          //         style={{
          //           flex: 1,
          //           justifyContent: "center",
          //           alignItems: "center",
          //         }}
          //       >
          //         <PaperButton
          //           onPress={() => {}}
          //           style={styles.buttonStyle}
          //           contentStyle={styles.buttonContent}
          //           labelStyle={styles.buttonLabel}
          //           // color="green"
          //           mode="contained"
          //           uppercase={false}
          //         >
          //           {/* <View>
          //   <ArchiveIcon width={30} height={30} />
          // </View> */}

          //           <Text
          //             style={{
          //               fontSize: 20,
          //               // fontFamily: "PlayfairBold",
          //               fontFamily: "Graduate_400Regular",
          //               color: "#ffffffcc",
          //             }}
          //           >
          //             {year}
          //           </Text>
          //         </PaperButton>
          //         {renderMonth(year)}
          //       </View>
        );
      });
    }
  }

  // x: xInt + 64 * Math.cos(135 * (Math.PI / 180)),
  // y: yInt + 64 * Math.sin(135 * (Math.PI / 180)),

  try {
    return (
      <SafeAreaProvider>
        <View
          style={{
            flex: 1,
          }}
        >
          <ImageBackground
            source={require("../../../assets/pixel4.jpg")}
            // source={require("../../../assets/whiteLayer.png")}
            blurRadius={2}
            resizeMode="cover"
            style={[
              {
                flex: 1,
                alignItems: "center",
                // justifyContent: "center",
                // paddingTop:
                //   height * 0.04 < 24
                //     ? insets.top + height * 0.005
                //     : insets.top + height * 0.015,
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                backgroundColor: "#C88781",
              },
              // styles.container,
            ]}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 17,
              }}
            >
              <TouchableOpacity
                style={{
                  // zIndex: 2,
                  // position: "absolute",
                  // top: 30,
                  // left: 17,
                  width: z(40),
                  height: z(40),
                  backgroundColor: "rgba(0,0,0,0.3)",
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <GoBackSVG fill={"#fff"} width={15} height={15} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column-reverse",
              }}
            >
              {renderYears()}
              {/* {permanentWallpapers
              ? Object.keys(permanentWallpapers.value).map((year) => {
                  
                  );
                })
              : null} */}
            </View>

            {/* <View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: "pink",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {angels.map((angel) => {
              return (
                <View
                  style={{
                    position: "absolute",
                    width: 25,
                    height: 25,
                    borderRadius: 25,
                    backgroundColor: "green",
                    transform: [
                      {
                        translateX: 100 * Math.sin((Math.PI * 2 * angel) / 360),
                      },
                      {
                        translateY: 100 * Math.cos((Math.PI * 2 * angel) / 360),
                      },
                    ],
                  }}
                ></View>
              );
            })}
            <View
              style={{
                position: "absolute",
                width: 60,
                height: 60,
                borderRadius: 60,
                backgroundColor: "red",
              }}
            ></View>
          </View> */}

            <Toast
              topOffset={insets.top + 5}
              // config={toastConfig}
              onPress={() => {
                Toast.hide();
              }}
            />
            {/* <Button
            title="hello"
            onPress={() => {
              console.log(permanentWallpapers);
            }}
          /> */}
            {/* <Button
            title="go"
            onPress={() => {
              navigation.navigate("ArchiveMonth");
            }}
          /> */}
          </ImageBackground>
        </View>
      </SafeAreaProvider>
    );
  } catch (error) {
    console.log("ErrorID: E054: ", error);
    return <ErrorView Error={"ErrorID: E054"} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffcb76",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  header: {
    fontSize: 24,
    fontFamily: "Righteous_400Regular",
    color: "#fff",
    paddingBottom: 10,
    marginBottom: 80,
    borderBottomColor: "#199187",
    borderBottomWidth: 1,
    // fontWeight: "bold",
    position: "absolute",
    zIndex: 2,
    top: 45,
    left: 65,
  },
  goBack: {
    zIndex: 2,
    position: "absolute",
    top: 45,
    left: 15,
    padding: 5,
    zIndex: 91,
    // backgroundColor: "grey",
  },
  content: {
    flex: 1,
    position: "absolute",
    top: 120,
    bottom: 120,
    right: 0,
    left: 0,
    // backgroundColor: "pink",
    marginHorizontal: 20,
    // borderRadius: 10,
    zIndex: 2,
    elevation: 5,

    // marginTop: 120,
  },
  buttonStyle: {
    // position: "absolute",
    // top: height * 0.5,
    backgroundColor: "#af9199",
    elevation: 10,
    alignSelf: "center",
    // marginBottom: 180,
    width: 100,
    height: 100,
    borderRadius: 100,
  },
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
