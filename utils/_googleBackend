Sure! Below is the complete code for the workflow you described, with improvements for handling Google Sign-In without OAuth, combining checks for `email` and `googleId`, and adding security for storing refresh tokens.

### **1. Extract Google Payload (No OAuth)**

First, verify the `idToken` from Google and extract the payload. This step will ensure that the `idToken` is valid and hasn't expired.

```javascript
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyGoogleIdToken(idToken) {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();

  return {
    googleId: payload.sub, // This is the googleId
    email: payload.email,
    name: payload.name, // Optional if you want to store it
  };
}
```

### **2. Check if `email` or `googleId` Exists in DB**

This combined query checks if either the `email` or `googleId` exists. Based on the result, you'll decide the next step.

```javascript
async function findUserByGoogleOrEmail(googleId, email) {
  const query = `
    SELECT * FROM users WHERE email = ? OR googleid = ?
  `;
  const [rows] = await pool.execute(query, [email, googleId]);

  if (rows.length > 0) {
    return rows[0];
  } else {
    return null;
  }
}
```

### **3. Create New User in DB**

If the user doesn't exist in the database (neither `googleId` nor `email` is found), create a new user record.

```javascript
async function createUser(email, googleId, name) {
  const query = `
    INSERT INTO users (email, googleid, name) VALUES (?, ?, ?)
  `;
  await pool.execute(query, [email, googleId, name]);
}
```

### **4. Update Existing User to Add `googleId`**

If the user exists but only the email exists (they used email/password login before), update their record with the `googleId`.

```javascript
async function updateUserWithGoogleId(email, googleId) {
  const query = `
    UPDATE users SET googleid = ? WHERE email = ?
  `;
  await pool.execute(query, [googleId, email]);
}
```

### **5. Create Access and Refresh Tokens**

Once you verify and handle the user, create JWT access and refresh tokens and store the refresh token securely in the database.

```javascript
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Encryption for refresh token (AES-256-CBC)
const ENCRYPTION_KEY = process.env.REFRESH_TOKEN_ENCRYPTION_KEY; // Must be 32 bytes
const IV_LENGTH = 16; // For AES, this is always 16

function encryptToken(token) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY, "hex"),
    iv
  );
  let encrypted = cipher.update(token);

  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function generateAccessToken(user) {
  return jwt.sign(
    { userId: user.uid, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
}

function generateRefreshToken(user) {
  const token = jwt.sign(
    { userId: user.uid, email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  return encryptToken(token);
}

async function storeRefreshTokenInDB(refreshToken, email) {
  const query = `
    UPDATE users SET refreshToken = ? WHERE email = ?
  `;
  await pool.execute(query, [refreshToken, email]);
}
```

### **6. Google Sign-In API Logic**

Now, bring everything together into your Google Sign-In API.

```javascript
app.post("/auth/google-signin", async (req, res) => {
  const { idToken } = req.body;

  try {
    // Step 1: Verify Google Id Token
    const { googleId, email, name } = await verifyGoogleIdToken(idToken);

    // Step 2: Check if the user exists by googleId or email
    const user = await findUserByGoogleOrEmail(googleId, email);

    if (!user) {
      // Step 3: If neither googleId nor email exists, create a new user
      await createUser(email, googleId, name);
    } else if (user.email === email && !user.googleid) {
      // Step 4: If the email exists but googleId is missing, update the record
      await updateUserWithGoogleId(email, googleId);
    }

    // Step 5: Generate Access and Refresh Tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Step 6: Store encrypted refresh token in DB
    await storeRefreshTokenInDB(refreshToken, email);

    // Step 7: Send tokens back to the client
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
```

### **7. Error Handling for Refresh Token Storage**

If there's an error while storing the refresh token in the database, catch it and respond with an error message.

```javascript
async function storeRefreshTokenInDB(refreshToken, email) {
  const query = `
    UPDATE users SET refreshToken = ? WHERE email = ?
  `;
  const [rows] = await pool.execute(query, [refreshToken, email]);

  if (rows.affectedRows === 0) {
    throw new Error("Failed to store refresh token");
  }
}
```

### **Workflow Summary**:

1. The frontend sends the `idToken` from Google Sign-In.
2. The backend verifies the `idToken` and extracts `googleId` and `email`.
3. You check if either the `googleId` or `email` exists in the database:
   - If neither exists, it's a new user, so you create a new record.
   - If `email` exists but not `googleId`, you update the user with `googleId`.
   - If both exist, continue.
4. You create access and refresh tokens, encrypt the refresh token, and store it in the database.
5. Send the tokens back to the frontend for secure storage.

### Improvements:

- **Efficient DB Query**: Only one query to check both `email` and `googleId`.
- **Token Security**: Encrypt refresh tokens before storing them in the database.
- **Error Handling**: Better handling of DB update errors for refresh token storage.

Let me know if you'd like further tweaks!

```javascript
if (!user) {
  // Step 3: If neither googleId nor email exists, create a new user
  await createUser(email, googleId, name);
} else if (user.email === email && !user.googleid) {
  // Step 4: If email exists but googleId is missing, link googleId to the account
  await linkGoogleIdToUser(user.uid, googleId); // Link the googleId to this user in the DB
} else if (user.email === email && user.googleid !== googleId) {
  // Step 5: If the googleId does not match, reject the sign-in attempt
  return res.status(400).json({
    message:
      "This email is already linked to a different Google account. Please use the correct account.",
  });
}
```

