import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_KEY,
  process.env.GOOGLE_SECRET_KEY,
  `https://www.googleapis.com/auth/drive`,
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

google.options({ auth: oauth2Client });

export default google;
