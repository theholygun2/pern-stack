import { google } from "googleapis"

export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:5000/auth/google/callback"
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
];

export const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope, you can pass it as a string
  scope: scopes
});

export async function getGoogleUserInfo(token) {
    const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: 'v2',
      });
      const { data: userInfo } = await oauth2.userinfo.get();
      return userInfo
}

// {
//     "family_name": "Johnson", 
//     "name": "Charles Johnson", 
//     "picture": "https://lh3.googleusercontent.com/a/ACg8ocI7cagAlZxxuXc8lLwHUFIKV67SieyXAL9lsAklzWDEb_wKMQ=s96-c", 
//     "email": "whatdefak8@gmail.com", 
//     "given_name": "Charles", 
//     "id": "103780042316959363697", 
//     "verified_email": true
//   }