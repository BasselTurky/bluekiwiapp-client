import React from "react";
import { useToast } from "react-native-toast-notifications";

const toastUtility = (message, type) => {
  const toast = useToast();

  const showToast = () => {
    toast.show(message, type);
  };

  return {
    showToast,
  };
};

export default toastUtility;
