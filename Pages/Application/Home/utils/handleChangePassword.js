import { logErrorOnServer } from "../../../../utils/logErrorFunction";

const validatePasswordInput = (
  currentPassword,
  newPassword,
  confirmPassword
) => {
  if (!currentPassword || !newPassword || !confirmPassword) {
    return { valid: false, message: "Fields can't be empty!" };
  }
  if (newPassword !== confirmPassword) {
    return { valid: false, message: "Passwords do not match!" };
  }
  if (
    currentPassword.length < 8 ||
    currentPassword.length > 16 ||
    newPassword.length < 8 ||
    newPassword.length > 16
  ) {
    return {
      valid: false,
      message: "Password should be between 8-16 characters",
    };
  }
  return { valid: true };
};

export const handlePasswordUpdate = async (
  currentPassword,
  newPassword,
  confirmPassword,
  socket,
  toast
) => {
  try {
    const { valid, message } = validatePasswordInput(
      currentPassword,
      newPassword,
      confirmPassword
    );

    // If input validation fails, show a toast message and exit
    if (!valid) {
      toast.show(message, { type: "error" });
      return;
    }

    socket.emit("update-password", {
      currentPassword,
      newPassword,
    });
  } catch (error) {
    logErrorOnServer(error);
  }
};
