// Separate input validation function for readability
const validateEmailInput = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!email) {
    return { valid: false, message: "Please enter your email!" };
  }
  if (!emailRegex.test(email)) {
    return { valid: false, message: "Please enter a valid email format" };
  }

  return { valid: true };
};

// Function to send password reset data to the server and handle the response
export const resetPasswordHandler = async (email, toast) => {
  const { valid, message } = validateEmailInput(email);

  // If input validation fails, show a toast message and exit
  if (!valid) {
    toast.show(message, { type: "error" });
    return;
  }

  try {
    // Make the API request
    const response = await fetch(
      `${global.server_address}/auth/reset-password-data`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();

    // Handle the response
    if (response.ok) {
      if (data.message) {
        toast.show(data.message, { type: "success" });
      } else {
        toast.show("Reset password email sent successfully.", {
          type: "success",
        });
      }
    } else if (response.status === 409) {
      // Handle specific case where email doesn't exist
      toast.show(data.message || "Email doesn't exist.", { type: "error" });
    } else if (response.status === 500) {
      // Handle server error
      toast.show(
        data.message || "An internal server error occurred. Please try again.",
        { type: "error" }
      );
    } else {
      // Catch-all for unexpected errors
      toast.show("An unexpected error occurred. Please try again.", {
        type: "error",
      });
    }
  } catch (error) {
    console.error("ErrorID: E015: ", error);
    toast.show("ErrorID: E015. An unexpected error occurred.", {
      type: "error",
    });
  }
};