//--------------------------------------------------------

Here’s a final implementation of the Google Sign-In API logic without OAuth and with the safeguard edge case check. The flow covers the main points: new users, users who previously signed in with email/password, existing Google users, and edge cases.

```javascript
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const pool = require("./db"); // Your MySQL pool configuration
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function findUserByEmail(email) {
  const query = `SELECT * FROM users WHERE email = ?`;
  const [rows] = await pool.execute(query, [email]);
  return rows.length > 0 ? rows[0] : null;
}

async function findUserByGoogleId(googleId) {
  const query = `SELECT * FROM users WHERE googleid = ?`;
  const [rows] = await pool.execute(query, [googleId]);
  return rows.length > 0 ? rows[0] : null;
}

async function createUser({ email, googleId }) {
  const query = `INSERT INTO users (email, googleid) VALUES (?, ?)`;
  await pool.execute(query, [email, googleId]);
}

async function updateGoogleIdForUser(email, googleId) {
  const query = `UPDATE users SET googleid = ? WHERE email = ?`;
  await pool.execute(query, [googleId, email]);
}

function generateAccessToken(user) {
  return jwt.sign(
    { userId: user.uid, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
}

function generateRefreshToken(user) {
  return jwt.sign(
    { userId: user.uid, email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
}

// Google sign-in API
app.post("/auth/google-signin", async (req, res) => {
  const { idToken } = req.body;

  try {
    // Verify idToken from Google
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, sub: googleId } = ticket.getPayload(); // sub is the googleId

    // Step 1: Check if user exists by googleId
    let user = await findUserByGoogleId(googleId);

    if (!user) {
      // Step 2: If no googleId, check by email
      user = await findUserByEmail(email);

      if (!user) {
        // Step 3: If no email or googleId, it's a new user, create new user
        await createUser({ email, googleId });
        user = await findUserByEmail(email); // fetch the newly created user
      } else if (user.email === email && !user.googleid) {
        // Step 4: If email exists but no googleId, link Google account
        await updateGoogleIdForUser(email, googleId);
      } else if (user.email === email && user.googleid !== googleId) {
        // Step 5: If the googleId does not match, reject the sign-in attempt
        return res.status(400).json({
          message:
            "This email is already linked to a different Google account. Please use the correct account.",
        });
      }
    }

    // Step 6: Generate tokens and send them to frontend
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Optionally store refresh token in DB
    const updateRefreshTokenQuery = `UPDATE users SET refreshToken = ? WHERE email = ?`;
    await pool.execute(updateRefreshTokenQuery, [refreshToken, email]);

    return res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.error("Google sign-in error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
```

### Key Steps in the Code:

1. **Extract and Verify the Google ID Token**: The `idToken` is sent from the frontend, and we verify it using Google’s `OAuth2Client` (even though we're not using full OAuth, we still need this for idToken verification).
2. **Check if User Exists by `googleId`**:

   - If the user does not exist by `googleId`, check for their email.
   - If neither exists, create a new user with their Google account.

3. **Email Exists but no Google Account**: If the email exists but the `googleId` is missing, the user might have signed in using email/password before. We link their Google account by updating the database.

4. **Mismatched Google ID**: If the email exists but the `googleId` is different, we reject the login attempt.

5. **Generate Access and Refresh Tokens**: Once a valid user is identified or created, access and refresh tokens are generated and sent to the frontend.

### Handling Edge Cases:

- If the Google ID (`googleId`) and email combination doesn't match any records, or there's a conflict, the system safely handles it by ensuring that users don’t accidentally link the wrong Google account.

### Improvements:

1. **Token Encryption**: You could still implement token encryption if desired (especially for storing refresh tokens in the database).
2. **Secure Storage**: The frontend should securely store tokens in `expo-secure-store` or a similar secure storage mechanism.

//--------------------------------------------------

```javascript
async function generateUniqueId(name) {
  // Helper function to check if a specific discriminator exists for a given name
  async function isDiscriminatorTaken(name, discriminator) {
    const query = `
      SELECT EXISTS (
        SELECT 1 FROM users WHERE name = ? AND discriminator = ?
      ) AS discriminatorExists
    `;
    const [rows] = await pool.execute(query, [name, discriminator]);
    return rows[0].discriminatorExists;
  }

  // Try to generate a unique discriminator, max 10 attempts
  let discriminator;
  for (let attempt = 0; attempt < 10; attempt++) {
    // Generate random number between 0001 and 9999
    const randomNumber = Math.floor(Math.random() * 9999) + 1;
    discriminator = randomNumber.toString().padStart(4, "0");

    // Check if the discriminator is already taken for this name
    const taken = await isDiscriminatorTaken(name, discriminator);

    if (!taken) {
      // If it's not taken, return the uniqueId
      return `${name}#${discriminator}`;
    }
  }

  // If we couldn't find a free discriminator after 10 tries, return an error
  throw new Error("Failed to generate unique discriminator");
}

// Usage example
try {
  const uniqueId = await generateUniqueId("Bassel");
  console.log("Generated unique ID:", uniqueId);
} catch (error) {
  console.error("Error:", error.message);
}
```
