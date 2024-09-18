import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import moment from "moment";

export default function Timer({ style, totalParticipants }) {
  const [timeLeft, setTimeLeft] = useState("");
  // if total users more than 1000|
  // else display null
  useEffect(() => {
    if (totalParticipants <= 1000) {
      setTimeLeft("-");
      return;
    }

    const calculateTimeLeft = () => {
      // const now = moment("2024-09-16T02:00:01+02:00");
      const now = moment();
      // const midnight = moment().startOf("day").add(1, "day");
      const midnight = moment().utc().startOf("day").add(1, "day");
      const duration = moment.duration(midnight.diff(now));

      const hours = duration.hours().toString().padStart(2, "0");
      const minutes = duration.minutes().toString().padStart(2, "0");
      const seconds = duration.seconds().toString().padStart(2, "0");

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    // Initial calculation
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [totalParticipants]);
  return <Text style={style}>{timeLeft}</Text>;
}

const styles = StyleSheet.create({});
