const { google } = require("googleapis");

const privateKeyBase64 = process.env.GOOGLE_PRIVATE_KEY_BASE64;

const auth = new google.auth.GoogleAuth({
  credentials: {
    type: "service_account",
    project_id: process.env.GOOGLE_PROJECT_ID,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: Buffer.from(privateKeyBase64, "base64").toString("utf8"),
  },
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

const drive = google.drive({
  version: "v3",
  auth,
});

module.exports = drive;
