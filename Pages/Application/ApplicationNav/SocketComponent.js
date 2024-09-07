import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { downloadImage } from "../../../utils/downloadImage";

import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { useSocket } from "../../SocketContext/SocketContext";
import { useToast } from "react-native-toast-notifications";
import { useDispatch, useSelector } from "react-redux";

import { setAuth } from "../../../Features/auth";
import { setUserData } from "../../../Features/userData";
import { setCoins } from "../../../Features/coins";
import { addCoin } from "../../../Features/coins";
import { setGiveawayX } from "../../../Features/giveawayX";
import { setGiveawayZ } from "../../../Features/giveawayZ";
import { addUserToGiveawayListX } from "../../../Features/giveawayX";
import { addUserToGiveawayListZ } from "../../../Features/giveawayZ";
import { setActiveGiveawayX } from "../Giveaway/Redux States/activeGiveawayX";
import { updateIsUserParticipantX } from "../Giveaway/Redux States/activeGiveawayX";
import { setActiveGiveawayZ } from "../Giveaway/Redux States/activeGiveawayZ";
import { updateIsUserParticipantZ } from "../Giveaway/Redux States/activeGiveawayZ";
import { setHistory } from "../../../Features/giveawayHistory";
import { setParticipantsX } from "../Giveaway/Redux States/participantsGiveawayX";
import { setParticipantsZ } from "../Giveaway/Redux States/participantsGiveawayZ";
import { addParticipantsX } from "../Giveaway/Redux States/participantsGiveawayX";
import { addParticipantsZ } from "../Giveaway/Redux States/participantsGiveawayZ";
import { setHistoryGiveaways } from "../Giveaway/Redux States/historyGiveaways";
import { addHistoryGiveaaway } from "../Giveaway/Redux States/historyGiveaways";

import { persistor } from "../../../store";
import storage from "redux-persist/lib/storage";

async function deleteValueFor(key) {
  await SecureStore.deleteItemAsync(key);
}

