import moment from "moment";
import { handleToken } from "./handleToken";
import { logErrorOnServer } from "../../../utils/logErrorFunction";
// Separate input validation function for readability
const validateInput = (email, password) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!email || !password) {
    return { valid: false, message: "Fields can't be empty!" };
  }
  if (!emailRegex.test(email)) {
    return { valid: false, message: "Please enter a valid email format" };
  }
  if (password.length < 8 || password.length > 16) {
    return {
      valid: false,
      message: "Password should be between 8-16 characters",
    };
  }

  return { valid: true };
};

// Function to send login data to the server and handle the response
export const sendLoginDataToServer = async (
  email,
  password,
  dispatch,
  toast
) => {
  const { valid, message } = validateInput(email, password);

  // If input validation fails, show a toast message and exit
  if (!valid) {
    toast.show(message, { type: "error" });
    return;
  }

  try {
    // Make the API request
    const response = await fetch(`${global.server_address}/auth/login-data`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();
    // logErrorOnServer(data);
    console.log(response);

    // Handle the response
    if (response.ok && data.accessToken && data.refreshToken) {
      const tokens = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
      // store tokens
      // use access token in handleToken function
      await handleToken(tokens, dispatch);
    } else {
      // logErrorOnServer(response);
      toast.show("Login failed!", { type: "error" });
    }
  } catch (error) {
    // logErrorOnServer(error);
    console.error("ErrorID E005: ", error);
    toast.show("An unexpected error occurred. Please try again.", {
      type: "error",
    });
  }
};
