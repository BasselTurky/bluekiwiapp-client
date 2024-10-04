import jwtDecode from "jwt-decode";

// Helper function to decode token and set a refresh timeout
const scheduleTokenRefresh = async (token, refreshTokenFunction) => {
  const decoded = jwtDecode(token);
  const expiryTime = decoded.exp * 1000; // Convert to milliseconds
  const refreshTime = expiryTime - 5 * 60 * 1000; // Refresh 5 minutes before expiry

  const currentTime = Date.now();

  if (refreshTime > currentTime) {
    setTimeout(async () => {
      await refreshTokenFunction(); // Call the refresh token function
    }, refreshTime - currentTime); // Schedule refresh just before expiration
  } else {
    // Token is already expired or close to expiration, refresh immediately
    await refreshTokenFunction();
  }
};