export default function SocketComponent() {
  // TODO clear redux:
  // persistor.purge()

  const toast = useToast();
  const dispatch = useDispatch();
  const socket = useSocket();

  const activeGiveawayX = useSelector((state) => state.activeGiveawayX.value);
  const activeGiveawayZ = useSelector((state) => state.activeGiveawayZ.value);
  const participantsGiveawayX = useSelector(
    (state) => state.participantsGiveawayX
  );
  const participantsGiveawayZ = useSelector(
    (state) => state.participantsGiveawayZ
  );
  const historyGiveaways = useSelector((state) => state.historyGiveaways.value);

  function showToast(type, message) {
    toast.show(message, {
      type: type,
      duration: 3000,
      animationType: "slide-in",
      placement: "top",
    });
  }

  async function addUser() {
    console.log("addUser");
    // console.log(isSocketConnected);
    socket.emit("add-user");
    // socket.emit("get-giveaways-info"); // TODO edit
    // socket.emit("get-user-giveaway-history"); // TODO update history
  }

  async function fetchActiveGiveaway(type) {
    const activeGiveaway = type === "x" ? activeGiveawayX : activeGiveawayZ;

    if (activeGiveaway === null) {
      // get giveaway
      socket.emit("get-active-giveaway", type);
      return;
    }

    if (activeGiveaway) {
      const giveawayId = activeGiveaway.id;
      // send id to backend and check id
      socket.emit("check-giveawayId", giveawayId, type);
      return;
    }
  }

  async function fetchAllParticipants(type) {
    const participants =
      type === "x" ? participantsGiveawayX : participantsGiveawayZ;

    if (participants.value === null) {
      // get all participants in active giveaway
      socket.emit("get-all-participants", type);
      return;
    }

    if (participants.value) {
      // get length
      const totalParticipants = participants.value.length;
      const giveawayId = participants.giveawayId;

      socket.emit(
        "get-current-participants",
        totalParticipants,
        giveawayId,
        type
      );
      return;
    }
  }

  async function fetchGiveawayHistory() {
    if (historyGiveaways === null) {
      socket.emit("get-history-giveaways", "set", 0);
      return;
    }

    if (historyGiveaways) {
      const offset = historyGiveaways.length;
      socket.emit("get-history-giveaways", "add", offset);
      return;
    }
  }

  useEffect(() => {
    if (socket) {
      socket.on("connect", async () => {
        console.log("socket connected");
        addUser();
        fetchActiveGiveaway("x");
        fetchActiveGiveaway("z");
        fetchAllParticipants("x");
        fetchAllParticipants("z");
        fetchGiveawayHistory();
        // setIsSocketConnected(true);
      });
      socket.on("connect_error", (error) => {
        console.error("Connection failed:", error.message);
        // Perform error handling or retry logic here
      });

      socket.on("disconnect", async () => {
        // force logout the user
        // deleteValueFor("token");
        // console.log("token deleted");
        // await GoogleSignin.signOut();
        // console.log("google signed out");
        // dispatch(setAuth(false));
        // delete token
        // toast.show("Lost connection with the server", {
        //   type: "normal",
        // });
      });

      socket.on("force-disconnect", async () => {
        // force logout the user
        deleteValueFor("token");
        // console.log("token deleted");
        await GoogleSignin.signOut();
        // console.log("google signed out");
        dispatch(setAuth(false));
        // delete token
      });

      socket.on("toasts", (toast_object) => {
        toast.show(toast_object.message, {
          type: toast_object.type,
          duration: 3000,
        });
        // set false
      });

      socket.on("userInfo", async (userInfo) => {
        // console.log(" user");
        let userDataObj = {
          name: userInfo.name,
          email: userInfo.email,
          uid: userInfo.uid,
          coins: userInfo.coins,
          // uid: userInfo.uid,
        };
        dispatch(setUserData(userDataObj));
        dispatch(setCoins(userDataObj.coins));
        console.log("user added");
        await SplashScreen.hideAsync();
      });

      //   socket.on("giveaway-history", (giveaway_history_array) => {
      //     // convert array to object
      //     // console.log(giveaway_history_array);

      //     const giveaway_history_object = {};

      //     giveaway_history_array.forEach((giveaway_object) => {
      //       giveaway_history_object[giveaway_object.giveawayId] = giveaway_object;
      //     });

      //     // store history in redux
      //     dispatch(setHistory(giveaway_history_object));
      //     // dispatch(setHistory(giveaway_history_array));
      //   });

      // socket.on("add-giveaway-to-history", () => {});

      //   socket.on("giveawayInfo", (giveawayX, giveawayZ) => {
      //     // set state false
      //     dispatch(setGiveawayX(giveawayX)); // {id:giveawayid, type:'z', participants: [{id:ignore, uid: userid, date: join date},{}]}
      //     dispatch(setGiveawayZ(giveawayZ));
      //   });

      //   socket.on("active-giveaway-x", (giveawayX) => {
      //     // save in redux state
      //     dispatch(setActiveGiveawayX(giveawayX));
      //   });
      //   socket.on("active-giveaway-z", (giveawayZ) => {
      //     // save in another redux state
      //     dispatch(setActiveGiveawayZ(giveawayZ));
      //   });

      socket.on("active-giveaway", (activeGiveaway, type) => {
        switch (type) {
          case "x":
            dispatch(setActiveGiveawayX(activeGiveaway));
            break;
          case "z":
            dispatch(setActiveGiveawayZ(activeGiveaway));
            break;
          default:
            console.log(`Unknown type: ${type} active-giveaway`);
        }
      });

      socket.on("all-participants-giveaway", (participantsObject, type) => {
        switch (type) {
          case "x":
            dispatch(setParticipantsX(participantsObject));
            break;
          case "z":
            dispatch(setParticipantsZ(participantsObject));
            break;
          default:
            console.log(`Unknown type: ${type} all-participants-giveaway`);
        }
      });

      socket.on("participant-joined", (participantInfo, type) => {
        switch (type) {
          case "x":
            dispatch(addParticipantsX(participantInfo));
            break;
          case "z":
            dispatch(addParticipantsZ(participantInfo));
            break;
          default:
            console.log(`Unknown type: ${type} participant-joined`);
        }
      });

      socket.on("user-joined-giveaway", (type) => {
        switch (type) {
          case "x":
            dispatch(updateIsUserParticipantX(true));
            break;
          case "z":
            dispatch(updateIsUserParticipantZ(true));
            break;
          default:
            console.log(`Unknown type: ${type} user-joined-giveaway`);
        }
      });

      socket.on("history-giveaways", (eventType, historyGiveaways) => {
        switch (eventType) {
          case "set":
            // handle get history
            dispatch(setHistoryGiveaways(historyGiveaways));
            break;
          case "add":
            // handle get rest
            dispatch(addHistoryGiveaaway(historyGiveaways));
            break;
          default:
            console.log(`Unknown type: ${type} history-giveaways`);
        }
      });

      socket.on(
        "start-download",
        (updated_coins, type, item, year, month, wallpaper_id_) => {
          downloadImage(
            updated_coins,
            type,
            item,
            year,
            month,
            wallpaper_id_,
            dispatch,
            showToast
            // setToastData
          );
        }
      );

      socket.on("coin-saved", (new_coin_amount) => {
        dispatch(addCoin(new_coin_amount));
      });

      return () => {
        socket.off("connect"); // Unsubscribe from the "connect" event
        socket.removeAllListeners();
        socket.close();
        // setIsSocketConnected(false);
      };
    }
  }, [socket]);

  return null;
}
