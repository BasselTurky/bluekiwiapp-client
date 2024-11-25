import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { setAuth } from "../../../Features/auth";
import { globalReset } from "../../../GlobalActions-Redux/globalActions";

export const handleToken = async (tokens, dispatch) => {
  const latestUserUid = await SecureStore.getItemAsync("latestUserUid");
  const decoded = jwtDecode(tokens.refreshToken);

  if (decoded) {
    if (latestUserUid && decoded.username !== latestUserUid) {
      // New user logic
      await handleNewUser(decoded.username, tokens, dispatch);
    } else {
      // Existing user logic or first login
      await handleExistingUser(
        decoded.username,
        tokens,
        dispatch,
        !latestUserUid
      );
    }
  }
};

// Handle logic for a new user
const handleNewUser = async (uid, token, dispatch) => {
  // await save('latestUserUid', uid);
  await SecureStore.setItemAsync("latestUserUid", uid);
  dispatch(globalReset()); // Reset app state for the new user
  await saveTokenAndSetAuth(token, dispatch);
};

// Handle logic for existing user or first login
const handleExistingUser = async (
  uid,
  tokens,
  dispatch,
  isFirstLogin = false
) => {
  if (isFirstLogin) {
    //   await save('latestUserUid', uid);
    await SecureStore.setItemAsync("latestUserUid", uid);
    dispatch(globalReset());
  }
  await saveTokenAndSetAuth(tokens, dispatch);
};

// Save the token and update auth state
const saveTokenAndSetAuth = async (tokens, dispatch) => {
  // await save("token", token);
  const { accessToken, refreshToken } = tokens;

  await SecureStore.setItemAsync("accessToken", accessToken);
  await SecureStore.setItemAsync("refreshToken", refreshToken);
  dispatch(setAuth(true));
};
