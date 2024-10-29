import { handleToken } from "./handleToken";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

export const googleSignIn = async (dispatch, toast) => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    const response = await fetchGoogleIdToken(userInfo.idToken);
    const data = await response.json();

    if (response.ok && data.accessToken && data.refreshToken) {
      const tokens = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
      await handleToken(tokens, dispatch);
    } else {
      toast.show("Login failed!", { type: "error" });
      // throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    // TODO think about it // if auth false
    console.log(error);

    handleError(error, toast);
  }
};

// Fetch request to send the Google ID token to your backend
const fetchGoogleIdToken = async (idToken) => {
  return await fetch(`${global.server_address}/auth/sign-google-idToken`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idToken }),
  });
};

const handleError = (error, toast) => {
  toast.show("An unexpected error occurred. Please try again.", {
    type: "error",
  });
  switch (error.code) {
    case statusCodes.SIGN_IN_CANCELLED:
      console.log("User cancelled the login flow");
      break;
    case statusCodes.IN_PROGRESS:
      console.log("Operation (e.g. sign in) is in progress already");
      break;
    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
      console.log("Play services not available or outdated");
      break;
    default:
      console.error("An unexpected error occurred: ", error);
  }
};
// Handle the token, check for new user, and save to secure storage
//   const handleToken = async (token) => {
//     const latestUserUid = await SecureStore.getItemAsync("latestUserUid");
//     const decoded = jwtDecode(token);

//     if (decoded) {
//       if (latestUserUid && decoded.uid !== latestUserUid) {
//         // New user logic
//         await saveNewUser(decoded.uid, token);
//       } else {
//         // Same user or first login logic
//         await saveExistingUser(decoded.uid, token, !latestUserUid);
//       }
//     }
//   };

//   // Handle new user
//   const saveNewUser = async (uid, token) => {
//     await save("latestUserUid", uid);
//     dispatch(globalReset());
//     await saveTokenAndSetAuth(token, "google");
//   };

//   // Handle existing user
//   const saveExistingUser = async (uid, token, isFirstLogin = false) => {
//     if (isFirstLogin) {
//       await save("latestUserUid", uid);
//       dispatch(globalReset());
//     }
//     await saveTokenAndSetAuth(token, "google");
//   };

//   // Save the token and set authentication
//   const saveTokenAndSetAuth = async (token, authType) => {
//     await save("token", token);
//     dispatch(setAuth(authType));
//   };

// Handle error cases in sign-in flow
