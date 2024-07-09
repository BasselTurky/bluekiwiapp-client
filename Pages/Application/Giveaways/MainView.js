import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function MainView({ navigation }) {
  const giveawayX = useSelector((state) => state.giveawayX.value);
  const giveawayZ = useSelector((state) => state.giveawayZ.value);

  return (
    <View style={styles.container}>
      <Text>Main view</Text>
      {/* <Button
            title="Go Back"
            onPress={() => {
              navigation.goBack();
            }}
          /> */}
      {/* <Button
        title="Log X"
        onPress={() => {
          console.log(giveawayX);
        }}
      /> */}
      <Button
        title="Go to X"
        onPress={() => {
          navigation.navigate("ViewX");
        }}
      />
      {/* <Button
        title="Log Z"
        onPress={() => {
          console.log(giveawayZ);
        }}
      /> */}
      <Button
        title="Go to Z"
        onPress={() => {
          navigation.navigate("ViewZ");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
