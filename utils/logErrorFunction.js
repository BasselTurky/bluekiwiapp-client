export const logErrorOnServer = async (error) => {
  await fetch(`${global.server_address}/auth/logErrors`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      error: error,
    }),
  });
};
