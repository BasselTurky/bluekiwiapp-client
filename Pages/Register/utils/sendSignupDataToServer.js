const validateInput = (
  firstname,
  lastname,
  email,
  password,
  confirmPassword
) => {
  const nameRegex = /^[a-zA-Z]+$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!firstname || !lastname || !email || !password || !confirmPassword) {
    return { valid: false, message: "Fields can't be empty!" };
  }

  if (!nameRegex.test(firstname)) {
    return { valid: false, message: "Firstname should include letters only" };
  }

  if (firstname.length < 3 || firstname.length > 16) {
    return {
      valid: false,
      message: "Firstname should be between 3-16 characters",
    };
  }

  if (!nameRegex.test(lastname)) {
    return { valid: false, message: "Lastname should include letters only" };
  }

  if (lastname.length < 3 || lastname.length > 20) {
    return {
      valid: false,
      message: "Lastname should be between 3-20 characters",
    };
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

  if (password !== confirmPassword) {
    return { valid: false, message: "Password is not matching" };
  }

  return { valid: true };
};

export const sendSignupDataToServer = async (
  toast,
  navigation,
  setFirstname,
  setLastname,
  setEmail,
  setPassword,
  setConfirmPassword,
  firstname,
  lastname,
  email,
  password,
  confirmPassword
) => {
  const { valid, message } = validateInput(
    firstname,
    lastname,
    email,
    password,
    confirmPassword
  );
  console.log("validate");

  // If input validation fails, show a toast message and exit
  if (!valid) {
    toast.show(message, { type: "error" });
    return;
  }
  console.log("valid");

  try {
    console.log("try");

    // Make the API request
    const response = await fetch(`${global.server_address}/auth/signup-data`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
      }),
    });

    console.log("signup form sent");

    const data = await response.json();
    console.log(data);

    // Handle the response
    if (response.ok) {
      console.log("complete");

      toast.show("Signup Complete", { type: "success" });

      // Clear form fields
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigation.navigate("Signin");
      }, 6000);
    } else {
      toast.show(data.message || "An error occurred", { type: "error" });
    }
  } catch (error) {
    console.log("catch:", error);

    logErrorOnServer(error); // Optional: Log error for debugging
    toast.show("An unexpected error occurred. Please try again.", {
      type: "error",
    });
  }
};
