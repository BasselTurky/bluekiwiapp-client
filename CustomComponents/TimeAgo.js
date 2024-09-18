import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";

export default function TimeAgo({ date, style }) {
  const [timeAgo, setTimeAgo] = useState(moment(date).fromNow());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeAgo(moment(date).fromNow());
    }, 60000); // Update every 60 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [date]);

  return <Text style={style}>{timeAgo}</Text>;
}

const styles = StyleSheet.create({});
