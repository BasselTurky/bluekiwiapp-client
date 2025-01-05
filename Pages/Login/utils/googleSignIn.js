import { handleToken } from "./handleToken";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { logErrorOnServer } from "../../../utils/logErrorFunction";
// import auth from "@react-native-firebase/auth";

// import * as Google from "expo-auth-session/providers/google";
// import * as WebBrowser from 'expo-web-browser';

// import * as AuthSession from "expo-auth-session";
// import * as Linking from "expo-linking";
// import { useAuthRequest } from "expo-auth-session";

// const GOOGLE_CLIENT_ID =
//   "109153830656-0u2bb0c7o9dcppqots1i4nn9tq56unok.apps.googleusercontent.com";
// https://auth.expo.io/@bluekiwi/bluekiwi

// com.basselturky.bluekiwiapp:/oauthredirect

// const redirectUri = AuthSession.makeRedirectUri({
//   native: "bluekiwi://oauthredirect",
// });

// const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=token&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&scope=profile%20email`;

// import { firebase } from "../../../firebaseConfig";
// GoogleSignin.configure({
//   webClientId:
//     "525928726797-45m49p0kdbcspgsicp72cl6d67fcabk0.apps.googleusercontent.com",
//   // "525928726797-45m49p0kdbcspgsicp72cl6d67fcabk0.apps.googleusercontent.com",
// });
// GoogleSignin.configure({
//   webClientId:
//     "109153830656-r8ua27ajsil97jn3smhq75i0q8irooq2.apps.googleusercontent.com",
//   // androidClientId:
//   //   "109153830656-vst5eac0hgrkq7499ekbkspk68r2c69t.apps.googleusercontent.com",
// });

// const [req, res, promptAsync] = Google.useAuthRequest({
//   clientId:'109153830656-0u2bb0c7o9dcppqots1i4nn9tq56unok.apps.googleusercontent.com',
//   androidClientId:'109153830656-1isvohatbn30rmbtd7q5tdbgib6j6unb.apps.googleusercontent.com'

// });

// const [req, res, promptAsync] = Google.useIdTokenAuthRequest({
//   clientId:
//     "109153830656-1isvohatbn30rmbtd7q5tdbgib6j6unb.apps.googleusercontent.com",
// });

export const googleSignIn = async (dispatch, toast, idToken) => {
  try {
    // const result = await AuthSession.startAsync({ authUrl });

    // if (result.type === "success") {
    //   const { access_token } = result.params;
    //   // Fetch user info
    //   const response = await fetch(
    //     "https://www.googleapis.com/userinfo/v2/me",
    //     {
    //       headers: { Authorization: `Bearer ${access_token}` },
    //     }
    //   );
    //   const user = await response.json();
    //   // setUserInfo(user);
    // }

    // await GoogleSignin.hasPlayServices();
    // const userInfo = await GoogleSignin.signIn();

    // const googleCredential = auth.GoogleAuthProvider.credential(
    //   userInfo.data.idToken
    // );

    // await auth().signInWithCredential(googleCredential);
    // console.log("Login successful");

    // const idToken = userInfo.data.idToken

    //     const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);

    //     const userCredential = await firebase.auth().signInWithCredential(googleCredential);
    // const idToken_ = await userCredential.user.getIdToken(); // Retrieve the idToken
    // console.log("userinfo : ", userInfo);

    // const response = await fetchGoogleIdToken(userInfo.data.idToken);
    const response = await fetchGoogleIdToken(idToken);
    const data = await response.json();

    if (response.ok && data.accessToken && data.refreshToken) {
      const tokens = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
      await handleToken(tokens, dispatch);
    } else {
      console.log("failed");

      logErrorOnServer(response);
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
  // console.log("idToken:  ", idToken);

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
  logErrorOnServer(error);
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
