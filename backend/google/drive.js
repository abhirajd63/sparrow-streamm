const { google } = require("googleapis");

const auth = new google.auth.GoogleAuth({
  keyFile: "service-account.json",
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

const drive = google.drive({
  version: "v3",
  auth,
});

module.exports = drive;
