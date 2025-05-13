import { oauth2Client } from "../config/googleOauth";
import { getGoogleUserInfo } from "../services/google.service.js";

export const callback = async (req, res) => {
    const code = req.query.code;
    if (!code) {
      return res.status(400).send('No code provided');
    }

    try {
      // Get access token
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

    } catch (error) {
      console.error('Error during OAuth callback:', error);
      res.status(500).send('Authentication failed');
    }
}