import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";

import { Button as PaperButton } from "react-native-paper";
import { zx, z } from "../../../../../../../../utils/scaling";
import { useSelector, useDispatch } from "react-redux";
import { useSocket } from "../../../../../../../SocketContext/SocketContext";
import { useToast } from "react-native-toast-notifications";
import { hidePrizeModal } from "../../../../../Redux States/prizeModalState";
import CloseThinSVG from "../../../../../../../../Components/CloseThinSVG";
export default function PrizeModal({ giveawayId }) {
  // State to track selected gift option and user input
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const socket = useSocket();
  const toast = useToast();
  const selectedGiveaway = useSelector((state) => state.selectedGiveaway.value);
  // Available gift options
  const giftOptions = [
    "PayPal",
    "Payeer",
    "Amazon Gift Card",
    "Google Play Gift Card",
  ];

  // Handler for when an option is selected
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    console.log(selectedOption);
    console.log(inputValue);

    setInputValue(""); // Reset the input field when changing options
  };

  const handleSubmit = () => {
    // Define regex patterns
    const payeerIdRegex = /^P\d{6,12}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let isValid = false;

    // Validate based on selected option
    switch (selectedOption) {
      case "Payeer":
        isValid = payeerIdRegex.test(inputValue);
        break;
      case "PayPal":
      case "Amazon Gift Card":
      case "Google Play Gift Card":
        isValid = emailRegex.test(inputValue);
        break;
      default:
        isValid = false;
        break;
    }

    if (isValid) {
      if (selectedGiveaway && selectedGiveaway.giveawayId) {
        console.log(`
            emit 
            ${selectedGiveaway.giveawayId}
            ${selectedOption}
            ${inputValue}
            `);
        socket.emit(
          "claim-reward",
          selectedGiveaway.giveawayId,
          selectedOption,
          inputValue
        );
        console.log("emit");
      }

      console.log("Valid input. Proceeding with submission.");

      dispatch(hidePrizeModal(false));
      // Example: dispatch(submitFormAction(inputValue, selectedOption));
    } else {
      console.log("Invalid input. Please check your entry.");
      toast.show("Invalid input. Please check your entry.", {
        type: "error",
        duration: 3000,
      });
    }
  };

  const renderInputField = () => {
    switch (selectedOption) {
      case "PayPal":
        return (
          <TextInput
            style={styles.input}
            placeholder="Enter your PayPal Email"
            value={inputValue}
            onChangeText={setInputValue}
          />
        );
      case "Payeer":
        return (
          <TextInput
            style={styles.input}
            placeholder="Enter Payeer ID (e.g., P123456789)"
            value={inputValue}
            onChangeText={setInputValue}
          />
        );
      case "Amazon Gift Card":
      case "Google Play Gift Card":
        return (
          <TextInput
            style={styles.input}
            placeholder="Enter your Email"
            value={inputValue}
            onChangeText={setInputValue}
          />
        );
      default:
        return null;
    }
  };

  return (
    <TouchableNativeFeedback disabled={true}>
      <View style={styles.modal}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Select Your Gift</Text>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => {
                dispatch(hidePrizeModal(false));
              }}
            >
              <CloseThinSVG width={16} height={16} fill="black" />
            </TouchableOpacity>
          </View>

          {giftOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                selectedOption === option && styles.selectedOptionButton,
              ]}
              onPress={() => handleOptionSelect(option)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedOption === option && styles.selectedOptionText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
          {renderInputField()}
          {selectedOption && inputValue ? (
            <PaperButton
              labelStyle={styles.btnText}
              contentStyle={{
                flexDirection: "row-reverse",
                justifyContent: "center",
                alignItems: "center",
              }}
              style={{
                marginTop: 5,
                marginBottom: 20,
                borderRadius: 5,
              }}
              mode="elevated"
              buttonColor="#84c4ff"
              onPress={handleSubmit}
            >
              Submit
            </PaperButton>
          ) : null}
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  modal: {
    ...StyleSheet.absoluteFillObject,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  container: {
    width: "80%",
    backgroundColor: "#ffffff",
    padding: 20,
    elevation: 5,
    borderRadius: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: "MontserratLight",
  },
  closeIcon: {
    width: zx(40),
    height: zx(40),
    justifyContent: "center",
    alignItems: "center",
  },
  optionButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  selectedOptionButton: {
    backgroundColor: "#4CAF50",
  },
  optionText: {
    fontFamily: "MontserratLight",
    fontSize: 16,
  },
  selectedOptionText: {
    color: "#fff",
  },
  input: {
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontFamily: "MontserratLight",
  },
  btnText: {
    fontFamily: "MontserratLight",
    fontSize: 16,
    letterSpacing: 1,
    color: "white",
  },
});
