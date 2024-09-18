export function verifyPayload(payload, schema) {
  if (payload === undefined) {
    console.error("Payload is undefined.");
    return false;
  }
  // Iterate through the schema keys to validate the corresponding values in the payload
  for (const key in schema) {
    if (!schema.hasOwnProperty(key)) continue;

    const rule = schema[key];
    const value = payload[key];

    // Check if the value is missing
    if (rule.required && value === undefined) {
      console.error(`Missing required key: ${key}`);
      return false;
    }

    // Check the type
    if (value !== undefined && typeof value !== rule.type) {
      console.error(
        `Invalid type for key: ${key}. Expected ${
          rule.type
        }, got ${typeof value}`
      );
      return false;
    }

    // Perform any additional validation for specific types
    if (rule.allowedValues && !rule.allowedValues.includes(value)) {
      console.error(
        `Invalid value for key: ${key}. Allowed values: ${rule.allowedValues.join(
          ", "
        )}`
      );
      return false;
    }

    // Add any other validation checks based on the rule
    if (rule.type === "string") {
      // Check string length
      if (rule.minLength && value.length < rule.minLength) {
        console.error(
          `String for key: ${key} is too short. Minimum length: ${rule.minLength}`
        );
        return false;
      }
      if (rule.maxLength && value.length > rule.maxLength) {
        console.error(
          `String for key: ${key} is too long. Maximum length: ${rule.maxLength}`
        );
        return false;
      }
    }

    if (rule.type === "number") {
      if (rule.min !== undefined && value < rule.min) {
        console.error(
          `Value for key: ${key} is too low. Minimum value: ${rule.min}`
        );
        return false;
      }
      if (rule.max !== undefined && value > rule.max) {
        console.error(
          `Value for key: ${key} is too high. Maximum value: ${rule.max}`
        );
        return false;
      }
    }

    // For example: range for numbers, regex for strings, etc.
    if (rule.regex && !rule.regex.test(value)) {
      console.error(`Invalid format for key: ${key}. Value: ${value}`);
      return false;
    }
  }
  return true; // If everything passes, return true
}
