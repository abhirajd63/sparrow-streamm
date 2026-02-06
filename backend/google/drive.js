const { google } = require("googleapis");

/**
 * Google Service Account Authentication
 * Uses Base64 encoded private key (Render safe)
 */

if (!process.env.CLIENT_EMAIL) {
  throw new Error("❌ CLIENT_EMAIL is missing in environment variables");
}

if (!process.env.GOOGLE_PRIVATE_KEY_BASE64) {
  throw new Error("❌ GOOGLE_PRIVATE_KEY_BASE64 is missing in environment variables");
}

// Decode Base64 private key
const privateKey = Buffer.from(
  process.env.GOOGLE_PRIVATE_KEY_BASE64,
  "base64"
).toString("utf8");

const auth = new google.auth.JWT({
  email: process.env.CLIENT_EMAIL,
  key: privateKey,
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

const drive = google.drive({
  version: "v3",
  auth,
});

module.exports = drive;
