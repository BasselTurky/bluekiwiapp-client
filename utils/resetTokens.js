import * as SecureStore from "expo-secure-store";

async function deleteFromSecureStore(key) {
  await SecureStore.deleteItemAsync(key);
}

export const resetTokens = async () => {
  await deleteFromSecureStore("accessToken");
  await deleteFromSecureStore("refreshToken");
};
