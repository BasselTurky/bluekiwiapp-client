import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { setAuth } from "../../../Features/auth";
import { globalReset } from "../../../GlobalActions-Redux/globalActions";

// Function to handle token expiration checks
const checkTokenExpiration = (token) => {
  const decoded = jwtDecode(token);
  const expirationTime = decoded.exp * 1000; // Convert to milliseconds

  // Check if token is about to expire (within 5 minutes)
  return expirationTime - Date.now() < 5 * 60 * 1000;
};

// Function to handle secure storage of the refresh token
async function saveRefreshToken(token) {
  await SecureStore.setItemAsync("refreshToken", token);
}

// Function to get refresh token from secure storage
async function getRefreshToken() {
  return await SecureStore.getItemAsync("refreshToken");
}

// Function to refresh access token
async function refreshAccessToken() {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  const response = await fetch(`${global.server_address}/auth/refresh-token`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  const data = await response.json();

  if (data.accessToken) {
    // Save new access and refresh tokens
    saveToMemory("accessToken", data.accessToken);
    await saveRefreshToken(data.refreshToken);

    return data.accessToken;
  } else {
    throw new Error("Failed to refresh token");
  }
}

// Function to handle API requests with token refresh
async function apiRequestWithAuth(endpoint, options = {}) {
  let token = getFromMemory("accessToken");

  // Check if token is expired
  if (checkTokenExpiration(token)) {
    try {
      token = await refreshAccessToken(); // Refresh token if expired
    } catch (error) {
      console.error("Failed to refresh token:", error);
      resetAuth();
      return;
    }
  }

  // Proceed with the API request
  return fetch(`${global.server_address}/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}

// Function to handle logout
async function handleLogout() {
  await SecureStore.deleteItemAsync("refreshToken"); // Clear refresh token
  clearMemory("accessToken"); // Clear access token from memory
  dispatch(setAuth(false));
  dispatch(globalReset());
}

// Memory management (you can use a better storage if needed)
let inMemoryStorage = {};

// Helper functions for memory storage
function saveToMemory(key, value) {
  inMemoryStorage[key] = value;
}

function getFromMemory(key) {
  return inMemoryStorage[key];
}

function clearMemory(key) {
  delete inMemoryStorage[key];
}

// Function to handle secure store of refresh token
async function handleLogin(responseData) {
  const { accessToken, refreshToken } = responseData;

  saveToMemory("accessToken", accessToken); // Save access token in memory
  await saveRefreshToken(refreshToken); // Save refresh token in secure storage

  dispatch(setAuth("default")); // Update auth state
}

// ```````````````````````````````````````````````

useEffect(() => {
  const checkSession = async () => {
    const refreshToken = await SecureStore.getItemAsync("refreshToken");

    if (refreshToken) {
      try {
        // Send refresh token to backend to get a new access token
        const response = await axios.post(
          "https://yourbackend.com/refresh-token",
          { refreshToken }
        );

        // Store new access token
        const newAccessToken = response.data.accessToken;
        await SecureStore.setItemAsync("accessToken", newAccessToken);

        setAuth(true); // User is authenticated
      } catch (error) {
        console.error("Session expired or refresh failed", error);
        setAuth(false); // Force re-login
      }
    } else {
      setAuth(false); // No refresh token, user must login
    }
  };

  checkSession();
}, []);

// ````````````````````````````````````````````````````````````````

import React, { useEffect, useState } from "react";
import { ToastProvider } from "react-native-toast-notifications";
import { useAuth } from "./auth-context"; // Custom hook to manage auth
import { SocketProvider } from "./socket-context";
import * as SecureStore from "expo-secure-store";
import Application from "./Application";
import LoginScreen from "./LoginScreen";
import axios from "axios";

const App = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const refreshToken = await SecureStore.getItemAsync("refreshToken");

      if (refreshToken) {
        try {
          // Check and refresh the access token if needed
          const response = await axios.post(
            "https://yourbackend.com/refresh-token",
            { refreshToken }
          );
          const newAccessToken = response.data.accessToken;

          await SecureStore.setItemAsync("token", newAccessToken);
          setAuth(true); // User is now authenticated
        } catch (err) {
          console.error("Session expired or refresh failed", err);
          setAuth(false); // Force re-login
        }
      } else {
        setAuth(false); // No refresh token, user must login
      }
    };

    checkSession();
  }, []);

  return auth ? (
    <ToastProvider>
      <SocketProvider>
        <Application />
      </SocketProvider>
    </ToastProvider>
  ) : (
    <LoginScreen onLoginSuccess={handleLoginSuccess} />
  );
};

const handleLoginSuccess = async (tokens) => {
  const { accessToken, refreshToken } = tokens;
  await SecureStore.setItemAsync("token", accessToken);
  await SecureStore.setItemAsync("refreshToken", refreshToken);
  setAuth(true); // Set auth to true after login success
};

export default App;
