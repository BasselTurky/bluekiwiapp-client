export const userSchema = {
  username: {
    type: "string",
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  email: {
    type: "string",
    required: true,
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  age: {
    type: "number",
    required: true,
    min: 18,
    max: 100,
  },
};

export const claimedRewardSchema = {
  giveawayId: {
    type: "number",
    required: true,
    min: 1,
  },
  key: {
    type: "string",
    required: true,
    allowedValues: ["inProgress", "winner"],
  },
  value: {
    type: "boolean",
    required: true,
  },
};
