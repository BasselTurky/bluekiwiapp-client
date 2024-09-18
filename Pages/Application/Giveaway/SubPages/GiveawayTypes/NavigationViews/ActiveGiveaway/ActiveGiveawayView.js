import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { z, zx } from "../../../../../../../utils/scaling";
import { useToast } from "react-native-toast-notifications";
import { useSocket } from "../../../../../../SocketContext/SocketContext";
import { consumeCoins } from "../../../../../../../Features/coins";
import { useNavigation } from "@react-navigation/native";

import JoinButton from "./components/JoinButton";
import SingleCircleSVG from "../../../../../../../Components/SingleCircleSVG";
import MultiCirclesSVG from "../../../../../../../Components/MultiCirclesSVG";
import TimeAgo from "../../../../../../../CustomComponents/TimeAgo";
import JoinTime from "../../../../../../../CustomComponents/JoinTime";
import Timer from "./components/Timer";
import PrizeInfoModal from "./components/PrizeInfoModal";
import {
  FontAwesome6,
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import { displayInfoModal } from "../../../../Redux States/prizeInfoModalState";

export default function ActiveGiveawayView({
  giveawayType,
  activeGiveawayString,
  participants,
}) {
  const toast = useToast();
  const dispatch = useDispatch();
  const socket = useSocket();
  const navigation = useNavigation();

  const activeGiveaway = useSelector(
    (state) => state[activeGiveawayString].value
  );

  // let activeGiveaway = null;
  if (activeGiveaway) {
    const giveawayInfo = activeGiveaway.info;
    const isUserParticipant = activeGiveaway.isUserParticipant; // boolean

    const participantsList = useSelector((state) => state[participants].value);

    const coins = useSelector((state) => state.coins.value);

    const totalParticipants = participantsList.length;
    const currentGiveawayId = giveawayInfo.id;
    const currentGiveawayType = giveawayInfo.type;

    const reward =
      totalParticipants <= 1999
        ? 10
        : Math.floor(totalParticipants / 1000) * 10;

    // const testData = [
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    //   { userUid: "Bassel Turky#7676", date: "2024-03-14 03:59:53" },
    // ];

    function handleJoinGiveaway() {
      // check coins frontend
      try {
        0;
        if (coins >= 10) {
          // set state isLoading true

          dispatch(consumeCoins(10));
          socket.emit("join-giveaway", currentGiveawayId, currentGiveawayType);
          // console.log(currentGiveawayId, currentGiveawayType);
        } else {
          console.log(`Not enough coins`);
          toast.show(`Not enough coins`, {
            type: "normal",
          });
        }
      } catch (error) {
        // log error
        console.log(error);
        toast.show(`Error: Can't join giveaway`, {
          type: "error",
        });
      }
    }
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.tableContainer}>
            <View style={styles.header}>
              <View style={styles.headerCellLeft}>
                <Text style={styles.title}>User</Text>
              </View>
              <View style={styles.headerCellRight}>
                <Text style={styles.title}>Join date</Text>
              </View>
            </View>
            <View style={styles.listContainer}>
              <FlatList
                data={participantsList}
                //   data={testArray}
                keyExtractor={(item, index) => item.userUid}
                renderItem={({ item }) => (
                  <View style={styles.row}>
                    <View style={styles.rowCellLeft}>
                      <Text style={styles.text}>{item.userUid}</Text>
                    </View>
                    <View style={styles.rowCellRight}>
                      {/* <TimeAgo date={item.date} style={styles.text} /> */}
                      <JoinTime date={item.date} style={styles.dateText} />
                    </View>
                  </View>
                )}
                style={styles.flatlist}
                // nestedScrollEnabled={true}
                ListFooterComponent={() => {
                  return (
                    <View
                      style={{
                        width: "100%",
                        height: 20,
                      }}
                    ></View>
                  );
                }}
              />
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoCell}>
              <View style={styles.iconContainer}>
                <FontAwesome6
                  name="user-group"
                  size={zx(16)}
                  color={"#735e4d"}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>
                  {totalParticipants > 999
                    ? `${totalParticipants}`
                    : `${totalParticipants} / 1000`}
                </Text>
              </View>
            </View>
            <View style={styles.infoCell}>
              <View style={styles.iconContainer}>
                <AntDesign name="gift" size={zx(22)} color={"#735e4d"} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{`$ ${reward}`}</Text>
              </View>
            </View>
            <View style={styles.infoCell}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="timer-sand"
                  size={zx(22)}
                  color="#735e4d"
                />
              </View>
              <View style={styles.textContainer}>
                {/* <Text style={styles.text}>{`$ ${reward}`}</Text> */}
                <Timer
                  style={styles.text}
                  totalParticipants={totalParticipants}
                />
              </View>
            </View>
          </View>
          <View style={styles.navContainer}>
            <View style={styles.navCells}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={styles.iconContainer}
              >
                <Entypo name="chevron-left" size={z(36)} color="#735e4d" />
              </TouchableOpacity>
            </View>
            <View style={styles.joinBtnCell}>
              <JoinButton
                isUserParticipant={isUserParticipant}
                currentGiveawayId={currentGiveawayId}
                currentGiveawayType={currentGiveawayType}
              >
                {currentGiveawayType === "z" ? (
                  <MultiCirclesSVG
                    width={zx(20)}
                    height={zx(20)}
                    fill={"#735e4d"}
                  />
                ) : (
                  <SingleCircleSVG
                    width={zx(20)}
                    height={zx(20)}
                    fill={"#735e4d"}
                  />
                )}
              </JoinButton>
            </View>
            <View style={styles.navCells}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(displayInfoModal(true));
                }}
                style={{
                  backgroundColor: "#fff9f4",
                  width: z(60),
                  height: z(35),
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 2,
                  borderRadius: 5,
                }}
              >
                <Text style={styles.prizeText}>Prize</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <PrizeInfoModal />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 15,
    paddingHorizontal: 15,
    paddingTop: 10,
    backgroundColor: "#fff",
  },
  subContainer: {
    flex: 1,
    backgroundColor: "#fff9f4",
    // zIndex: 2,
    // elevation: 5,
    // backgroundColor: "yellow",
    width: "100%",
    // backgroundColor: "#fff9f4",
    // marginHorizontal: 15,
    // marginTop: 10,
    elevation: 5,
    borderRadius: 3,
    padding: 15,
    // overflow: "hidden",
    // marginBottom: 15,
    // marginHorizontal: 15,
    // marginTop: 10,
    // marginRight: 15,
  },
  tableContainer: {
    flex: 1,
    backgroundColor: "#fff9f4",
    width: "100%",
    elevation: 1,
    borderRadius: 3,
    // padding: 15,
  },
  header: {
    height: z(60),
    flexDirection: "row",
    // elevation: 5,
    borderRadius: 3,
  },
  headerCellRight: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ebdece",
    borderLeftWidth: 2,
    borderColor: "#fff9f4",
  },
  headerCellLeft: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ebdece",
  },
  listContainer: {
    flex: 1,
  },
  row: {
    height: z(40),
    flexDirection: "row",
  },
  rowCellRight: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#ebdece",
  },
  rowCellLeft: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#ebdece",
  },
  flatlist: {
    // backgroundColor: "pink",
  },
  title: {
    fontFamily: "MontserratRegular",
    color: "#735e4d",
  },
  text: {
    fontFamily: "MontserratRegular",
    color: "#735e4d",
    fontSize: 11,
    // flexDirection: "row",
  },
  dateText: {
    fontFamily: "MontserratRegular",
    color: "#735e4d",
    fontSize: 10,
    // flexDirection: "row",
  },
  prizeText: {
    fontFamily: "MontserratRegular",
    color: "#735e4d",
    fontSize: 16,
    letterSpacing: 1,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#735e4d",
    // flexDirection: "row",
  },
  infoContainer: {
    height: z(100),
    flexDirection: "row",
    width: "100%",
    marginTop: z(15),
    // backgroundColor: "pink",
  },
  infoCell: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    // backgroundColor: "yellow",
    // width: "100%",
  },
  navContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: z(100),
    // backgroundColor: "green",
    flexDirection: "row",
  },
  navCells: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  joinBtnCell: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    // height: z(60),
  },
  iconContainer: {
    width: zx(40),
    height: zx(40),
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
    paddingHorizontal: zx(10),
    alignItems: "center",
    justifyContent: "space-between",
  },
});

{
  /* <Text>ActiveGiveawayView</Text>
      <Button
        title="Go Back"
        onPress={() => {
          navigation.goBack();
        }}
      /> */
}

{
  /* <Button
        title="Log giveaway info"
        onPress={() => {
          console.log(giveawayInfo);
        }}
      />
      <Button
        title="Total Participants"
        onPress={() => {
          console.log(totalParticipants);
        }}
      />
      <Button
        title="Current Giveaway Id"
        onPress={() => {
          console.log(currentGiveawayId);
        }}
      />
      {/* <Button
        title="Giveaway History IDs"
        onPress={() => {
          console.log(giveawayHistoryIDs);
        }}
      /> */
}
{
  /* /* <Button
        title="Can Join"
        onPress={() => {
          console.log(isUserParticipant ? false : true);
        }}
      />
      <Button
        title="log Participants"
        onPress={() => {
          // logParticipants(participants);
          console.log(participantsList);
        }}
      />
      <Button
        title="Join Giveaway"
        disabled={isUserParticipant ? true : false}
        onPress={handleJoinGiveaway}
      /> */
}
