import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";

export default function Form() {
  return (
    <View style={styles.form}>
      <Text style={styles.header}>Registeration</Text>
      <TextInput style={styles.textinput} placeholder="Name" />
      <TextInput style={styles.textinput} placeholder="Name" />
      <TextInput style={styles.textinput} placeholder="Email" />
      <TextInput style={styles.textinput} placeholder="Password" />
      <TextInput
        style={styles.textinput}
        secureTextEntry
        placeholder="paypal email"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    alignSelf: "stretch",
  },
  header: {
    fontSize: 24,
    color: "#fff",
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: "#199187",
    borderBottomWidth: 1,
  },
  textinput: {
    alignSelf: "stretch",
    height: 40,
    marginBottom: 30,
    color: "#fff",
    borderBottomColor: "#f8f8f8",
    borderBottomWidth: 1,
  },
});
