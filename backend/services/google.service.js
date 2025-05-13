import { google } from "googleapis";
import { oauth2Client } from "../config/googleOauth.js";

export async function getGoogleUserInfo(tokens) {
  oauth2Client.setCredentials(tokens);
  const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
  const { data: userInfo } = await oauth2.userinfo.get();
  return userInfo;
}