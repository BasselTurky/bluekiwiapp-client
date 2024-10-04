import { GoogleSignin } from "@react-native-google-signin/google-signin";

// Check for tokens and refresh if needed
async function handleGoogleSignIn() {
  try {
    // Get the tokens from Google Sign-In (idToken and refreshToken)
    const { idToken, accessToken, refreshToken } =
      await GoogleSignin.getTokens();

    // If idToken is valid, use it
    if (idToken) {
      const response = await sendGoogleTokenToServer(idToken);
      const data = await response.json();
      if (response.ok && data.token) {
        await handleToken(data.token, dispatch, "google");
      } else {
        resetAuth(); // Reset auth if response is not OK
      }
    } else {
      // If idToken is expired, use the refresh token to get a new one
      const newToken = await GoogleSignin.refreshToken();
      if (newToken) {
        const response = await sendGoogleTokenToServer(newToken);
        const data = await response.json();
        if (response.ok && data.token) {
          await handleToken(data.token, dispatch, "google");
        }
      } else {
        resetAuth(); // Reset auth if no valid token
      }
    }
  } catch (error) {
    resetAuth(); // Handle errors and reset authentication
  }
}
