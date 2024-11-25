import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";

export default function JoinTime({ date, style }) {
  const localTime = moment.utc(date).local();
  const isToday = localTime.isSame(moment(), "day");
  const formattedDate = isToday
    ? localTime.format("h:mm A")
    : localTime.format("MMM D, h:mm A");

  return <Text style={style}>{formattedDate}</Text>;
}

const styles = StyleSheet.create({});
