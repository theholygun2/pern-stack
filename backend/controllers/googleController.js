import { getGoogleUserInfo, oauth2Client } from "../config/googleOauth";
import { sql } from "../config/db.js"

export const callback = async (req, res) => {
    const code = req.query.code;
    if (!code) {
      return res.status(400).send('No code provided');
    }

    try {
      // Get access token
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      const userInfo = await getGoogleUserInfo(tokens)
      // Display user profile

      

      // what to do now?
    } catch (error) {
      console.error('Error during OAuth callback:', error);
      res.status(500).send('Authentication failed');
    }

    // const {data} = await oauth2.userinfo.get()

    // if(!data){
    //     return res.JSON({
    //         data: data
    //     })
    // }
}