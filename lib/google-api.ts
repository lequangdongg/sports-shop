import { google } from 'googleapis';

const oauth2Client = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: [
    `https://www.googleapis.com/auth/drive`,
    `https://www.googleapis.com/auth/spreadsheets`,
  ],
});

google.options({ auth: oauth2Client });

export default google;
